import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { List, Typography } from "antd";
import { httpAPI } from "@config";
import { IImage } from "@constants";
import { getAllImageById } from "@api-caller";

export default function ImageMenu() {
  const { img_id } = useParams();
  const [images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    if (img_id) {
      getAllImage();
    }
  }, []);

  useEffect(() => {
    const imageElement = document.getElementById(`${img_id}`);
    if (imageElement) {
      imageElement.scrollIntoView();
    }
  }, [images]);

  async function getAllImage() {
    const response = await getAllImageById(img_id as string);
    setImages(response);
  }
  return (
    <>
      {images?.map((image, index) => {
        let dateObject = new Date(image.created_at);
        let formattedDate = dayjs(dateObject).format("MMM DD, YYYY HH:mm");
        return (
          <List.Item
            key={index}
            id={image.img_id}
            className="select-none text-center flex flex-col"
          >
            <div className="w-full h-40 rounded-lg">
              <a href={`/wound/${image.img_id}`}>
                <img
                  src={`${httpAPI}/${image.img_path}`}
                  className={`w-full h-full object-cover border-4 hover:border-[#CFC6B0] transition-all duration-150 rounded-lg cursor-pointer ${
                    img_id != image.img_id ? "saturate-25" : "border-[#CFC6B0]"
                  }`}
                />
              </a>
            </div>
            <Typography className="jura text-[#9198AF]">
              {formattedDate}
            </Typography>
          </List.Item>
        );
      })}
    </>
  );
}
