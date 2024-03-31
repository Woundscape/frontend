import { useEffect, useRef, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Button, Divider, Popover, Typography } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { GoZoomIn, GoZoomOut } from "react-icons/go";
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
  DefaultResolution,
  DefaultTissue,
  ICanvasPath,
  IFormattedErrorResponse,
  IImage,
  TissueType,
  CANVAS_POINTER,
  CANVAS_TOOLS,
  DefaultDeleteProps,
} from "@constants";
import { IUpdateImage, updateImage } from "@api-caller";
import { formatImage, formatDate } from "@utils";

interface IDeleteProps {
  color: string;
  strokeWidth: number;
  remainPaths: ICanvasPath[];
  deletePaths: ICanvasPath[];
}

interface DrawSketchCanvasProps {
  data: IImage;
  editable: boolean;
  setEditable: (value: boolean) => void;
  setRef: (ref: any) => void;
  settingTissue: (data: TissueType[]) => void;
  renderDeleteTissue: (
    formatPath: ICanvasPath[],
    strokeColor: string
  ) => Promise<ICanvasPath[]>;
}

export default function DrawSketchCanvas({
  data,
  editable,
  setEditable,
  setRef,
  settingTissue,
  renderDeleteTissue,
}: DrawSketchCanvasProps) {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateImage
  > = useMutation(updateImage);
  const [tissueData] = useState<TissueType[]>(DefaultTissue);
  const [image, setImage] = useState<IImage>();
  const [original, setOriginal] = useState<any>([]);
  const [canvasRef] = useState(useRef<ReactSketchCanvasRef | null>(null));
  const [selectTools, setSelectTools] = useState(CANVAS_TOOLS.NONE);
  const [pointer, setPointer] = useState(CANVAS_POINTER.NONE);
  const [resolution, setResolution] = useState(DefaultResolution);
  const [formatPath, setFormatPath] = useState<ICanvasPath[]>([]);
  const [invisibleEye, setInvisibleEye] = useState<boolean>(false);
  const [colorPaint, setColorPaint] = useState<string>();
  const [deleteProps, setDeleteProps] =
    useState<IDeleteProps>(DefaultDeleteProps);
  const [strokeWidth, setStrokeWidth] = useState<number>(4);
  const [openSelectPaint, setOpenSelectPaint] = useState(false);
  const [openSelectDelete, setOpenSelectDelete] = useState(false);
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
        // getImage();
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
      updateMutation.mutate(body);
    }
  }, [image?.img_read]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
      canvasRef.current.loadPaths(original);
    }
  }, [pointer]);

  async function handleCanvasExportImage() {
    const a = await canvasRef.current?.exportImage("png");
    console.log(a);
  }

  function handleOpenSelectPaint(newOpen: boolean) {
    setOpenSelectPaint(newOpen);
  }

  function handleOpenSelectDelete(newOpen: boolean) {
    setOpenSelectDelete(newOpen);
  }

  function handleColorPaint(value: string) {
    setPointer(CANVAS_POINTER.MOUSE);
    setSelectTools(CANVAS_TOOLS.PEN);
    setColorPaint(value);
    setOpenSelectPaint(false);
  }

  function handleNone() {
    setSelectTools(CANVAS_TOOLS.NONE);
    setPointer(CANVAS_POINTER.NONE);
    canvasRef.current?.eraseMode(false);
  }

  function handleEraser() {
    setPointer(CANVAS_POINTER.MOUSE);
    setSelectTools(CANVAS_TOOLS.ERASER);
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

  async function handleCanvasEditor(value: string) {
    if (deleteProps.deletePaths.length > 0 && canvasRef.current) {
      console.log('deleteProps');
      await eraserTissue();
      const delTemp: ICanvasPath[] = await canvasRef.current?.exportPaths();
      const renderWithoutDeleteColor = await formatPath.filter(
        (item) => item.strokeColor != deleteProps.color
      );
      canvasRef.current?.loadPaths(renderWithoutDeleteColor);
      setFormatPath([...renderWithoutDeleteColor, ...delTemp]);
    }
    setDeleteProps((prev) => ({
      ...DefaultDeleteProps,
      strokeWidth: prev.strokeWidth,
    }));
    if (openSelectDelete) {
      console.log("condition openselectdelete");

      await onDelete(value);
    } else {
      canvasRef.current?.loadPaths(formatPath);
      const toolHandler = toolHandlers[value];
      if (toolHandler) {
        toolHandler();
      } else {
        handleColorPaint(value);
        canvasRef.current?.eraseMode(false);
      }
    }
  }

  const onInvisible = async () => {
    setInvisibleEye(!invisibleEye);
    if (canvasRef.current && !invisibleEye) {
      canvasRef.current.clearCanvas();
    } else {
      canvasRef.current?.loadPaths(original);
    }
  };

  const onCancel = () => {
    handleCanvasEditor(CANVAS_TOOLS.NONE);
    canvasRef.current?.clearCanvas();
    canvasRef.current?.loadPaths(original);
    setEditable(!editable);
  };

  const onSubmit = async () => {
    if (editable) {
      if (invisibleEye) {
        setInvisibleEye(false);
      }
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
          settingTissue(result);
        },
      });
      handleCanvasEditor(CANVAS_TOOLS.NONE);
      setOriginal(paths);
    }
    setEditable(!editable);
  };

  const onDelete = async (color: string) => {
    try {
      if (selectTools == CANVAS_TOOLS.ERASER) {
        canvasRef.current?.clearCanvas();
        await canvasRef.current?.loadPaths(original);
      }
      console.log("ondelete wtf");
      handleEraser();
      const remainPaths = await renderDeleteTissue(formatPath, color);
      setOpenSelectDelete(false);
      setDeleteProps((prev) => ({ ...prev, color, remainPaths }));
    } catch (error) {
      console.log("error ondelete");
    }
  };

  async function eraserTissue() {
    try {
      const newRemain = await test();
      canvasRef.current?.clearCanvas();
      canvasRef.current?.loadPaths(newRemain);
    } catch (error) {
      console.log("error eraserTissue");
    }
  }

  async function test() {
    let newRemain: ICanvasPath[] = [];
    for (let i = 0; i < deleteProps.remainPaths.length; i++) {
      let newPath: any = [];
      for (let j = 0; j < deleteProps.remainPaths[i].paths.length; j++) {
        let status = false;
        let positionPaths = deleteProps.remainPaths[i].paths[j];
        for (let k = 0; k < deleteProps.deletePaths.length; k++) {
          let strokeDelete = deleteProps.deletePaths[k].strokeWidth;
          for (let l = 0; l < deleteProps.deletePaths[k].paths.length; l++) {
            let deletePosition = deleteProps.deletePaths[k].paths[l];
            let morethanX = positionPaths.x >= deletePosition.x - strokeDelete;
            let lessthanX = positionPaths.x <= deletePosition.x + strokeDelete;
            let morethanY = positionPaths.y >= deletePosition.y - strokeDelete;
            let lessthanY = positionPaths.y <= deletePosition.y + strokeDelete;
            if (morethanX && lessthanX && morethanY && lessthanY) {
              console.log("yed mae");
              status = true;
              break;
            }
          }
          if (status) {
            break;
          }
        }
        if (status) {
          if (newPath && newPath.length > 0) {
            let mock = {
              strokeWidth: deleteProps.remainPaths[i].strokeWidth,
              strokeColor: deleteProps.remainPaths[i].strokeColor,
              drawMode: deleteProps.remainPaths[i].drawMode,
              paths: newPath,
            };
            newRemain.push(mock);
            newPath = [];
          }
        } else {
          newPath.push(positionPaths);
        }
      }
      let mock1 = {
        strokeWidth: deleteProps.remainPaths[i].strokeWidth,
        strokeColor: deleteProps.remainPaths[i].strokeColor,
        drawMode: deleteProps.remainPaths[i].drawMode,
        paths: newPath,
      };
      newRemain.push(mock1);
    }
    return newRemain;
  }

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

  function renderSelectDelete() {
    return (
      <div id="popover__select__tissue">
        {tissueData.map((item, index) => (
          <Button
            type="text"
            key={index}
            onClick={() => handleCanvasEditor(item.color)}
            className={`w-full pb-.5 space-x-2 flex items-center ${
              deleteProps.color == item.color ? "bg-gray-200" : ""
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
            title={deleteProps.strokeWidth + "px"}
            type="range"
            min={0}
            max={30}
            value={deleteProps.strokeWidth}
            onChange={(e) => {
              setDeleteProps((prev) => ({
                ...prev,
                strokeWidth: parseInt(e.target.value),
              }));
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
          <Typography
            onClick={eraserTissue}
            className="border border-[#B4B4B4] flex items-center p-4 rounded-2xl jura text-[#908F8F]"
          >
            {formatDate(image?.created_at)}
          </Typography>
          <div className="flex space-x-4">
            {!editable ? (
              <></>
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
                selectTools == CANVAS_TOOLS.PEN
                  ? "canvas__cursor___paint"
                  : selectTools == CANVAS_TOOLS.ERASER
                  ? "canvas__cursor___delete"
                  : ""
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
                    eraserWidth={deleteProps.strokeWidth}
                    strokeWidth={strokeWidth}
                    strokeColor={colorPaint}
                    onStroke={(line) => {
                      const compressionFilter = line.paths.filter(
                        (_: any, index: number) => index % 2 === 0
                      );
                      const formatStroke: ICanvasPath = {
                        drawMode: line.drawMode,
                        paths: compressionFilter,
                        strokeColor: line.strokeColor,
                        strokeWidth: line.strokeWidth,
                      };
                      if (line.paths.length > 1) {
                        if (selectTools == CANVAS_TOOLS.ERASER) {
                          setDeleteProps((prev) => ({
                            ...prev,
                            deletePaths: [...prev.deletePaths, line],
                          }));
                        } else {
                          setFormatPath((prev) => [...prev, formatStroke]);
                        }
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div
            id="canvas_editor___tools"
            className="h-12 flex justify-center items-center relative"
          >
            {editable ? (
              <div className="h-full border border-[#D9D9D9] bg-[#FDFCFC] flex rounded-md">
                <div className="w-14 h-full p-[5px]">
                  <div
                    title="Cursor"
                    onClick={() => handleCanvasEditor(CANVAS_TOOLS.NONE)}
                    className={`w-full h-full flex justify-center rounded-md ${
                      selectTools == CANVAS_TOOLS.NONE ? "bg-[#F0ECEC]" : ""
                    }`}
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
                    // onClick={() => handleCanvasEditor("eraser")}
                  >
                    <Popover
                      content={renderSelectDelete}
                      placement="topLeft"
                      trigger={"click"}
                      open={openSelectDelete}
                      onOpenChange={handleOpenSelectDelete}
                    >
                      <img width={25} src={CanvasEraserIcon} alt="" />
                    </Popover>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex p-[5px] space-x-4">
                <GoZoomIn size={20} />
                <GoZoomOut size={20} />
                {invisibleEye ? (
                  <EyeInvisibleOutlined
                    className="text-xl"
                    onClick={onInvisible}
                  />
                ) : (
                  <EyeOutlined className="text-xl" onClick={onInvisible} />
                )}
              </div>
            )}
          </div>
        </Content>
      </Content>
    </>
  );
}
