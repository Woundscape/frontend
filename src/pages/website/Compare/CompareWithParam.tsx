import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { ConfigProvider, Divider } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import ArrowUp from "@assets/icons/arrow_right_up.svg";
import ArrowDown from "@assets/icons/arrow_left_down.svg";
import {
  DefaultCreateCompare,
  DefaultTissue,
  IPreCompare,
  IEquipment,
  IFormattedErrorResponse,
  IImage,
  TissueType,
  ICreateCompare,
} from "@constants";
import { dividerConfig } from "@config";
import UserProfile from "@components/UserProfile";
import CompareCard from "@components/Compare/CompareCard";
import AddCompareNote from "@components/Compare/AddCompareNote";
import {
  addCompareNoteWithId,
  getAllEquipment,
  getCompareById,
  getCoupleImage,
} from "@api-caller";

export default function CompareWithParam() {
  const addCompareNoteMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    ICreateCompare
  > = useMutation(addCompareNoteWithId);
  const { compare_id } = useParams();
  const router = useNavigate();
  const [images, setImages] = useState<IImage[]>();
  const [equipment, setEquipment] = useState<IEquipment[]>();
  const [tissueData, setTissueData] = useState<TissueType[]>(DefaultTissue);
  const [isLoadingResult, setIsLoadingResult] = useState<boolean>(false);
  const [compare, setCompare] = useState<IPreCompare>(DefaultCreateCompare);
  useEffect(() => {
    getCompareById(compare_id as string).then((response) => {
      getCoupleImage(response.compare_img).then((dataImg) => {
        getTissueResult(dataImg);
        setImages(dataImg);
        setCompare((prev) => ({
          ...prev,
          case_id: response.case_id,
          img_collect: response.compare_img,
          compare_id,
        }));
      });
    });
  }, []);

  useEffect(() => {
    getEquipment();
  }, []);

  async function getTissueResult(data: IImage[]) {
    const result1 = data[0].img_tissue?.result ?? DefaultTissue;
    const result2 = data[1].img_tissue?.result ?? DefaultTissue;
    const updatedTissueData: TissueType[] = await result1.map(
      (tissue: TissueType, index: number) => {
        return {
          ...tissue,
          value: tissue.value - result2[index].value,
        };
      }
    );
    setTissueData(updatedTissueData);
    setCompare((prev) => ({
      ...prev,
      compare_info: updatedTissueData,
    }));
    setIsLoadingResult(true);
  }

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
              <LeftOutlined
                onClick={() => router(`/patient/${compare.case_id}`)}
              />
              <p className="jura text-xl">HN. 6643793</p>
            </div>
            <div className="w-[30rem]">
              <UserProfile />
            </div>
          </header>
          <Content className="px-6 pt-6 jura grow flex">
            <div className="grow flex flex-row space-x-5">
              <div className="w-9/12 flex flex-col overflow-y-auto space-y-3">
                <div className="w-full flex border-2 flex-col rounded">
                  <div className="border-b-2 p-3">
                    <p className="jura text-[#4C577C] text-lg text-center">
                      Comparative Imaging
                    </p>
                  </div>
                  {images && equipment && (
                    <ConfigProvider theme={dividerConfig}>
                      <div className="grow flex flex-row">
                        <CompareCard image={images[0]} equipment={equipment} />
                        <Divider type="vertical" className="min-h-full" />
                        <CompareCard image={images[1]} equipment={equipment} />
                      </div>
                    </ConfigProvider>
                  )}
                </div>
                <AddCompareNote
                  id={compare_id as string}
                  compare={compare}
                  mutation={addCompareNoteMutation}
                />
              </div>
              <div id="result" className="flex flex-col w-3/12 space-y-3">
                <div className="flex flex-row items-center justify-between py-2 bg-[#F2F2F2] text-[#868686] rounded-lg">
                  <div className="w-1/2 ">
                    <p className="text-center">Tissue</p>
                  </div>
                  <div className="w-1/2">
                    <p className="text-center">Status</p>
                  </div>
                </div>
                {isLoadingResult &&
                  tissueData?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row border-2 rounded-lg p-4"
                      >
                        <div className="flex flex-row w-1/2 space-x-3 ">
                          <div
                            className="w-6 h-6 rounded-xl"
                            style={{
                              backgroundColor: item.color,
                            }}
                          ></div>
                          <p id="text__primary">{item.title}</p>
                        </div>
                        {typeof item.value == "number" && (
                          <div className="jura flex flex-row w-1/2 items-center justify-center space-x-3">
                            <img
                              className="w-3"
                              src={
                                item.value < 0
                                  ? ArrowUp
                                  : item.value != 0
                                  ? ArrowDown
                                  : ""
                              }
                              alt=""
                            />
                            <p className="text-[#4C577C]">
                              {item.value < 0
                                ? Math.abs(item.value)
                                : item.value}
                              %
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </Content>
        </div>
      </div>
    </>
  );
}
