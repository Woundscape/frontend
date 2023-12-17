import {
  List,
  Tabs,
  Button,
  Typography,
  InputNumber,
  Modal,
  Popover,
} from "antd";
import UserProfile from "@features/UserProfile";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
  LockOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Content } from "antd/es/layout/layout";
import Wound from "@assets/wound/img_31.jpg";
import CanvasSelectIcon from "@assets/icons/canvas_icon_select.svg";
import CanvasPenIcon from "@assets/icons/canvas_icon_pen.svg";
import CanvasEraserIcon from "@assets/icons/canvas_icon_eraser.svg";
import CanvasSizeIcon from "@assets/icons/canvas_icon_size.svg";
import CanvasExportIcon from "@assets/icons/canvas_icon_export.svg";
import CanvasUndoIcon from "@assets/icons/undo_icon.svg";
import CanvasRedoIcon from "@assets/icons/redo_icon.svg";

import LoadPath from "@libs/images_2.json";

import { useContext, useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import EquipmentTab from "@components/WoundAnalysis/EquipmentTab";
import DefaultButton from "@components/DefaultButton";
import { useLoading } from "@components/Loading";
interface TissueType {
  title: string;
  value: number;
  color: string;
}
ChartJS.register(ArcElement, Legend);
export default function WoundAnalysis() {
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
  const { TabPane } = Tabs;
  const [opacityVal, setOpacityVal] = useState(100);
  const [colorPaint, setColorPaint] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [openSelectPaint, setOpenSelectPaint] = useState(false);
  const [openSelectSize, setOpenSelectSize] = useState(false);
  const [canvasRef] = useState(useRef<ReactSketchCanvasRef | null>(null));
  const [editable, setEditable] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [hideTissue, setHideTissue] = useState<string[]>([]);
  // const canvasDiv = useRef<HTMLDivElement | null>(null);
  // const [canvasHeight, setCanvasHeight] = useState(0);
  const [selectTools, setSelectTools] = useState("none");
  const [pointer, setPointer] = useState("none");
  const [original, setOriginal] = useState<any>();
  // const { isLoading, changeLoading } = useLoading();
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.loadPaths(LoadPath.data);
      setOriginal(LoadPath.data);
    }
    // if (canvasDiv) {
    //   setCanvasHeight(canvasDiv.current?.clientHeight || 0);
    // }
  }, []);
  async function handleSave() {
    if (canvasRef.current) {
      const test = await canvasRef.current.exportPaths();
      console.log(test);
    }
  }
  function handleOpacity(value: string) {
    setOpacityVal(parseInt(value));
  }
  function handleOpenSelectPaint(newOpen: boolean) {
    setOpenSelectPaint(newOpen);
  }
  function handleOpenSelectSize(newOpen: boolean) {
    setOpenSelectSize(newOpen);
  }
  function handleStrokeWidth(size: number) {
    setStrokeWidth(size);
    setOpenSelectSize(false);
  }
  async function handleCanvasExportImage() {
    const a = await canvasRef.current?.exportImage("png");
    console.log(a);
  }
  function renderSelectTissue() {
    return (
      <div id="popover__select__tissue">
        {tissueData.map((item, index) => (
          <Button
            type="text"
            key={index}
            onClick={() => handleCanvasEditor(item.color)}
            className={`w-full pb-.5 space-x-2 flex items-center ${
              colorPaint == item.color ? "bg-gray-200" : ""
            }`}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: item.color + "" }}
            ></div>
            <p className="jura text-[#424241]">{item.title}</p>
          </Button>
        ))}
      </div>
    );
  }
  function renderSelectSize() {
    return (
      <div id="popover__select__size">
        <Button
          type="text"
          onClick={() => handleStrokeWidth(1)}
          className="flex items-center space-x-2"
        >
          <p className="jura text-xs">1px</p>
          <div className="w-14 h-px bg-black"></div>
        </Button>
        <Button
          type="text"
          onClick={() => handleStrokeWidth(3)}
          className="flex items-center space-x-2"
        >
          <p className="jura text-xs">3px</p>
          <div className="w-14 h-0.5 bg-black"></div>
        </Button>
        <Button
          type="text"
          onClick={() => handleStrokeWidth(5)}
          className="flex items-center space-x-2"
        >
          <p className="jura text-xs">5px</p>
          <div className="w-14 h-1 bg-black"></div>
        </Button>
        <Button
          type="text"
          onClick={() => handleStrokeWidth(8)}
          className="flex items-center space-x-2"
        >
          <p className="jura text-xs">8px</p>
          <div className="w-14 h-2 bg-black"></div>
        </Button>
      </div>
    );
  }
  async function renderTissueData(strokeColor: string) {
    if (canvasRef.current) {
      const test = await canvasRef.current.exportPaths();
      console.log(test);
      const newData = await test.filter(
        (value) => value.strokeColor != strokeColor
      );
      console.log(newData);
      canvasRef.current.clearCanvas();
      canvasRef.current.loadPaths(newData);
    }
  }
  function handleColorPaint(value: string) {
    setPointer("mouse");
    setSelectTools("pen");
    setColorPaint(value);
    setOpenSelectPaint(false);
  }

  function handleNone() {
    setSelectTools("none");
    setPointer("none");
    canvasRef.current?.eraseMode(false);
  }

  function handleEraser() {
    setPointer("mouse");
    setSelectTools("eraser");
    canvasRef.current?.eraseMode(true);
  }

  function handleUndo() {
    canvasRef.current?.undo();
  }

  function handleRedo() {
    canvasRef.current?.redo();
  }

  const toolHandlers: any = {
    none: handleNone,
    eraser: handleEraser,
    undo: handleUndo,
    redo: handleRedo,
  };
  function handleCanvasEditor(value: string) {
    const toolHandler = toolHandlers[value];
    if (toolHandler) {
      toolHandler();
    } else {
      handleColorPaint(value);
      canvasRef.current?.eraseMode(false);
    }
  }
  const onCancel = () => {
    canvasRef.current?.clearCanvas();
    canvasRef.current?.loadPaths(original);
    setEditable(!editable);
  };
  const onChange = async () => {
    const paths = await canvasRef.current?.exportPaths();
    setOriginal(paths);
    setEditable(!editable);
  };
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
                <Content
                  id="canvas_editor___wrapper"
                  className="w-full h-full grow flex flex-col border-2 border-[#D9D9D9] rounded-md"
                >
                  <div className="w-full h-[4rem] p-4 flex justify-between border-b bg-transparent">
                    {editable && (
                      <div id="canvas_editor___tools" className="flex">
                        <Button
                          type="text"
                          id="canvas__undo___tools"
                          onClick={() => {
                            handleCanvasEditor("undo");
                          }}
                          className="flex items-center space-x-2"
                        >
                          <img src={CanvasUndoIcon} alt="" />
                          <p className="jura text-[#4C577C]">Undo</p>
                        </Button>
                        <Button
                          type="text"
                          id="canvas__redo___tools"
                          onClick={() => {
                            handleCanvasEditor("redo");
                          }}
                          className="flex items-center space-x-2"
                        >
                          <img src={CanvasRedoIcon} alt="" />
                          <p className="jura text-[#4C577C]">Redo</p>
                        </Button>
                      </div>
                    )}
                    <Typography className="border border-[#B4B4B4] flex justify-center items-center p-4 rounded-2xl jura text-[#908F8F]">
                      Feb 14, 2023 18:42
                    </Typography>
                    <div className="flex space-x-4">
                      {!editable ? (
                        <img
                          src={CanvasExportIcon}
                          onClick={() => {
                            handleCanvasExportImage();
                          }}
                          alt=""
                        />
                      ) : (
                        <DefaultButton
                          title="Cancel"
                          onChange={onCancel}
                          editable={editable}
                        />
                      )}
                      <DefaultButton
                        title="Edit"
                        sub_title="Save"
                        onChange={onChange}
                        editable={editable}
                        backgroundColor="bg-[#D2D4EB]"
                        bordered
                      />
                    </div>
                  </div>
                  <Content className="w-full h-full flex p-3 space-x-3">
                    {editable && (
                      <div
                        id="canvas_editor___tools"
                        className="w-12 h-full flex flex-col justify-center items-center space-y-4 relative"
                      >
                        <div className="w-10 border border-[#D9D9D9] bg-[#FDFCFC] space-y-2 p-0.5 rounded-md">
                          <Button
                            type="text"
                            className={`flex justify-center p-1 h-auto rounded-md ${
                              selectTools == "none" ? "bg-[#F0ECEC]" : ""
                            }`}
                            title="Cursor"
                            onClick={() => handleCanvasEditor("none")}
                          >
                            <img src={CanvasSelectIcon} />
                          </Button>
                          <Button
                            type="text"
                            title="Pen"
                            className={`flex justify-center p-1 h-auto rounded-md ${
                              selectTools == "pen" ? "bg-[#F0ECEC]" : ""
                            }`}
                          >
                            <Popover
                              content={renderSelectTissue}
                              placement="rightTop"
                              trigger={"click"}
                              open={openSelectPaint}
                              onOpenChange={handleOpenSelectPaint}
                            >
                              <img src={CanvasPenIcon} alt="" />
                            </Popover>
                          </Button>
                          <Button
                            type="text"
                            title="Eraser"
                            className={`flex justify-center p-1 h-auto rounded-md ${
                              selectTools == "eraser" ? "bg-[#F0ECEC]" : ""
                            }`}
                            onClick={() => handleCanvasEditor("eraser")}
                          >
                            <img src={CanvasEraserIcon} alt="" />
                          </Button>

                          <Button
                            type="text"
                            className={`flex justify-center p-0.5 h-auto rounded-md ${
                              selectTools == "size" ? "bg-[#F0ECEC]" : ""
                            }`}
                          >
                            <Popover
                              content={renderSelectSize}
                              placement="rightTop"
                              trigger={"click"}
                              open={openSelectSize}
                              onOpenChange={handleOpenSelectSize}
                            >
                              <img src={CanvasSizeIcon} alt="" />
                            </Popover>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div
                      id="canvas_editor___container"
                      className="w-full grow flex-1 min-h-0 relative"
                    >
                      <div
                        id="canvas_editor___sketch"
                        className={`w-full h-full  ${
                          selectTools == "pen" ? "canvas__cursor___paint" : ""
                        }`}
                        style={{
                          backgroundImage: `url(${Wound})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center center",
                        }}
                      >
                        <ReactSketchCanvas
                          ref={canvasRef}
                          allowOnlyPointerType={pointer}
                          exportWithBackgroundImage={true}
                          // backgroundImage={Wound}
                          backgroundImage="transparent"
                          style={{
                            // height: canvasHeight,
                            border: "0.0625rem solid #9c9c9c",
                            borderRadius: "0.25rem",
                          }}
                          strokeWidth={strokeWidth}
                          strokeColor={colorPaint}
                        />
                      </div>
                    </div>
                  </Content>
                </Content>
                <Button
                  id="add-note"
                  className="py-8 flex items-center border-2 border-[#D9D9D9]"
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
                            onClick={() => {
                              if (hideTissue.includes(item.title)) {
                                let tissue = hideTissue.filter(
                                  (e) => e !== item.title
                                );
                                setHideTissue(tissue);
                              } else {
                                setHideTissue([...hideTissue, item.title]);
                              }
                              renderTissueData(item.color);
                            }}
                            className="space-x-2 flex justify-center items-center cursor-pointer"
                          >
                            {hideTissue.includes(item.title) ? (
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
                        {/* <Slider
                          min={0}
                          max={100}
                          value={opacityVal}
                          railStyle={{ height: 10, borderRadius: "0.625rem" }}
                          handleStyle={{
                            height: "100%",
                          }}
                          trackStyle={{
                            padding: 10,
                            borderRadius: "0.625rem",
                            backgroundColor: "#D8C290",
                          }}
                          onChange={handleOpacity}
                        /> */}
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
