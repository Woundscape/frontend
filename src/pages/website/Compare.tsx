import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { LeftOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import UserProfile from "@components/UserProfile";
import ArrowUp from "@assets/icons/arrow_right_up.svg";
import ArrowDown from "@assets/icons/arrow_left_down.svg";
import { addNoteCompare } from "@api-caller/noteApi";
import { getCoupleImage } from "@api-caller/imageApi";
import { IEquipment, IFormattedErrorResponse, IImage, INote } from "@constants";
import { ConfigProvider, Divider } from "antd";
import { dividerConfig } from "@config";
import CardImage from "@components/Compare/CardImage";
import AddNoteWithoutEquip from "@components/AddNoteWithoutEquip";
import getAllEquipment from "@api-caller/equipApi";

export default function Compare() {
  const addNoteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    INote
  > = useMutation(addNoteCompare);
  const router = useNavigate();
  const location = useLocation();
  const { imageList } = location.state || [];
  const [images, setImage] = useState<IImage[]>();
  const [equipment, setEquipment] = useState<IEquipment[]>();
  useEffect(() => {
    getCoupleImage(imageList).then((data) => {
      setImage(data);
    });
  }, []);

  useEffect(() => {
    getEquipment();
  }, []);
 
  async function getEquipment() {
    const data = await getAllEquipment();
    setEquipment(data);
  }
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="h-full flex flex-col relative py-8 bg-white">
          <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5] ">
            <div className="flex items-center space-x-4">
              <LeftOutlined />
              <p className="jura text-xl">HN. 6643793</p>
            </div>
            <div className="w-[30rem]">
              <UserProfile />
            </div>
          </header>
          <Content className="px-6 pt-6 jura grow">
            <div className="w-full h-full flex flex-row space-x-5">
              <div className="w-full h-full flex flex-col overflow-y-auto space-y-5">
                <div className="grow flex border-2 flex-col rounded">
                  <div className="border-b-2 p-3">
                    <p className="jura text-[#4C577C] text-lg text-center">
                      Comparative Imaging
                    </p>
                  </div>
                  {images && (
                    <div className="grow flex flex-row">
                      {equipment && (
                        <ConfigProvider theme={dividerConfig}>
                          <CardImage image={images[0]} equipment={equipment} />
                          <Divider type="vertical" className="min-h-full" />
                          <CardImage image={images[1]} equipment={equipment} />
                        </ConfigProvider>
                      )}
                    </div>
                  )}
                </div>
                <AddNoteWithoutEquip id={""} mutation={addNoteMutation} />
              </div>
              <div id="result" className="flex flex-col w-[28rem] space-y-3">
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
    </>
  );
}
