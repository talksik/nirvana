import {
  FaAtlassian,
  FaFileAlt,
  FaFileCode,
  FaFileImage,
  FaFilePdf,
  FaGithubSquare,
  FaGlobe,
  FaGoogleDrive,
} from "react-icons/fa";
import Link, { LinkType } from "@nirvana/common/models/conversation";

import { SiGooglemeet, SiZoom } from "react-icons/si";

const faviconGrabberAPI = "https://api.statvoo.com/favicon/?url=";
export function getFavicon(url: string): string {
  return faviconGrabberAPI + url;
}

export default function LinkIcon(props: {
  className?: string;
  linkType: LinkType;
}) {
  // github

  // atlassian

  // drive

  // onedrive

  // dropbox

  // image

  // pdf

  // https://www.codepile.net/ for code snippets

  const { className, linkType, ...rest } = props;

  switch (linkType) {
    case LinkType.default:
      return <FaGlobe {...rest} className={`${className} text-slate-300 `} />;
    case LinkType.atlassian:
      return <FaAtlassian {...rest} className={`${className} text-sky-500 `} />;
    case LinkType.codePile:
      return <FaFileCode {...rest} className={`${className} text-pink-200 `} />;
    case LinkType.github:
      return (
        <FaGithubSquare {...rest} className={`${className} text-gray-400 `} />
      );
    case LinkType.googleDrive:
      return (
        <FaGoogleDrive {...rest} className={`${className} text-emerald-500 `} />
      );
    case LinkType.image:
      return (
        <FaFileImage {...rest} className={`${className} text-purple-500 `} />
      );
    case LinkType.pdf:
      return (
        <FaFilePdf {...rest} className={`${className} text-orange-500 `} />
      );
    case LinkType.googleMeet:
      return (
        <SiGooglemeet {...rest} className={`${className} text-emerald-500 `} />
      );
    case LinkType.zoom:
      return <SiZoom {...rest} className={`${className} text-sky-500 `} />;
    default:
      return (
        <FaFileAlt {...rest} className={`${className} text-orange-500 `} />
      );
  }
}
