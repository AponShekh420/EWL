export interface IRecordingItem {
  url?: string | undefined;
  id: string;
  recordNumber: number;
  file?: string | File;
  sourceType: "internal" | "external";
  mediaType: "audio" | "video";
  externalLink?: string;
}
export type recordingCatType = "free" | "class" | "course" | "course-demo";
export interface IRecording {
  _id: string;
  speaker?: string;
  course?: string;
  class?: string;
  heading: string;
  gender?: "male" | "female";
  recordingCategory: recordingCatType;
  recordings: IRecordingItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IDisplayRecording {
  _id: string;
  speaker?: {
    firstName: string,
    lastName: string,
    gender: string
  };
  course?: {
    title: string,
    speaker: {
      firstName: string,
      lastName: string,
      gender: string,
    }
  };
  class?: {
    title: string,
    speaker: {
      firstName: string,
      lastName: string,
      gender: string,
    }
  };
  heading: string;
  gender?: "male" | "female";
  recordingCategory: recordingCatType;
  recordings: IRecordingItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

type ValidationErrorItem = {
  type: string;
  msg: string;
  path: string;
  location: string;
  value?: string;
};

export type RecordingValidationErrors = { [key: string]: ValidationErrorItem };
