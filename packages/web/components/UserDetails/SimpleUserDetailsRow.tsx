import User from "@nirvana/common/models/user";
import UserAvatar from "./UserAvatar";
import { ReactElement } from "react";

export default function SelectedUserRow(props: {
  user: User;
  actionButton: ReactElement;
}) {
  return (
    <span className="flex flex-row items-center border-t hover:bg-slate-50 p-5">
      <UserAvatar
        userFirstName={props.user.firstName}
        avatarUrl={props.user.avatarUrl}
        status={props.user.userStatus}
      />

      <span className="flex flex-col ml-2">
        <span className="text-teal-500 font-bold">
          {props.user.firstName + " " + props.user.lastName}
        </span>
        <span className="text-slate-400 text-xs">
          {props.user.emailAddress}
        </span>
      </span>

      {props.actionButton}
    </span>
  );
}
