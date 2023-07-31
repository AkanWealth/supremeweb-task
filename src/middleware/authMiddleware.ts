import { Request, Response, NextFunction } from 'express';
import AuthenticatedRequest from '../../custom';

export const isAuthenticated = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { userId } = req;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};
