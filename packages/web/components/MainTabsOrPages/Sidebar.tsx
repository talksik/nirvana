import { QueryRoutes, Routes } from "@nirvana/common/helpers/routes";
import { Divider, Avatar, Tooltip, Badge } from "antd";
import { useRouter } from "next/router";
import {
  FaPlus,
  FaStream,
  FaRocket,
  FaRegClock,
  FaCheck,
  FaImages,
  FaDotCircle,
  FaUser,
  FaMicrophone,
  FaPlay,
  FaCircle,
} from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import Priority from "./Priority";
import { useRecoilValue } from "recoil";
import {
  countNavigationContentSelector,
  NavigationContentCount,
} from "../../recoil/main";

function Sidebar() {
  const router = useRouter();
  const currPage = router.query.page;

  const handleRoute = (queryRoute: QueryRoutes) => {
    router.push({
      pathname: Routes.home,
      query: { page: queryRoute },
    });
  };

  const navCountObject: NavigationContentCount = useRecoilValue(
    countNavigationContentSelector
  );

  return (
    <div className="flex flex-col justify-start items-baseline w-[20rem]">
      {/* new button */}
      <button
        onClick={() => handleRoute(QueryRoutes.createConvo)}
        className="rounded-full flex flex-row items-center px-5 py-2 ml-8 shadow-lg bg-white space-x-2"
      >
        <FaPlus className="text-teal-600 text-lg" />
        <span className="text-slate-500 font-semibold">New</span>
      </button>

      {/* navigation items */}
      <div className="flex flex-col my-5 space-y-5 w-full">
        <span
          onClick={() => handleRoute(QueryRoutes.convos)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-teal-600 ${
              currPage == QueryRoutes.convos ? "visible" : "invisible"
            }`}
          ></span>
          <FaStream
            className={`ml-8 mr-2 text-lg ${
              currPage == QueryRoutes.convos
                ? "text-teal-600"
                : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-500 font-semibold group-hover:text-slate-600">
            Convos
          </span>

          <span className="flex flex-row items-center ml-2">
            <FaDotCircle className="text-orange-500 text-md animate-pulse" />

            <span
              className="text-xs tracking-widest font-semibold 
            text-slate-300 uppercase ml-1"
            >
              Live
            </span>
          </span>

          {navCountObject.defaultCount > 0 && (
            <span className="text-slate-300 text-md ml-auto">
              {navCountObject.defaultCount}
            </span>
          )}
        </span>

        <span
          onClick={() => handleRoute(QueryRoutes.later)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-purple-500 ${
              currPage == QueryRoutes.later ? "visible" : "invisible"
            }`}
          ></span>
          <FaRegClock
            className={`ml-8 mr-2 text-lg ${
              currPage == QueryRoutes.later
                ? "text-purple-500"
                : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-400 font-semibold group-hover:text-slate-600">
            Later
          </span>

          {navCountObject.laterCount > 0 && (
            <span className="text-slate-300 text-md ml-auto">
              {navCountObject.laterCount}
            </span>
          )}
        </span>

        <span
          onClick={() => handleRoute(QueryRoutes.done)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-emerald-500 ${
              currPage == QueryRoutes.done ? "visible" : "invisible"
            }`}
          ></span>
          <FaCheck
            className={`ml-8 mr-2 text-lg ${
              currPage == QueryRoutes.done
                ? "text-emerald-500"
                : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-400 font-semibold group-hover:text-slate-600">
            Done
          </span>

          {navCountObject.doneCount > 0 && (
            <span className="text-slate-300 text-md ml-auto">
              {navCountObject.doneCount}
            </span>
          )}
        </span>

        <Divider />

        <span
          onClick={() => handleRoute(QueryRoutes.drawer)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-yellow-500 ${
              currPage == QueryRoutes.drawer ? "visible" : "invisible"
            }`}
          ></span>
          <FaImages
            className={`ml-8 mr-2 text-lg ${
              currPage == QueryRoutes.drawer
                ? "text-yellow-500"
                : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-400 font-semibold group-hover:text-slate-600">
            Drawer
          </span>

          <span className="text-emerald-700 bg-emerald-200 bg-opacity-20 p-1 rounded-md text-xs font-semibold flex items-center flex-row space-x-1">
            <HiSpeakerphone />
            <span>new</span>
          </span>

          {navCountObject.drawerCount > 0 && (
            <span className="text-slate-300 text-md ml-auto">
              {navCountObject.drawerCount}
            </span>
          )}
        </span>

        <Divider />
      </div>

      {/* pinned items */}
      <div className="flex flex-col items-start px-5 ml-8 py-5 space-y-2 w-full">
        {/* section title */}
        <span className="flex flex-row items-center w-full">
          <FaRocket className="text-sky-500 text-lg mr-1" />

          <span className="text-md tracking-widest font-semibold text-slate-300 uppercase">
            Priority
          </span>

          <FaPlus className="text-slate-400 text-lg shrink-0 ml-auto" />
        </span>

        {/* list of pinned convos */}
        <Priority />
      </div>
    </div>
  );
}

export default Sidebar;
