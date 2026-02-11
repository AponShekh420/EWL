export type PaidHotlineSpeakerType = {
  _id: string;
  avatar: string;
  fullname: string;
  speciality: string;
  gender: "male" | "female";
  description: string;
};

type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};

export type PaidHotlineSpeakerValidationErrors = {
  fullname?: ValidationErrorItem;
  speciality?: ValidationErrorItem;
  description?: ValidationErrorItem;
  speakerId?: ValidationErrorItem;
  gender: ValidationErrorItem;
  avatar?: ValidationErrorItem;
};
