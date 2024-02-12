import { getNoteImageById } from "@api-caller/noteApi";
import { IEquipment, IImage, INote } from "@constants";
import { formatDate, formatImage } from "@utils";
import { Tag, Divider, Image } from "antd";
import { useEffect, useState } from "react";
import { httpAPI } from "@config";

interface CardImageProps {
  image: IImage;
  equipment: IEquipment[];
}

export default function CardImage({ image, equipment }: CardImageProps) {
  const [note, setNote] = useState<INote[]>();
  useEffect(() => {
    getNote();
  }, []);
  async function getNote() {
    const data = await getNoteImageById(image.img_id);
    setNote(data);
    console.log(data);
  }
  return (
    <div className="space-y-2 w-1/2 p-5">
      <p className="text-[#949CB6]">{formatDate(image.created_at)}</p>
      <img className="rounded" src={formatImage(image.img_path)} alt="" />
      <div className="border-b-2">
        <p className="text-[#4C577C] text-base mt-3 mb-2">Equipment</p>
      </div>
      <div className="flex flex-wrap text-[#4C577C] gap-1">
        {image?.img_equip.map((equip: string, index: number) => (
          <Tag key={index} color={"geekblue"} className="jura">
            {equipment?.find((list) => list.equip_id == equip)?.equip_name}
          </Tag>
        ))}
      </div>
      {note &&
        note.map((item, index) => (
          <div key={index} className="text-[#9198AF] space-y-2">
            <div className="flex flex-col space-y-0">
              <div className="flex justify-between items-center">
                <p className="text-[#4C577C] text-base">{item.note_title}</p>
                <p className="text-[#d7d7d7] mb-2">
                  {formatDate(item.created_at)}
                  {/* {index < 9 ? "0" + (index + 1) : index} */}
                </p>
              </div>
              <Divider></Divider>
            </div>
            <p className="bg-[#f6f6f6] rounded-sm p-2">{item.note_desc}</p>
            <div className="flex gap-3">
              {item.note_img.map((image, index) => (
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
