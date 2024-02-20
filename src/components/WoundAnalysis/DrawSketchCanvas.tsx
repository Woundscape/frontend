import { useEffect, useRef, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button, Divider, Popover, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
// import LoadPath from "@libs/images_2.json";
import DefaultButton from "@components/WoundAnalysis/DefaultButton";
import CanvasSelectIcon from "@assets/icons/canvas_icon_select.svg";
import CanvasPenIcon from "@assets/icons/canvas_icon_pen.svg";
import CanvasEraserIcon from "@assets/icons/canvas_icon_eraser.svg";
// import CanvasSizeIcon from "@assets/icons/canvas_icon_size.svg";
import CanvasUndoIcon from "@assets/icons/undo_icon.svg";
import CanvasRedoIcon from "@assets/icons/redo_icon.svg";
import CanvasExportIcon from "@assets/icons/canvas_icon_export.svg";
import {
  DefaultTissue,
  IFormattedErrorResponse,
  IImage,
  TissueType,
} from "@constants";
import { TbZoomIn, TbZoomOut } from "react-icons/tb";
import { formatImage, formatDate } from "@utils";
import { IUpdateImage, updateImage } from "@api-caller/imageApi";
import { GoZoomIn, GoZoomOut } from "react-icons/go";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

interface ICanvasPath {
  drawMode: boolean;
  paths: any;
  strokeColor: string;
  strokeWidth: number;
}

interface DrawSketchCanvasProps {
  data: IImage;
  setRef: (ref: any) => void;
}

export default function DrawSketchCanvas({
  data,
  setRef,
}: DrawSketchCanvasProps) {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateImage
  > = useMutation(updateImage);
  const [tissueData] = useState<TissueType[]>(DefaultTissue);
  const [image, setImage] = useState<IImage>();
  const [colorPaint, setColorPaint] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [openSelectPaint, setOpenSelectPaint] = useState(false);
  const [canvasRef, setCanvasRef] = useState(
    useRef<ReactSketchCanvasRef | null>(null)
  );
  const [editable, setEditable] = useState(false);
  const [selectTools, setSelectTools] = useState("none");
  const [pointer, setPointer] = useState("none");
  const [original, setOriginal] = useState<any>([]);
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0,
  });
  const [formatPath, setFormatPath] = useState<ICanvasPath[]>([]);
  const [invisiblePath, setInvisiblePath] = useState<boolean>(false);
  useEffect(() => {
    if (data) {
      if (canvasRef.current && data.img_tissue) {
        setRef(canvasRef);
        setFormatPath(data.img_tissue.paths);
        setOriginal(data.img_tissue.paths);
        canvasRef.current.loadPaths(data.img_tissue?.paths);
      }
      setImage(data);
    }
  }, [resolution]);

  useEffect(() => {
    if (image) {
      const imageUrl = formatImage(image.img_path);
      const img = new Image();
      const handleImageLoad = () => {
        setResolution({ width: img.width, height: img.height });
        getImage();
      };
      img.onload = handleImageLoad;
      img.src = imageUrl;
      return () => {
        img.onload = null;
      };
    }
  }, [image?.img_path]);

  useEffect(() => {
    if (typeof image?.img_read == "boolean" && !image.img_read) {
      const body: IUpdateImage = {
        img_id: image?.img_id || "",
        body: {
          img_read: true,
        },
      };
      updateMutation.mutate(body, {
        onSuccess: () => {
          console.log("read laew");
        },
      });
    }
  }, [image?.img_read]);
  //NOTE -  have for wut ?
  async function getImage() {
    if (canvasRef.current && data.img_tissue) {
      canvasRef.current.loadPaths(data.img_tissue);
      setOriginal(data.img_tissue.paths);
    }
    setImage(data);
  }

  const handleCanvasExportImage = async () => {
    const a = await canvasRef.current?.exportImage("png");
    console.log(a);
  };

  function handleOpenSelectPaint(newOpen: boolean) {
    setOpenSelectPaint(newOpen);
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

  async function invisibleTissue() {
    setInvisiblePath(!invisiblePath);
    if (canvasRef.current && !invisiblePath) {
      canvasRef.current.clearCanvas();
    } else {
      canvasRef.current?.loadPaths(original);
    }
  }

  const onCancel = () => {
    handleCanvasEditor("none");
    canvasRef.current?.clearCanvas();
    canvasRef.current?.loadPaths(original);
    setEditable(!editable);
  };

  const onSubmit = async () => {
    if (editable) {
      const paths = await canvasRef.current?.exportPaths();
      const result = await convertToPercentage(formatPath);
      const body: IUpdateImage = {
        img_id: image?.img_id || "",
        body: {
          img_tissue: {
            paths: formatPath,
            result,
          },
        },
      };
      updateMutation.mutate(body, {
        onSuccess: () => {
          console.log("eiei");
        },
      });
      handleCanvasEditor("none");
      setOriginal(paths);
    }
    setEditable(!editable);
  };

  async function convertToPercentage(data: any) {
    const colorCounts = await data
      .flatMap((item: any) =>
        item.paths.map((path: any) => ({ color: item.strokeColor, path }))
      )
      .reduce((counts: any, { color }: any) => {
        counts[color] = (counts[color] || 0) + 1;
        return counts;
      }, {});

    const summaryData = await tissueData.map((item) => ({
      ...item,
      value: colorCounts[item.color] || 0,
    }));
    const total = await summaryData.reduce(
      (acc, entry) => acc + (entry.value ?? 0),
      0
    );
    if (total === 0) {
      return summaryData.map((entry) => ({ ...entry, value: 0 }));
    }
    const percentageData: TissueType[] = await summaryData.map((entry) => ({
      ...entry,
      value: Math.round(((entry.value ?? 0) / total) * 100),
    }));
    return percentageData;
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
        <div className="canvas__slider___range">
          <input
            title={strokeWidth + "px"}
            type="range"
            min={0}
            max={10}
            value={strokeWidth}
            onChange={(e) => {
              setStrokeWidth(parseInt(e.target.value));
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <>
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
            {formatDate(image?.created_at)}
          </Typography>
          <div className="flex space-x-4">
            {!editable ? (
              <img
                src={CanvasExportIcon}
                onClick={handleCanvasExportImage}
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
              onChange={onSubmit}
              editable={editable}
              backgroundColor="bg-[#D2D4EB]"
              bordered
            />
          </div>
        </div>
        <Content className="w-full h-full flex flex-col p-3 space-x-3">
          <div
            id="canvas_editor___container"
            className="relative grow overflow-scroll flex min-h-0 min-w-0"
          >
            <div
              id="canvas_editor___sketch"
              className={`relative grow min-h-0 min-w-0 max-w-[30rem] ${
                selectTools == "pen" ? "canvas__cursor___paint" : ""
              }`}
            >
              {resolution.width > 0 && resolution.height > 0 && image && (
                <div
                  style={{
                    width: resolution.width + "px",
                    height: resolution.height + "px",
                  }}
                >
                  <ReactSketchCanvas
                    id="canvas"
                    ref={canvasRef}
                    allowOnlyPointerType={pointer}
                    exportWithBackgroundImage={true}
                    backgroundImage={formatImage(image.img_path)}
                    style={{
                      border: "0.0625rem solid #9c9c9c",
                      borderRadius: "0.25rem",
                    }}
                    strokeWidth={strokeWidth}
                    strokeColor={colorPaint}
                    onStroke={(line) => {
                      if (line.paths.length > 1) {
                        const testFilter = line.paths.filter(
                          (_: any, index: number) => index % 2 === 0
                        );
                        const formatStroke: ICanvasPath = {
                          drawMode: line.drawMode,
                          paths: testFilter,
                          strokeColor: line.strokeColor,
                          strokeWidth: line.strokeWidth,
                        };
                        setFormatPath((prev) => [...prev, formatStroke]);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          {editable && (
            <div
              id="canvas_editor___tools"
              className="flex justify-between items-center relative"
            >
              <div className="flex space-x-4">
                <GoZoomIn size={20} />
                <GoZoomOut size={20} />
                {invisiblePath ? (
                  <EyeInvisibleOutlined
                    className="text-xl"
                    onClick={invisibleTissue}
                  />
                ) : (
                  <EyeOutlined className="text-xl" onClick={invisibleTissue} />
                )}
              </div>
              <div className="h-12 border border-[#D9D9D9] bg-[#FDFCFC] flex rounded-md">
                <div className="w-14 h-12 p-[5px]">
                  <div
                    className={`w-full h-full flex justify-center rounded-md ${
                      selectTools == "none" ? "bg-[#F0ECEC]" : ""
                    }`}
                    title="Cursor"
                    onClick={() => handleCanvasEditor("none")}
                  >
                    <img width={22} src={CanvasSelectIcon} />
                  </div>
                </div>
                <Divider type="vertical" className="m-0 h-full" />
                <div className="w-14 h-12 p-1">
                  <div
                    title="Pen"
                    className={`w-full h-full flex justify-center hover:bg-[#F0ECEC] rounded-md ${
                      selectTools == "pen" ? "bg-[#F0ECEC]" : ""
                    }`}
                  >
                    <Popover
                      content={renderSelectTissue}
                      placement="topLeft"
                      trigger={"click"}
                      open={openSelectPaint}
                      onOpenChange={handleOpenSelectPaint}
                    >
                      <img width={24} src={CanvasPenIcon} alt="" />
                    </Popover>
                  </div>
                </div>
                <Divider type="vertical" className="m-0 h-full" />
                <div className="w-14 h-12 p-1">
                  <div
                    title="Eraser"
                    className={`w-full h-full flex justify-center rounded-md ${
                      selectTools == "eraser" ? "bg-[#F0ECEC]" : ""
                    }`}
                    onClick={() => handleCanvasEditor("eraser")}
                  >
                    <img width={25} src={CanvasEraserIcon} alt="" />
                  </div>
                </div>
                {/* <Button
                  type="text"
                  className={`flex justify-center rounded-md ${
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
                </Button> */}
              </div>
              <div></div>
            </div>
          )}
        </Content>
      </Content>
    </>
  );
}
