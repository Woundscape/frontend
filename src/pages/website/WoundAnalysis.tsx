import {
  List,
  Tabs,
  Button,
  Typography,
  Slider,
  InputNumber,
  Modal,
} from "antd";
import UserProfile from "@features/UserProfile";
import {
  EyeOutlined,
  LeftOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Content } from "antd/es/layout/layout";
import Wound from "@assets/wound/img_31.jpg";
import CanvasIconExport from "@assets/icons/canvas_icon_export.svg";
import CanvasIconAdd from "@assets/icons/canvas_icon_add.svg";
import CanvasIconSelect from "@assets/icons/canvas_icon_select.svg";

import LoadPath from "@libs/images_2.json";

import { RefObject, useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import EquipmentTab from "@components/WoundAnalysis/EquipmentTab";
interface TissueType {
  title: String;
  value: number;
  color: String;
}
ChartJS.register(ArcElement, Tooltip, Legend);
export default function WoundAnalysis() {
  const tissueData: TissueType[] = [
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
  ];
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
  const { TabPane } = Tabs;
  const [opacityVal, setOpacityVal] = useState(0);
  const [colorPaint, setColorPaint] = useState("black");
  const [canvasRef, setCanvasRef] = useState(
    useRef<ReactSketchCanvasRef | null>(null)
  );
  const [editable, setEditable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.loadPaths(LoadPath.data);
      // console.log(canvasRef.current.exportPaths());
    }
  });
  const handleClick =
    (isEraser: boolean, canvasRef: RefObject<ReactSketchCanvasRef>) => () => {
      canvasRef.current?.eraseMode(isEraser);
    };
  async function handleSave() {
    if (canvasRef.current) {
      const test = await canvasRef.current.exportPaths();
      console.log(test);
    }
  }
  function handleOpacity(val: number | null) {
    setOpacityVal(val || 100);
  }
  function test(val: any) {
    console.log(val);
    setOpacityVal(val);
  }
  const showModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="h-full relative flex gap-3">
          <div className="w-full bg-white grow px-10">
            <div className="flex flex-col items-center h-full py-12">
              <div className="w-full h-full flex flex-col justify-between space-y-4">
                <div id="button" className="flex justify-between">
                  <Button
                    type="text"
                    icon={<LeftOutlined style={{ color: "#61708C" }} />}
                    className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]"
                  >
                    back
                  </Button>
                  <Button
                    onClick={handleSave}
                    type="text"
                    className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]"
                  >
                    HN. 6643793
                  </Button>
                </div>
                <Content className="w-full h-full grow flex flex-col border-2 border-[#D9D9D9] rounded-md">
                  <div className="w-full h-[4rem] p-4 flex justify-between border-b bg-transparent">
                    <Typography className="border border-[#B4B4B4] flex justify-center items-center p-4 rounded-2xl jura text-[#908F8F]">
                      Feb 14, 2023 18:42
                    </Typography>
                    <div className="flex space-x-4">
                      <img src={CanvasIconExport} alt="" />
                      <button
                        onClick={() => {
                          setEditable(!editable);
                        }}
                        className={`w-28 jura text-md flex justify-center items-center border-[#9198AF] text-[#4C577C] border rounded-md ${
                          editable ? "bg-[#D2D4EB]" : ""
                        }`}
                      >
                        {!editable ? "Edit" : "Save"}
                      </button>
                    </div>
                  </div>
                  <Content className="w-full h-full flex">
                    {editable && (
                      <div
                        id="canvas_editor___tools"
                        className="w-12 h-full flex flex-col justify-center items-center space-y-4"
                      >
                        <img
                          src={CanvasIconSelect}
                          onClick={handleClick(false, canvasRef)}
                          width={24}
                          alt=""
                        />
                        <img
                          src={CanvasIconAdd}
                          onClick={handleClick(true, canvasRef)}
                          width={30}
                          alt=""
                        />
                      </div>
                    )}

                    <div
                      id="canvas_editor___container"
                      className="w-full grow flex-1 min-h-0 p-4 relative"
                    >
                      <div
                        id="canva_editor___background"
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${Wound})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                      >
                        <ReactSketchCanvas
                          ref={canvasRef}
                          allowOnlyPointerType={editable ? "mouse" : "none"}
                          backgroundImage={"transparent"}
                          style={{
                            border: "0.0625rem solid #9c9c9c",
                            borderRadius: "0.25rem",
                          }}
                          strokeWidth={4}
                          strokeColor={colorPaint}
                        />
                      </div>
                      {/* <img
                      src={Wound}
                      className="absolute top-0 right-0 left-0 bottom-0 w-full h-full object-cover rounded-lg"
                    /> */}
                    </div>
                  </Content>
                </Content>
                <Button
                  id="add-note"
                  className="py-8 flex items-center border-2 border-[#D9D9D9]"
                  onClick={showModal}
                >
                  <div className="flex space-x-4 jura">
                    <PlusOutlined style={{ fontSize: 20, color: "#4C577C" }} />
                    <p className="text-lg text-[#4C577C]">ADD NOTE</p>
                  </div>
                </Button>
                <Modal
                  title="Add Note"
                  open={openModal}
                  onOk={closeModal}
                  onCancel={closeModal}
                  width={1000}
                  style={{
                    borderRadius: "1.25rem",
                  }}
                >
                  ds
                </Modal>
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
                    <Content className="space-y-3">
                      {tissueData?.map((item, index) => (
                        <div
                          key={index}
                          className={`w-full p-2.5 flex justify-center items-center space-x-2`}
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
                          <div className="tools-tissue space-x-2">
                            <EyeOutlined style={{ fontSize: 18 }} />
                            <LockOutlined style={{ fontSize: 18 }} />
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
                            onChange={handleOpacity}
                          />
                        </div>
                        <Slider
                          min={0}
                          max={100}
                          defaultValue={100}
                          handleStyle={{}}
                          railStyle={{ padding: 10, borderRadius: "0.625rem" }}
                          trackStyle={{
                            padding: 10,
                            borderRadius: "0.625rem",
                            backgroundColor: "#D8C290",
                          }}
                          onAfterChange={test}
                        />
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
