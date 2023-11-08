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
  const buildImageUrl = (fileName: string) => {
    return `@assets/wound/${fileName}`; // Adjust the path as needed
  };
  return (
    <>
      {data?.map((item, index) => {
        return (
          <List.Item key={index} className="select-none text-center flex flex-col">
            <Image
              src={`./src/assets/wound/img_${index+1}.jpg`} // Build the image URL
              className="border border-red-200"
            />
            <Typography className="jura text-[#9198AF]">Feb 14, 2023 18:42</Typography>
          </List.Item>
        );
      })}
    </>
  );
}