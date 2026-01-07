import { BASE_URL } from "./envVariable";

export const getImageUrl = (filename: string, folder: string) => {
  return `${BASE_URL}/images/${folder}/${filename}`;
};
