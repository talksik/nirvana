import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Loading from "../components/Loading";
import { Message } from "../models/message";
import { Team } from "../models/team";
import { TeamMember, TeamMemberStatus } from "../models/teamMember";
import { User } from "../models/user";
import { Collections } from "../services/collections";
import TeamService from "../services/teamService";
import UserService from "../services/userService";
import { useAuth } from "./authContext";

interface TeamDashboardContextInterface {
  team: Team;
  teamMembers: TeamMember[];
  userTeamMember: TeamMember;
  user: User;
  messagesByTeamMate: {}; // string of teammate userid and array of messages
  allMessages: Message[];
}

const TeamDashboardContext =
  React.createContext<TeamDashboardContextInterface | null>(null);

// date of yesterday to check if messages are after yesterday
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const teamService = new TeamService();
const userService = new UserService();
const db = getFirestore();

export function TeamDashboardContextProvider({ children }) {
  const { currUser } = useAuth();
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();
  const { teamid } = router.query;

  // this context can only be used if it's a specific route: '/teams'
  if (!teamid) {
    router.push("/teams");
  }

  // update this "global" object to send to children
  const [value, setValue] = useState<TeamDashboardContextInterface>(
    {} as TeamDashboardContextInterface
  );

  // all data
  useEffect(() => {
    var userListener: Unsubscribe;

    (async function () {
      try {
        // SECTION: authentication
        if (!currUser) {
          console.log(
            "not authenticated...routing from dashboard to teams home"
          );
          router.push("/teams/login");
          return;
        }

        // SECTION: get user details : realtime
        const returnedUser = await userService.getUser(currUser.uid);

        const docRef = doc(db, Collections.users, currUser.uid);

        userListener = onSnapshot(docRef, (doc) => {
          const updatedUser = doc.data() as User;

          setValue((prevValue) => ({ ...prevValue, user: updatedUser }));
        });

        setValue((prevValue) => ({ ...prevValue, user: returnedUser }));

        // SECTION: getting team data and team member information
        if (typeof teamid !== "string") {
          console.log("not a proper query with teamid");
          router.push("/teams");
          return;
        }

        // check if the team is a valid team and that user is in it
        const returnedTeam = await teamService.getTeam(teamid);
        if (!returnedTeam) {
          console.log("team doesnt exist");
          router.push("/teams");
          return;
        }
        setValue((prevValue) => ({ ...prevValue, team: returnedTeam }));

        const returnedTeamMember = await teamService.getTeamMemberByUserId(
          teamid,
          currUser.uid
        );

        //  if you are not a member of this team, then get out of here
        //   but have to check through email invite and userid
        if (
          returnedTeamMember &&
          returnedTeamMember.status == TeamMemberStatus.deleted
        ) {
          console.log("user was deleted from team");
          router.push("/teams");
          return;
        }

        // if there is no team member through user id,
        // give him last chance and see if he was invited
        if (!returnedTeamMember) {
          const invitedTeamMember =
            await teamService.getTeamMemberByEmailInvite(
              teamid,
              currUser.email
            );

          if (!invitedTeamMember) {
            console.log("not invited to team either");
            router.push("/teams");
            return;
          }

          // if I am new to the team but I was invited, and this is my first time, then activate me into the team
          // and proceed with showing the dashboard stuff

          invitedTeamMember.status = TeamMemberStatus.activated;
          invitedTeamMember.userId = currUser.uid;
          await teamService.updateTeamMember(invitedTeamMember);

          setValue((prevValue) => ({
            ...prevValue,
            userTeamMember: invitedTeamMember,
          }));
        } else {
          setValue((prevValue) => ({
            ...prevValue,
            userTeamMember: returnedTeamMember,
          }));
        }

        // SECTION: get all teammembers for team, will have listeners in other subcomponents
        var teamMembers: TeamMember[] =
          await teamService.getTeamMembersByTeamId(returnedTeam.id);

        teamMembers = teamMembers.filter(
          (element) => element.userId != currUser.uid
        );

        setValue((prevValue) => ({ ...prevValue, teamMembers }));
      } catch (error) {
        console.log(error);
        router.push("/teams/landing");
      }

      setLoading(false);
    })();

    return () => {
      userListener();
    };
  }, []);

  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [messagesByTeamMate, setMessagesByTeamMate] = useState<{}>({});

  // listener for all incoming messages
  useEffect(() => {
    console.log("first only");

    // todo for new messages, change document.title

    /**
     * QUERY:
     * - last 24 hours only
     * - any message that I have sent or received: relevant messages
     * - order by: date desc
     */
    const q = query(
      collection(db, Collections.audioMessages),
      where("senderReceiver", "array-contains", currUser.uid),
      where("createdDate", ">", yesterday),
      orderBy("createdDate", "asc")
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        // no need to process results again, just append to arrays instead
        // messages won't be deleted or updated really
        if (change.type === "added") {
          let newMessage = change.doc.data() as Message;
          console.log("New message: ", newMessage);

          // update all messages array
          setAllMessages((prevMessages) => [newMessage, ...prevMessages]);

          // update map of teammate to relevant messages
          setMessagesByTeamMate((prevMap) => {
            console.log("settting state");
            // if the map contains the teammate userid already, then cool, just unshift to that array
            const newMap = { ...prevMap };
            if (newMessage.receiverUserId in prevMap) {
              newMap[newMessage.receiverUserId] = [
                newMessage,
                ...prevMap[newMessage.receiverUserId],
              ];
            } // if this is the first relevant message linked to this receiver,
            //then create a new array
            else {
              newMap[newMessage.receiverUserId] = [newMessage];
            }

            return newMap;
          });
        }
        if (change.type === "modified") {
          console.log("Modified message: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed message: ", change.doc.data());
        }
      });
    });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <TeamDashboardContext.Provider value={value}>
      {children}
    </TeamDashboardContext.Provider>
  );
}

export function useTeamDashboardContext() {
  return useContext(TeamDashboardContext);
}
