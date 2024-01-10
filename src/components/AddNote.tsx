import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd";
import { Content } from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";
import AddImageIcon from "@assets/icons/add_image_icon.svg";
import { useEffect, useState } from "react";
import getAllEquipment from "@api-caller/equipApi";
import { UploadChangeParam } from "antd/es/upload";
import CancelUploadIcon from "@assets/icons/cancel_upload_patient_icon.svg";
import {
  IEquipment,
  IFormattedErrorResponse,
  INote,
} from "@constraint/constraint";
import { UseMutationResult } from "react-query";
import { filterOptions, filterSort } from "@config";

interface INoteProps {
  id: string;
  mutation: UseMutationResult<boolean, IFormattedErrorResponse, INote>;
}

export default function AddNote({ id, mutation }: INoteProps) {
  const [equip, setEquip] = useState<IEquipment[]>([]);
  // const [files, setFiles] = useState<UploadFile<any>[]>([]);
  const [form, setForm] = useState<INote>({
    note_title: "",
    note_equip: [],
    note_desc: "",
    note_img: [],
    img_id: id,
  });
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    async function getEquipment() {
      const equipments = await getAllEquipment();
      setEquip(equipments);
    }
    getEquipment();
  }, []);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const onSubmit = () => {
    setConfirmLoading(true);
    console.log(form);

    // mutation.mutate(
    //   {
    //     note_title: "",
    //     note_equip: [],
    //     note_desc: "",
    //     note_img: [],
    //     img_id: "",
    //   },
    //   {
    //     onSuccess: () => {
    //       setIsModalOpen(false);
    //       setOpen(false);
    //       setSubmitLoading(false);
    //       openNotificationWithIcon();
    //     },
    //   }
    // );
  };
  // async function handleUpload() {
  //   try {
  //     setSubmitLoading(true);
  //     if (files.length > 0) {
  //       const formData = new FormData();
  //       files.forEach((file, _) => {
  //         let fileBlob = file.originFileObj ?? new Blob();
  //         formData.append("file", fileBlob);
  //       });
  //       formData.append("case_id", case_id as string);
  //       uploadMutate.mutate(formData, {
  //         onSuccess: () => {
  //           onRender();
  //           setModal(false);
  //           setLoading(false);
  //           setFiles([]);
  //         },
  //       });
  //     } else {
  //       setModal(false);
  //     }
  //   } catch (error) {
  //     console.error("Error during file upload:", error);
  //   }
  // }

  return (
    <>
      <Button
        id="add-note"
        className="py-8 flex items-center border-2 border-[#D9D9D9]"
        onClick={handleModal}
      >
        <div className="flex space-x-4 jura">
          <PlusOutlined style={{ fontSize: 20, color: "#4C577C" }} />
          <p className="text-lg text-[#4C577C]">ADD NOTE</p>
        </div>
      </Button>
      <Modal
        open={openModal}
        onOk={handleModal}
        onCancel={handleModal}
        width={800}
        title={"Add Note"}
        style={{
          borderRadius: "1.25rem",
        }}
        footer={[
          <div
            key={"footer"}
            className="px-6 py-3 flex justify-between gap-4 text-center"
          >
            <Button
              disabled={confirmLoading}
              onClick={handleModal}
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
        destroyOnClose
      >
        <Content className="w-full space-y-4">
          <Space.Compact className="space-y-2" direction="vertical" block>
            <Typography id="text__primary" className="text-md">
              Title :
            </Typography>
            <Input
              name="note_title"
              placeholder="Input note title"
              className="w-1/2"
              onChange={(e) => {
                setForm((previous) => ({
                  ...previous,
                  note_title: e.target.value,
                }));
              }}
            />
          </Space.Compact>
          <Space.Compact className="space-y-2" direction="vertical" block>
            <Typography id="text__primary" className="text-md">
              Equipment :
            </Typography>
            <Select
              mode="multiple"
              placeholder="Select a equipment"
              options={equip.map((item: IEquipment) => ({
                value: item.equip_id,
                label: item.equip_name,
              }))}
              className="w-1/2"
              maxTagCount="responsive"
              filterOption={filterOptions}
              filterSort={filterSort}
              onSelect={(_, option) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  note_equip: [...prevForm.note_equip, option.value],
                }));
              }}
            />
          </Space.Compact>
          <Card
            title="Description"
            extra={"Hospital No. 642846"}
            id="text__primary"
          >
            <div className="flex justify-between pb-4">
              <TextArea
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                placeholder="Type your message . . ."
                style={{ height: 100, color: "#9198AF" }}
                autoSize={{ minRows: 6, maxRows: 6 }}
                bordered={false}
                onChange={(e) => {
                  setForm((previous) => ({
                    ...previous,
                    note_desc: e.target.value,
                  }));
                }}
              />
            </div>
            <div
              id="addNote__upload__wrapper"
              className="flex justify-between items-end"
            >
              <Upload
                multiple
                listType="picture"
                accept="image/png, image/jpeg"
                beforeUpload={(_) => {
                  return false;
                }}
                iconRender={() => {
                  return <Spin></Spin>;
                }}
                onChange={(info: UploadChangeParam) => {
                  setForm((previous) => ({
                    ...previous,
                    note_img: info.fileList,
                  }));
                }}
                showUploadList={{ removeIcon: <img src={CancelUploadIcon} /> }}
              >
                <Button
                  icon={<img src={AddImageIcon} />}
                  className="px-4 h-10 jura flex justify-center items-center border-[#D9D9D9] text-[#4C577C]"
                >
                  Add Image
                </Button>
              </Upload>
            </div>
          </Card>
        </Content>
      </Modal>
    </>
  );
}
