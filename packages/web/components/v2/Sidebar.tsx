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
import Routes from "@nirvana/common/helpers/routes";
import Link from "next/link";

function Sidebar() {
  const router = useRouter();
  const currPage = router.pathname;

  const handleRoute = (route: Routes) => {
    router.push(route);
  };

  return (
    <div className="flex flex-col justify-start items-baseline w-[20rem]">
      {/* new button */}
      <button className="rounded-full flex flex-row items-center px-5 py-2 ml-8 shadow-lg bg-white space-x-2">
        <FaPlus className="text-teal-600 text-lg" />
        <span className="text-slate-500 font-semibold">New</span>
      </button>

      {/* navigation items */}
      <div className="flex flex-col my-5 space-y-5 w-full">
        <Link href={Routes.convos}>{Routes.convos}</Link>
        <Link href={Routes.later}>{Routes.later}</Link>
        <Link href={Routes.done}>{Routes.done}</Link>
        <Link href={Routes.drawer}>{Routes.drawer}</Link>

        <span
          onClick={() => handleRoute(Routes.convos)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-teal-600 ${
              currPage == Routes.convos ? "visible" : "invisible"
            }`}
          ></span>
          <FaStream
            className={`ml-8 mr-2 text-lg ${
              currPage == Routes.convos ? "text-teal-600" : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-500 font-semibold group-hover:text-slate-600">
            Conversations
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

          <span className="text-slate-300 text-md ml-auto">4</span>
        </span>

        <span
          onClick={() => handleRoute(Routes.later)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-purple-500 ${
              currPage == Routes.later ? "visible" : "invisible"
            }`}
          ></span>
          <FaRegClock
            className={`ml-8 mr-2 text-lg ${
              currPage == Routes.later ? "text-purple-500" : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-400 font-semibold group-hover:text-slate-600">
            Later
          </span>

          <span className="text-slate-300 text-md ml-auto">1</span>
        </span>

        <span
          onClick={() => handleRoute(Routes.done)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-emerald-500 ${
              currPage == Routes.done ? "visible" : "invisible"
            }`}
          ></span>
          <FaCheck
            className={`ml-8 mr-2 text-lg ${
              currPage == Routes.done ? "text-emerald-500" : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-400 font-semibold group-hover:text-slate-600">
            Done
          </span>
        </span>

        <Divider />

        <span
          onClick={() => handleRoute(Routes.drawer)}
          className="flex flex-row items-center hover:cursor-pointer transition-all group"
        >
          <span
            className={`w-5 h-5 -translate-x-4 rounded bg-yellow-500 ${
              currPage == Routes.drawer ? "visible" : "invisible"
            }`}
          ></span>
          <FaImages
            className={`ml-8 mr-2 text-lg ${
              currPage == Routes.drawer ? "text-yellow-500" : "text-slate-400"
            } group-hover:text-slate-600`}
          />

          <span className="text-md text-slate-400 font-semibold group-hover:text-slate-600">
            Drawer
          </span>

          <span className="ml-2 text-emerald-700 bg-emerald-200 bg-opacity-20 p-1 rounded-md text-xs font-semibold flex items-center flex-row space-x-1">
            <HiSpeakerphone />
            <span>new</span>
          </span>
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
        <span className="flex flex-row items-center bg-slate-50 rounded-lg shadow-lg p-2 w-full">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-500 font-semibold">Josh</span>

            <span className="text-slate-300 text-xs">engineer</span>
          </span>

          <Tooltip title={"Press and hold R to send a voice clip."}>
            <span
              className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-orange-700 bg-slate-100 text-lg font-bold hover:cursor-pointer"
            >
              <FaMicrophone />
            </span>
          </Tooltip>
          <span
            className="ml-2 shadow-lg flex flex-row items-center h-10 w-10 justify-center 
          rounded-lg text-teal-600 bg-slate-100 text-lg font-bold"
          >
            <FaPlay />
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://yt3.ggpht.com/ytc/AKedOLQDVVudyMlzgNrCzOfNkUKn0KGGwfHQ-PjU02p6PQ=s48-c-k-c0x00ffffff-no-rj" />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">Mark</span>

            <span className="text-slate-300 text-xs">architect</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            2
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Badge dot color={"green"}>
              <Avatar shape="circle" src="https://picsum.photos/200/100" />
            </Badge>
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="flex flex-row space-x-2 items-center">
              <span className="text-slate-500 font-semibold">Sydney</span>
            </span>

            <span className="text-slate-300 text-xs">designer</span>
          </span>

          <FaCircle className="ml-auto text-orange-500 mr-2 animate-pulse text-[0.7em]" />

          <span
            className="ml-2 shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            3
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Badge dot color={"green"}>
              <Avatar shape="circle" src="https://picsum.photos/202/600" />
            </Badge>
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">Jessica</span>

            <span className="text-slate-300 text-xs">recruiter</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            4
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar shape="circle" src="https://picsum.photos/200/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
            <Avatar shape="circle" src="https://picsum.photos/240/300" />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">General</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            5
          </span>
        </span>

        <span className="group flex flex-row items-center rounded-lg p-2 w-full hover:cursor-pointer">
          <Avatar.Group
            maxCount={2}
            size="large"
            maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
          >
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
            <Avatar style={{ backgroundColor: "#87d068" }} icon={<FaUser />} />
            <Avatar style={{ backgroundColor: "#1890ff" }} icon={<FaUser />} />
            <Avatar style={{ backgroundColor: "#1890ff" }} icon={<FaUser />} />
            <Avatar style={{ backgroundColor: "#1890ff" }} icon={<FaUser />} />
          </Avatar.Group>

          <span className="flex flex-col items-start ml-2">
            <span className="text-slate-400">Engineering</span>
          </span>

          <span
            className="ml-auto shadow-lg flex flex-row items-center h-10 w-10 
            justify-center rounded-lg text-slate-400  font-bold hover:cursor-pointer"
          >
            5
          </span>
        </span>
      </div>
    </div>
  );
}

export default Sidebar;
