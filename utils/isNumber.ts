export const isNumber = (string: string) => {
  if (typeof string !== 'string') {
    return false;
  }

  if (string.trim() === '') {
    return false;
  }

  return !Number.isNaN(Number(string));
};
