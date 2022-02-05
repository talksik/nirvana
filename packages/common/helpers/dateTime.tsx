const moment = require("moment");

export function generateGreetings(): string {
  const hour = moment().hour();

  if (hour > 16) {
    return "Good evening";
  }

  if (hour > 11) {
    return "Good afternoon";
  }

  return "Good morning";
}

export function getTime(date?: Date) {
  return date != null ? date.getTime() : 0;
}

const today = new Date();

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const Days7Ago = new Date();
Days7Ago.setDate(Days7Ago.getDate() - 7);

const earlierThisMonth = new Date();
earlierThisMonth.setDate(earlierThisMonth.getDate() - 30);

export { today, yesterday, Days7Ago, earlierThisMonth };
