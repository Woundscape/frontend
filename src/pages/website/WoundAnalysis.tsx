import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvasRef } from "react-sketch-canvas";
import { useNavigate, useParams } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { List, Tabs, Button, Typography, InputNumber } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  AiOutlineLeft,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import {
  IEquipment,
  IFormattedErrorResponse,
  INote,
  TissueType,
  DefaultChart,
  DefaultTissue,
  IImage,
  ICanvasPath,
} from "@constants";
import UserProfile from "@components/UserProfile";
import AddNote from "@components/WoundAnalysis/AddNote";
import DrawSketchCanvas from "@components/WoundAnalysis/DrawSketchCanvas";
import EquipmentTab from "@components/WoundAnalysis/EquipmentTab";
import { getAllEquipment, getImageById, addImageNote } from "@api-caller";

const { TabPane } = Tabs;
const optionPieChart = {
  plugins: {
    legend: {
      display: false,
    },
  },
};
ChartJS.register(ArcElement, Tooltip, Legend);
export default function WoundAnalysis() {
  const addNoteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    INote
  > = useMutation(addImageNote);
  const { img_id } = useParams();
  const router = useNavigate();
  const [image, setImage] = useState<IImage>();
  const [equipment, setEquipment] = useState<IEquipment[]>([]);
  const [tissueData, setTissueData] = useState<TissueType[]>(DefaultTissue);
  const [opacityVal, setOpacityVal] = useState(100);
  const [editable, setEditable] = useState(false);
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

  function handleEditable(value: boolean) {
    setEditable(value);
  }

  const settingTissue = async (data: TissueType[]) => {
    setTissueData(data);
  };

  const handleHidden = async (color: string) => {
    if (hideTissue.includes(color)) {
      let tissue = hideTissue.filter((e) => e !== color);
      setHideTissue(tissue);
    } else {
      setHideTissue([...hideTissue, color]);
    }
    renderTissueData(color);
  };

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
        newData = await image?.img_tissue.paths.filter(
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

  async function renderDeleteTissue(
    formatPath: ICanvasPath[],
    strokeColor: string
  ): Promise<ICanvasPath[]> {
    if (canvasRef.current) {
      let tempTissue = await formatPath.filter(
        (value: ICanvasPath) => value.strokeColor == strokeColor
      );
      console.log(
        "%c 🐬 ~ Log from file: WoundAnalysis.tsx:163 ~ tempTissue:",
        "color: #00bcd4;",
        tempTissue
      );
      canvasRef.current.clearCanvas();
      canvasRef.current.loadPaths(tempTissue);
      return tempTissue;
    }
    return [];
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
                    icon={<AiOutlineLeft color="#61708C" />}
                    className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]"
                    onClick={() => router(`/patient/${image?.case_id}`)}
                  >
                    back
                  </Button>
                  <Button className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]">
                    HN. {image?.case.hn_id}
                  </Button>
                </div>
                {image && (
                  <DrawSketchCanvas
                    data={image}
                    editable={editable}
                    setEditable={handleEditable}
                    setRef={handleCanvasRef}
                    settingTissue={settingTissue}
                    renderDeleteTissue={renderDeleteTissue}
                  />
                )}
              </div>
              {equipment.length > 0 && (
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
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Tissue
                      </div>
                    }
                    key="Tissue"
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
                              onClick={
                                editable
                                  ? undefined
                                  : () => handleHidden(item.color)
                              }
                              className={`space-x-2 flex justify-center items-center ${
                                editable
                                  ? "cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                            >
                              {hideTissue.includes(item.color) ? (
                                <AiOutlineEyeInvisible size={20} />
                              ) : (
                                <AiOutlineEye size={20} />
                              )}
                            </div>
                          </div>
                        ))}
                        <List>
                          {/* <div className="flex justify-between">
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
                          </div> */}
                          <div className="py-2.5 flex justify-center items-center rounded-lg jura text=[#424241] bg-[#EEE]">
                            Result
                          </div>
                        </List>
                        {pieChart && (
                          <Pie data={pieChart} options={optionPieChart} />
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
                    key="Equipment"
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
