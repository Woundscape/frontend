import { useParams } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { List, Tabs, Button, Typography, InputNumber } from "antd";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Content } from "antd/es/layout/layout";
import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import EquipmentTab from "@components/WoundAnalysis/EquipmentTab";
import {
  IEquipment,
  IFormattedErrorResponse,
  IImage,
  INote,
  TissueType,
} from "@constants/interface";
import AddNote from "@components/AddNote";
import addNoteImage from "@api-caller/noteApi";
import { getImageById } from "@api-caller/imageApi";
import UserProfile from "@features/UserProfile";
import { useAuth } from "@components/AuthProvider";
import DrawSketchCanvas from "@components/WoundAnalysis/DrawSketchCanvas";
import getAllEquipment from "@api-caller/equipApi";
import { DefaultChart, DefaultTissue } from "@constants/defaultForm";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function WoundAnalysis() {
  const addNoteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    INote
  > = useMutation(addNoteImage);
  const { me } = useAuth();
  const { img_id } = useParams();
  const { TabPane } = Tabs;
  const [image, setImage] = useState<IImage>();
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [tissueData, setTissueData] = useState<TissueType[]>(DefaultTissue);
  const [opacityVal, setOpacityVal] = useState(100);
  const [canvasRef] = useState(useRef<ReactSketchCanvasRef | null>(null));
  const [pieChart, setPieChart] = useState(DefaultChart);
  const [hideTissue, setHideTissue] = useState<string[]>([]);
  useEffect(() => {
    if (img_id) {
      getImage();
    }
  }, []);

  useEffect(() => {
    if (image && image.img_tissue) {
      const colorCounts = image.img_tissue
        .flatMap((item: any) =>
          item.paths.map((path: any) => ({ color: item.strokeColor, path }))
        )
        .reduce((counts: any, { color }: any) => {
          counts[color] = (counts[color] || 0) + 1;
          return counts;
        }, {});
      const summaryData = tissueData.map((item) => ({
        ...item,
        value: colorCounts[item.color] || 0,
      }));
      setTissueData(summaryData);
    }
  }, [image]);

  useEffect(() => {
    settingPieChart(tissueData);
  }, [tissueData]);
  useEffect(() => {
    getAllEquipment().then((response: any) => {
      setEquipment(response);
    });
  }, []);

  function convertToPercentage(data: TissueType[]): TissueType[] {
    const total = tissueData.reduce(
      (acc, entry) => acc + (entry.value ?? 0),
      0
    );
    if (total === 0) {
      return data.map((entry) => ({ ...entry, value: 0 }));
    }
    const percentageData: TissueType[] = data.map((entry) => ({
      ...entry,
      value: ((entry.value ?? 0) / total) * 100,
    }));
    return percentageData;
  }

  async function getImage() {
    const response = await getImageById(img_id as string);
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
                {image && <DrawSketchCanvas data={image} />}
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
                                <EyeInvisibleOutlined
                                  style={{ fontSize: 18 }}
                                />
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
                      <EquipmentTab image={image} equipment={equipment} />
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
