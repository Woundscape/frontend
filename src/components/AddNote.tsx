import { PlusOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";

interface INoteProps {
  openModal: boolean;
  onModal: () => void;
}

export default function AddNote({ openModal, onModal }: INoteProps) {
  return (
    <>
      <Button
        id="add-note"
        className="py-8 flex items-center border-2 border-[#D9D9D9]"
        onClick={onModal}
      >
        <div className="flex space-x-4 jura">
          <PlusOutlined style={{ fontSize: 20, color: "#4C577C" }} />
          <p className="text-lg text-[#4C577C]">ADD NOTE</p>
        </div>
      </Button>
      <Modal
        open={openModal}
        onOk={onModal}
        onCancel={onModal}
        width={1000}
        style={{
          borderRadius: "1.25rem",
        }}
      >
        <div className="w-full bg-red-200">ds</div>
      </Modal>
    </>
  );
}
