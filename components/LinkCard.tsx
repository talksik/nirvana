import { FaArchive, FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";
import Link, { LinkType } from "../models/link";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import LinkIcon from "./LinkIcon";

interface ILinkCardProps {
  link: Link;
}

export default function LinkCard(props: ILinkCardProps) {
  return (
    <span
      onClick={() => window.open(props.link.link, "_blank")}
      className="flex flex-col rounded-lg hover:cursor-pointer"
    >
      {/* attmnt header */}
      <span className="flex flex-row bg-gray-300 bg-opacity-25 py-5 px-3 items-center justify-start">
        <LinkIcon className="text-4xl mr-2" linkType={props.link.type} />

        <span className="flex flex-col items-baseline mr-10 space-y-1">
          <span className="text-md font-bold text-white">
            {props.link.name}
          </span>

          <span
            className={`text-gray-200 text-xs mb-auto text-ellipsis whitespace-pre-line max-h-10 overflow-hidden`}
          >
            {props.link.description}
          </span>
        </span>

        {/* attachment actions */}
        <button
          onClick={() => window.open(props.link.link, "_blank")}
          className="bg-gray-300 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40"
        >
          <FaExternalLinkAlt className="text-sm text-white" />
        </button>
      </span>

      {/* attmnt footer */}
      <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
        <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
          <span className="relative flex">
            <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
            <Image
              className=""
              src={"/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-06.svg"}
              alt="profile"
              width={30}
              height={30}
            />
          </span>
        </span>

        <span className="flex flex-col items-baseline">
          <span className="text-xs text-gray-200 font-bold">Adriana</span>
          <span className="text-xs text-gray-200 font-extralight">
            5 minutes ago
          </span>
        </span>

        <BsThreeDots className="text-white ml-auto hover:cursor-pointer" />
      </span>
    </span>
  );
}
