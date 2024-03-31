import { AddPatientState } from "@constants";
import {
  Button,
  Form,
  FormInstance,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import { Content } from "antd/es/layout/layout";
import Paragraph from "antd/es/typography/Paragraph";

interface IAddPatientModalProps {
  form: FormInstance;
  loading: boolean;
  stateModal: string;
  hnNumber: string;
  referCode: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export default function AddPatientModal({
  form,
  loading,
  stateModal,
  hnNumber,
  referCode,
  onInputChange,
  onCancel,
  onSubmit,
}: IAddPatientModalProps) {
  return (
    <>
      <Modal
        centered
        destroyOnClose
        open={stateModal == AddPatientState.REDEEM_HN}
        onCancel={onCancel}
        title={"Add patient"}
        footer={[
          <div
            key={"footer"}
            className="px-4 py-2 flex justify-between gap-4 text-center"
          >
            <Button
              htmlType="reset"
              className="w-36 jura text-[#4C577C] border-[#D2D4EB]"
              style={{ borderWidth: "1.5px" }}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="w-36 jura text-[#4C577C] bg-[#D2D4EB] border-[#8088A7]"
              style={{ borderWidth: "1.5px" }}
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <Content className="px-2 h-[4.3rem]">
          <div className="w-full">
            <Form form={form} scrollToFirstError>
              <Form.Item
                name="hospital_number"
                rules={[
                  {
                    required: true,
                    min: 9,
                    message: "Enter Hospital number please.",
                  },
                ]}
              >
                <Space.Compact className="gap-2" direction="vertical" block>
                  <Typography id="text__primary" className="text-md">
                    Hospital number :
                  </Typography>
                  <Input
                    maxLength={9}
                    value={hnNumber}
                    name="hospital_number"
                    placeholder="Enter hospital number"
                    onChange={onInputChange}
                  />
                </Space.Compact>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Modal>
      <Modal
        title={"Add patient"}
        open={stateModal == AddPatientState.CONFIRM_HN}
        onCancel={onCancel}
        footer={[
          <div
            key={"footer"}
            className="px-4 py-2 flex justify-between gap-4 text-center"
          >
            <Button
              disabled={loading}
              htmlType="reset"
              className="w-36 jura text-[#4C577C] border-[#D2D4EB]"
              style={{ borderWidth: "1.5px" }}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              htmlType="submit"
              className="w-36 jura text-[#4C577C] bg-[#D2D4EB] border-[#8088A7]"
              style={{ borderWidth: "1.5px" }}
              onClick={onSubmit}
            >
              Save
            </Button>
          </div>,
        ]}
        centered
        destroyOnClose
      >
        <Content className="px-2 h-[3rem]">
          <div className="w-full flex flex-col items-center text-center text-base jura">
            <p className="text-[#61708C]">
              Are you sure that the hospital number
            </p>
            <div className="flex gap-1">
              <p className="text-[#61708C]">you entered is</p>
              <p className="text-[#4D934B]">{hnNumber}</p>
              <p className="text-[#61708C]">?</p>
            </div>
          </div>
        </Content>
      </Modal>
      <Modal
        title={"Referral code"}
        open={stateModal == AddPatientState.REFERAL_CODE}
        onCancel={onCancel}
        footer={[
          <div
            key={"footer"}
            className="px-4 py-2 flex justify-center gap-4 text-center"
          >
            <Button
              htmlType="submit"
              className="w-36 jura text-[#4C577C] bg-[#D2D4EB] border-[#8088A7]"
              style={{ borderWidth: "1.5px" }}
              onClick={onCancel}
            >
              Done
            </Button>
          </div>,
        ]}
        centered
        destroyOnClose
      >
        <Content className="px-2 h-[2rem]">
          <div className="w-full flex flex-col items-center text-base jura">
            <p className="text-[#61708C]">Your code for connect with line is</p>
            <Paragraph copyable className="text-[#1677ff] text-base">
              {referCode}
            </Paragraph>
          </div>
        </Content>
      </Modal>
    </>
  );
}
