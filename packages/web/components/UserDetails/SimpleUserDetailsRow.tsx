import { User } from "@nirvana/common/models/user";
import UserAvatar from "./UserAvatar";
import { ReactElement } from "react";

export default function SelectedUserRow(props: {
  user: User;
  actionButton: ReactElement;
}) {
  return (
    <span className="flex flex-row items-center py-1 border-t">
      <UserAvatar
        userFirstName={props.user.firstName}
        avatarUrl={props.user.avatarUrl}
        status={props.user.userStatus}
      />

      <span className="flex flex-col ml-2">
        <span className="text-teal-500 font-bold">{"Joe Smoe"}</span>
        <span className="text-slate-400 text-xs">{"joe@microsoft.com"}</span>
      </span>

      {props.actionButton}
    </span>
  );
}
