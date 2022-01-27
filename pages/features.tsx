import LangingPageLayout from "../components/Layouts/LandingPageLayout";
import {
  FcAssistant,
  FcCollaboration,
  FcFilingCabinet,
  FcGoogle,
  FcLandscape,
  FcOrgUnit,
  FcVideoCall,
} from "react-icons/fc";
import LandingPageActionBar from "../components/demo/LandingPageActionBar";

export default function Features() {
  return (
    <LangingPageLayout>
      <span className="flex flex-col my-20 items-center text-center">
        <span>FEATURES</span>
        <span className="text-5xl font-bold">
          Your WFH <span className="text-teal-600">Hub</span>
        </span>
        <span className="text-gray-500 text-lg">
          Come to work with clarity of mind.
        </span>
      </span>

      <span className="flex flex-col items-center mb-20">
        <span className="flex flex-row space-x-2 mb-2">
          <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md">
            <FcAssistant className="text-5xl -ml-2" />
            <span className="text-teal-600">async</span>
            <span className="text-lg font-semibold">Voice Conversations.</span>

            <span className="text-md text-gray-500">
              Listen to your teammate talk to you realtime if you are online.
            </span>
          </span>

          <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md">
            <FcCollaboration className="text-5xl" />
            <span className="text-teal-600">informal</span>
            <span className="text-lg font-semibold">Office Rooms.</span>

            <span className="text-md text-gray-500">
              Nirvana voice-only rooms to collaborate and work with your closest
              teammates throughout the day.
            </span>
          </span>
        </span>

        <span className="flex flex-row space-x-2 mb-2">
          <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md">
            <FcVideoCall className="text-5xl" />
            <span className="text-teal-600">formal</span>
            <span className="text-lg font-semibold">Meeting Rooms.</span>

            <span className="text-md text-gray-500">
              Spontaneous, scheduled, or recurring{" "}
              <FcGoogle className="inline" /> Meet meetings. All conversations
              transparent for the team to see.
            </span>
          </span>

          <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md">
            <FcFilingCabinet className="text-5xl -ml-2" />
            <span className="text-teal-600">desk</span>
            <span className="text-lg font-semibold">Drawer.</span>

            <span className="text-md text-gray-500">
              Personal and team drawer of links: Jira, Drive, Dropbox, Github,
              screenshots, code snippets.
            </span>
          </span>
        </span>

        <span className="flex flex-row space-x-2">
          <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md">
            <FcOrgUnit className="text-5xl -ml-2" />
            <span className="text-teal-600">team</span>
            <span className="text-lg font-semibold">Announcements.</span>

            <span className="text-md text-gray-500">
              Keep your team focused. Mention blockers, priorities, updates...
            </span>
          </span>

          <span className="flex flex-col items-start bg-white bg-opacity-40 p-10 max-w-sm rounded backdrop-blur-md">
            <FcLandscape className="text-5xl" />
            <span className="text-teal-600">ephemeral</span>
            <span className="text-lg font-semibold">Inbox Zero.</span>

            <span className="text-md text-gray-500">
              Links, conversations, rooms...They all disappear from your main
              view to keep you and your team focused.
            </span>
          </span>
        </span>
      </span>

      <LandingPageActionBar />
    </LangingPageLayout>
  );
}
