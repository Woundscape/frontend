import { useEffect, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Typography,
  Upload,
} from "antd";
import { BsChatDots } from "react-icons/bs";
import { UploadChangeParam } from "antd/es/upload";
import TextArea from "antd/es/input/TextArea";
import AddImageIcon from "@assets/icons/add_image_icon.svg";
import CancelUploadIcon from "@assets/icons/cancel_upload_patient_icon.svg";
import {
  IFormattedErrorResponse,
  DefaultConsultForm,
  IDoctor,
  ICreateNotification,
  NotifyType,
} from "@constants";
import { displayNotification } from "@utils";
import { filterOptions, filterSort } from "@config";
import { getAllDoctor, sendNotification } from "@api-caller";
import { useAuth } from "@components/AuthProvider";

interface IConsultProps {
  case_id: string;
}
export default function Consult({ case_id }: IConsultProps) {
  const notificationMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    ICreateNotification
  > = useMutation(sendNotification);
  const { me } = useAuth();
  const [doctors, setDoctors] = useState<IDoctor[]>();
  const [form, setForm] = useState<ICreateNotification>({
    ...DefaultConsultForm,
    case_id,
    sender_id: me?.user_id,
  });
  const [forms] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    getAllDoctor(true).then((data: IDoctor[]) => {
      setDoctors(data);
    });
  }, []);
  const setModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const onSubmit = async () => {
    const values = await forms.validateFields();
    if (values) {
      setConfirmLoading(true);
      notificationMutation.mutate(form, {
        onSuccess: () => {
          forms.resetFields();
          setIsModalOpen(false);
        },
        onError: () => {
          displayNotification(NotifyType.ERROR);
        },
      });
      setConfirmLoading(false);
      setForm({ ...DefaultConsultForm, sender_id: me?.user_id });
    }
  };

  return (
    <>
      <Button
        id="btn-consult"
        onClick={setModal}
        className="button_consult"
        icon={<BsChatDots size={16} />}
      >
        Consult
      </Button>
      <Modal
        centered
        destroyOnClose
        open={isModalOpen}
        onOk={setModal}
        onCancel={setModal}
        width={800}
        title={"Messages to Expert"}
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
              onClick={setModal}
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
              Send
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
          <Space.Compact className="space-y-1" direction="vertical" block>
            <Typography id="text__primary" className="text-md">
              Title :
            </Typography>
            <Form.Item
              name="noti_title"
              rules={[
                { required: true, message: "Please confirm your title!" },
              ]}
            >
              <Input
                name="noti_title"
                placeholder="Input Title"
                className="w-1/2"
                onChange={(e) => {
                  setForm((previous) => ({
                    ...previous,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </Form.Item>
          </Space.Compact>
          <Space.Compact className="space-y-2" direction="vertical" block>
            <Typography id="text__primary" className="text-md">
              To :
            </Typography>
            <Form.Item
              name="recipient_id"
              rules={[{ required: true, message: "please select doctor" }]}
            >
              <Select
                showSearch
                placeholder="Select Doctor"
                className="w-1/2"
                maxTagCount="responsive"
                options={doctors
                  ?.filter((item: IDoctor) => me?.user_id !== item.user_id)
                  .map((item: IDoctor) => ({
                    value: item.user_id,
                    label: item.doctor_firstname + " " + item.doctor_lastname,
                  }))}
                filterOption={filterOptions}
                filterSort={filterSort}
                onChange={(value) => {
                  setForm((prevForm) => {
                    return { ...prevForm, recipient_id: value };
                  });
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
                name="noti_desc"
                maxLength={1024}
                placeholder="Type your message . . ."
                style={{ height: 100, color: "#9198AF" }}
                autoSize={{ minRows: 6, maxRows: 6 }}
                bordered={false}
                onChange={(e) => {
                  setForm((previous) => ({
                    ...previous,
                    [e.target.name]: e.target.value,
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
                maxCount={3}
                beforeUpload={(_) => {
                  return false;
                }}
                iconRender={() => {
                  return <Spin></Spin>;
                }}
                onChange={(info: UploadChangeParam) => {
                  setForm((previous) => ({
                    ...previous,
                    noti_img: info.fileList,
                  }));
                }}
                showUploadList={{
                  removeIcon: <img src={CancelUploadIcon} />,
                }}
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
