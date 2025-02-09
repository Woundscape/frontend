import { Button, Modal } from "antd";
import { Content } from "antd/es/layout/layout";

interface IModelProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLoading?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  isOpen,
  title,
  description,
  confirmLoading,
  onSubmit,
  onCancel,
}: IModelProps) {
  return (
    <Modal
      title={title}
      open={isOpen}
      confirmLoading={confirmLoading}
      onOk={onSubmit}
      onCancel={onCancel}
      footer={null}
      centered
      zIndex={100}
      destroyOnClose
    >
      <Content className="flex flex-col text-center px-6 justify-center space-y-6">
        <span className="jura text-[#61708C]">{description}</span>
        <div className="flex justify-center gap-4 text-center">
          <Button
            onClick={onCancel}
            type="default"
            className="w-1/2 jura text-[#4C577C] border-[#D2D4EB]"
            style={{ borderWidth: "1.5px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            loading={confirmLoading}
            type="default"
            className="w-1/2 jura text-[#4C577C] bg-[#F7AD9E] border-[#8088A7]"
            style={{ borderWidth: "1.5px" }}
          >
            Delete
          </Button>
        </div>
      </Content>
    </Modal>
  );
}
