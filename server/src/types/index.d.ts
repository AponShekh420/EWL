import userType from "./userType";

export interface DecodedToken {
  id?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: userType;
    }
  }
}
