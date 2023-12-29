import { Button, Modal, Spin, Upload } from "antd";
import { Content } from "antd/es/layout/layout";
import SearchUploadIcon from "@assets/icon-search-upload.svg";
import AddUploadIcon from "@assets/icon-add-upload-file.svg";

interface IModelProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLoading?: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function UploadModal({
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
      centered
      zIndex={100}
      footer={[
        <div
          key={"footer"}
          className="px-6 py-3 flex justify-between gap-4 text-center"
        >
          <Button
            onClick={onCancel}
            type="default"
            className="w-36 jura text-[#4C577C] border-[#D2D4EB]"
            style={{ borderWidth: "1.5px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            loading={confirmLoading}
            type="default"
            className="w-36 jura text-[#4C577C] bg-[#D2D4EB] border-[#8088A7]"
            style={{ borderWidth: "1.5px" }}
          >
            Save
          </Button>
        </div>,
      ]}
    >
      <Content className="flex flex-col text-center px-6 justify-center space-y-6">
        <span className="jura text-[#61708C]">{description}</span>
        <Upload.Dragger
          multiple
          listType="picture"
          action={"http://localhost:5173/"}
          accept=".png,.jpeg"
          beforeUpload={(file) => {
            console.log(file);
            return false;
          }}
          iconRender={() => {
            return <Spin></Spin>;
          }}
          progress={{
            strokeWidth: 10,
            strokeColor: {
              "0%": "#D8C290",
              "100%": "#D8C290",
            },
            style: { top: 5 },
          }}
          // showUploadList={{ removeIcon: <CancelUploadIcon /> }}
          //   showUploadList={{showRemoveIcon:false}}
        >
          <div className="flex flex-col items-center justify-center select-none cursor-pointer">
            <img className="w-16" src={AddUploadIcon} alt="" />
            <div className="flex space-x-2">
              <h1 className="jura text-lg text-[#A3802D]">ADD FILE</h1>
              <img className="w-4" src={SearchUploadIcon} alt="" />
            </div>
          </div>
          <br />
        </Upload.Dragger>
      </Content>
    </Modal>
  );
}
