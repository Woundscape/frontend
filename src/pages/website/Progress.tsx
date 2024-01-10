import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
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
import UserProfile from "@features/UserProfile";
import { Button, Collapse, DatePicker, Modal, Tabs } from "antd";
import { Content } from "antd/es/layout/layout";
import Export from "@assets/export.svg";
import Eye from "@assets/eye_input.svg";
import Patient from "@assets/patient_profile.svg";
import Send from "@assets/send.svg";
import WoundImg from "@assets/wound/img_6.jpg";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import TabPane from "antd/es/tabs/TabPane";
import TextArea from "antd/es/input/TextArea";

const { RangePicker } = DatePicker;

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
export default function progress() {
  const [openEye, setOpenEye] = useState([
    {
      label: "Wound",
      data: [10, 20, 15, 40, 22],
      borderColor: "lightgreen",
    },
    {
      label: "Periwound",
      data: [10, 10, 20],
      borderColor: "pink",
    },
    {
      label: "Periwound",
      data: [20, 30, 10, 30],
      borderColor: "lightblue",
    },
  ]);
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [...openEye],
  });

  const listTissue = [
    {
      title: "eschar",
      color: "#EEEEEE",
    },
    {
      title: "slough",
      color: "#CFEDD9",
    },
    {
      title: "epithelization",
      color: "#E0FCC5",
    },
    {
      title: "callus",
      color: "#FFFDC5",
    },
    {
      title: "periwound",
      color: "#FFE8BF",
    },
    {
      title: "wound",
      color: "#FFE1E1",
    },
    {
      title: "granulation",
      color: "#E6D1ED",
    },
    {
      title: "deep structure",
      color: "#D3DDFF",
    },
    {
      title: "marceration",
      color: "#D4F3F3",
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <LeftOutlined />
                <p className="jura text-xl">HN. 6643793</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="flex justify-between jura">
              <div className="m-6 grow space-y-3">
                <div className="border rounded">
                  <div className="bg-[#EEEEEE] p-4 flex justify-between jura">
                    <p className="text-[#626060] text-lg">Wound Progression</p>
                    <div className="flex items-center px-4 space-x-2 bg-[#D8C290] border-[#424241] border rounded text-[#424241]">
                      <img src={Export} className="w-5" alt="" />
                      <p className="jura">Export</p>
                    </div>
                  </div>
                  <div className="p-3">
                    <Line data={data} options={options} />
                  </div>
                </div>
                <Button
                  id="add-note"
                  className="py-8 w-full flex items-center border-2 border-[#D9D9D9]"
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
                  width={1000}
                  style={{
                    borderRadius: "1.25rem",
                  }}
                >
                  <div className="w-full bg-red-200">ds</div>
                </Modal>
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
                              HN. 6643793
                            </p>
                            <p className="text-[#B4B4B4]">patient</p>
                          </div>
                        </div>
                      ),
                      children: (
                        <div className="relative space-y-3">
                          <TextArea
                            className="block w-full resize-none px-0 text-base text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Type your message . . ."
                            required
                          ></TextArea>
                          <div className="h-7">
                            <Button className="absolute w-28 right-0 jura flex justify-center items-center space-x-2 border-[#9198AF] border-2 rounded text-[#4C577C]">
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

              <div className="border-l-2 border-[#E8EAF4]"></div>

              <div className="w-[23rem] tabs-container__navigation">
                <Tabs type="card" className="h-full p-6">
                  {/* Summary Tissue Tab */}
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Tissue
                      </div>
                    }
                    key="1"
                  >
                    <div className="space-y-3">
                      {listTissue.map((item, index) => {
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
                              <p>{item.title}</p>
                            </div>
                            <img
                              src={Eye}
                              alt=""
                              onClick={() => {
                                setOpenEye([]);
                                console.log(1);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </TabPane>
                  <TabPane
                    className=""
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Image
                      </div>
                    }
                    key="2"
                  >
                    <div
                      className="flex flex-col mt-3 space-y-2 justify-center items-center w-full h-40 rounded-lg"
                      style={{
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                      }}
                    >
                      <img
                        src={WoundImg}
                        className="w-60 h-full object-cover border-4 hover:border-4 hover:border-[#CFC6B0] transition-all duration-150 rounded-lg cursor-pointer"
                        alt=""
                      />
                      <p className="jura text-sm text-[#9198AF]">
                        Feb 14, 2023 18:42
                      </p>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
