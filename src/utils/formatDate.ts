const DATE_FORMATTER = new Intl.DateTimeFormat('us', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export const formatDate = (date: string) => {
  return DATE_FORMATTER.format(new Date(date));
};
