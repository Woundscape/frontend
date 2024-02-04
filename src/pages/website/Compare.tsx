import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { LeftOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import UserProfile from "@components/UserProfile";
import ArrowUp from "@assets/icons/arrow_right_up.svg";
import ArrowDown from "@assets/icons/arrow_left_down.svg";
import AddNote from "@components/AddNote";
import { formatDate, formatImage } from "@utils";
import addNoteImage from "@api-caller/noteApi";
import { getCoupleImage } from "@api-caller/imageApi";
import { IFormattedErrorResponse, IImage, INote } from "@constants";

export default function Compare() {
  const addNoteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    INote
  > = useMutation(addNoteImage);
  const router = useNavigate();
  const location = useLocation();
  const { imageList } = location.state || [];
  const [images, setImage] = useState<IImage[]>([]);
  useEffect(() => {
    getCoupleImage(imageList).then((data) => {
      setImage(data);
      console.log(data);
    });
  }, []);
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5] ">
              <div className="flex items-center space-x-4">
                <LeftOutlined />
                <p className="jura text-xl">HN. 6643793</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6 jura">
              <div className="flex flex-row space-x-5">
                <div className="w-full flex flex-col">
                  <div className="grow flex border-2 flex-col rounded">
                    <div className="border-b-2 p-3">
                      <p className="jura text-[#4C577C] text-lg text-center">
                        Comparative Imaging
                      </p>
                    </div>
                    <div className="flex flex-row space-x-">
                      {images?.map((image: IImage) => {
                        return (
                          <div className="space-y-2 w-1/2 p-5">
                            <p className="text-[#949CB6]">
                              {formatDate(image.created_at)}
                            </p>
                            <img
                              className="rounded"
                              src={formatImage(image.img_path)}
                              alt=""
                            />
                            <div className="border-b-2">
                              <p className="text-[#4C577C] text-base mt-3 mb-2">
                                Equipment
                              </p>
                            </div>
                            <div className="flex flex-row text-[#4C577C] space-x-2">
                              <div className="px-4 rounded-sm bg-[#D2D4EB]">
                                <p>Intrasite Gel</p>
                              </div>
                              <div className="px-4 rounded-sm bg-[#D2D4EB]">
                                <p>Mepitel</p>
                              </div>
                              <div className="px-4 rounded-sm bg-[#D2D4EB]">
                                <p>Mepitel</p>
                              </div>
                            </div>
                            <div className="border-b-2">
                              <p className="text-[#4C577C] text-base mt-3 mb-2">
                                Note
                              </p>
                            </div>
                            <p className="indent-8 text-[#9198AF]">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  {/* Add Note */}
                  {/* {equipment.length && (
                    <div className="w-full pb-10">
                      <AddNote
                        id={img_id as string}
                        equipment={equipment}
                        mutation={addNoteMutation}
                      />
                    </div>
                  )} */}
                </div>
                <div className="flex flex-col w-[28rem] space-y-3">
                  <div className="flex flex-row items-center justify-between h-9 bg-[#F2F2F2] text-[#868686] rounded-lg">
                    <div className="w-1/2 ">
                      <p className="text-center">Tissue</p>
                    </div>
                    <div className="w-1/2">
                      <p className="text-center">Status</p>
                    </div>
                  </div>
                  <div className=" flex flex-row border-2 rounded-lg p-4">
                    <div className="flex flex-row w-1/2 space-x-3 ">
                      <div className="w-6 h-6 rounded-xl bg-[#FFE1E1]"></div>
                      <p>wound</p>
                    </div>
                    <div className="flex flex-row w-1/2 justify-center space-x-3">
                      <img className="w-3" src={ArrowUp} alt="" />
                      <p className="text-[#4C577C]">3.2%</p>
                    </div>
                  </div>
                  <div className=" flex flex-row border-2 rounded-lg p-4">
                    <div className="flex flex-row w-1/2 space-x-3 ">
                      <div className="w-6 h-6 rounded-xl bg-[#C8FFFD]"></div>
                      <p>periwound</p>
                    </div>
                    <div className="flex flex-row w-1/2 justify-center space-x-3">
                      <img className="w-3" src={ArrowDown} alt="" />
                      <p className="text-[#A3802D]">3.2%</p>
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
