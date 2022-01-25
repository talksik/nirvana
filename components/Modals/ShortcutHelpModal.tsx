import { Carousel, Drawer, Modal } from "antd";
import { useRef, useState } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";
import { FaArrowLeft, FaArrowRight, FaUserCheck } from "react-icons/fa";
import { useKeyboardContext } from "../../contexts/keyboardContext";

export default function ShortcutHelpModal() {
  const [visible, setVisible] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>();
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
      >
        <Carousel
          // autoplay
          ref={carouselRef}
          dotPosition="top"
          className="h-[20rem] pt-5"
        >
          <div>
            <span className="flex flex-col px-10">
              <span className="flex flex-row justify-between items-center mb-10">
                <FaArrowLeft
                  onClick={() => carouselRef.current.prev()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />

                <span className="flex flex-col ml-2 items-center">
                  <span className="text-lg text-gray-500">
                    Select a Teammate
                  </span>
                  <span className="text-md text-gray-300">
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

                <FaArrowRight
                  onClick={() => carouselRef.current.next()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />
              </span>

              <img
                src="/illustrations/undraw_takeout_boxes_ap54.svg"
                className=""
              />
            </span>
          </div>
          <div>
            <span className="flex flex-col px-10">
              <span className="flex flex-row justify-between items-center mb-10">
                <FaArrowLeft
                  onClick={() => carouselRef.current.prev()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />

                <span className="flex flex-col ml-2 items-center">
                  <span className="text-lg text-gray-500">
                    Send an Audio Message
                  </span>
                  <span className={`text-md text-gray-300`}>
                    Press and hold R. Try it now!
                  </span>

                  <button
                    className={`right-1 rounded-lg py-1 px-2 ml-1 
                            shadow-md text-center text-gray-300 text-sm font-bold 
                            ${isRecording ? "bg-orange-500 text-white" : ""}`}
                  >
                    R
                  </button>
                </span>

                <FaArrowRight
                  onClick={() => carouselRef.current.next()}
                  className="hover:cursor-pointer bg-teal-600 text-white p-1 rounded-full text-xl"
                />
              </span>

              <img
                src="/illustrations/undraw_takeout_boxes_ap54.svg"
                className=""
              />
            </span>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </Modal>
    </>
  );
}
