import User from "@nirvana/common/models/user";
import { useAuth } from "../../contexts/authContext";
import { useRecoilValue, useRecoilState } from "recoil";
import { allRelevantContactsAtom } from "../../recoil/main";
import { userService } from "@nirvana/common/services";
import { Avatar } from "antd";
import { UserAvatarSizes } from "./UserAvatar";

const AVATAR_SHAPE = "circle";

export default function MasterAvatarGroup(props: {
  listOfUsers: User[];
  showCurrUser?: boolean;
  size?: UserAvatarSizes;
  maxUserCount?: number;
}) {
  const { currUser } = useAuth();

  /**
   * Requirements:
   *  if one two users in the conversation: then just get the one that is not the currUser
   *  if three people => show icon of the other two people
   *  if 4 people => show 3 people in triangle fashion
   *  if 6 more 'other' people, then show 3 and then one circle saying how many more there are
   */

  let finalistUsers: User[] = props.listOfUsers;

  if (!props.showCurrUser) {
    finalistUsers = props.listOfUsers.filter(
      (lUser) => lUser.id != currUser!.uid
    );
  }

  // these are the finalists, so now show all of them depending on the number
  if (finalistUsers?.length == 1) {
    return (
      <Avatar
        key={finalistUsers[0].id}
        src={finalistUsers[0].avatarUrl}
        shape={AVATAR_SHAPE}
        size={"default"}
      />
    );
  }

  // if (finalistUsers?.length == 2) {
  //   return (
  //     <span className="flex flex-row items-center w-[4rem] relative">
  //       <span className="absolute left-0">
  //         <Avatar
  //           key={finalistUsers[0].id}
  //           src={finalistUsers[0].avatarUrl}
  //           shape={AVATAR_SHAPE}
  //           size={"default"}
  //         />
  //       </span>
  //       <span className="absolute right-0">
  //         <Avatar
  //           key={finalistUsers[1].id}
  //           src={finalistUsers[1].avatarUrl}
  //           shape={AVATAR_SHAPE}
  //           size={"default"}
  //         />
  //       </span>
  //     </span>
  //   );
  // }

  return (
    <Avatar.Group
      maxCount={props.maxUserCount || 2}
      size={props.size || "default"}
      maxStyle={{
        color: "rgb(148 163 184)",
        fontSize: "10px",
        backgroundColor: "rgb(248 250 252)",
      }}
    >
      {finalistUsers.map((oUser) => (
        <Avatar
          key={oUser.id}
          src={oUser.avatarUrl}
          shape={AVATAR_SHAPE}
          size={props.size || "default"}
        />
      ))}
    </Avatar.Group>
  );
}

export function MasterAvatarGroupWithUserFetch(props: {
  listOfUserIds: string[];
  showCurrUser?: boolean;
  maxUserCount?: number;
  size?: UserAvatarSizes;
}) {
  const relContactsMap = useRecoilValue(allRelevantContactsAtom);

  const { currUser } = useAuth();

  let listOfOtherUsers: string[] = [] as string[];
  if (props.showCurrUser) {
    listOfOtherUsers = props.listOfUserIds;
  } else {
    listOfOtherUsers = props.listOfUserIds.filter(
      (lUser) => lUser != currUser!.uid
    );
  }

  const resultUsers: User[] = [] as User[];

  listOfOtherUsers.forEach((oUser) => {
    if (relContactsMap.has(oUser)) {
      resultUsers.push(relContactsMap.get(oUser)!);
    }
  });

  return <MasterAvatarGroup listOfUsers={resultUsers} {...props} />;
}
