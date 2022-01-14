import moment from "moment";

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
