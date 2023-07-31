import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: any;
  userId: string;
}

export default AuthenticatedRequest;