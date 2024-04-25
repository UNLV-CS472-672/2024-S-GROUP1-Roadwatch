import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { signToken } from '../utils';
import { sendPasswordReset } from '../service/emailService';
import ResetPassword from '../models/ResetPassword';

// Retrieves logged in user based on their userId
// this could eventually be different from getting a user in the other route I think
export const getLoggedInUser = async (req: Request, res: Response) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(401).send({
      error: 'Unauthorized',
    });
  }

  try {
    const user = await User.findById(user_id);
    return res.json({ data: user });
  } catch (err) {
    console.error('Could Not Find User: ', err);
    return res.sendStatus(400);
  }
};

// Retrieves 1 user from Database by ID
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    return res.json({ data: user });
  } catch (err) {
    console.error('Could Not Find User: ', err);
    return res.sendStatus(400);
  }
};

// Create a user for the Database
export const createUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    userName,
    password,
    email,
    phoneNumber,
    dob,
    city,
    address,
    state,
    zip,
    notificationSubscriptions,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 3);

  try {
    await User.create({
      firstName,
      lastName,
      userName,
      password: hashedPassword,
      email,
      phoneNumber,
      dob,
      city,
      address,
      state,
      zip,
      notificationSubscriptions,
    });
  } catch (err) {
    console.error('User Creation Error: ', err);
    return res.sendStatus(400);
  }

  return res.sendStatus(200);
};

// deletes 1 user by id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await User.deleteOne({ id });
    return res.sendStatus(200);
  } catch (err) {
    console.error('Could Not Delete User: ', err);
    return res.sendStatus(400);
  }
};

// updates a user using their id
export const updateUser = async (req: Request) => {
  console.log('some actions to udpate user from database');
  const { id } = req.params;

  const {
    firstName,
    lastName,
    userName,
    password,
    email,
    phoneNumber,
    dob,
    city,
    address,
    state,
    zip,
    notificationSubscriptions,
  } = req.body;

  const hashedPassword = password ? await bcrypt.hash(password, 3) : undefined;

  try {
    await User.findOneAndUpdate(
      { id },
      {
        firstName,
        lastName,
        userName,
        password: hashedPassword,
        email,
        phoneNumber,
        dob,
        city,
        address,
        state,
        zip,
        notificationSubscriptions,
      }
    );
  } catch (err) {
    console.error('Update User Error: ', err);
  }
};

export const login = async (req: Request, res: Response) => {
  const { userInput, password } = req.body;

  const user = await User.findOne({
    $or: [{ email: userInput }, { userName: userInput }],
  });

  if (!user) {
    return res.sendStatus(404);
  }

  if (!bcrypt.compareSync(password, user?.password || '')) {
    return res.sendStatus(404);
  }

  try {
    return res.json({
      user_id: user.id,
      access_token: signToken({ user_id: user.id }),
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(500);
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).send({
        error: 'An error occurred',
      });
    }

    // create a temp token and save it
    const token = Math.floor(Math.random() * 100000000).toString();
    const TokenExpier = new Date();
    TokenExpier.setMinutes(TokenExpier.getMinutes() + 2);

    await ResetPassword.findOneAndUpdate(
      {
        user: user.id,
      },
      {
        user: user.id,
        token,
        validTime: TokenExpier,
      },
      { upsert: true, new: true }
    );

    // Send the password reset email with a temporary token
    sendPasswordReset(email, token);

    return res.send({
      data: {
        message: 'Password reset email sent',
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: 'An error occurred',
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password, confirmPassword, token } = req.body;

  const userReset = await ResetPassword.findOne({ token });

  if (!userReset) {
    return res.status(400).send({ error: 'An error occured.' });
  }

  if (userReset.validTime.getTime() - new Date().getTime() < 0) {
    return res.status(400).send({ error: 'Wrong token or token is expired.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).send({ error: 'Password does not match' });
  }

  try {
    const newPassword = await bcrypt.hash(password, 3);

    await User.findByIdAndUpdate(userReset.user, {
      password: newPassword,
    });

    await ResetPassword.deleteOne({ token });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ error: 'An error occured.' });
  }

  return res.send(200);
};

// Updates specific user fields without modifying password or notification subscriptions
export const updateUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;

  console.log("Update User Profile Requested for ID:", id);

  // If no id is provided, return an error
  if (!id) {
    return res.status(400).send({ error: 'No user ID provided' });
  }

  const {
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    dob,
    city,
    address,
    state,
    zip
  } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber,
        dob,
        city,
        address,
        state,
        zip
      },
      { new: true } // Returns the modified document
    );
    if (updatedUser) {
      res.json({ data: updatedUser });
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (err) {
    console.error('Update User Profile Error: ', err);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Updates the logged-in user's password
export const updatePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  console.log("Update Password Requested for ID:", id);

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Verify current password
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(403).send({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 3);

    // Save new password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).send({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Update Password Error: ', err);
    res.status(500).send({ error: 'Internal server error' });
  }
};
