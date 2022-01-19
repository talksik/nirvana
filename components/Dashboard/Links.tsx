import { BsThreeDots } from "react-icons/bs";
import {
  FaAngleDown,
  FaArchive,
  FaAtlassian,
  FaCode,
  FaCopy,
  FaExternalLinkAlt,
  FaFilePdf,
  FaLink,
  FaPlus,
} from "react-icons/fa";

import Image from "next/image";
import { Dropdown, Menu, Radio, Tooltip } from "antd";
import {
  ShowModalType,
  useKeyboardContext,
} from "../../contexts/keyboardContext";
import CreateOrUpdateLink from "../Modals/CreateOrUpdateLink";
import { useState } from "react";
import LinkCard from "../LinkCard";

export default function Links() {
  const { handleModalType } = useKeyboardContext();

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
              {/* <button
                className="right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-white text-sm font-bold"
              >
                CTRL + V
              </button> */}
            </span>

            <span className="text-gray-300 text-xs">
              links: jira tickets, drive files/folders, powerpoints...
            </span>
          </span>

          {/* tab pane */}
          {/* <span className="ml-auto flex flex-row space-x-5 uppercase mr-5">
            <span className="underline underline-offset-8 decoration-white text-white hover:text-white hover:cursor-pointer">
              Team
            </span>

            <span className="text-gray-300 hover:text-white hover:cursor-pointer">
              Personal
            </span>

            <span className="text-gray-300 hover:text-white hover:cursor-pointer">
              Favorites
            </span>
          </span> */}

          <Dropdown overlay={TimePeriodFilterMenu}>
            <span className="text-sm text-gray-300 flex flex-row items-center uppercase hover:cursor-pointer">
              Week <FaAngleDown />
            </span>
          </Dropdown>

          <Tooltip title={"code blocks: coming soon"}>
            <button className="bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40 ml-2">
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

      <div className="mb-5">
        <Radio.Group
          value={selectedTabPane}
          onChange={(e) => setSelectedTabPane(e.target.value)}
        >
          <Radio.Button value={LinkTypeFilter.me}>
            {LinkTypeFilter.me}{" "}
            {/* <span className="text-xs text-orange-500">
            {meRooms.length > 0 ? meRooms.length : ""}
          </span> */}
          </Radio.Button>
          <Radio.Button value={LinkTypeFilter.team}>
            {LinkTypeFilter.team}{" "}
            {/* <span className="text-xs text-orange-500">{teamRooms.length}</span> */}
          </Radio.Button>
          <Tooltip title={"coming soon"}>
            <Radio.Button disabled value={LinkTypeFilter.favorites}>
              {LinkTypeFilter.favorites}{" "}
              {/* <span className="text-xs text-orange-500">
            {liveRooms.length > 0 ? liveRooms.length : ""}
          </span> */}
            </Radio.Button>
          </Tooltip>
          <Radio.Button value={LinkTypeFilter.archived}>
            {LinkTypeFilter.archived}{" "}
            {/* <span className="text-xs text-orange-500">
            {archivedRooms.length > 0 ? archivedRooms.length : ""}
          </span> */}
          </Radio.Button>
        </Radio.Group>
      </div>

      {/* table of links */}
      <div className="flex flex-col space-y-2">
        {/* pdf example */}
        <LinkCard />
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
