import moment from "moment";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Content } from "antd/es/layout/layout";
import Typography from "antd/es/typography/Typography";
import { Segmented, Checkbox, Button, List } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { IImage } from "@constraint/constraint";
import { optionSegmented } from "@utils/option";
import { deleteImage, getAllImageByCaseId } from "@api-caller/imageApi";
import UserProfile from "@features/UserProfile";
import DefaultInput from "@components/Patient/DefaultInput";
import ViewResult from "@assets/view_result.svg";
import ViewResultHist from "@assets/view_result_hist.svg";
import WoundHist from "@assets/wound/img_10.jpg";
import AdditionalData from "@components/Patient/AdditionalData";
import DeleteModal from "@components/DeleteModal";

export default function PatientDetail() {
  const { case_id } = useParams();
  const router = useNavigate();
  const [images, setImages] = useState<any>([]);
  const [stageSegmented, setStageSegmented] = useState("Overview");
  const [checkedList, setCheckList] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  async function formatDateImages(images: IImage[]) {
    const sortImage: Record<string, IImage[]> = {};
    images.forEach((image: IImage) => {
      if (image.img_status) {
        const createdAtDate = moment(image.created_at).format("DD MMM YYYY");
        if (!sortImage[createdAtDate]) {
          sortImage[createdAtDate] = [];
        }
        sortImage[createdAtDate].push({ ...image });
      }
    });
    return sortImage;
  }
  async function getImage() {
    if (case_id) {
      const images: IImage[] = await getAllImageByCaseId(case_id as string);
      const format = await formatDateImages(images);
      setImages(format);
    }
  }
  useEffect(() => {
    getImage();
  }, []);
  const handleImage = (image_id: string) => {
    if (stageSegmented == "Overview") {
      router(`/wound/${image_id}`);
    } else {
      checkedOnChange(image_id);
    }
  };
  const checkedOnChange = (image_id: string) => {
    if (checkedList.includes(image_id)) {
      setCheckList(checkedList.filter((item) => item !== image_id));
    } else {
      setCheckList((previous) => [...previous, image_id]);
    }
  };

  const filterPatient = (e: any) => {};
  function renderImage(date: string) {
    return images[date].map((image: IImage, index: number) => {
      if (!image.img_status) return null;
      const imgPath = image.img_path.replace(/\\/g, "/");
      return (
        <div
          key={index}
          onClick={() => handleImage(image.img_id)}
          className="flex mt-4 cursor-pointer"
        >
          <div
            className="w-64 h-44 patient_img p-3 flex justify-end items-start"
            style={{
              backgroundImage: `url("http://localhost:3000/${imgPath}")`,
            }}
          >
            {stageSegmented == "Overview" ? (
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex flex-row justify-between text-white jura border-b">
                  <p>HN.9877065</p>
                  <p>{new Date(image.created_at).toLocaleTimeString()}</p>
                </div>
                <div className="flex flex-row justify-between h-8 border rounded-full">
                  <p className="jura text-white p-1 pl-3">Edit</p>
                  <img className="pt-0.5 pb-0.5" src={ViewResult} alt="" />
                </div>
              </div>
            ) : (
              <Checkbox
                key={`checkbox__image__${index}`}
                value={image.img_id}
                checked={checkedList.includes(image.img_id)}
              />
            )}
          </div>
        </div>
      );
    });
  }
  const onSubmit = async () => {
    if (stageSegmented == 'Delete' && !isModalOpen && checkedList.length > 0){
      setIsModalOpen(true)
    }else{
      switch (stageSegmented) {
        case "Overview":
          setStageSegmented("Delete");
          break;
        case "Delete":
          if (checkedList.length > 0) {
            const deleteResponse = await deleteImage(checkedList);
            getImage();
            setIsModalOpen(false)
          }
          setStageSegmented("Overview");
          break;
        case "Comparative Imaging":
          router("/compare");
          break;
        case "Wound Progression":
          router("/progress");
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
                  <p className="jura text-xl">HN. {case_id}</p>
                </div>
                <div className="w-[30rem]">
                  <UserProfile />
                </div>
              </div>
              <Segmented
                className="jura mt-4 select-none"
                options={optionSegmented}
                onChange={(stage: any) => {
                  setStageSegmented(stage);
                  setCheckList([]);
                  let test = document.getElementById("timeline-container");
                  if (test) test.scrollTop = 0;
                }}
              />
            </header>
            <Content className="grow p-6 pb-0">
              <div className="flex h-full space-x-6">
                {/* Input Filter */}
                <div className="w-full h-full flex flex-col space-y-2">
                  <DefaultInput
                    placeholder="Search by hospital number"
                    onFilter={filterPatient}
                    onRender={getImage}
                    images
                  />
                  {stageSegmented == "Overview" && (
                    <AdditionalData case_id={case_id} />
                  )}
                  {/* Body */}
                  <div
                    id="timeline-container"
                    className="h-full overflow-y-auto pt-4"
                  >
                    <div className="inner-container">
                      <List
                        className="timeline pl-20 pt-2"
                        dataSource={Object.keys(images)}
                        renderItem={(item, index) => {
                          const splitIt = item.split(' ')
                          const date = splitIt[0]+' '+ splitIt[1]
                          const year = splitIt[2]
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
                {stageSegmented != "Overview" && stageSegmented != "Delete" && (
                  <Content id="history" className="flex flex-col">
                    <div className="head-history h-14 w-72 bg-[#EEEEEE] rounded-xl ">
                      <p className="jura text-[#555554] text-lg p-3">History</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-xl p-2 jura mt-4">
                      <div className="flex justify-between bg-[#F2F2F2] p-2 rounded-lg">
                        <p className="text-[#4C577C]">Jul 19, 2023 08:23</p>
                        <p className="text-[#626060]">HN.6643793</p>
                      </div>
                      <div className="flex pt-3">
                        <img
                          className="w-16 rounded-lg"
                          src={WoundHist}
                          alt=""
                        />
                        <p className="text-[#4C577C] p-3.5">
                          Jul 14, 2023 18:44
                        </p>
                      </div>
                      <div className="flex pt-3">
                        <img
                          className="w-16 rounded-lg"
                          src={WoundHist}
                          alt=""
                        />
                        <p className="text-[#4C577C] p-3.5">
                          Jul 14, 2023 18:44
                        </p>
                      </div>
                      <div className="flex flex-row space-x-1.5 mt-1">
                        <div className="w-24 bg-[#F4DEE7] rounded mt-2">
                          <p className="text-center text-[#4C577C]">Diabetes</p>
                        </div>
                        <div className="w-20 bg-[#F4DEE7] rounded mt-2">
                          <p className="text-center text-[#4C577C]">Pressure</p>
                        </div>
                        <div className="w-20 bg-[#F4DEE7] rounded mt-2">
                          <p className="text-center text-[#4C577C]">Asthma</p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between h-8 border-2 rounded-full mt-3">
                        <p className="jura text-[#9198AF] p-1 pl-3">
                          View result
                        </p>
                        <img className="pr-1" src={ViewResultHist} alt="" />
                      </div>
                    </div>
                  </Content>
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
                <Button
                  onClick={onSubmit}
                  className={`w-40 py-0.5 z-10 jura text-[#424241] rounded-md border border-[#9198AF] 
                  ${stageSegmented == "Delete" && "bg-[#F7AD9E]"}
                  ${
                    stageSegmented == "Comparative Imaging" && "bg-[#90A4D8]"
                  } ${stageSegmented == "Wound Progression" && "bg-[#D8C290]"}`}
                >
                  {stageSegmented === "Overview"
                    ? "Select"
                    : stageSegmented === "Delete"
                    ? "Delete"
                    : "Confirm"}
                </Button>
                <DeleteModal
                  title="Are you sure ?"
                  description="Are you sure that you want to delete these images"
                  isOpen={isModalOpen}
                  confirmLoading={submitLoading}
                  onCancel={()=> setIsModalOpen(false)}
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
