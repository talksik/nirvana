import {
  FaAtlassian,
  FaFileAlt,
  FaFileCode,
  FaFileImage,
  FaFilePdf,
  FaGithubSquare,
  FaGoogleDrive,
} from "react-icons/fa";
import Link, { LinkType } from "../models/link";

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
      return <FaFileAlt {...rest} className={`${className} text-slate-300 `} />;
    case LinkType.atlassian:
      return <FaAtlassian {...rest} className={`${className} text-sky-500 `} />;
    case LinkType.codePile:
      return <FaFileCode {...rest} className={`${className} text-blue-500 `} />;
    case LinkType.github:
      return (
        <FaGithubSquare {...rest} className={`${className} text-gray-500 `} />
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
      <FaFilePdf {...rest} className={`${className} text-orange-500 `} />;
    default:
      return (
        <FaFileAlt {...rest} className={`${className} text-orange-500 `} />
      );
  }
}
