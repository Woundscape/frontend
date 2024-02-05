import { useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { Image, Select, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { formatDate, formatImage } from "@utils";
import { filterOptions, filterSort } from "@config";
import { GoX } from "react-icons/go";
import { IEquipment, IFormattedErrorResponse, IImage } from "@constants";
import { IUpdateEquipment, updateEquipment } from "@api-caller/imageApi";

interface EquipmentTabProps {
  image: IImage;
  equipment: IEquipment[];
  updateImage: (name: string, value: any) => void;
}

export default function EquipmentTab({
  image,
  equipment,
  updateImage,
}: EquipmentTabProps) {
  const updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateEquipment
  > = useMutation(updateEquipment);
  const [select, setSelect] = useState<string>();
  const [isEditable, setIsEditable] = useState(false);
  const handleEquip = async () => {
    if (isEditable) {
      const updatedEquipId = select
        ? [...(image.img_equip ?? []), select]
        : [...(image.img_equip ?? [])];
      const body: IUpdateEquipment = {
        img_id: image.img_id,
        equip_id: updatedEquipId,
      };
      updateMutation.mutate(body, {
        onSuccess: () => {
          updateImage("img_equip", body.equip_id);
          setSelect(undefined);
        },
      });
    }
    setIsEditable(!isEditable);
  };

  return (
    <div className="w-full h-full overflow-y-auto">
      <Content className="space-y-3 grow">
        {image.img_equip?.map((item: any, index: number) => (
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
            <div
              // aria-label={isEditable ? "cancel_icon_editable" : ""}
              className="w-full flex justify-between items-center rounded-md py-1.5 px-3"
            >
              <p className="jura text-md text-[#61708C]">
                {equipment?.find((list) => list.equip_id == item)?.equip_name}
              </p>
              {isEditable && (
                <GoX
                  color="#b4b4b4"
                  size={24}
                  onClick={() => {
                    updateImage(
                      "img_equip",
                      image.img_equip.filter(
                        (equip_id: string) => equip_id != item
                      )
                    );
                  }}
                />
              )}
            </div>
          </div>
        ))}
        {!isEditable ? (
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
              <Typography className="text-3xl text-[#E7E5E5]">
                {image.img_equip ? image.img_equip.length + 1 : 1}
              </Typography>
              <Select
                bordered={false}
                className="w-full"
                placeholder="Add Equipment"
                filterOption={filterOptions}
                filterSort={filterSort}
                options={equipment
                  ?.filter((item) => !image.img_equip?.includes(item.equip_id))
                  .map((item) => ({
                    label: item.equip_name,
                    value: item.equip_id,
                  }))}
                onChange={setSelect}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setIsEditable(false)}
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
        <div className="w-full flex flex-col space-y-4 pt-4">
          <h2 className="jura text-md text-[#4C577C] pb-3 border-b-2 border-[#E9EBF5]">
            From patient
          </h2>
          <div className="w-full h-48 text-center">
            <Image
              src={formatImage(image?.img_equipPath)}
              width={"100%"}
              alt=""
            />
            <Typography className="jura text-[#9198AF]">
              {formatDate(image.created_at)}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
}
