import { useEffect, useState } from "react";
import { UseMutationResult } from "react-query";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Collapse,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { UploadChangeParam } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";
import AddImageIcon from "@assets/icons/add_image_icon.svg";
import CancelUploadIcon from "@assets/icons/cancel_upload_patient_icon.svg";
import {
  IFormattedErrorResponse,
  INote,
  DefaultCompareForm,
  ICreateCompare,
  IPreCompare,
} from "@constants";
import { httpAPI } from "@config";
import { getCompareNoteById } from "@api-caller/noteApi";
import { formatDate } from "@utils/formatDate";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";

interface INoteProps {
  id: string;
  compare: IPreCompare;
  mutation: UseMutationResult<boolean, IFormattedErrorResponse, any>;
}
const { Paragraph } = Typography;

export default function AddCompareNote({ id, compare, mutation }: INoteProps) {
  const { me } = useAuth();
  const router = useNavigate();
  const [notes, setNotes] = useState<INote[]>();
  const [form, setForm] = useState<ICreateCompare>(DefaultCompareForm);
  const [forms] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getNote();
  }, [mutation.mutate]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      compare,
      author_id: me?.user_id || "",
    }));
  }, [compare]);

  async function getNote() {
    if (id) {
      const data = await getCompareNoteById(id);
      setNotes(data);
      console.log(
        "%c 🐬 ~ Log from file: AddCompareNote.tsx:67 ~ data:",
        "color: #00bcd4;",
        data
      );
    }
  }

  const handleModal = () => {
    forms.resetFields();
    setOpenModal(!openModal);
  };
  const onSubmit = async () => {
    const values = await forms.validateFields();
    if (values) {
      setConfirmLoading(true);
      mutation.mutate(form, {
        onSuccess: (response: any) => {
          if (!form.compare.compare_id) {
            router(`/compare/${response.compare.compare_id}`, {
              state: { hn_id: compare.hn_id },
            });
          }
          forms.resetFields();
          setOpenModal(false);
          setConfirmLoading(false);
          getNote();
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
      <Space direction="vertical" className="w-full">
        {notes?.map((item, index) => (
          <Collapse key={index}>
            <Collapse.Panel
              key={index}
              showArrow={false}
              header={
                <Content className="py-1 flex space-x-3">
                  <div className="w-full jura flex justify-between">
                    <p className="text-[#4C577C] text-base">
                      {item.note_title}
                    </p>
                    <p className="text-[#4C577C] text-md">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                </Content>
              }
            >
              <Content className="space-y-3">
                <Paragraph id="text__primary">{item.note_desc}</Paragraph>
                <div className="flex gap-3">
                  {item.note_img.map((image, index) => (
                    <Image
                      key={index}
                      width={120}
                      height={120}
                      src={`${httpAPI}/${image}`}
                      className="rounded-md"
                    />
                  ))}
                </div>
              </Content>
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
            className="px-2 py-3 flex justify-between gap-4 text-center"
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
          <Card
            title="Description"
            extra={"Hospital No. 642846"}
            id="text__primary"
            bodyStyle={{
              padding: "12px 10px",
            }}
          >
            <div className="flex justify-between pb-4">
              <TextArea
                maxLength={1024}
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
              id="upload__wrapper"
              className="flex justify-between items-end pl-2"
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
