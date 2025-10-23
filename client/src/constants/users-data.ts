function getRandomArrayElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
const avatarIds: string[] = [];
for (let i = 1; i <= 15; i++) {
  const formattedNumber = i.toString().padStart(2, "0");
  avatarIds.push(formattedNumber);
}

export const usersData = [
  {
    id: "0256",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Bessie Beatty",
    email: "christophe78@gmail.com",
    role: "user",
    createdAt: "2029-10-14T16:01:40.021Z",
  },
  {
    id: "6177",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Joshua Green",
    email: "ayla_schuster28@yahoo.com",
    role: "admin",
    createdAt: "2027-11-01T13:23:52.903Z",
  },
  {
    id: "5456",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Wendy Ankunding",
    email: "lorine66@gmail.com",
    role: "customer",
    createdAt: "2024-12-29T08:37:13.101Z",
  },
  {
    id: "6370",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Daryl Wilderman",
    email: "kane_anderson@gmail.com",
    role: "speaker",
    createdAt: "2027-09-01T14:14:54.439Z",
  },
  {
    id: "8681",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Antonia Ankunding Jr.",
    email: "forest_aufderhar76@gmail.com",
    role: "admin",
    createdAt: "2029-08-25T22:39:48.166Z",
  },
  {
    id: "1083",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Marie VonRueden",
    email: "molly.hauck57@hotmail.com",
    role: "user",
    createdAt: "2024-10-02T21:04:29.582Z",
  },
  {
    id: "9425",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Katherine Parisian",
    email: "rashad.moen@yahoo.com",
    role: "user",
    createdAt: "2029-05-08T23:10:02.387Z",
  },
  {
    id: "4775",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Jaime Tremblay",
    email: "madyson4@yahoo.com",
    role: "user",
    createdAt: "2022-10-05T20:26:08.004Z",
  },
  {
    id: "5854",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Mr. Abel Hettinger",
    email: "mac_ebert@hotmail.com",
    role: "user",
    createdAt: "2022-03-18T08:40:32.890Z",
  },
  {
    id: "9964",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Velma Flatley",
    email: "mohamed.ebert@yahoo.com",
    role: "user",
    createdAt: "2025-04-06T11:49:01.720Z",
  },
  {
    id: "6964",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Ebony Mertz-Grimes",
    email: "jerry53@yahoo.com",
    role: "user",
    createdAt: "2021-11-05T09:08:03.695Z",
  },
  {
    id: "3866",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Alma Ebert IV",
    email: "trent.mcglynn@yahoo.com",
    role: "user",
    createdAt: "2029-09-09T22:50:40.195Z",
  },
  {
    id: "4895",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Dr. Lynn Hills V",
    email: "lauretta.lehner0@gmail.com",
    role: "user",
    createdAt: "2025-05-09T10:06:11.460Z",
  },
  {
    id: "8615",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Leona Berge",
    email: "vanessa_zieme88@gmail.com",
    role: "user",
    createdAt: "2021-12-19T16:15:30.584Z",
  },
  {
    id: "0735",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Vicky Gorczany",
    email: "javier.ernser-schiller@hotmail.com",
    role: "user",
    createdAt: "2027-06-28T00:48:02.026Z",
  },
  {
    id: "8778",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Elsie Veum",
    email: "sienna9@yahoo.com",
    role: "user",
    createdAt: "2025-05-23T17:55:21.517Z",
  },
  {
    id: "1520",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sandy Kunde",
    email: "ernie64@gmail.com",
    role: "user",
    createdAt: "2024-06-03T17:42:21.420Z",
  },
  {
    id: "7680",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Mrs. Melanie Harber",
    email: "sadye.franey@hotmail.com",
    role: "user",
    createdAt: "2025-05-26T00:17:49.373Z",
  },
  {
    id: "4530",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Ben Schiller",
    email: "johathan_runolfsson89@yahoo.com",
    role: "user",
    createdAt: "2023-02-20T07:57:38.516Z",
  },
  {
    id: "0650",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Ramon Schneider",
    email: "maiya85@yahoo.com",
    role: "user",
    createdAt: "2025-10-14T17:57:37.805Z",
  },
  {
    id: "3675",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pearl Harvey",
    email: "torey_schuster@yahoo.com",
    role: "user",
    createdAt: "2020-07-15T06:11:42.441Z",
  },
  {
    id: "3104",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Orville Heathcote",
    email: "titus.howe@yahoo.com",
    role: "user",
    createdAt: "2022-03-16T11:13:29.948Z",
  },
  {
    id: "5806",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Sonia Schinner",
    email: "oceane_jakubowski@hotmail.com",
    role: "user",
    createdAt: "2022-10-13T21:21:37.126Z",
  },
  {
    id: "6235",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Franklin Tillman",
    email: "teagan_hartmann74@hotmail.com",
    role: "user",
    createdAt: "2023-05-31T22:16:58.817Z",
  },
  {
    id: "8853",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Rick Dietrich",
    email: "colton_rutherford55@gmail.com",
    role: "user",
    createdAt: "2027-09-28T03:57:45.429Z",
  },
  {
    id: "0278",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Mathew Lang III",
    email: "leonora_casper47@hotmail.com",
    role: "user",
    createdAt: "2027-11-03T11:44:12.993Z",
  },
  {
    id: "7029",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Bob Douglas",
    email: "breanna_toy@hotmail.com",
    role: "user",
    createdAt: "2021-11-16T03:18:23.412Z",
  },
  {
    id: "0017",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Alexandra Nicolas",
    email: "katrina99@yahoo.com",
    role: "user",
    createdAt: "2021-07-01T18:16:21.182Z",
  },
  {
    id: "4295",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Jan Schiller",
    email: "dina_kuhn@yahoo.com",
    role: "user",
    createdAt: "2026-07-22T12:46:06.635Z",
  },
  {
    id: "4133",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Dr. Leigh Wolf",
    email: "juana_schneider@hotmail.com",
    role: "user",
    createdAt: "2022-08-24T23:45:50.043Z",
  },
  {
    id: "8054",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Bennie Block",
    email: "willa49@hotmail.com",
    role: "user",
    createdAt: "2022-03-18T06:58:10.210Z",
  },
  {
    id: "3288",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Christopher Veum",
    email: "rosetta_shanahan76@yahoo.com",
    role: "user",
    createdAt: "2029-03-21T17:10:49.103Z",
  },
  {
    id: "6680",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Claudia Kutch I",
    email: "izabella.gleason@gmail.com",
    role: "user",
    createdAt: "2028-07-06T10:06:34.751Z",
  },
  {
    id: "4369",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Hubert Glover",
    email: "gregoria.buckridge64@hotmail.com",
    role: "user",
    createdAt: "2024-05-01T06:16:09.395Z",
  },
  {
    id: "2882",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Dr. Allison Collier",
    email: "mabel.runolfsdottir@hotmail.com",
    role: "user",
    createdAt: "2027-08-28T07:20:45.358Z",
  },
  {
    id: "0456",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Patty Schimmel",
    email: "buster.cormier@yahoo.com",
    role: "user",
    createdAt: "2026-12-24T05:46:03.976Z",
  },
  {
    id: "7503",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Marcella Roberts",
    email: "elva73@hotmail.com",
    role: "user",
    createdAt: "2027-11-06T03:42:33.957Z",
  },
  {
    id: "8237",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Claire Schumm",
    email: "coty31@hotmail.com",
    role: "user",
    createdAt: "2028-09-23T05:08:31.333Z",
  },
  {
    id: "1885",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Marcella Weber",
    email: "nelson.kovacek@gmail.com",
    role: "user",
    createdAt: "2026-09-20T18:25:15.111Z",
  },
  {
    id: "2335",
    avatar: `https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(
      avatarIds
    )}.webp`,
    fullName: "Pete Little-Schaefer",
    email: "fred53@gmail.com",
    role: "user",
    createdAt: "2024-05-07T16:54:01.174Z",
  },
];
