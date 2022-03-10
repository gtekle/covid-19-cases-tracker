import { DateTime } from 'luxon';

const getCurrentDate = () => {
  const today = DateTime.now().toISODate();
  let currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - 1);
  currentDate = DateTime.utc(currentDate).toISODate();

  return currentDate;
};

export default getCurrentDate;
