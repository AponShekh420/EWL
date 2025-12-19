export const queryFormatter = async (searchParams: {
  [key: string]: string | string[] | undefined;
}) => {
  const searchParamsQuery = await searchParams;
  const query = new URLSearchParams();
  Object.entries(searchParamsQuery).forEach(([key, value]) => {
    if (typeof value === "string") {
      query.append(key, value);
    }
  });

  return query.toString();
};
