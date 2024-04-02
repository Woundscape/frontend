import { useState } from "react";
import { useParams } from "react-router-dom";
import { UseMutationResult } from "react-query";
import { Button, Modal, Spin, Upload } from "antd";
import { Content } from "antd/es/layout/layout";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { httpAPI } from "@config";
import { displayNotification } from "@utils";
import { IFormattedErrorResponse, NotifyType } from "@constants";
import AddUploadIcon from "@assets/icons/add_upload_patient_icon.svg";
import CancelUploadIcon from "@assets/icons/cancel_upload_patient_icon.svg";
import SearchUploadIcon from "@assets/icons/add_search_upload_patient_icon.svg";

interface IModelProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLoading?: boolean;
  setModal: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  onRender: () => void;
  uploadMutate: UseMutationResult<string, IFormattedErrorResponse, FormData>;
}

export default function UploadModal({
  isOpen,
  title,
  description,
  confirmLoading,
  setModal,
  setLoading,
  onRender,
  uploadMutate,
}: IModelProps) {
  const { case_id } = useParams();
  const [files, setFiles] = useState<UploadFile<any>[]>([]);
  async function handleUpload() {
    try {
      if (files.length > 0) {
        setLoading(true);
        const formData = new FormData();
        files.forEach((file, _) => {
          let fileBlob = file.originFileObj ?? new Blob();
          formData.append("file", fileBlob);
        });
        formData.append("case_id", case_id as string);
        uploadMutate.mutate(formData, {
          onSuccess: () => {
            onRender();
            setModal(false);
            setLoading(false);
            setFiles([]);
            displayNotification(NotifyType.UPLOAD);
          },
        });
      } else {
        setModal(false);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  }
  return (
    <Modal
      title={title}
      open={isOpen}
      confirmLoading={confirmLoading}
      onCancel={() => setModal(false)}
      centered
      zIndex={100}
      destroyOnClose
      footer={[
        <div
          key={"footer"}
          className="px-6 py-3 flex justify-between gap-4 text-center"
        >
          <Button
            disabled={confirmLoading}
            onClick={() => {
              setModal(false);
            }}
            type="default"
            className="w-36 jura text-[#4C577C] border-[#D2D4EB]"
            style={{ borderWidth: "1.5px" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
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
      <Content
        id="upload__container_modal"
        className="flex flex-col text-center px-6 justify-center space-y-6"
      >
        <span className="jura text-[#61708C]">{description}</span>
        <Upload.Dragger
          multiple
          listType="picture"
          action={httpAPI}
          accept="image/png, image/jpeg"
          fileList={files}
          maxCount={7}
          beforeUpload={(_) => {
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
          onChange={(info: UploadChangeParam) => {
            setFiles(info.fileList);
          }}
          showUploadList={{ removeIcon: <img src={CancelUploadIcon} /> }}
        >
          <div className="flex flex-col items-center justify-center select-none cursor-pointer space-y-2">
            <img className="w-8" src={AddUploadIcon} alt="" />
            <div className="flex space-x-2">
              <h1 className="jura text-lg text-[#4C577C]">ADD FILE</h1>
              <img className="w-4" src={SearchUploadIcon} alt="" />
            </div>
          </div>
          <br />
        </Upload.Dragger>
      </Content>
    </Modal>
  );
}
