import bcrypt from 'bcrypt';
import User from "../models/User";

// Retrieve all users from Database
export const getUsers = async (req: any, res: any) => {
  console.log('getting all users');
  const users = await User.find({});
  res.json({ data: users });
}

// Retrieves 1 user from Database by ID
export const getUser = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    res.json({ data: user });
  }
  catch (err) {
    console.error("Could Not Find User: ", err);
    res.sendStatus(400);
  }
}

// Create a user for the Database
export const createUser = async (req: any, res: any) => {
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
    zip } = req.body;


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
      zip
    })
  } catch (err) {
    console.error("User Creation Error: ", err);
    res.sendStatus(400);
  }

  res.sendStatus(200);
}

// deletes 1 user by id
export const deleteUser = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    await User.deleteOne({ id });
    res.sendStatus(200);
  }
  catch (err) {
    console.error("Could Not Delete User: ", err);
    res.sendStatus(400);
  }
}

// updates a user using their id
export const updateUser = async (req: any, res: any) => {
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
    zip } = req.body;

  const hashedPassword = password ? await bcrypt.hash(password, 3) : undefined;

  try {
    await User.findOneAndUpdate({ id }, {
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
      zip
    });
  } catch (err) {
    console.error("Update User Error: ", err);
  }
}