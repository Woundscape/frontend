import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { useParams } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { List, Tabs, Button, Typography, InputNumber } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import {
  IEquipment,
  IFormattedErrorResponse,
  INote,
  TissueType,
  DefaultChart,
  DefaultTissue,
} from "@constants";
import UserProfile from "@components/UserProfile";
import AddNote from "@components/AddNote";
import { useAuth } from "@components/AuthProvider";
import DrawSketchCanvas from "@components/WoundAnalysis/DrawSketchCanvas";
import { addNoteImage } from "@api-caller/noteApi";
import EquipmentTab from "@components/WoundAnalysis/EquipmentTab";
import { getImageById } from "@api-caller/imageApi";
import getAllEquipment from "@api-caller/equipApi";

const { TabPane } = Tabs;
ChartJS.register(ArcElement, Tooltip, Legend);
export default function WoundAnalysis() {
  const addNoteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    INote
  > = useMutation(addNoteImage);
  const { me } = useAuth();
  const { img_id } = useParams();
  const [image, setImage] = useState<any>();
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [tissueData, setTissueData] = useState<TissueType[]>(DefaultTissue);
  const [opacityVal, setOpacityVal] = useState(100);
  const [canvasRef, setCanvasRef] = useState(
    useRef<ReactSketchCanvasRef | null>(null)
  );
  const [pieChart, setPieChart] = useState(DefaultChart);
  const [hideTissue, setHideTissue] = useState<string[]>([]);
  useEffect(() => {
    if (img_id) {
      getImage();
    }
  }, []);

  useEffect(() => {
    settingPieChart(tissueData);
  }, [tissueData]);

  useEffect(() => {
    getAllEquipment().then((response: any) => {
      setEquipment(response);
    });
  }, []);

  async function getImage() {
    const response = await getImageById(img_id as string);
    if (response.img_tissue?.result) {
      setTissueData(response.img_tissue.result);
    }
    setImage(response);
  }

  async function settingPieChart(data: TissueType[]) {
    const filterDataSet: any = {
      labels: data
        .filter((tissue) => tissue?.value !== undefined)
        .map((tissue) => tissue.title),
      datasets: [
        {
          label: "Data is",
          data: tissueData
            .filter((tissue) => tissue?.value !== undefined)
            .map((tissue) => tissue?.value),
          backgroundColor: tissueData
            .filter((tissue) => tissue?.value !== undefined)
            .map((tissue) => tissue.color),
        },
      ],
    };
    setPieChart(filterDataSet);
  }

  function handleOpacity(value: string) {
    setOpacityVal(parseInt(value));
  }

  function handleCanvasRef(ref: any) {
    setCanvasRef(ref);
  }

  function updateImage(name: string, value: any) {
    if (image) {
      setImage((prevImage: any) => ({ ...prevImage, [name]: value }));
    }
  }
  async function renderTissueData(strokeColor: string) {
    if (canvasRef.current) {
      const tempPath = await canvasRef.current.exportPaths();
      let newData: any;
      if (hideTissue.includes(strokeColor)) {
        let tempTissue = hideTissue.filter((color) => color !== strokeColor);
        newData = await image.img_tissue.paths.filter(
          (value: any) => !tempTissue.includes(value.strokeColor)
        );
        setHideTissue(tempTissue);
      } else {
        newData = await tempPath.filter(
          (value) => value.strokeColor != strokeColor
        );
      }
      canvasRef.current.clearCanvas();
      canvasRef.current.loadPaths(newData);
    }
  }
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="h-full relative flex gap-3">
          <div className="w-full bg-white grow overflow-y-auto px-10">
            <div className="flex flex-col items-center h-full py-12 space-y-4">
              <div className="w-full min-h-full overflow-y-auto flex flex-col justify-between space-y-4">
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
                {image && (
                  <DrawSketchCanvas data={image} setRef={handleCanvasRef} />
                )}
              </div>
              {equipment.length && (
                <div className="w-full pb-10">
                  <AddNote
                    id={img_id as string}
                    equipment={equipment}
                    mutation={addNoteMutation}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-[30rem] h-full bg-white relative py-4 px-4">
            <div className="h-full flex flex-col space-y-3">
              <UserProfile />
              <div className="tabs-container__navigation h-full overflow-y-auto">
                <Tabs type="card" id="tabs-container_antd" className="h-full">
                  {/* Summary Tissue Tab */}
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Tissue
                      </div>
                    }
                    key="1"
                  >
                    <Content className="h-full overflow-y-auto">
                      <div className="h-full space-y-3">
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
                              title="Hidden"
                              id="tools_tissue"
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
                                <EyeInvisibleOutlined
                                  style={{ fontSize: 18 }}
                                />
                              ) : (
                                <EyeOutlined style={{ fontSize: 18 }} />
                              )}
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
                          <div className="py-2.5 flex justify-center items-center rounded-lg jura text=[#424241] bg-[#EEE]">
                            Result
                          </div>
                        </List>
                        {pieChart && (
                          <Pie
                            data={pieChart}
                            options={{
                              plugins: {
                                legend: {
                                  display: false,
                                },
                              },
                            }}
                          />
                        )}
                      </div>
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
                    {image && equipment && (
                      <EquipmentTab
                        image={image}
                        equipment={equipment}
                        updateImage={updateImage}
                      />
                    )}
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
