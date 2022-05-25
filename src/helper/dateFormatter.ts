export const dateFormatter = (dateStr: string) => {
  let sub = new Date(dateStr).toDateString().split(" ").slice(1);
  const formattedDate = sub[1] + " " + sub[0] + " " + sub[2];
  return formattedDate;
};
