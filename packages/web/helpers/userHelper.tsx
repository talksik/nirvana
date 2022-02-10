import User, { UserStatus } from "@nirvana/common/models/user";

function getStatusValue(status: UserStatus) {
  switch (status) {
    case UserStatus.online:
      return 10;
    case UserStatus.busy:
      return 5;
    case UserStatus.offline:
      return 0;
    default:
      return -5;
  }
}

export function compareStatus(usera: User, userb: User) {
  return getStatusValue(userb.userStatus) - getStatusValue(usera.userStatus);
}
