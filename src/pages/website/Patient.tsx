import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "@components/UserProfile";
import {
  Badge,
  Button,
  Form,
  Input,
  List,
  Modal,
  Space,
  Table,
  Typography,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { Content } from "antd/es/layout/layout";
import { SegmentedValue } from "antd/es/segmented";
import {
  AddPatientState,
  IFormattedErrorResponse,
  IPatient,
  IRefer,
} from "@constants";
import { useAuth } from "@components/AuthProvider";
import DefaultInput from "@components/Patient/DefaultInput";
import CardPatient from "@components/Patient/CardPatient";
import { getColumnsPatient } from "@components/Patient/ColumnTable";
import { getCaseByDoctorId } from "@api-caller/caseApi";
import { UseMutationResult, useMutation } from "react-query";
import { createReferral } from "@api-caller/refer";

const { Paragraph } = Typography;
export default function Patient() {
  const createReferrlMutation: UseMutationResult<
    IRefer,
    IFormattedErrorResponse,
    any
  > = useMutation(createReferral);
  const router = useNavigate();
  const { me } = useAuth();
  const [data, setData] = useState<IPatient[]>([]);
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [view, setView] = useState("Image");
  const [loading, setLoading] = useState(true);
  const [stateModal, setStateModal] = useState<string>("");
  const [hnNumber, setHnNumber] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [referCode, setReferCode] = useState("");
  const columns: ColumnsType<any> = getColumnsPatient();
  useEffect(() => {
    getCaseByDoctorId({ doctor_id: me?.doctor_id as string }).then(
      (response) => {
        setData(response);
        setPatients(response);
        setLoading(false);
      }
    );
  }, []);

  const filterPatient = (e: any) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredpatient = data.filter((item) =>
      item.hn_id.toLowerCase().includes(searchTerm)
    );
    setPatients(filteredpatient);
  };
  const onChangeView = (e: SegmentedValue) => {
    setView(e.toString());
  };
  const onCancel = () => {
    setStateModal("");
  };
  const onChangeState = () => {
    if (stateModal == AddPatientState.CONFIRM_HN) {
      setSubmitLoading(true);
      createReferrlMutation.mutate(me, {
        onSuccess: (response) => {
          setSubmitLoading(false);
          setStateModal((currentState) => {
            const currentStateNumber = parseInt(currentState.split("_")[1]);
            const nextState = `STATE_${currentStateNumber + 1}`;
            return nextState;
          });
          setReferCode(response.ref_code);
        },
      });
    } else {
      setStateModal((currentState) => {
        const currentStateNumber = parseInt(currentState.split("_")[1]);
        const nextState = `STATE_${currentStateNumber + 1}`;
        return nextState;
      });
    }
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setHnNumber(e.target.value);
    if (inputValue.length === 2 && hnNumber.length > inputValue.length) {
      setHnNumber(inputValue);
    } else if (inputValue.length === 2) {
      setHnNumber(inputValue.slice(0, 2) + "-");
    } else {
      setHnNumber(inputValue);
    }
  };
  const addPatient = () => {
    setStateModal(AddPatientState.REDEEM_HN);
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <Modal
          open={stateModal == AddPatientState.REDEEM_HN}
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
                onClick={onChangeState}
              >
                Save
              </Button>
            </div>,
          ]}
          centered
          destroyOnClose
        >
          <Content className="px-2 h-[4.3rem]">
            <div className="w-full">
              <Form scrollToFirstError className="">
                <Form.Item
                  name="hospital_number"
                  rules={[
                    {
                      required: true,
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
          onCancel={() => setStateModal("")}
          footer={[
            <div
              key={"footer"}
              className="px-4 py-2 flex justify-between gap-4 text-center"
            >
              <Button
                disabled={submitLoading}
                htmlType="reset"
                className="w-36 jura text-[#4C577C] border-[#D2D4EB]"
                style={{ borderWidth: "1.5px" }}
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                loading={submitLoading}
                htmlType="submit"
                className="w-36 jura text-[#4C577C] bg-[#D2D4EB] border-[#8088A7]"
                style={{ borderWidth: "1.5px" }}
                onClick={onChangeState}
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
          onCancel={() => setStateModal("")}
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
              <p className="text-[#61708C]">
                Your code for connect with line is
              </p>
              <Paragraph copyable className="text-[#1677ff] text-base">
                {referCode}
              </Paragraph>
            </div>
          </Content>
        </Modal>
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <p className="jura text-xl text-[#424241]">Patient</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6">
              <div className="flex flex-row">
                <div className="w-full flex flex-col">
                  {/* Input Filter */}
                  <DefaultInput
                    placeholder="Search by hospital number"
                    onFilter={filterPatient}
                    onChangeView={onChangeView}
                    addPatient={addPatient}
                    onRender={() => {}}
                    segmented
                  />
                  {/* Body */}
                  <List>
                    <Content
                      id="content__patient"
                      className="pt-7 flex flex-wrap gap-3"
                    >
                      {view == "Image" ? (
                        patients.map((patient: IPatient, index: number) => {
                          const hasUnreadImages = patient.imagePreview.some(
                            (image: any) => !image.img_read
                          );
                          return (
                            <div key={index}>
                              {hasUnreadImages && (
                                <Badge
                                  count={"new"}
                                  color="#F27961"
                                  offset={[-15, 10]}
                                >
                                  <CardPatient patient={patient} />
                                </Badge>
                              )}
                              {!hasUnreadImages && (
                                <CardPatient patient={patient} />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <Table
                          id="table__primary"
                          dataSource={patients}
                          columns={columns}
                          loading={loading}
                          tableLayout="fixed"
                          rowKey={(record) => `row__patient__${record.case_id}`}
                          onRow={(record: IPatient, _) => ({
                            onClick: (event: any) => {
                              const index = event.target.cellIndex;
                              if (index != 7) {
                                router(`/patient/${record.case_id}`);
                              }
                            },
                          })}
                          pagination={{
                            defaultPageSize: 10,
                            showSizeChanger: false,
                          }}
                        />
                      )}
                    </Content>
                  </List>
                </div>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
