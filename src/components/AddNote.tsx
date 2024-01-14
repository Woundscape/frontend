import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Collapse,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd";
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
import { DefaultNoteForm } from "@constraint/defaultForm";
import { getNoteImageById } from "@api-caller/noteApi";
import { formatTimeDifference } from "@features/FormatDate";
import { Content } from "antd/es/layout/layout";

interface INoteProps {
  id: string;
  mutation: UseMutationResult<boolean, IFormattedErrorResponse, INote>;
}

export default function AddNote({ id, mutation }: INoteProps) {
  const [notes, setNotes] = useState<INote[]>([]);
  const [equip, setEquip] = useState<IEquipment[]>([]);
  const [form, setForm] = useState<INote>({ ...DefaultNoteForm, img_id: id });
  const [forms] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(() => {
    async function getEquipment() {
      const data = await getAllEquipment();
      setEquip(data);
    }
    async function getNote() {
      const data = await getNoteImageById(id);
      setNotes(data);
    }
    getNote();
    getEquipment();
  }, []);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const onSubmit = async () => {
    setConfirmLoading(true);
    const values = await forms.validateFields();
    if (values) {
      setForm({ ...DefaultNoteForm, img_id: id });
      mutation.mutate(form, {
        onSuccess: (response) => {
          setOpenModal(false);
          setConfirmLoading(false);
          console.log(response);
        },
      });
    }
  };

  return (
    <>
      <Button
        id="add-note"
        className="w-full py-8 flex items-center border border-[#D9D9D9]"
        onClick={handleModal}
      >
        <div className="flex space-x-4 jura">
          <PlusOutlined style={{ fontSize: 20, color: "#4C577C" }} />
          <p className="text-lg text-[#4C577C]">ADD NOTE</p>
        </div>
      </Button>
      <Space direction="vertical" className="pt-3" style={{ width: "100%" }}>
        {notes?.map((item, index) => (
          <Collapse key={index}>
            <Collapse.Panel
              key={index}
              showArrow={false}
              header={
                <Content className="py-1 flex space-x-3">
                  <div className="w-full jura flex justify-between">
                    <p className="text-[#4C577C] text-base uppercase">
                      {item.note_title}
                    </p>
                    <p className="text-[#4C577C] text-md">
                      {formatTimeDifference(item.created_at)}
                    </p>
                  </div>
                </Content>
              }
            >
              <p className="text-[#4C577C] text-md jura">{item.note_desc}</p>
            </Collapse.Panel>
          </Collapse>
        ))}
      </Space>
      <Modal
        centered
        destroyOnClose
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
              type="default"
              htmlType="submit"
              onClick={onSubmit}
              loading={confirmLoading}
              className="w-36 jura text-[#4C577C] bg-[#D2D4EB] border-[#8088A7]"
              style={{ borderWidth: "1.5px" }}
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <Form
          form={forms}
          onFinish={onSubmit}
          scrollToFirstError
          className="w-full space-y-4"
        >
          <Space.Compact className="space-y-2" direction="vertical" block>
            <Typography id="text__primary" className="text-md">
              Title :
            </Typography>
            <Form.Item
              name="title"
              rules={[
                { required: true, message: "Please confirm your title!" },
              ]}
            >
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
            </Form.Item>
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
              // onSelect={(_, { value }) => {}}
              onChange={(value) => {
                setForm((prevForm) => {
                  return { ...prevForm, note_equip: value };
                });
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
        </Form>
      </Modal>
    </>
  );
}
