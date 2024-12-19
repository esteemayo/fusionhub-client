export const excerpts = (str: string, count: number) => {
  if (typeof str === 'string' && str.length > count) {
    str = str.split(' ').splice(0, count).join(' ').concat('...');
  }

  return str;
};
