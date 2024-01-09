import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button, Popover, Slider, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import LoadPath from "@libs/images_2.json";
import DefaultButton from "@components/DefaultButton";
import CanvasSelectIcon from "@assets/icons/canvas_icon_select.svg";
import CanvasPenIcon from "@assets/icons/canvas_icon_pen.svg";
import CanvasEraserIcon from "@assets/icons/canvas_icon_eraser.svg";
import CanvasSizeIcon from "@assets/icons/canvas_icon_size.svg";
import CanvasExportIcon from "@assets/icons/canvas_icon_export.svg";
import CanvasUndoIcon from "@assets/icons/undo_icon.svg";
import CanvasRedoIcon from "@assets/icons/redo_icon.svg";
import {
  IFormattedErrorResponse,
  IImage,
  TissueType,
} from "@constraint/constraint";
import { IUpdateImage, getImageById, updateImage } from "@api-caller/imageApi";
import { UseMutationResult, useMutation } from "react-query";
import { httpAPI } from "@config";

export default function DrawSketchCanvas() {
  const { img_id } = useParams();
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateImage
  > = useMutation(updateImage);
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
  const [image, setImage] = useState<IImage>();
  const [opacityVal, setOpacityVal] = useState(100);
  const [colorPaint, setColorPaint] = useState("black");
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [openSelectPaint, setOpenSelectPaint] = useState(false);
  const [openSelectSize, setOpenSelectSize] = useState(false);
  const [canvasRef] = useState(useRef<ReactSketchCanvasRef | null>(null));
  const [editable, setEditable] = useState(false);
  // const canvasDiv = useRef<HTMLDivElement | null>(null);
  // const [canvasHeight, setCanvasHeight] = useState(0);
  const [selectTools, setSelectTools] = useState("none");
  const [pointer, setPointer] = useState("none");
  const [original, setOriginal] = useState<any>([]);
  // const { isLoading, changeLoading } = useLoading();
  useEffect(() => {
    if (img_id) {
      getImage();
      // if (canvasDiv) {
      //   setCanvasHeight(canvasDiv.current?.clientHeight || 0);
      // }
    }
  }, []);
  async function getImage() {
    const response = await getImageById(img_id as string);
    if (canvasRef.current && response.img_tissue) {
      canvasRef.current.loadPaths(response.img_tissue);
      setOriginal(response.img_tissue);
    }
    setImage(response);
  }
  const handleCanvasExportImage = async () => {
    const a = await canvasRef.current?.exportImage("png");
    console.log(a);
  };
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
  const onSubmit = async () => {
    if (editable) {
      const paths = await canvasRef.current?.exportPaths();
      const body: IUpdateImage = {
        img_id: image?.img_id || "",
        img_tissue: paths,
      };
      console.log(body);
      updateMutation.mutate(body, {
        onSuccess: () => {
          console.log("eiei");
        },
      });
      console.log(paths);
      setOriginal(paths);
    }
    setEditable(!editable);
  };
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
        <Slider
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
        />
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
            Feb 14, 2023 18:42
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
            className="relative grow flex min-h-0 min-w-0"
          >
            <div
              id="canvas_editor___sketch"
              className={`relative overflow-auto grow ${
                selectTools == "pen" ? "canvas__cursor___paint" : ""
              }`}
              // style={{
              //   backgroundImage: `url("http://localhost:3000/${image?.img_path.replace(
              //     /\\/g,
              //     "/"
              //   )}")`,
              //   backgroundSize: "cover",
              //   backgroundPosition: "center center",
              // }}
            >
              <ReactSketchCanvas
                ref={canvasRef}
                allowOnlyPointerType={pointer}
                exportWithBackgroundImage={true}
                backgroundImage={`${httpAPI}/${image?.img_path.replace(
                  /\\/g,
                  "/"
                )}`}
                // width={"1000px"}
                // height={"1000px"}
                // preserveBackgroundImageAspectRatio="xMaxYMid meet"
                // backgroundImage="transparent"
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
    </>
  );
}
