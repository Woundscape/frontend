import { useEffect, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Button, Collapse, Tabs, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import TabPane from "antd/es/tabs/TabPane";
import TextArea from "antd/es/input/TextArea";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import Patient from "@assets/patient_profile.svg";
import Send from "@assets/send.svg";
import UserProfile from "@components/UserProfile";
import {
  DefaultCreateProgress,
  DefaultDataSet,
  DefaultTissue,
  IChart,
  ICreateProgress,
  IDataSet,
  IFormattedErrorResponse,
  IImage,
  IPreProgress,
} from "@constants";
import {
  getProgressById,
  getProgressImage,
  addProgressNoteWithId,
  IMessage,
  sendMessage,
} from "@api-caller";
import { formatDate, formatImage } from "@utils";
import AddProgressNote from "@components/Progress/AddProgressNote";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  borderRadius: 50,
  plugins: {
    legend: {
      display: false,
    },
  },
};

export default function ProgressWithParams() {
  const addNoteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    ICreateProgress
  > = useMutation(addProgressNoteWithId);
  const sendMessageMutation: UseMutationResult<
    any,
    IFormattedErrorResponse,
    IMessage
  > = useMutation(sendMessage);
  const router = useNavigate();
  const { prog_id } = useParams();
  const location = useLocation();
  const { hn_id } = location.state || "";
  const [message, setMessage] = useState<string>("");
  const [images, setImages] = useState<IImage[]>();
  const [hideTissue, setHideTissue] = useState<string[]>([]);
  const [original, setOriginal] = useState<IChart>(DefaultDataSet);
  const [data, setData] = useState<IChart>(DefaultDataSet);
  const [progress, setProgress] = useState<IPreProgress>(DefaultCreateProgress);
  useEffect(() => {
    if (prog_id) {
      getProgressById(prog_id).then((data) => {
        setProgress((prev) => ({
          ...prev,
          hn_id,
          prog_id,
          img_collect: data.prog_img,
          case_id: data.case_id,
        }));
        getProgressImage(data.prog_img).then((response) => {
          setImages(response);
          calculateData(response);
        });
      });
    } else {
      router("/patient");
    }
  }, []);

  const hideHandle = async (title: string) => {
    if (hideTissue.includes(title)) {
      setHideTissue((prev) => prev.filter((tissue) => tissue !== title));
      let tempTissue = await hideTissue.filter((color) => color !== title);
      let newData = await original.datasets.filter(
        (dataset) => !tempTissue.includes(dataset.label)
      );
      setData((prev) => ({ ...prev, datasets: newData }));
    } else {
      setData((prev) => {
        return {
          ...prev,
          datasets: prev.datasets.filter((dataset) => dataset.label !== title),
        };
      });
      setHideTissue((prev) => [...prev, title]);
    }
  };

  const calculateData = async (image: IImage[]) => {
    try {
      const labels = image.map((item) => formatDate(item.created_at));
      const collect = image.map((item) => {
        return item.img_tissue.result.map((item) => {
          return {
            label: item.title,
            data: [item.value],
            borderColor: item.color,
          };
        });
      });

      const datasets: IDataSet[] = collect.reduce(
        (accumulator, currentArray) => {
          currentArray.forEach((currentItem) => {
            const existingItem = accumulator.find(
              (accItem) => accItem.label === currentItem.label
            );

            if (existingItem) {
              existingItem.data.push(currentItem.data[0]);
            } else {
              accumulator.push(currentItem);
            }
          });
          return accumulator;
        },
        []
      );
      const body: IChart = {
        labels,
        datasets,
      };
      setOriginal(body);
      setData(body);
      setProgress((prev) => ({
        ...prev,
        prog_id,
        prog_info: body,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const onHide = (title: string, color: string) => {
    if (hideTissue.includes(color)) {
      let tissue = hideTissue.filter((e) => e !== color);
      setHideTissue(tissue);
    } else {
      setHideTissue([...hideTissue, color]);
    }
    hideHandle(title);
  };

  const onMessage = () => {
    if (hn_id && message) {
      const body: IMessage = { hn_id, message };
      sendMessageMutation.mutate(body, {
        onSuccess: (response) => {
          setMessage("");
          console.log(
            "%c 🐬 ~ Log from file: Progress.tsx:174 ~ response:",
            "color: #00bcd4;",
            response
          );
        },
      });
    }
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full flex flex-col pt-8 bg-white">
          <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
            <div className="flex items-center space-x-4">
              <LeftOutlined
                onClick={() => router(`/patient/${progress.case_id}`)}
              />
              <p className="jura text-xl text-[#424241]">Progress</p>
            </div>
            <div className="w-[30rem]">
              <UserProfile />
            </div>
          </header>
          <Content className="w-full flex justify-between pb-6">
            <div className="grow flex overflow-y-auto">
              <div className="w-full space-y-3 p-6">
                <div className="w-full border rounded">
                  <div className="bg-[#EEEEEE] p-4 flex justify-between jura">
                    <p className="text-[#626060] text-lg">Wound Progression</p>
                  </div>
                  <Line data={data} options={options} className="p-6" />
                </div>
                <AddProgressNote
                  id={prog_id as string}
                  progress={progress}
                  mutation={addNoteMutation}
                />
                <Collapse
                  expandIconPosition={"right"}
                  items={[
                    {
                      key: "1",
                      label: (
                        <div className="flex space-x-3">
                          <img src={Patient} className="w-9" alt="" />
                          <div className="jura flex-col">
                            <p className="text-[#4C577C] text-base">
                              HN. {hn_id}
                            </p>
                            <p className="text-[#B4B4B4]">patient</p>
                          </div>
                        </div>
                      ),
                      children: (
                        <div className="relative space-y-3">
                          <TextArea
                            value={message}
                            autoSize={{ minRows: 3, maxRows: 3 }}
                            className="block w-full resize-none px-0 text-base text-gray-800 bg-white border-0"
                            placeholder="Type your message . . ."
                            required
                            onChange={(e) => setMessage(e.target.value)}
                          />
                          <div className="h-7">
                            <Button
                              onClick={onMessage}
                              className="absolute w-28 right-0 jura flex justify-center items-center space-x-2 border-[#9198AF] border-2 rounded text-[#4C577C]"
                            >
                              <p>Send</p>
                              <img src={Send} className="w-4" alt="" />
                            </Button>
                          </div>
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
            <div className="w-[23rem] tabs-container__navigation border-l-2 border-[#E8EAF4]">
              <Tabs type="card" id="tabs-container_antd" className="h-full p-6">
                <TabPane
                  tab={
                    <div className="text-[#424241] text-center select-none jura">
                      Tissue
                    </div>
                  }
                  key="1"
                >
                  <Content className="h-full overflow-y-auto">
                    <div className="space-y-3">
                      {DefaultTissue.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="border p-3 flex justify-between rounded-xl"
                          >
                            <div className="flex space-x-3">
                              <div
                                className={`w-5 h-5 rounded-full`}
                                style={{ backgroundColor: item.color + "" }}
                              ></div>
                              <Typography className="jura">
                                {item.title}
                              </Typography>
                            </div>
                            <div onClick={() => onHide(item.title, item.color)}>
                              {hideTissue.includes(item.color) ? (
                                <EyeInvisibleOutlined
                                  style={{ fontSize: 18 }}
                                />
                              ) : (
                                <EyeOutlined style={{ fontSize: 18 }} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Content>
                </TabPane>
                <TabPane
                  tab={
                    <div className="text-[#424241] text-center select-none jura">
                      Image
                    </div>
                  }
                  key="2"
                >
                  <Content className="h-full overflow-y-auto">
                    {images?.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className="w-full h-40 flex flex-col mb-10 space-y-2 justify-center items-center rounded-lg"
                        >
                          <img
                            src={formatImage(image.img_path)}
                            className="w-60 h-full object-cover border-4 hover:border-4 hover:border-[#CFC6B0] transition-all duration-150 rounded-lg cursor-pointer"
                          />
                          <p className="jura text-sm text-[#9198AF]">
                            {formatDate(image.created_at)}
                          </p>
                        </div>
                      );
                    })}
                  </Content>
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </div>
      </div>
    </>
  );
}
