import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { signToken } from '../utils';

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
