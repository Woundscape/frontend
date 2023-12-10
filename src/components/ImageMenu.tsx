import { getInstance } from "@api/apiTest";
import { Image, List, Typography } from "antd";
import { useEffect, useState } from "react";

export interface IWound {
  id: number;
  title: string;
  description: string;
  images: string[];
}
export default function ImageMenu() {
  const [data, setData] = useState<IWound[]>([]);
  useEffect(() => {
    getInstance()
      .get("/products")
      .then((res: any) => {
        setData(res.data.products);
      });
  }, []);
  return (
    <>
      {data?.map((item, index) => {
        return (
          <List.Item
            key={index}
            className="select-none text-center flex flex-col"
          >
            <div className="w-full h-40 rounded-lg">
              <img
                src={`./src/assets/wound/img_${index + 1}.jpg`}
                className="w-full h-full object-cover border-4 hover:border-4 hover:border-[#CFC6B0] transition-all duration-150 rounded-lg cursor-pointer"
              />
            </div>
            <Typography className="jura text-[#9198AF]">
              Feb 14, 2023 18:42
            </Typography>
          </List.Item>
        );
      })}
    </>
  );
}
