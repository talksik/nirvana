import { User } from "@nirvana/common/models/user";
import { useAuth } from "../../contexts/authContext";
import { useRecoilValue, useRecoilState } from "recoil";
import { allRelevantContactsAtom } from "../../recoil/main";
import { userService } from "@nirvana/common/services";

export default function MasterAvatarGroup(props: { listOfUsers: User[] }) {
  const contactsMap = useRecoilValue(allRelevantContactsAtom);

  /**
   * Requirements:
   *  if one two users in the conversation: then just get the one that is not the currUser
   *  if three people => show icon of the other two people
   *  if 4 people => show 3 people in triangle fashion
   *  if 6 more 'other' people, then show 3 and then one circle saying how many more there are
   */

  const { currUser } = useAuth();

  const listOfOtherUsers = props.listOfUsers.filter(
    (lUser) => lUser.id != currUser!.uid
  );

  return (
    <span>
      {listOfOtherUsers.map((oUser) => (
        <img key={oUser.id} src={oUser.avatarUrl} />
      ))}
    </span>
  );
}

export function MasterAvatarGroupWithUserFetch(props: {
  listOfUserIds: string[];
}) {
  const [contactsMap, setContactsMap] = useRecoilState(allRelevantContactsAtom);

  const { currUser } = useAuth();

  const listOfOtherUsers = props.listOfUserIds.filter(
    (lUser) => lUser != currUser!.uid
  );

  const resultUsers: User[] = [] as User[];

  listOfOtherUsers.forEach(async (oUser) => {
    if (contactsMap.has(oUser) && contactsMap.get(oUser) instanceof User) {
      resultUsers.push(contactsMap.get(oUser)!);
    } else {
      // otherwise, fetch document from firestore and then set the cache
      const retrievedUser = await userService.getUser(oUser);

      if (retrievedUser) {
        setContactsMap(new Map(contactsMap.set(oUser, retrievedUser)));
      }
    }
  });

  return <MasterAvatarGroup listOfUsers={resultUsers} />;
}
