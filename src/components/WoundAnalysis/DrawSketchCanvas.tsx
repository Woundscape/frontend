import { useEffect, useRef, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { Button, Popover, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
// import LoadPath from "@libs/images_2.json";
import {
  DefaultTissue,
  IFormattedErrorResponse,
  IImage,
  TissueType,
} from "@constants";
import DefaultButton from "@components/WoundAnalysis/DefaultButton";
import CanvasSelectIcon from "@assets/icons/canvas_icon_select.svg";
import CanvasPenIcon from "@assets/icons/canvas_icon_pen.svg";
import CanvasEraserIcon from "@assets/icons/canvas_icon_eraser.svg";
// import CanvasSizeIcon from "@assets/icons/canvas_icon_size.svg";
import CanvasUndoIcon from "@assets/icons/undo_icon.svg";
import CanvasRedoIcon from "@assets/icons/redo_icon.svg";
import CanvasExportIcon from "@assets/icons/canvas_icon_export.svg";
import FormatImage from "@features/FormatImage";
import { formatTimeDifference } from "@features/FormatDate";
import { IUpdateImage, updateImage } from "@api-caller/imageApi";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";

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
  useEffect(() => {
    if (data) {
      if (canvasRef.current && data.img_tissue) {
        // console.log("before", data.img_tissue[0]);
        // const testFilter = data.img_tissue[0].paths.filter(
        //   (_: any, index: number) => index % 5 === 0
        // );
        // const eiei = [
        //   {
        //     drawMode: true,
        //     paths: testFilter,
        //     strokeColor: "#D3DDFF",
        //     strokeWidth: 4,
        //   },
        // ];
        canvasRef.current.loadPaths(data.img_tissue);
        setOriginal(data.img_tissue);
        setRef(canvasRef);
      }
      setImage(data);
    }
  }, [resolution]);

  useEffect(() => {
    if (image) {
      const imageUrl = FormatImage(image.img_path);
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
  //NOTE -  have for wut ?
  async function getImage() {
    if (canvasRef.current && data.img_tissue) {
      canvasRef.current.loadPaths(data.img_tissue);
      setOriginal(data.img_tissue);
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
  // function handleOpenSelectSize(newOpen: boolean) {
  //   setOpenSelectSize(newOpen);
  // }
  // function handleStrokeWidth(size: number) {
  //   setStrokeWidth(size);
  //   setOpenSelectSize(false);
  // }
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
    handleCanvasEditor("none");
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
  // function renderSelectSize() {
  //   return (
  //     <div id="popover__select__size">
  //       <Button
  //         type="text"
  //         onClick={() => handleStrokeWidth(1)}
  //         className="flex items-center space-x-2"
  //       >
  //         <p className="jura text-xs">1px</p>
  //         <div className="w-14 h-px bg-black"></div>
  //       </Button>
  //       <Button
  //         type="text"
  //         onClick={() => handleStrokeWidth(3)}
  //         className="flex items-center space-x-2"
  //       >
  //         <p className="jura text-xs">3px</p>
  //         <div className="w-14 h-0.5 bg-black"></div>
  //       </Button>
  //       <Button
  //         type="text"
  //         onClick={() => handleStrokeWidth(5)}
  //         className="flex items-center space-x-2"
  //       >
  //         <p className="jura text-xs">5px</p>
  //         <div className="w-14 h-1 bg-black"></div>
  //       </Button>
  //       <Button
  //         type="text"
  //         onClick={() => handleStrokeWidth(8)}
  //         className="flex items-center space-x-2"
  //       >
  //         <p className="jura text-xs">8px</p>
  //         <div className="w-14 h-2 bg-black"></div>
  //       </Button>
  //     </div>
  //   );
  // }
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
            {formatTimeDifference(image?.created_at)}
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
                    backgroundImage={FormatImage(image.img_path)}
                    style={{
                      border: "0.0625rem solid #9c9c9c",
                      borderRadius: "0.25rem",
                    }}
                    strokeWidth={strokeWidth}
                    strokeColor={colorPaint}
                  />
                </div>
              )}
            </div>
          </div>
          {editable && (
            <div
              id="canvas_editor___tools"
              className="flex justify-center items-center relative"
            >
              <div className="border border-[#D9D9D9] bg-[#FDFCFC] py-1.5 flex rounded-md space-x-2">
                <Button
                  type="text"
                  className={`flex justify-center rounded-md ${
                    selectTools == "none" ? "bg-[#F0ECEC]" : ""
                  }`}
                  title="Cursor"
                  onClick={() => handleCanvasEditor("none")}
                >
                  <img width={25} src={CanvasSelectIcon} />
                </Button>
                |
                <Button
                  type="text"
                  title="Pen"
                  className={`flex justify-center rounded-md ${
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
                    <img width={25} src={CanvasPenIcon} alt="" />
                  </Popover>
                </Button>
                |
                <Button
                  type="text"
                  title="Eraser"
                  className={`flex justify-center rounded-md ${
                    selectTools == "eraser" ? "bg-[#F0ECEC]" : ""
                  }`}
                  onClick={() => handleCanvasEditor("eraser")}
                >
                  <img width={25} src={CanvasEraserIcon} alt="" />
                </Button>
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
            </div>
          )}
        </Content>
      </Content>
    </>
  );
}
