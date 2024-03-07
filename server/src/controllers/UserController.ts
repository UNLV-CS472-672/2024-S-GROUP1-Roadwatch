import User from "../models/User";

// Retrieve all users from Database
export const getUsers = async (req: any, res: any) => {
  const users = await User.find({});
  res.json({ data: users });
}

// Create a user for the Database
export const createUser = async (req: any, res: any) => {
  console.log('creating user');

  console.log(req.body);
  const { firstName, lastName, userName } = req.body;

  try {
    await User.create({
      firstName,
      lastName,
      userName
    })
  } catch (e) {
    console.log(e);
  }


  res.json({});
}

// deletes 1 user by id
export const deleteUser = async (req: any, res: any) => {
  console.log("Deleting User");
  console.log(req);

  // const {deletedCount} = await User.deleteOne({ id: 'Eddard Stark' });
}

// 
export const updateUser = () => {
  console.log('some actions to udpate user from database');
}