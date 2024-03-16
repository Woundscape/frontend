import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { Segmented, Button, List, Divider, ConfigProvider, Badge } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Typography from "antd/es/typography/Typography";
import {
  IImage,
  IPatient,
  NotifyType,
  SEGMENT_STATE,
  IFormattedErrorResponse,
  DefaultStageSegmented,
  ImageQueryParams,
  DefaultImageQueryParams,
  SearchField,
} from "@constants";
import {
  getCaseById,
  getHistoryByCaseId,
  getAllImageByCaseId,
  deleteImage,
  searchImageQueryParams,
} from "@api-caller";
import { dividerConfig } from "@config";
import { optionSegmented, displayNotification } from "@utils";
import UserProfile from "@components/UserProfile";
import DeleteModal from "@components/DeleteModal";
import { useAuth } from "@components/AuthProvider";
import HistoryCard from "@components/PatientDetail/HistoryCard";
import ImageActionBar from "@components/PatientDetail/ImageActionBar";
import AdditionalData from "@components/PatientDetail/AdditionalData";
import PatientDetailCard from "@components/PatientDetail/PatientDetailCard";

export default function PatientDetail() {
  const deleteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    string[]
  > = useMutation(deleteImage);
  const searchQueryMutation: UseMutationResult<
    IImage[],
    IFormattedErrorResponse,
    ImageQueryParams
  > = useMutation(searchImageQueryParams);
  const { me } = useAuth();
  const { case_id } = useParams();
  const router = useNavigate();
  const [images, setImages] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageQuery, setImageQuery] = useState<ImageQueryParams>(
    DefaultImageQueryParams
  );
  const [stageSegmented, setStageSegmented] = useState(DefaultStageSegmented);
  const [checkedList, setCheckList] = useState<string[]>([]);
  const [cases, setCases] = useState<IPatient>();
  const [history, setHistory] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  async function formatDateImages(images: IImage[]) {
    const sortImage: Record<string, IImage[]> = {};
    images.forEach((image: IImage) => {
      if (image.img_status) {
        const createdAtDate = dayjs(image.created_at).format("DD MMM YYYY");
        if (!sortImage[createdAtDate]) {
          sortImage[createdAtDate] = [];
        }
        sortImage[createdAtDate].push({ ...image });
      }
    });
    setIsLoading(false);
    setImages(sortImage);
  }

  useEffect(() => {
    getCase();
    getHistory();
  }, []);

  useEffect(() => {
    if (imageQuery.case_id) {
      searchQueryMutation.mutate(imageQuery, {
        onSuccess(response) {
          formatDateImages(response);
        },
      });
    } else {
      getImage();
    }
  }, [imageQuery]);

  async function getHistory() {
    if (case_id) {
      const data = await getHistoryByCaseId(case_id);
      setHistory(data);
    }
  }
  async function getImage() {
    if (case_id) {
      const images: IImage[] = await getAllImageByCaseId(case_id);
      await formatDateImages(images);
    }
  }
  async function getCase() {
    setImageQuery((prev) => ({ ...prev, case_id: case_id as string }));
    try {
      const _case: IPatient = await getCaseById(case_id as string);
      setCases(_case);
    } catch (error) {
      router(-1);
    }
  }

  const handleImage = (image_id: string) => {
    if (stageSegmented.stage == SEGMENT_STATE.OVERVIEW) {
      router(`/wound/${image_id}`);
    } else {
      checkedOnChange(image_id);
    }
  };
  const checkedOnChange = (image_id: string) => {
    if (checkedList.includes(image_id)) {
      setCheckList(checkedList.filter((item) => item !== image_id));
    } else {
      if (!(checkedList.length == 2 && stageSegmented.limit))
        setCheckList((previous) => [...previous, image_id]);
    }
  };

  const filterImage = (value: any, field: SearchField) => {
    setIsLoading(true);
    if (field == SearchField.DATE) {
      setImageQuery((prev) => ({
        ...prev,
        start_at: value[0],
        end_at: value[1],
      }));
    } else {
      setImageQuery((prev) => ({ ...prev, [field]: value }));
    }
  };
  function renderImage(date: string) {
    return images[date].map((image: IImage, index: number) => {
      const isRead = image.img_read;
      // const imgId = (index + 1).toString().padStart(6, "0");
      return (
        <div key={index}>
          {!isRead && stageSegmented.stage == SEGMENT_STATE.OVERVIEW ? (
            <Badge count={"new"} color="#F27961" offset={[-15, 25]}>
              <PatientDetailCard
                key={index}
                image={image}
                checkedList={checkedList}
                stageSegmented={stageSegmented}
                onImage={handleImage}
              />
            </Badge>
          ) : (
            <PatientDetailCard
              key={index}
              image={image}
              checkedList={checkedList}
              stageSegmented={stageSegmented}
              onImage={handleImage}
            />
          )}
        </div>
      );
    });
  }
  const onSubmit = async () => {
    if (
      stageSegmented.stage == SEGMENT_STATE.DELETE &&
      !isModalOpen &&
      checkedList.length > 0
    ) {
      setIsModalOpen(true);
    } else {
      const detectParams = await history[stageSegmented.stage]?.filter(
        (item: any) => {
          const imgCollect = item.images.map((img: any) => img.img_id);
          if (imgCollect.length !== checkedList.length) {
            return false;
          }
          return checkedList.every((checkedItem) =>
            imgCollect.includes(checkedItem)
          );
        }
      );
      switch (stageSegmented.stage) {
        case SEGMENT_STATE.OVERVIEW:
          setStageSegmented({ stage: SEGMENT_STATE.DELETE, limit: false });
          break;
        case SEGMENT_STATE.DELETE:
          if (checkedList.length > 0) {
            setSubmitLoading(true);
            deleteMutation.mutate(checkedList, {
              onSuccess: () => {
                getImage();
                setSubmitLoading(false);
                setIsModalOpen(false);
              },
            });
          }
          setStageSegmented({ stage: SEGMENT_STATE.OVERVIEW, limit: false });
          break;
        case SEGMENT_STATE.COMPARE:
          if (checkedList.length == 2) {
            if (detectParams.length > 0) {
              router(`/compare/${detectParams[0].compare_id}`);
            } else {
              router(`/compare`, {
                state: { imageList: checkedList, case_id },
              });
            }
          } else {
            displayNotification(NotifyType.WARNING);
          }
          break;
        case SEGMENT_STATE.PROGRESS:
          if (detectParams.length > 0) {
            router(`/progress/${detectParams[0].prog_id}`);
          } else {
            router("/progress", { state: { imageList: checkedList, case_id } });
          }
          break;
        default:
          console.log(checkedList);
          break;
      }
      setCheckList([]);
    }
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full pt-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header
              id="head__patient"
              className="px-6 border-b-2 pb-5 border-[#E9EBF5]"
            >
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <LeftOutlined onClick={() => router("/patient")} />
                  <p className="jura text-xl">HN. {cases?.hn_id}</p>
                </div>
                <div className="w-[30rem]">
                  <UserProfile />
                </div>
              </div>
              <Segmented
                className="jura mt-4 select-none"
                options={optionSegmented}
                onChange={(stage: any) => {
                  setStageSegmented({
                    stage: stage,
                    limit: stage == SEGMENT_STATE.COMPARE,
                  });
                  setCheckList([]);
                  let test = document.getElementById("timeline-container");
                  if (test) test.scrollTop = 0;
                }}
              />
            </header>
            <Content className="grow px-6">
              <div className="flex h-full space-x-6">
                {/* Input Filter */}
                <div className="w-full h-full flex flex-col space-y-2 pt-6">
                  <ImageActionBar
                    case_id={case_id as string}
                    placeholder="Search by hospital number"
                    onFilter={filterImage}
                    onRender={getImage}
                  />
                  {stageSegmented.stage == SEGMENT_STATE.OVERVIEW && cases && (
                    <AdditionalData data={cases} />
                  )}
                  <div
                    id="timeline-container"
                    className="h-full overflow-y-auto pt-4"
                  >
                    <div className="inner-container">
                      <List
                        loading={isLoading}
                        className="timeline pl-20 pt-2"
                        dataSource={Object.keys(images)}
                        renderItem={(item, index) => {
                          const splitIt = item.split(" ");
                          const date = splitIt[0] + " " + splitIt[1];
                          const year = splitIt[2];
                          return (
                            <div className="test-item" data-year={year}>
                              <li
                                key={index}
                                className="timeline-item flex flex-wrap gap-3"
                                data-date={date}
                              >
                                {renderImage(item)}
                              </li>
                            </div>
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
                {stageSegmented.stage != SEGMENT_STATE.OVERVIEW &&
                  stageSegmented.stage != SEGMENT_STATE.DELETE && (
                    <ConfigProvider theme={dividerConfig}>
                      <Content id="history" className="flex flex-row">
                        <Divider
                          type="vertical"
                          className="pr-2 min-h-full border-[#E9EBF5]"
                        />
                        <Content
                          id="head-history"
                          className="pt-6 overflow-y-auto"
                        >
                          <div className="h-14 w-72 bg-[#EEEEEE] rounded-xl">
                            <p className="jura text-[#555554] text-lg p-3">
                              History
                            </p>
                          </div>
                          <div>
                            {cases &&
                              history &&
                              history[stageSegmented.stage]?.map(
                                (item: any, index: number) => {
                                  return (
                                    <HistoryCard
                                      key={index}
                                      data={item}
                                      stage={stageSegmented.stage}
                                      hn_id={cases.hn_id}
                                    />
                                  );
                                }
                              )}
                          </div>
                        </Content>
                      </Content>
                    </ConfigProvider>
                  )}
              </div>
            </Content>
            <div
              className="py-4 flex flex-col items-end justify-center px-8"
              style={{ boxShadow: "0px -4px 9px 0px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="flex items-center space-x-6">
                <Typography id="text__primary">
                  Select {checkedList.length} Images
                </Typography>
                {stageSegmented.stage == SEGMENT_STATE.DELETE && (
                  <Button
                    onClick={() => {
                      setStageSegmented({
                        stage: SEGMENT_STATE.OVERVIEW,
                        limit: false,
                      });
                      setCheckList([]);
                    }}
                    className="w-36 py-0.5 jura rounded-md"
                  >
                    Cancel
                  </Button>
                )}
                <Button
                  onClick={onSubmit}
                  className={`w-40 py-0.5 z-10 jura text-[#424241] rounded-md border border-[#9198AF] 
                  ${
                    stageSegmented.stage == SEGMENT_STATE.DELETE &&
                    "bg-[#F7AD9E]"
                  }
                  ${
                    stageSegmented.stage == SEGMENT_STATE.COMPARE &&
                    "bg-[#90A4D8]"
                  } ${
                    stageSegmented.stage == SEGMENT_STATE.PROGRESS &&
                    "bg-[#D8C290]"
                  }`}
                >
                  {stageSegmented.stage === SEGMENT_STATE.OVERVIEW
                    ? "Select"
                    : stageSegmented.stage === SEGMENT_STATE.DELETE
                    ? SEGMENT_STATE.DELETE
                    : "Confirm"}
                </Button>
                <DeleteModal
                  title="Are you sure ?"
                  description="Are you sure that you want to delete these images"
                  isOpen={isModalOpen}
                  confirmLoading={submitLoading}
                  onCancel={() => setIsModalOpen(false)}
                  onSubmit={onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
