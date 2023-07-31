import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user';

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    if (users.length == 0) {
      return `No user found`;
    }
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
