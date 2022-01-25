import { Carousel, Modal } from "antd";
import { useState } from "react";
import { GlobalHotKeys, KeyMap } from "react-hotkeys";

export default function ShortcutHelpModal() {
  const [visible, setVisible] = useState<boolean>(false);

  function handleToggleModal() {
    setVisible((pv) => !pv);
  }

  const keyMap: KeyMap = {
    SHOW_HELP_MODAL: "/",
  };
  const handlers = { SHOW_HELP_MODAL: handleToggleModal };

  return (
    <>
      {/* fixed help on bottom left */}
      <span
        onClick={handleToggleModal}
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

      <Modal
        title="Help"
        visible={visible}
        onCancel={handleToggleModal}
        onOk={handleToggleModal}
      >
        <Carousel autoplay className="text-black bg-black h-[25rem]">
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
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
