import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Empty,
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
  IRefer,
  IPatient,
  AddPatientState,
  IFormattedErrorResponse,
  ICreateRefer,
  SearchField,
  CaseQueryParams,
  DefaultCaseQueryParams,
} from "@constants";
import { useAuth } from "@components/AuthProvider";
import UserProfile from "@components/UserProfile";
import PatientCard from "@components/Patient/PatientCard";
import PatientActionBar from "@components/Patient/PatientActionBar";
import { getColumnsPatient } from "@components/Patient/ColumnTable";
import {
  getCaseByDoctorId,
  createReferral,
  searchCaseQueryParams,
} from "@api-caller";
import { UseMutationResult, useMutation } from "react-query";

const { Paragraph } = Typography;
export default function Patient() {
  const createReferralMutation: UseMutationResult<
    IRefer,
    IFormattedErrorResponse,
    ICreateRefer
  > = useMutation(createReferral);
  const searchQueryMutation: UseMutationResult<
    any[],
    IFormattedErrorResponse,
    CaseQueryParams
  > = useMutation(searchCaseQueryParams);
  const router = useNavigate();
  const { me } = useAuth();
  const [view, setView] = useState("Image");
  const [patients, setPatients] = useState<IPatient[]>([]);
  const [stateModal, setStateModal] = useState<string>("");
  const [hnNumber, setHnNumber] = useState<string>("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [referCode, setReferCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [caseQuery, setCaseQuery] = useState<CaseQueryParams>(
    DefaultCaseQueryParams
  );
  const columns: ColumnsType<any> = getColumnsPatient();
  useEffect(() => {
    setCaseQuery((prev) => ({ ...prev, doctor_id: me?.doctor_id as string }));
  }, []);

  useEffect(() => {
    if (caseQuery.doctor_id) {
      searchQueryMutation.mutate(caseQuery, {
        onSuccess(response) {
          setPatients(response);
          setIsLoading(false);
        },
      });
    } else {
      getPatient();
    }
  }, [caseQuery]);

  const filterPatient = (value: any, field: SearchField) => {
    setIsLoading(true);
    if (field == SearchField.DATE) {
      setCaseQuery((prev) => ({
        ...prev,
        start_at: value[0],
        end_at: value[1],
      }));
    } else {
      setCaseQuery((prev) => ({ ...prev, [field]: value }));
    }
  };

  async function getPatient() {
    if (me) {
      const patients = await getCaseByDoctorId({ doctor_id: me.doctor_id });
      setPatients(patients);
      setIsLoading(false);
    }
  }

  const onChangeView = (e: SegmentedValue) => {
    setView(e.toString());
  };
  const onCancel = () => {
    setStateModal("");
  };
  const onChangeState = () => {
    if (stateModal == AddPatientState.CONFIRM_HN) {
      setSubmitLoading(true);
      if (me) {
        const body: ICreateRefer = {
          hn_id: hnNumber,
          me: me,
        };
        createReferralMutation.mutate(body, {
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
      }
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
          <div className="w-full h-full flex flex-col">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <p className="jura text-xl text-[#424241]">Patient</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6 grow">
              <div className="w-full h-full flex flex-row">
                <div className="w-full h-full flex flex-col">
                  {/* Input Filter */}
                  <PatientActionBar
                    placeholder="Search by hospital number"
                    onFilter={filterPatient}
                    onChangeView={onChangeView}
                    addPatient={addPatient}
                    segmented
                  />
                  {/* Body */}
                  <List
                    id="content__patient"
                    loading={isLoading}
                    className="w-full pt-7 min-h-0 overflow-y-auto flex-wrap"
                  >
                    {view === "Image" ? (
                      patients &&
                      patients.length > 0 && (
                        <Space size={[18, 16]} wrap>
                          {patients.map((patient: IPatient, index: number) => {
                            const hasUnreadImages = patient.imagePreview.some(
                              (image: any) => !image.img_read
                            );
                            return (
                              <div
                                key={index}
                                className="w-full h-full flex flex-wrap"
                              >
                                {hasUnreadImages && (
                                  <Badge
                                    count={"new"}
                                    color="#F27961"
                                    offset={[-15, 10]}
                                  >
                                    <PatientCard patient={patient} />
                                  </Badge>
                                )}
                                {!hasUnreadImages && (
                                  <PatientCard patient={patient} />
                                )}
                              </div>
                            );
                          })}
                        </Space>
                      )
                    ) : (
                      <Table
                        id="table__primary"
                        dataSource={patients}
                        columns={columns}
                        loading={isLoading}
                        tableLayout="fixed"
                        rowKey={(record) => `row__patient__${record.case_id}`}
                        onRow={(record: IPatient, _) => ({
                          onClick: (event: any) => {
                            const index = event.target.cellIndex;
                            if (index !== 7) {
                              router(`/patient/${record.case_id}`);
                            }
                          },
                        })}
                        pagination={{
                          defaultPageSize: 7,
                          showSizeChanger: false,
                        }}
                      />
                    )}
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
