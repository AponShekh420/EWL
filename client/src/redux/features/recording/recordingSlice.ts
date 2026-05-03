import { IRecordingItem } from "@/types/Recording";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** State type */
export interface RecordingState {
  heading: string;
  gender: string;
  speakerId: string;
  classId: string;
  courseId: string;
  recordingCategory: "free" | "course" | "class" | "course-demo";
  recordings: IRecordingItem[];
  existingRecordings: IRecordingItem[];
  deletedRecordings: IRecordingItem[];
}

const initialState: RecordingState = {
  heading: "",
  gender: "",
  speakerId: "",
  classId: "",
  courseId: "",
  recordingCategory: "free",
  recordings: [],
  existingRecordings: [],
  deletedRecordings: [],
};

export const recordingFormSlice = createSlice({
  name: "recording-form",
  initialState,
  reducers: {
    /** Update form fields */
    addRecordingField: (
      state,
      action: PayloadAction<Partial<RecordingState>>,
    ) => {
      Object.assign(state, action.payload);
    },

    /** Add new recording */
    addRecordInsideList: (state, action: PayloadAction<IRecordingItem>) => {
      state.recordings.push(action.payload);
    },

    /** Delete new (not saved) recording */
    deleteRecordInsideList: (state, action: PayloadAction<string>) => {
      state.recordings = state.recordings.filter(
        (recording) => recording.id !== action.payload,
      );
    },

    /** Delete existing recording (track deleted separately) */
    deleteExistingRecordInsideList: (state, action: PayloadAction<string>) => {
      const recording = state.existingRecordings.find(
        (item) => item.id === action.payload,
      );

      if (recording) {
        state.deletedRecordings.push(recording);
      }

      state.existingRecordings = state.existingRecordings.filter(
        (item) => item.id !== action.payload,
      );
    },

    /** Reset all fields */
    resetRecordingFields: () => initialState,
  },
});

export const {
  addRecordingField,
  addRecordInsideList,
  deleteRecordInsideList,
  deleteExistingRecordInsideList,
  resetRecordingFields,
} = recordingFormSlice.actions;

export default recordingFormSlice.reducer;
