
interface SpeakerType {
  firstName: string;
  lastName: string;
  _id: string; 
  userName: string; 
  avatar: string; 
  role: string; 
  status: string; 
  email: string; 
  gender: string; 
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export type ClassType = {
  speaker: SpeakerType;
  offline?: boolean;
  externalLink?: string;
  _id?: string;
  title: string;
  category: string;
  thumbnail: string;
  price: number;
  installmentMonths?: number;
  status: string;
  slug?: string;
  attachment?: string;
  updatedAt?: string;
  module: number;
  audiosTwo?: string[];
  audiosOne?: string[];
  videosOne?: string[];
  videosTwo?: string[];
  contentOne?: string;
  contentTwo?: string;
};

export type ClassFormState = {
  // 1st tab
  title: string;
  slug: string;
  category: string; // Men | Women | Couples
  speaker: string;
  status: string;

  // 2nd tab
  thumbnail: File | null;
  existingThumbnail?: string;
  existingAttachment?: string;

  // 3rd tab
  installmentMonths: string;
  price: string;
  offline: boolean;
  externalLink: string;
  module: string;

  // 4th tab
  existingAudiosOne?: string[];
  deletedAudiosOne?: string[];
  audiosOne?: File[] | null;

  existingAudiosTwo?: string[];
  deletedAudiosTwo?: string[];
  audiosTwo?: File[] | null;

  existingVideosOne?: string[];
  deletedVideosOne?: string[];
  videosOne?: File[] | null;

  existingVideosTwo?: string[];
  deletedVideosTwo?: string[];
  videosTwo?: File[] | null;
  contentOne?: string;
  contentTwo?: string;

  // 5th tab
  customMessage: string;
  attachment: File | null;
  checkoutPageMessage: string;
  metaTitle: string;
  metaDescription: string;
};



//course express validator types errors
type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};

export type ClassValidationErrors = { [key: string]: ValidationErrorItem };