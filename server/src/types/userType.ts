interface userType {
  _id?: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  gender: string;
  isOrthodoxJew: boolean;
  maritalStatus: string;
  keepsMitzvos: boolean;
  chafifaDuration: string;
  chickenSoupInDairySink: string;
  avatar: string;
  role: string;
}

export default userType;
