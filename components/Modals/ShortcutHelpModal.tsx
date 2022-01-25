import { Carousel, Divider, Drawer, Modal } from "antd";
import { CarouselRef } from "antd/lib/carousel";
import { useRef, useState } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";
import { FaArrowLeft, FaArrowRight, FaUserCheck } from "react-icons/fa";
import { useKeyboardContext } from "../../contexts/keyboardContext";

export default function ShortcutHelpModal() {
  const [visible, setVisible] = useState<boolean>(false);
  const carouselRef = useRef<CarouselRef>();

  const { isRecording } = useKeyboardContext();

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
        width={700}
      >
        <Carousel ref={carouselRef} dotPosition="top" className="pt-5">
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
                  src="/illustrations/undraw_takeout_boxes_ap54.svg"
                  className="h-[10rem]"
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
                  src="/illustrations/undraw_takeout_boxes_ap54.svg"
                  className="h-[10rem]"
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
                  <span className={`text-md text-gray-300`}>
                    Press and hold R. Your teammate will hear you instantly if
                    they are logged in.
                  </span>
                  <span className={`text-md text-gray-300`}>
                    As if you were speaking over your shoulder. No
                    notifications. No scrolling. No reading.
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

                <span className="flex flex-col ml-2 items-center">
                  <span className="text-lg text-gray-500">
                    Manage Your Drawer
                  </span>
                  <span className={`text-md text-gray-300 text-center`}>
                    Paste important links: Jira tickets, ppts, drive files,
                    github, code snippets.
                  </span>

                  <span className="flex flex-row items-center">
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

                <FaArrowRight
                  onClick={() => carouselRef.current.next()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl shrink-0"
                />
              </span>

              <img
                src="/illustrations/undraw_conference_speaker_re_1rna.svg"
                className="h-[10rem]"
              />
            </span>
          </div>
        </Carousel>
      </Modal>
    </>
  );
}
