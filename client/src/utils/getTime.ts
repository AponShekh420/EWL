export const GetTime = (isoDate: Date, withTime?: boolean) => {
  const date = new Date(isoDate);

  let options: Intl.DateTimeFormatOptions;

  if (withTime) {
    options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // use 12-hour format (AM/PM). Remove if you want 24h
    };
  } else {
    options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
  }

  const formattedDate = date.toLocaleString("en-US", options);
  return formattedDate;
};
