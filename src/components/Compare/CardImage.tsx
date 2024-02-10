import { IEquipment, IImage } from "@constants";
import { formatDate, formatImage } from "@utils";
import { Tag } from "antd";

interface CardImageProps {
  image: IImage;
  equipment: IEquipment[];
}

export default function CardImage({ image, equipment }: CardImageProps) {
  return (
    <div className="space-y-2 w-1/2 p-5">
      <p className="text-[#949CB6]">{formatDate(image.created_at)}</p>
      <img className="rounded" src={formatImage(image.img_path)} alt="" />
      <div className="border-b-2">
        <p className="text-[#4C577C] text-base mt-3 mb-2">Equipment</p>
      </div>
      <div className="flex flex-row text-[#4C577C] space-x-2">
        {image?.img_equip.map((equip: string, index: number) => (
          <Tag key={index} color={"geekblue"} className="jura">
            {equipment?.find((list) => list.equip_id == equip)?.equip_name}
          </Tag>
        ))}
          <div className="px-4 rounded-sm bg-[#D2D4EB]">
          <p>Intrasite Gel</p>
        </div>
        <div className="px-4 rounded-sm bg-[#D2D4EB]">
          <p>Mepitel</p>
        </div>
        <div className="px-4 rounded-sm bg-[#D2D4EB]">
          <p>Mepitel</p>
        </div>
        <div className="px-4 rounded-sm bg-[#D2D4EB]">
          <p>Mepitel</p>
        </div>
        <div className="px-4 rounded-sm bg-[#D2D4EB]">
          <p>Mepitel</p>
        </div>
        <div className="px-4 rounded-sm bg-[#D2D4EB]">
          <p>Mepitel</p>
        </div>
        <div className="px-4 rounded-sm bg-[#D2D4EB]">
          <p>Mepitel</p>
        </div>
      </div>
      <div className="border-b-2">
        <p className="text-[#4C577C] text-base mt-3 mb-2">Note</p>
      </div>
      <p className="indent-8 text-[#9198AF]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy.
      </p>
    </div>
  );
}
