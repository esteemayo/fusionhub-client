const DAY_FORMATTER = new Intl.DateTimeFormat('en-us', {
  day: 'numeric',
});

export const formatDay = (date: string) => {
  return DAY_FORMATTER.format(new Date(date));
};
