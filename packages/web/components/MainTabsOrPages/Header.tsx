import { QueryRoutes, Routes } from "@nirvana/common/helpers/routes";
import { Menu, Dropdown, Avatar, Tooltip } from "antd";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { KeyMap, GlobalHotKeys } from "react-hotkeys";
import {
  FaUser,
  FaLayerGroup,
  FaSearch,
  FaHeadphones,
  FaMicrophoneAlt,
} from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserStatus } from "../../models/user";
import MainLogo from "../Logo/MainLogo";
import UserStatusBubble from "../UserDetails/UserStatusBubble";
import { useAuth } from "../../contexts/authContext";
import { nirvanaUserDataAtom } from "../../recoil/main";

export default function Header() {
  const { currUser } = useAuth();
  const nirvanaUserData = useRecoilValue(nirvanaUserDataAtom);

  const router = useRouter();

  const UserMenu = (
    <Menu title="user menu">
      <Menu.Item
        key={2}
        onClick={() => router.push("/teams/profile")}
        icon={<FaUser />}
      >
        <button>Profile</button>
      </Menu.Item>

      <Menu.Item
        onClick={() => window.open("/teams", "_self")}
        key={"team hub"}
        icon={<FaLayerGroup />}
      >
        <button>Team Hub</button>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item danger key={3} onClick={() => console.log("sign out")}>
        <button>Sign Out</button>
      </Menu.Item>
    </Menu>
  );

  const inputRef = useRef<HTMLInputElement | undefined>();

  const [searchInput, setSearchInput] = useState<string>("");

  const selectSearch = () => {
    inputRef.current?.focus();
    router.push({
      pathname: Routes.home,
      query: { page: QueryRoutes.search },
    });
  };

  const updateInput = (e) => {
    const newSearchInput = e.target.value;
    setSearchInput(newSearchInput);

    if (!newSearchInput) {
      router.query.q = undefined;
    } else {
      // update url => initiates the search
      router.query.q = encodeURI(newSearchInput);
    }

    router.push({
      query: { q: encodeURI(newSearchInput), page: QueryRoutes.search },
    });
  };

  const keyMap: KeyMap = {
    SELECT_SEARCH: {
      name: "select search to start searching",
      sequence: "/",
      action: "keyup",
    },
  };
  const handlers = {
    SELECT_SEARCH: selectSearch,
  };

  return (
    <div
      className={`flex flex-row justify-start items-center py-3 px-10 bg-slate-50 border-b mb-10`}
    >
      <GlobalHotKeys handlers={handlers} keyMap={keyMap} />

      <MainLogo className="text-3xl text-white" />

      {/* search bar */}
      <div className="mx-auto flex flex-row items-center space-x-2">
        <FaSearch className="text-lg text-slate-300" />
        <input
          placeholder="Type / to search"
          className="bg-transparent placeholder-slate-300 p-2 w-96"
          ref={inputRef}
          onChange={updateInput}
          value={searchInput}
        />
      </div>

      <Tooltip title={"Turn off live listen mode, get deep work done."}>
        <button className="rounded-lg p-2 border text-slate-400 text-xs hover:bg-slate-100">
          Flow State
        </button>
      </Tooltip>

      {/* controls */}
      {/* <div className="flex flex-row items-center space-x-5 px-5">
        <FaHeadphones
          className="text-xl text-teal-500 
        hover:cursor-pointer hover:scale-110 trasition-all animate-pulse"
        />
        <FaMicrophoneAlt
          className="text-xl text-teal-500
        hover:cursor-pointer hover:scale-110 trasition-all animate-pulse"
        />
      </div> */}

      {/* profile section */}
      <Dropdown
        overlay={UserMenu}
        trigger={["click"]}
        className="ml-4 shrink-0"
      >
        <span className="relative flex hover:cursor-pointer">
          <Avatar
            src={nirvanaUserData?.avatarUrl || nirvanaUserData?.firstName[0]}
            size={"large"}
          />
        </span>
      </Dropdown>
    </div>
  );
}
