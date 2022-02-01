import { IoPulseOutline, IoRemoveOutline } from "react-icons/io5";
import { UserStatus } from "../../models/user";

interface UserStatusPropsInterface {
  status: UserStatus;
}

export default function UserStatusBubble(props: UserStatusPropsInterface) {
  switch (props.status) {
    case UserStatus.online:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-green-400 rounded-full z-20 border border-white"></span>
      );
    case UserStatus.busy:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-orange-400 rounded-full  z-20 border border-white"></span>
      );
    case UserStatus.offline:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-gray-400 rounded-full  z-20 border border-white"></span>
      );
    default:
      return (
        <span className="absolute top-0 right-0 w-3 h-3 bg-gray-400 rounded-full  z-20 border border-white"></span>
      );
  }
}

// same as status pretty much but prolly less needed for all components
export function UserPulse(props: UserStatusPropsInterface) {
  switch (props.status) {
    case UserStatus.online:
      return (
        <IoPulseOutline className="text-green-500 text-2xl animate-pulse mx-2" />
      );
    case UserStatus.busy:
      return (
        <IoPulseOutline className="text-orange-400 text-2xl animate-pulse mx-2" />
      );
    case UserStatus.offline:
      return <IoRemoveOutline className="text-gray-400 text-2xl mx-2" />;
    default:
      return (
        <IoPulseOutline className="text-gray-400 text-2xl animate-pulse mx-2" />
      );
  }
}
