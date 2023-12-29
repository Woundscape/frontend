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
import { useState } from "react";
import { Line } from "react-chartjs-2";
import TabPane from "antd/es/tabs/TabPane";

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
              <div className="p-6 w-2/3">
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
                      label: "This is default size panel header",
                      children: <p>ddd</p>,
                    },
                  ]}
                />
              </div>

              <div className="border-l-2 border-[#E8EAF4]"></div>

              <div className="w-1/3 tabs-container__navigation">
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
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Equipment
                      </div>
                    }
                    key="2"
                  >
                    <p>jjjjjjj</p>
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
