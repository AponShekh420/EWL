
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
export type CourseType = {
  duration?: string;
  students: number;
  speaker: SpeakerType;
  date?: string;
  lectures?:string,
  time?:string,
  aboutTab?: string,
  overviewTab?: string,
  courseTopicsTab?: string,
  speakerProfileTab?: string,
  FAQsTab?: string,
  testimonialsTab?: string,
  moreInfoTab?: string,
  offline?: boolean;
  externalLink?: string;
  _id?: string;
  title: string;
  headline?: string;
  bio?: string;
  category: string;
  thumbnail: string;
  price: number;
  installmentMonths?: number;
  status: string;
  slug?: string;
  attachment?: string;
  updatedAt?: string;
  durationNumber?: number;
  durationType?: string;
  module: number;
};

export type CourseFormState = {
  // 1st tab
  title: string;
  slug: string;
  bio: string;
  headline: string;
  category: string; // Men | Women | Couples
  time: string;
  date: string;
  lectures:string;
  durationNumber: string;
  durationType: string;
  speaker: string;
  status: string;

  // 2nd tab
  thumbnail: File | null;
  existingThumbnail?: string;
  existingAttachment?: string;
  existingImages?: string[];
  deletedImages?: string[];

  // 3rd tab
  installmentMonths: string;
  price: string;
  offline: boolean;
  externalLink: string;
  module: string;

  // 4th tab
  aboutTab: string;
  overviewTab: string;
  courseTopicsTab: string;
  speakerProfileTab: string;
  FAQsTab: string;
  testimonialsTab: string;
  moreInfoTab: string;

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

export type CourseValidationErrors = { [key: string]: ValidationErrorItem };