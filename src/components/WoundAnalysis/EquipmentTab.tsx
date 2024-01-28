import { Image, List, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import getAllEquipment from "@api-caller/equipApi";
import { IEquipment, IImage } from "@constants/interface";
import FormatImage from "@features/FormatImage";
import { formatTimeDifference } from "@features/FormatDate";

interface EquipmentTabProps {
  image: IImage;
  allEquipment: IEquipment[];
}

export default function EquipmentTab({
  image,
  allEquipment,
}: EquipmentTabProps) {
  const [equipment, setEquipment] = useState([]);
  useEffect(() => {
    getAllEquipment().then((response: any) => {
      setEquipment(response);
    });
  }, []);

  const [btnEquip, setBtnEquip] = useState(false);
  function handleEquip() {
    setBtnEquip(!btnEquip);
  }
  return (
    <div className="w-full h-full overflow-y-auto">
      <Content className="space-y-3 grow">
        {equipment?.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full px-4 py-1.5 flex items-center rounded-xl space-x-2"
            style={{
              borderRadius: "0.8125rem",
              border: "1.5px solid #E3E1E1",
            }}
          >
            <Typography className="text-3xl text-[#E7E5E5] jura">
              {index + 1}
            </Typography>
            <div className="w-9/12 flex justify-between rounded-md py-1.5 px-3 ">
              <p className="jura text-md text-[#61708C]">{item.equip_name}</p>
            </div>
          </div>
        ))}

        {btnEquip ? (
          <div className="flex justify-end">
            <button
              onClick={handleEquip}
              className="text-center text-[#4C577C] jura px-4 rounded-xl border border-[#D9D9D9]"
            >
              Management
            </button>
          </div>
        ) : (
          <>
            <div
              className="w-full px-4 py-1.5 flex items-center rounded-xl space-x-2"
              style={{
                borderRadius: "0.8125rem",
                border: "1.5px solid #E3E1E1",
              }}
            >
              <Typography className="text-3xl text-[#E7E5E5] jura">
                {" "}
                {1 + 1}
              </Typography>
              <div className="w-9/12 flex justify-between rounded-md py-1.5 px-3 ">
                <p className="jura text-md text-[#61708C]">item.equip_name</p>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleEquip}
                className="text-center text-[#4C577C] jura px-4 rounded-xl border border-[#D9D9D9]"
              >
                cancel
              </button>
              <button
                onClick={handleEquip}
                className="text-center text-[#4C577C] jura px-5 rounded-xl border border-[#D9D9D9]"
              >
                done
              </button>
            </div>
          </>
        )}
      </Content>
      {image.img_equipPath && (
        <div className="w-full flex flex-col space-y-4">
          <h2 className="jura text-md text-[#4C577C] pb-3 border-b-2 border-[#E9EBF5]">
            From patient
          </h2>
          <div className="w-full h-48 text-center">
            <Image
              src={FormatImage(image?.img_equipPath)}
              width={"100%"}
              alt=""
            />
            <Typography className="jura text-[#9198AF]">
              {formatTimeDifference(image.created_at)}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}
