import { Link } from "@nirvana/common/models/conversation";
import { Tooltip } from "antd";
import { linkWithCredential } from "firebase/auth";
import moment from "moment";
import link from "next/link";
import { FaImages, FaExternalLinkAlt } from "react-icons/fa";
import { getFavicon } from "./LinkIcon";

export default function SharedItemsRow(props: { link: Link }) {
  const { link } = props;

  function addDefaultSrc(ev) {
    ev.target.src = getFavicon("www.com");
  }

  return (
    <span
      className="group flex flex-row items-center border-t
                p-2 hover:bg-slate-50 transition-all shrink-0 text-ellipsis last:border-b w-[18rem]"
    >
      {/* <span className="rounded-lg bg-slate-200 p-2 hover:cursor-pointer"></span> */}

      <img
        height="30"
        width="30"
        src={getFavicon(link.url)}
        onError={addDefaultSrc}
      />

      <Tooltip title={link.name}>
        <span className="flex flex-col ml-2 max-w-[10rem]">
          <span className="text-slate-400 text-sm truncate">{link.name}</span>
          <span className="text-slate-300 text-xs">
            {moment(link.createdDate.toDate()).fromNow()}
          </span>
        </span>
      </Tooltip>

      <span className="flex flex-row ml-auto space-x-1 group-hover:visible invisible">
        <Tooltip title={"Add to personal drawer."}>
          <span className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 ">
            <FaImages className="text-xl text-slate-400" />
          </span>
        </Tooltip>

        <Tooltip title={link.url}>
          <span
            onClick={() => window.open(link.url, "_blank")}
            className="p-2 rounded-full hover:cursor-pointer hover:bg-slate-200 "
          >
            <FaExternalLinkAlt className="text-lg text-slate-400" />
          </span>
        </Tooltip>
      </span>
    </span>
  );
}
