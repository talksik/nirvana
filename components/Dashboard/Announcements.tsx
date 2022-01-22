import { FaAngleDown, FaCheck, FaMicrophoneAlt, FaPlay } from "react-icons/fa";
import { UserStatus } from "../../models/user";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { Collections } from "../../services/collections";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import { useAuth } from "../../contexts/authContext";
import Announcement, { AnnouncementState } from "../../models/announcement";
import { getTime } from "../../helpers/dateTime";
import AnnouncementCard from "../AnnouncementCard";
import { Dropdown, Menu, Radio, Tooltip } from "antd";

// for query
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const db = getFirestore();

export default function Announcements() {
  const { currUser } = useAuth();
  const { team } = useTeamDashboardContext();

  const [annMap, setAnnMap] = useState<Map<string, Announcement>>(
    new Map<string, Announcement>()
  );

  // SECTION: LISTENER for Announcements
  useEffect(() => {
    /**
     * QUERY:
     * all announcements for the team in the past 24 hours for now
     * order createdDate desc
     *
     */
    const q = query(
      collection(db, Collections.announcements),
      where("teamId", "==", team.id),
      where("createdDate", ">", yesterday)
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let updatedOrNewAnn = change.doc.data() as Announcement;
        updatedOrNewAnn.id = change.doc.id;

        if (change.type === "added" || change.type === "modified") {
          console.log("New or updated announcement: ", updatedOrNewAnn);

          // update rooms map
          setAnnMap((prevMap) => {
            return new Map(prevMap.set(updatedOrNewAnn.id, updatedOrNewAnn));
          });
        }
        if (change.type === "removed") {
          // going to more so be resolved or deleted
          console.log("Removed annoncement: ", updatedOrNewAnn);
        }
      });
    });
  }, []);

  const allAnn = Array.from(annMap.values());
  // sort the announcements
  allAnn.sort(function (a, b) {
    return getTime(b.createdDate.toDate()) - getTime(a.createdDate.toDate());
  });

  const activeAnn = allAnn.filter(
    (ann) => ann.state == AnnouncementState.active
  );
  const resolvedAnn = allAnn.filter(
    (ann) => ann.state == AnnouncementState.resolved
  );

  const [selectedTabPane, setSelectedTabPane] = useState<string>(
    AnnouncementState.active
  );

  function getTabContent() {
    switch (selectedTabPane) {
      case AnnouncementState.active:
        return (
          <>
            {activeAnn.map((ann) => {
              return <AnnouncementCard key={ann.id} announcement={ann} />;
            })}
          </>
        );
      case AnnouncementState.resolved:
        return (
          <>
            {resolvedAnn.map((ann) => {
              return <AnnouncementCard key={ann.id} announcement={ann} />;
            })}
          </>
        );
    }
  }

  const TimePeriodFilterMenu = (
    <Menu>
      <Menu.Item key={1} disabled>
        Past Week (Coming Soon)
      </Menu.Item>
      <Menu.Item key={2} disabled>
        This Month (Coming Soon)
      </Menu.Item>
    </Menu>
  );

  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      <span className="flex flex-row justify-start items-center pb-5">
        <span className="flex flex-col mr-auto">
          <span className="text-white mr-auto">
            ANNOUNCEMENTS
            <Tooltip title={"Press and hold A to send an announcement."}>
              <button
                className="right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-white text-sm font-bold"
              >
                A
              </button>
            </Tooltip>
          </span>
          <span className="text-gray-300 text-xs">
            updates, pep talks, blockers, reminders
          </span>
        </span>

        {/* tab pane */}

        <Radio.Group
          value={selectedTabPane}
          onChange={(e) => setSelectedTabPane(e.target.value)}
        >
          <Radio.Button value={AnnouncementState.active}>
            {AnnouncementState.active}{" "}
            <span className="text-xs text-orange-500">
              {activeAnn.length > 0 ? activeAnn.length : ""}
            </span>
          </Radio.Button>
          <Radio.Button value={AnnouncementState.resolved}>
            {AnnouncementState.resolved}{" "}
            <span className="text-xs text-orange-500">
              {activeAnn.length > 0 ? activeAnn.length : ""}
            </span>
          </Radio.Button>
        </Radio.Group>

        <Dropdown overlay={TimePeriodFilterMenu}>
          <span className="ml-2 text-sm text-gray-300 flex flex-row items-center uppercase hover:cursor-pointer">
            24 HRS <FaAngleDown />
          </span>
        </Dropdown>

        {/* <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
          <FaMicrophoneAlt className="text-lg text-white" />
        </button>
        <button className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40">
          <FaPlay className="text-lg text-white" />
        </button> */}
      </span>

      <div className="flex flex-row overflow-auto whitespace-nowrap space-x-5 items-center">
        {getTabContent()}
      </div>
    </section>
  );
}
