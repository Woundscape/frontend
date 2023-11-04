import { List, Tabs, Button, Card, Typography } from "antd";
import UserProfile from "@features/UserProfile";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/es/layout/layout";
import Wound from "@assets/wound/img_31.jpg";
import CanvasIconExport from "@assets/icons/canvas_icon_export.svg";
import CanvasIconAdd from "@assets/icons/canvas_icon_add.svg";
import CanvasIconSelect from "@assets/icons/canvas_icon_select.svg";

import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

export default function WoundAnalysis() {
  const { TabPane } = Tabs;
  const [colorPaint, setColorPaint] = useState("black");
  const [canvasRef, setCanvasRef] = useState(
    useRef<ReactSketchCanvasRef | null>(null)
  );
  const [editable, setEditable] = useState(false);
  // useEffect(() => {
  //   if (canvasRef.current) {
  //     // console.log(canvasRef.current.exportPaths());
      
  //   }
  // });
  async function handleSave() {
    if (canvasRef.current) {
      const test = await canvasRef.current.exportPaths();
      console.log(test);
    }
  }
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="h-full relative flex gap-3">
          <div className="w-full bg-white grow px-10">
            <div className="flex flex-col items-center h-full py-10">
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
                        <img src={CanvasIconSelect} width={24} alt="" />
                        <img src={CanvasIconAdd} width={30} alt="" />
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
                <Card id="add-note" className="border-2 border-[#D9D9D9]">
                  <div className="flex space-x-4 jura">
                    <PlusOutlined style={{ color: "#4C577C" }} />
                    <p className="text-md text-[#4C577C]">ADD NOTE</p>
                  </div>
                </Card>
              </div>
              <p className="absolute bottom-5 michroma text-sm select-none text-[#626060]">
                © 2023 Copyright – Woundscape – All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="w-[30rem] bg-white relative py-4 px-4">
            <div className="flex flex-col">
              <UserProfile />
              <div className="tabs-container__navigation">
                <Tabs type="card">
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Tissue
                      </div>
                    }
                    key="1"
                  >
                    <List>ds</List>
                  </TabPane>
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Equipment
                      </div>
                    }
                    key="2"
                  >
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
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
