import { DateTime } from 'luxon';

const getCurrentDate = () => {
  const today = DateTime.now().toISODate();
  let currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - 1);
  currentDate = DateTime.utc(currentDate).toISODate();

  return currentDate;
};

export const customDateFormat = (selectedDate) => {
  const day = selectedDate.getDate();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  return DateTime.fromObject({ year, month, day }).toISODate();
};

export default getCurrentDate;
