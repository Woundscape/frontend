import { List, Tabs, Button, Typography, InputNumber, Modal } from "antd";
import UserProfile from "@features/UserProfile";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Content } from "antd/es/layout/layout";

import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import EquipmentTab from "@components/WoundAnalysis/EquipmentTab";
import { useParams } from "react-router-dom";
import { IImage, TissueType } from "@constraint/constraint";
import DrawSketchCanvas from "@components/WoundAnalysis/DrawSketchCanvas";
import AddNote from "@components/AddNote";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function WoundAnalysis() {
  const { img_id } = useParams();
  const { TabPane } = Tabs;
  const [tissueData, setTissueData] = useState<TissueType[]>([
    {
      title: "eschar",
      value: 10,
      color: "#EEEEEE",
    },
    {
      title: "slough",
      value: 14,
      color: "#CFEDD9",
    },
    {
      title: "epithelization",
      value: 0,
      color: "#E0FCC5",
    },
    {
      title: "callus",
      value: 23,
      color: "#FFFDC5",
    },
    {
      title: "periwound",
      value: 7,
      color: "#FFE8BF",
    },
    {
      title: "wound",
      value: 28,
      color: "#FFE1E1",
    },
    {
      title: "granulation",
      value: 10,
      color: "#E6D1ED",
    },
    {
      title: "deep structure",
      value: 8,
      color: "#D3DDFF",
    },
    {
      title: "marceration",
      value: 0,
      color: "#D4F3F3",
    },
  ]);
  const data: any = {
    labels: tissueData
      .filter((tissue) => tissue.value > 0)
      .map((tissue) => tissue.title),
    datasets: [
      {
        label: "Data is",
        data: tissueData
          .filter((tissue) => tissue.value > 0)
          .map((tissue) => tissue.value),
        backgroundColor: tissueData
          .filter((tissue) => tissue.value > 0)
          .map((tissue) => tissue.color),
      },
    ],
  };
  const [image, setImage] = useState<IImage>();
  const [opacityVal, setOpacityVal] = useState(100);
  const [canvasRef] = useState(useRef<ReactSketchCanvasRef | null>(null));
  const [openModal, setOpenModal] = useState(false);
  const [hideTissue, setHideTissue] = useState<string[]>([]);
  function handleOpacity(value: string) {
    setOpacityVal(parseInt(value));
  }

  async function renderTissueData(strokeColor: string) {
    if (canvasRef.current) {
      const test = await canvasRef.current.exportPaths();
      let newData: any;
      if (hideTissue.includes(strokeColor)) {
      } else {
        newData = await test.filter(
          (value) => value.strokeColor != strokeColor
        );
      }
      canvasRef.current.clearCanvas();
      canvasRef.current.loadPaths(newData);
    }
  }
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="h-full relative flex gap-3">
          <div className="w-full bg-white grow px-10">
            <div className="flex flex-col items-center h-full py-12">
              <div className="w-full h-full flex flex-col justify-between space-y-4">
                <div id="button-wrapper" className="flex justify-between">
                  <Button
                    type="text"
                    icon={<LeftOutlined style={{ color: "#61708C" }} />}
                    className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]"
                  >
                    back
                  </Button>
                  <Button
                    type="text"
                    className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]"
                  >
                    HN. 6643793
                  </Button>
                </div>
                <DrawSketchCanvas />
                <AddNote openModal={openModal} onModal={handleModal} />
              </div>
            </div>
          </div>
          <div className="w-[30rem] h-full bg-white relative py-4 px-4 overflow-y-auto">
            <div className="h-full flex flex-col space-y-3">
              <UserProfile />
              <div className="tabs-container__navigation h-full">
                <Tabs type="card" className="h-full">
                  {/* Summary Tissue Tab */}
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Tissue
                      </div>
                    }
                    key="1"
                  >
                    <Content className="space-y-3 overflow-y-auto">
                      {tissueData?.map((item, index) => (
                        <div
                          key={index}
                          className={`w-full p-2.5 flex justify-center items-center space-x-3`}
                          style={{
                            borderRadius: "0.8125rem",
                            backgroundColor: item.color + "",
                          }}
                        >
                          <Typography className="text-xl text-[#535352] jura">
                            {index + 1}
                          </Typography>
                          <div className="w-9/12 flex justify-between rounded-md py-1.5 px-3 jura bg-white">
                            <p>{item.title}</p>
                            <p>{item.value + ""}%</p>
                          </div>
                          <div
                            id="tools_tissue"
                            title="Hidden"
                            onClick={() => {
                              if (hideTissue.includes(item.color)) {
                                let tissue = hideTissue.filter(
                                  (e) => e !== item.color
                                );
                                setHideTissue(tissue);
                              } else {
                                setHideTissue([...hideTissue, item.color]);
                              }
                              renderTissueData(item.color);
                            }}
                            className="space-x-2 flex justify-center items-center cursor-pointer"
                          >
                            {hideTissue.includes(item.color) ? (
                              <EyeInvisibleOutlined style={{ fontSize: 18 }} />
                            ) : (
                              <EyeOutlined style={{ fontSize: 18 }} />
                            )}
                            {/* <LockOutlined style={{ fontSize: 18 }} /> */}
                          </div>
                        </div>
                      ))}
                      <List>
                        <div className="flex justify-between">
                          <Typography className="jura">Opacity</Typography>
                          <InputNumber
                            min={0}
                            max={100}
                            value={opacityVal}
                            onChange={() => {
                              handleOpacity;
                            }}
                          />
                        </div>

                        <div className="canvas__slider___range">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={opacityVal}
                            onChange={(e) => {
                              handleOpacity(e.target.value);
                            }}
                          />
                        </div>
                      </List>
                      <Pie
                        data={data}
                        options={{
                          plugins: {
                            legend: {
                              display: false, // Set display to false to hide the labels
                            },
                          },
                        }}
                      />
                    </Content>
                  </TabPane>
                  {/* Equipment Tab */}
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Equipment
                      </div>
                    }
                    key="2"
                  >
                    <EquipmentTab />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
