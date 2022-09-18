export const randomBetween = (a, b) => {
  return Math.floor(Math.random() * b + a);
};

export const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
