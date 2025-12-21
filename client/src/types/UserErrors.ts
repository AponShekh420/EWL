interface ValidationErrorItem {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
}


type UserErrors = Partial<
  Record<
    | "userName"
    | "firstName"
    | "lastName"
    | "email"
    | "password"
    | "cpassword"
    | "gender"
    | "isOrthodoxJew"
    | "maritalStatus"
    | "keepsMitzvos"
    | "chafifaDuration"
    | "chickenSoupInDairySink",
    ValidationErrorItem
  >
>;
export default UserErrors;