import { Image, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import MockupEquipment from "@assets/mockup_equip_history.svg";
import { getInstanceLocal } from "@api/apiClient";

export default function EquipmentTab() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getInstanceLocal()
      .get("/equipment")
      .then((res: any) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);

  const [btnEquip, setBtnEquip] = useState(false);
  function handleEquip() {
    setBtnEquip(!btnEquip);
  }
  return (
    <>
      <Content className="space-y-3">
        {data?.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full px-4 py-1.5 flex items-center rounded-xl space-x-2"
            style={{
              borderRadius: "0.8125rem",
              border: "1.5px solid #E3E1E1",
            }}
          >
            <Typography className="text-3xl text-[#E7E5E5] jura">
              {" "}
              {index + 1}
            </Typography>
            <div className="w-9/12 flex justify-between rounded-md py-1.5 px-3 bg-white">
              <p className="jura text-md text-[#61708C]">{item.equip_name}</p>
            </div>
          </div>
        ))}
        {!btnEquip ? (
          <div className="flex justify-end">
            <button
              onClick={handleEquip}
              className="text-center text-[#4C577C] jura px-4 rounded-xl border border-[#D9D9D9]"
            >
              Management
            </button>
          </div>
        ) : (
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
        )}
      </Content>
      <div className="w-full grow flex flex-col space-y-4">
        <h2 className="jura text-md text-[#4C577C] pb-3 border-b-2 border-[#E9EBF5]">
          From patient
        </h2>
        <div className="w-full h-48 text-center">
          <Image src={MockupEquipment} width={"100%"} alt="" />
          <Typography className="jura text-[#9198AF]">
            Feb 14, 2023 18:42
          </Typography>
        </div>
      </div>
    </>
  );
}
