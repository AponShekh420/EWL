export interface UserType {
  _id: string;
  userName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: "user" | "admin" | "editor" | "speaker" | "customer"; // Adjusted based on common role patterns
  email: string;
  password: string; // Typically hashed
  gender: "male" | "female" | "other";
  isOrthodoxJew: boolean;
  maritalStatus: "yes" | "no"; // Or string if more options exist
  keepsMitzvos: boolean;
  chafifaDuration: string;
  chickenSoupInDairySink: "yes" | "no";
  createdAt: Date;
  updatedAt: Date;
}

type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};
export type UserErrorType = { [key: string]: ValidationErrorItem };
