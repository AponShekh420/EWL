export interface IConference {
  _id?: string;
  month: string;
  day: string;
  timeInfo: string;
  eventDate: string; // ISO string format for Countdown
  speaker: string;
  lecture: string;
  readMoreUrl?: string;
}