import { useEffect, useState } from "react";
import liff from "@line/liff";
import { Image, Timeline } from "antd";
import Logo_Wound from "@assets/logo/logo-wound.svg";
import footer_watermark from "@assets/footer_watermark.svg";

import { lineLiffID } from "@config";
import { getImageByUID } from "@api-caller";
import { IImage } from "@constants";
import dayjs from "dayjs";
import { formatImage } from "@utils";
import { Content } from "antd/es/layout/layout";

export default function History() {
  const [cases, setCases] = useState<any>();
  const [images, setImages] = useState<any>();
  useEffect(() => {
    liff
      .init({
        liffId: lineLiffID.HISTORY,
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            getImageByUID(profile.userId).then((response) => {
              setCases(response);
            });
          });
        } else {
          liff.login();
        }
      })
      .catch((err) => {
        alert(`error ${err}`);
      });
  }, []);

  useEffect(() => {
    if (cases) {
      formatDateImages(cases.img_collect);
    }
  }, [cases]);

  async function formatDateImages(images: IImage[]) {
    const sortImage: Record<string, IImage[]> = {};
    images.forEach((image: IImage) => {
      if (image.img_status) {
        const createdAtDate = dayjs(image.created_at).format("DD MMM YYYY");
        if (!sortImage[createdAtDate]) {
          sortImage[createdAtDate] = [];
        }
        sortImage[createdAtDate].push({ ...image });
      }
    });
    setImages(sortImage);
  }

  const renderTimelineItem = () => {
    if (images) {
      const timelineItems = Object.keys(images).map((date: string) => {
        return {
          dot: <div className="w-3 h-3 bg-[#61708C] rounded-full"></div>,
          label: (
            <>
              <p className="text-[#626060] jura">2309.img</p>
              <p className="text-[#A7A6A5] prompt text-xs">{date}</p>
            </>
          ),
          children: (
            <>
              <Content className="w-full text-[#C1C0BE] prompt flex flex-wrap">
                <div id="img-wound" className="w-full space-y-1">
                  <p>รูปภาพแผล</p>
                  <div className="flex flex-wrap gap-1">
                    {images[date].map((image: IImage, index: number) => {
                      return (
                        <Image
                          key={index}
                          width={30}
                          height={30}
                          src={formatImage(image.img_path)}
                          className="object-cover rounded-sm"
                        />
                      );
                    })}
                  </div>
                  <p>รูปภาพอุปกรณ์</p>
                  <div className="flex flex-wrap gap-1">
                    {images[date].map((image: IImage, index: number) => {
                      if (image.img_equipPath == null) {
                        return null;
                      }
                      return (
                        <Image
                          key={index}
                          width={30}
                          height={30}
                          src={formatImage(image.img_equipPath)}
                          className="rounded-sm"
                        />
                      );
                    })}
                  </div>
                </div>
              </Content>
            </>
          ),
        };
      });
      return timelineItems;
    } else {
      return [];
    }
  };

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-between bg-white prompt relative select-none">
        <div className="w-full flex flex-col justify-center p-10 items-center space-y-4">
          <div className="logo-box flex flex-col items-center space-y-2 py-4">
            <img className="w-20" src={Logo_Wound} alt="" />
            <h1 className="text-lg michroma">Woundscape</h1>
          </div>
          <div className="w-full flex flex-col items-center mx-10 rounded-xl border border-[#B4B4B4] border-dashed space-y-4">
            <div className="w-full py-3 prompt text-center border-b border-[#B4B4B4] border-dashed text-[#A3802D]">
              <p>ประวัติการอัปโหลดรูปภาพ</p>
            </div>
            <div className="w-full px-2 relative">
              <Timeline mode="left" items={renderTimelineItem()} />
            </div>
          </div>
        </div>
        <div className="signup_line_footer_watermark relative w-full bottom-0 overflow-hidden">
          <img className="w-full" src={footer_watermark} alt="" />
        </div>
      </div>
    </>
  );
}

// {
//   dot: (
//     <div className="w-3 h-3 bg-[#61708C] rounded-full"></div>
//   ),
//   label: (
//     <div className="">
//       <p className="text-[#626060] jura">1909.img</p>
//       <p className="text-[#A7A6A5] prompt text-xs">
//         วันที่ 19/09/2566
//       </p>
//     </div>
//   ),
//   children: (
//     <div className="w-full text-[#C1C0BE] prompt flex flex-wrap">
//       <div id="img-wound" className="w-full space-y-1">
//         <p>รูปภาพแผล</p>
//         <div className="flex flex-wrap gap-2">
//           <img
//             src={MockWound}
//             className="rounded-md"
//             alt=""
//           />
//           <img
//             src={MockWound}
//             className="rounded-md"
//             alt=""
//           />
//           <img
//             src={MockWound}
//             className="rounded-md"
//             alt=""
//           />
//           <img
//             src={MockWound}
//             className="rounded-md"
//             alt=""
//           />
//           <img
//             src={MockWound}
//             className="rounded-md"
//             alt=""
//           />
//           <img
//             src={MockWound}
//             className="rounded-md"
//             alt=""
//           />
//         </div>
//         <p>รูปภาพอุปกรณ์</p>
//         <img src={MockEquip} className="rounded-md" alt="" />
//       </div>
//     </div>
//   ),
// },
// {
//   dot: (
//     <div className="w-3 h-3 bg-[#61708C] rounded-full"></div>
//   ),
//   label: (
//     <div className="">
//       <p className="text-[#626060] jura">1009.img</p>
//       <p className="text-[#A7A6A5] prompt text-xs">
//         วันที่ 10/09/2566
//       </p>
//     </div>
//   ),
//   children: (
//     <div className="w-full text-[#C1C0BE] prompt flex flex-wrap">
//       <div id="img-wound" className="w-full space-y-1">
//         <p>รูปภาพแผล</p>
//         <div className="flex flex-wrap space-x-1">
//           <img
//             src={MockWound}
//             className="rounded-md"
//             alt=""
//           />
//         </div>
//         <p>รูปภาพอุปกรณ์</p>
//         <img src={MockEquip} className="rounded-md" alt="" />
//       </div>
//     </div>
//   ),
// },
