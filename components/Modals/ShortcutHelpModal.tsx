import { Carousel, Divider, Drawer, Modal } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { useEffect, useRef, useState } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";
import { BsThreeDots } from "react-icons/bs";
import {
  FaArrowLeft,
  FaArrowRight,
  FaClock,
  FaLink,
  FaPlus,
  FaUserCheck,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useKeyboardContext } from "../../contexts/keyboardContext";
import Rooms from "../demo/Rooms";
import Image from "next/image";
import Cookies from "js-cookie";
import { CookieType } from "../../helpers/cookies";

export default function ShortcutHelpModal() {
  const [visible, setVisible] = useState<boolean>(false);
  const carouselRef = useRef<CarouselRef>();

  const { isRecording } = useKeyboardContext();

  useEffect(() => {
    // if have the specific cookie, then don't show the modal, otherwise show the modal
    const cookie = Cookies.get(CookieType.TEAM_SHORTCUTS_ONBOARDING);
    if (!cookie) {
      setVisible(true);
      Cookies.set(CookieType.TEAM_SHORTCUTS_ONBOARDING, "true");
    }
  }, []);

  function handleShowModal() {
    setVisible(true);
  }
  function handleDismissModal() {
    setVisible(false);
  }

  const keyMap: KeyMap = {
    SHOW_HELP_MODAL: {
      name: "show help modal",
      sequence: "/",
      action: "keyup",
    },
  };
  const handlers = { SHOW_HELP_MODAL: handleShowModal };

  return (
    <>
      {/* fixed help on bottom left */}
      <span
        onClick={handleShowModal}
        className="hover:cursor-pointer fixed bottom-10 right-10 bg-gray-200 bg-opacity-80 py-2 px-3 rounded text-gray-500 flex flex-row items-center space-x-2"
      >
        <span>Help</span>

        <button
          className={`right-1 rounded-lg py-1 px-2 ml-1 
           shadow-md text-center text-gray-500 text-sm font-bold`}
        >
          /
        </button>
      </span>

      <GlobalHotKeys keyMap={keyMap} handlers={handlers} />

      {/* <Drawer
        title="Help"
        placement={"right"}
        closable={false}
        onClose={handleDismissModal}
        visible={visible}
        zIndex={0}
      ></Drawer> */}

      <Modal
        title="Help"
        onCancel={handleDismissModal}
        visible={visible}
        footer={<></>}
        zIndex={5}
        width={750}
      >
        <Carousel ref={carouselRef} dotPosition="top" className="pt-5">
          <div>
            <span className="flex flex-col px-10">
              <span className="flex flex-row justify-between items-start mb-10">
                <FaArrowLeft
                  onClick={() => carouselRef.current.prev()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />

                <span className="flex flex-col items-center">
                  <span className="text-xl">Live Collaboration</span>
                  <span className="text-md text-gray-300 text-center">
                    Building the habit of{" "}
                    <span className="text-teal-600">
                      {" "}
                      resolving issues on the spot
                    </span>{" "}
                    <br></br>
                    through seamless communication.
                  </span>
                </span>

                <FaArrowRight
                  onClick={() => carouselRef.current.next()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />
              </span>

              <span className="flex flex-row justify-between items-center">
                <span className="flex flex-col ml-2 items-start justify-start">
                  <span className="text-lg text-gray-500 text-left">
                    Hop into Office Rooms
                  </span>
                  <span className="text-md text-gray-300 text-left">
                    Work with your closest teammates in the{" "}
                    <span className="text-teal-600"> hallway or corner </span>
                    throughout the day.
                    <br></br> Have lunch and take breaks in the{" "}
                    <span className="text-teal-600">kitchen.</span>
                  </span>
                </span>
                <img
                  src="/screenshots/officerooms.png"
                  className="h-[15rem] rounded-lg"
                />
              </span>

              <Divider />

              <span className="flex flex-row justify-between items-center">
                {/* spontaneous bug room */}
                <span
                  className="shrink-0 h-[15rem] backdrop-blur-xl flex flex-col bg-white bg-opacity-80
                 rounded-lg justify-between w-80 max-w-screen-sm m-2 overflow-clip"
                >
                  {/* header */}
                  <span className="flex flex-1 flex-row justify-between items-baseline space-x-1 p-5">
                    {/* meeting details */}
                    <span className="flex flex-col items-baseline justify-start max-w-xs pr-10">
                      <span className="text-gray-500 font-semibold mr-auto">
                        bug fixing
                      </span>
                      <span className="text-xs text-gray-400 overflow-wrap mb-auto h-full">
                        were just fixing that jsx bug thats a paiiinnnn
                      </span>

                      {/* badges and tags */}
                      <span className="flex flex-row flex-wrap mt-auto">
                        <span className="text-xs m-1 text-white bg-red-400 p-1 rounded-md font-bold flex flex-row items-center">
                          <span>blockers</span>
                        </span>

                        <span className="text-xs m-1 text-white bg-indigo-400 p-1 rounded-md font-bold flex flex-row items-center">
                          <span>engineering</span>
                        </span>
                      </span>
                    </span>

                    {/* room status */}
                    <span className="flex flex-col items-end space-y-1 justify-between h-full">
                      <span
                        className="text-xs bg-red-500
                    text-white font-bold p-1 rounded-md flex flex-row space-x-2 items-center"
                      >
                        <FaClock />
                        <span>live</span>
                      </span>

                      {/* room attachments */}
                      <span className="flex flex-row space-x-2">
                        <button className="bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
                          <FaLink className="text-sm text-gray-400" />
                        </button>

                        <button className="bg-gray-400 bg-opacity-25 p-2 ml-auto rounded hover:bg-opacity-40">
                          <FaLink className="text-sm text-gray-400" />
                        </button>
                      </span>
                    </span>
                  </span>

                  {/* footer */}
                  <span className="flex flex-row items-center bg-gray-400 bg-opacity-30 p-3">
                    <span className="inline-flex flex-row-reverse items-center shrink-0 mr-1">
                      <span className="relative flex">
                        <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                        <Image
                          className=""
                          src={
                            "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-20.svg"
                          }
                          alt="profile"
                          width={30}
                          height={30}
                        />
                      </span>
                      <span className="-mr-4 relative flex">
                        <span className="bg-gray-200 rounded-full shadow-md absolute w-full h-full"></span>
                        <Image
                          className=""
                          src={
                            "/avatars/svg/Artboards_Diversity_Avatars_by_Netguru-22.svg"
                          }
                          alt="profile"
                          width={30}
                          height={30}
                        />
                      </span>
                    </span>
                    <span className="text-xs text-gray-400">
                      Arjun and Liam
                    </span>
                    <button className="ml-auto text-sm text-orange-500 font-semibold py-1 px-4 bg-gray-200 rounded">
                      👋 Leave
                    </button>
                    <BsThreeDots className="text-white ml-2 hover:cursor-pointer" />{" "}
                  </span>
                </span>

                <span className="flex flex-col ml-2 items-end">
                  <span className="text-lg text-gray-500">Join a Room</span>
                  <span className={`text-md text-gray-300 text-right`}>
                    Click on the{" "}
                    <button className="inline bg-gray-300 bg-opacity-25 p-1 rounded hover:bg-opacity-40">
                      <FaPlus className="text-md text-white" />
                    </button>{" "}
                    to create a <br></br>
                    <FcGoogle className="inline text-lg" /> Meet (if your team
                    has GSuite).
                  </span>
                  <span className={`text-md text-teal-600 text-right`}>
                    Spontaneous, scheduled, or recurring rooms.
                  </span>

                  <span className="flex flex-row items-center space-x-2">
                    <button className="inline bg-gray-300 bg-opacity-25 p-2 rounded hover:bg-opacity-40">
                      <FaPlus className="text-md text-white" />
                    </button>

                    <span>or</span>
                    <button
                      className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                    >
                      Q
                    </button>
                  </span>
                </span>
              </span>

              <Divider />

              <span className="flex flex-row justify-between items-center">
                <span className="flex flex-col ml-2 items-start">
                  <span className="text-lg text-gray-500">
                    {"Cross Collaborate"}
                  </span>
                  <span className={`text-md text-gray-300 text-left`}>
                    Walk into the office with clarity of what <br></br>
                    <span className="text-teal-600">
                      team conversations{" "}
                    </span>{" "}
                    are going on across the hall.
                  </span>
                </span>

                <img
                  src="/illustrations/undraw_team_collaboration_re_ow29.svg"
                  className="h-[10rem]"
                />
              </span>
            </span>
          </div>
          <div>
            <span className="flex flex-col px-10">
              <span className="flex flex-row justify-between items-start mb-10">
                <FaArrowLeft
                  onClick={() => carouselRef.current.prev()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />

                <span className="text-xl">Audio Messages</span>

                <FaArrowRight
                  onClick={() => carouselRef.current.next()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />
              </span>

              <span className="flex flex-row justify-between items-center">
                <span className="flex flex-col ml-2 items-center">
                  <span className="text-lg text-gray-500">
                    Select a Teammate
                  </span>
                  <span className="text-md text-gray-300 text-center">
                    Type numbers on your keyboard.
                  </span>

                  <span className="flex flex-row space-x-2">
                    <button
                      className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                    >
                      1
                    </button>
                    <button
                      className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                    >
                      2
                    </button>
                    <button
                      className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                    >
                      3
                    </button>
                    <span className="text-gray-300">...</span>
                  </span>
                </span>

                <img
                  src="/screenshots/teamvoiceline.png"
                  className="h-[10rem] w-[22rem]"
                />
              </span>

              <Divider />

              <span className="flex flex-row justify-between items-center">
                <img
                  src="/illustrations/undraw_conference_speaker_re_1rna.svg"
                  className="h-[10rem]"
                />

                <span className="flex flex-col ml-2 items-center">
                  <span className="text-lg text-gray-500">
                    Send an Audio Message
                  </span>
                  <span className={`text-md text-gray-300 text-center`}>
                    Press and hold R.{" "}
                    <span className="text-teal-600">
                      Your teammate will <br></br> hear you instantly
                    </span>{" "}
                    if they are online.
                  </span>
                  <span className={`text-md text-gray-300 text-center`}>
                    As if they were across the table.
                  </span>

                  <button
                    className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold 
                            ${isRecording ? "bg-orange-500 text-white" : ""}`}
                  >
                    R
                  </button>
                </span>
              </span>

              <Divider />

              <span className="flex flex-row justify-between items-center">
                <span className="flex flex-col ml-2 items-center">
                  <span className="text-lg text-gray-500">
                    Play Incoming Message
                  </span>
                  <span className={`text-md text-gray-300 text-center`}>
                    Select teammate and then press SPACE <br></br> to listen to
                    the last conversation.
                  </span>
                  {/* <span className={`text-md text-gray-300 text-center`}>
                    Deselect teammate by pressing <br></br> ESC.
                  </span> */}

                  <button
                    className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                  >
                    SPACE
                  </button>
                </span>

                <img
                  src="/illustrations/undraw_tutorial_video_vtd1.svg"
                  className="h-[10rem]"
                />
              </span>

              <Divider />

              <span className="flex flex-row justify-between items-center">
                <img
                  src="/illustrations/undraw_back_home_nl-5-c.svg"
                  className="h-[10rem]"
                />

                <span className="flex flex-col ml-2 items-center">
                  <span className="text-lg text-gray-500">Clear Your View</span>
                  <span className={`text-md text-gray-300 text-center`}>
                    Deselect teammate and <br></br> stop playing audio by
                    pressing ESC.
                  </span>

                  <button
                    className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                  >
                    ESC
                  </button>
                </span>
              </span>
            </span>
          </div>
          <div>
            <span className="flex flex-col px-10">
              <span className="flex flex-row justify-between items-start mb-10">
                <FaArrowLeft
                  onClick={() => carouselRef.current.prev()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl shrink-0"
                />

                <span className="flex flex-col items-center">
                  <span className="text-xl">Drawer</span>
                  <span className="text-md text-gray-300 text-center">
                    Organize your desk and{" "}
                    <span className="text-teal-600">
                      focus on today&apos;s priorities.
                    </span>
                  </span>

                  <img
                    src="/screenshots/drawer.png"
                    className="rounded-lg mt-5"
                  />
                </span>

                <FaArrowRight
                  onClick={() => carouselRef.current.next()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl shrink-0"
                />
              </span>

              <span className="flex flex-row justify-between items-center">
                <span className="flex flex-col ml-2 items-start">
                  <span className="text-lg text-gray-500">Add Your Drawer</span>
                  <span className={`text-md text-gray-300 text-left max-w-xs`}>
                    Paste{" "}
                    <span className={`text-teal-600`}>important links:</span>{" "}
                    Jira tickets, ppts, drive files/folders, github, code
                    snippets.
                  </span>

                  <span className="flex flex-row items-left">
                    {" "}
                    <button
                      className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                    >
                      CTRL
                    </button>{" "}
                    +{" "}
                    <button
                      className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold`}
                    >
                      V
                    </button>{" "}
                  </span>
                </span>

                <img
                  src="/illustrations/undraw_memory_storage_reh0.svg"
                  className="h-[12rem]"
                />
              </span>

              <Divider />

              <span className="flex flex-row justify-between items-center">
                <img
                  src="/illustrations/undraw_team_spirit_re_yl1v.svg"
                  className="h-[12rem]"
                />

                <span className="flex flex-col ml-2 items-end max-w-xs">
                  <span className="text-lg text-gray-500">Team Drawer</span>
                  <span className={`text-md text-gray-300 text-right`}>
                    Make sure your team has <br></br> what they need from you.
                  </span>
                  <span className={`text-md text-teal-600 text-right`}>
                    Keep this clean to stay focused.
                  </span>
                </span>
              </span>

              <Divider />

              <span className="flex flex-row justify-between items-center">
                <span className="flex flex-col ml-2 items-start">
                  <span className="text-lg text-gray-500">
                    {"You Decide What You Keep"}
                  </span>
                  <span className={`text-md text-gray-300 text-left`}>
                    Last month&apos;s mess is weighing you down.
                  </span>

                  <span className={`text-md text-gray-300 text-left`}>
                    Only see{" "}
                    <span className="text-teal-600">
                      this week&apos;s files/links
                    </span>{" "}
                    to keep <br></br> your head clear.
                  </span>
                </span>

                <img
                  src="/illustrations/undraw_my_files_swob.svg"
                  className="h-[10rem]"
                />
              </span>

              <Divider />

              <span className={`text-md text-gray-300 text-center`}>
                NOTE: this is{" "}
                <span className="text-orange-500">NOT file storage.</span>
              </span>
              <span className={`text-md text-gray-300 text-center`}>
                They are merely bookmarked links <br></br> to your source of
                truth (Google Drive, Github...).
              </span>
            </span>
          </div>
        </Carousel>
      </Modal>
    </>
  );
}
