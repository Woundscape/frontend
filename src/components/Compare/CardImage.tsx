import { getNoteImageById } from "@api-caller/noteApi";
import { IEquipment, IImage, INote } from "@constants";
import { formatDate, formatImage } from "@utils";
import { Tag, Divider, Image } from "antd";
import { useEffect, useRef, useState } from "react";
import { httpAPI } from "@config";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import { Space } from "react-zoomable-ui";

interface CardImageProps {
  image: IImage;
  equipment: IEquipment[];
}

export default function CardImage({ image, equipment }: CardImageProps) {
  const [note, setNote] = useState<INote[]>();
  const [canvasRef, setCanvasRef] = useState(
    useRef<ReactSketchCanvasRef | null>(null)
  );
  const [resolution, setResolution] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (image) {
      if (canvasRef.current && image.img_tissue) {
        canvasRef.current.loadPaths(image.img_tissue?.paths);
      }
    }
  }, [canvasRef.current]);

  useEffect(() => {
    if (image) {
      const imageUrl = formatImage(image.img_path);
      const img = new window.Image();
      const handleImageLoad = () => {
        setResolution({ width: img.width, height: img.height });
      };
      img.onload = handleImageLoad;
      img.src = imageUrl;
      return () => {
        img.onload = null;
      };
    }
  }, [image?.img_path]);

  useEffect(() => {
    getNote();
  }, []);
  async function getNote() {
    const data = await getNoteImageById(image.img_id);
    setNote(data);
  }
  return (
    <div className="relative space-y-2 w-full p-5">
      <p className="text-[#949CB6]">{formatDate(image.created_at)}</p>
      <div
        id="canvas_editor___container"
        className="relative grow overflow-scroll flex min-h-0 max-h-[30rem] min-w-0 max-w-1/2"
      >
        <div
          id="canvas_editor___sketch"
          className={`relative grow min-h-0 min-w-0 max-w-[25rem] border-2 border-red-200`}
        >
          {resolution.width > 0 && resolution.height > 0 && image && (
            <Space
              onCreate={(viewPort) => {
                viewPort.camera.centerFitAreaIntoView({
                  left: 0,
                  top: 0,
                  width: resolution.width,
                  height: resolution.height,
                });
                viewPort.setBounds({
                  x: [0, resolution.width],
                  y: [0, resolution.height],
                });
              }}
              style={{
                position: "relative",
                width: "100%",
                height: "500px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: resolution.width + "px",
                  height: resolution.height + "px",
                  backgroundImage: `url(${formatImage(image.img_path)})`,
                }}
              >
                <ReactSketchCanvas
                  id="canvas"
                  ref={canvasRef}
                  allowOnlyPointerType={"none"}
                  backgroundImage={"transparent"}
                  style={{
                    border: "0.0625rem solid #9c9c9c",
                    borderRadius: "0.25rem",
                  }}
                />
              </div>
            </Space>
          )}
        </div>
      </div>
      <div className="border-b-2">
        <p className="text-[#4c577c] text-base mt-3 mb-2">Equipment</p>
      </div>
      <div className="flex flex-wrap text-[#4C577C] gap-1">
        {image?.img_equip?.map((equip: string, index: number) => (
          <Tag key={index} color={"geekblue"} className="jura">
            {equipment?.find((list) => list.equip_id == equip)?.equip_name}
          </Tag>
        ))}
      </div>
      {note &&
        note?.map((item, index) => (
          <div key={index} className="text-[#9198AF] space-y-2">
            <div className="flex flex-col space-y-0">
              <div className="flex justify-between items-center">
                <p className="text-[#4C577C] text-base">{item.note_title}</p>
                <p className="text-[#d7d7d7] mb-2">
                  {formatDate(item.created_at)}
                </p>
              </div>
              <Divider></Divider>
            </div>
            <p className="bg-[#f6f6f6] rounded-sm p-2">{item.note_desc}</p>
            <div className="flex gap-3">
              {item.note_img?.map((image, index) => (
                <Image
                  key={index}
                  width={80}
                  height={80}
                  src={`${httpAPI}/${image}`}
                  className="rounded-md"
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
