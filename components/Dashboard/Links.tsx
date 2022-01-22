import { BsThreeDots } from "react-icons/bs";
import { FaAngleDown, FaCode, FaPlus } from "react-icons/fa";

import Image from "next/image";
import { Dropdown, Menu, Radio, Tooltip } from "antd";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";
import CreateOrUpdateLink from "../Modals/CreateOrUpdateLink";
import { useEffect, useState } from "react";
import LinkCard from "../LinkCard";
import { Collections } from "../../services/collections";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useTeamDashboardContext } from "../../contexts/teamDashboardContext";
import Link, { LinkState } from "../../models/link";
import { useAuth } from "../../contexts/authContext";

const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);

const db = getFirestore();

export default function Links() {
  const { currUser } = useAuth();
  const { handleModalType } = useKeyboardContext();

  const { team } = useTeamDashboardContext();

  const [linksMap, setLinksMap] = useState<Map<string, Link>>(
    new Map<string, Link>()
  );

  // SECTION: LISTENER for LINKS
  useEffect(() => {
    /**
     * QUERY:
     * all links for the team in the past 7 days
     * order createdDate desc
     *
     */
    const q = query(
      collection(db, Collections.links),
      where("teamId", "==", team.id),
      where("createdDate", ">", lastWeek),
      orderBy("createdDate", "desc")
    );

    // return unsubscribe
    return onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let updatedOrNewLink = change.doc.data() as Link;
        updatedOrNewLink.id = change.doc.id;

        if (change.type === "added" || change.type === "modified") {
          setLinksMap((prevMap) => {
            return new Map(prevMap.set(updatedOrNewLink.id, updatedOrNewLink));
          });
        }
        if (change.type === "removed") {
          console.log("Removed link: ", updatedOrNewLink);
        }
      });
    });
  }, []);

  const TimePeriodFilterMenu = (
    <Menu>
      <Menu.Item key={1} disabled>
        Past 24 Hours (Coming Soon)
      </Menu.Item>
      <Menu.Item key={2} disabled>
        This Month (Coming Soon)
      </Menu.Item>
    </Menu>
  );

  const [selectedTabPane, setSelectedTabPane] = useState<string>(
    LinkTypeFilter.me
  );

  const allLinks = Array.from(linksMap.values());

  const meLinks = allLinks.filter((link) => {
    // if archived or deleted, don't show
    if (link.state != LinkState.active) {
      return false;
    }

    // if I am the sender, then also show, but only if it's me sending to a specific person
    if (link.createdByUserId == currUser.uid && link.recipients?.length > 0) {
      return true;
    }

    // if I am a receiver
    if (link.recipients?.includes(currUser.uid)) {
      return true;
    }

    return false;
  });
  const teamLinks = allLinks.filter((link) => {
    // not archived and does not have a recipients list
    if (link.state == LinkState.active && !link.recipients) {
      return true;
    }
    return false;
  });
  const archivedLinks = allLinks.filter(
    (link) => link.state == LinkState.archived
  );

  function getFilteredContent() {
    switch (selectedTabPane) {
      case LinkTypeFilter.me:
        return meLinks;
      case LinkTypeFilter.team:
        return teamLinks;
      case LinkTypeFilter.archived:
        return archivedLinks;
      default:
        return allLinks;
    }
  }

  return (
    <section className="p-5 flex flex-col bg-gray-100 bg-opacity-25 rounded-lg shadow-md">
      {/* header row */}
      <Tooltip title={"archive unneeded links, keep yourself focused on today"}>
        {/* modal */}
        <CreateOrUpdateLink />

        <span className="flex flex-row justify-start pb-5 items-center">
          <span className="flex flex-col mr-20">
            <span className="text-white mr-auto">
              LINKS
              <button
                onClick={() => handleModalType(ShowModalType.createLink)}
                className="right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-white text-sm font-bold"
              >
                CTRL + V
              </button>
            </span>

            <span className="text-gray-300 text-xs">
              links: jira tickets, drive files/folders, powerpoints...
            </span>
          </span>

          <div className="ml-auto">
            <Radio.Group
              value={selectedTabPane}
              onChange={(e) => setSelectedTabPane(e.target.value)}
            >
              <Radio.Button value={LinkTypeFilter.me}>
                {LinkTypeFilter.me}{" "}
                <span className="text-xs text-orange-500">
                  {meLinks.length > 0 ? meLinks.length : ""}
                </span>
              </Radio.Button>
              <Radio.Button value={LinkTypeFilter.team}>
                {LinkTypeFilter.team}{" "}
                <span className="text-xs text-orange-500">
                  {teamLinks.length}
                </span>
              </Radio.Button>
              <Tooltip title={"coming soon"}>
                <Radio.Button disabled value={LinkTypeFilter.favorites}>
                  {LinkTypeFilter.favorites}{" "}
                  {/* <span className="text-xs text-orange-500">
                {liveRooms.length > 0 ? fa.length : ""}
              </span> */}
                </Radio.Button>
              </Tooltip>
              <Radio.Button value={LinkTypeFilter.archived}>
                {LinkTypeFilter.archived}{" "}
                <span className="text-xs text-orange-500">
                  {archivedLinks.length > 0 ? archivedLinks.length : ""}
                </span>
              </Radio.Button>
            </Radio.Group>
          </div>

          <Dropdown overlay={TimePeriodFilterMenu}>
            <span className="ml-2 text-sm text-gray-300 flex flex-row items-center uppercase hover:cursor-pointer">
              Week <FaAngleDown />
            </span>
          </Dropdown>

          <Tooltip
            title={
              "code blocks: copy the link and paste it in here when you are done"
            }
          >
            <button
              onClick={() => window.open("https://www.codepile.net/", "_blank")}
              className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40 ml-2"
            >
              <FaCode className="text-lg text-white" />
            </button>
          </Tooltip>

          <button
            onClick={() => handleModalType(ShowModalType.createLink)}
            className="bg-gray-300 bg-opacity-25 p-2 ml-2 rounded hover:bg-opacity-40"
          >
            <FaPlus className="text-lg text-white" />
          </button>
        </span>
      </Tooltip>

      {/* table of links */}
      <div className="flex flex-row space-x-2 overflow-x-auto py-2">
        {getFilteredContent().map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </section>
  );
}

enum LinkTypeFilter {
  team = "team",
  me = "me",
  favorites = "favorites",
  archived = "archived",
}
