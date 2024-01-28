import { getAllImageById } from "@api-caller/imageApi";
import { httpAPI } from "@config";
import { IImage } from "@constants/interface";
import {
  List,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
        let imgPath = image.img_path.replace(/\\/g, "/");
        let dateObject = new Date(image.created_at);
        let formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }).format(dateObject);
        return (
          <List.Item
            key={index}
            id={image.img_id}
            className="select-none text-center flex flex-col"
          >
            <div className="w-full h-40 rounded-lg">
              <a href={`/wound/${image.img_id}`}>
                <img
                  src={`${httpAPI}/${imgPath}`}
                  className="w-full h-full object-cover border-4 hover:border-4 hover:border-[#CFC6B0] transition-all duration-150 rounded-lg cursor-pointer"
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
