const MONTH_FORMATTER = new Intl.DateTimeFormat('en-us', {
  month: 'short',
});

export const formatMonth = (date: string) => {
  return MONTH_FORMATTER.format(new Date(date));
};
