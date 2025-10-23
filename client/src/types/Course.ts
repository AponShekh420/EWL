
export type CourseType = {
  id: string;
  title: string;
  category: string; // Men | Women | Couples
  slug: string;
  students: number;
  price: string;
  speaker: string;
  date: string;
  status: string; // Draft | Publish | Pending
  // lectures:string,
  // time:string,
  // aboutTab: string,
  // overviewTab: string,
  // courseTopicsTab: string,
  // speakerProfileTab: string,
  // FAQsTab: string,
  // testimonialsTab: string,
  // moreInfoTab: string,
  thumbnail: string
};

export type CourseFormState = {
  id: string;
  title: string;
  category: string; // Men | Women | Couples
  slug: string;
  lectures:string;
  time: string;
  DurationNumber: number;
  DurationType: string;
  students: number;
  salePrice: number;
  regularPrice: number;
  speaker: string;
  date: string;
  aboutTab: string;
  overviewTab: string;
  courseTopicsTab: string;
  offline: boolean;
  ExternalLink: string;
  speakerProfileTab: string;
  FAQsTab: string;
  testimonialsTab: string;
  moreInfoTab: string;
  status: string; // Draft | Publish | Pending
  customMessage: "";
  attachment: null;
  checkoutPageMessage: "";
  metaData: "";
  metaDescription: "";
  thumbnail: File | null;
};

