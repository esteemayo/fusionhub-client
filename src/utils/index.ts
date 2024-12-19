export const excerpts = (str: string, count: number) => {
  if (typeof str === 'string' && str.length > count) {
    str = str.substring(0, count).concat('...');
  }

  return str;
};
