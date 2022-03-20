export const getCurrentDate = (): string => {
  const currentDay = new Date();
  return `${currentDay.getDate()}-${
    currentDay.getMonth() + 1
  }-${currentDay.getFullYear()}`;
};

export const calcDate = (addDays: number): string => {
  const currentDay = new Date();
  currentDay.setDate(currentDay.getDate() + addDays);
  return `${currentDay.getDate()}-${
    currentDay.getMonth() + 1
  }-${currentDay.getFullYear()}`;
};
