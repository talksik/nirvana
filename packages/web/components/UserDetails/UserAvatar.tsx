import { UserStatus } from "@nirvana/common/models/user";
import { Badge } from "antd";
import Avatar from "antd/lib/avatar/avatar";

export enum UserAvatarSizes {
  small = "small",
  large = "large",
  default = "default",
}
export default function UserAvatar(props: {
  userFirstName: string;
  avatarUrl?: string;
  size?: UserAvatarSizes;
  status: UserStatus;
}) {
  if (props.avatarUrl) {
    return (
      <Badge dot>
        <Avatar
          shape="square"
          src={props.avatarUrl}
          size={props.size || UserAvatarSizes.default}
        />
      </Badge>
    );
  }

  return (
    <Badge dot>
      <Avatar shape="square" size={props.size || UserAvatarSizes.default}>
        {props.userFirstName}
      </Avatar>
    </Badge>
  );
}
