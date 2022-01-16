import { User, UserStatus } from "../models/user";

export function compareStatus(usera: User, userb: User) {
  if (usera.userStatus == UserStatus.online) {
    return -2;
  }

  if (usera.userStatus == UserStatus.busy) {
    return -1;
  }

  if (usera.userStatus == UserStatus.offline) {
    return 0;
  }

  return 2;
}
