import {
  AppstoreOutlined,
  BarsOutlined,
  LeftOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import UserProfile from "@features/UserProfile";
import { Input, DatePicker, Segmented, Button, Select, Timeline } from "antd";
import SearchIcon from "@assets/icon-search-upload.svg";
import { Content } from "antd/es/layout/layout";
import ViewResult from "@assets/view_result.svg";
import ViewResultHist from "@assets/view_result_hist.svg";
import WoundHist from "@assets/wound/img_10.jpg";
import Typography from "antd/es/typography/Typography";

const { RangePicker } = DatePicker;
export default function Patient() {
  function renderImage() {
    return (
      <div className="flex pt-4">
        <div className="flex flex-col w-64 h-44 patient_img p-3 justify-between">
          <div className="flex flex-row justify-between text-white jura border-b-2">
            <p className="">HN.9877065</p>
            <p className="">01/02/23</p>
          </div>
          <div className="flex flex-row justify-between h-8 border-2 rounded-full">
            <p className="jura text-white p-1 pl-3">View result</p>
            <img className="pt-0.5 pb-0.5" src={ViewResult} alt="" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header
              id="head__patient"
              className="px-6 border-b-2 pb-5 border-[#E9EBF5]"
            >
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <LeftOutlined />
                  <p className="jura text-xl">Patient</p>
                </div>
                <div className="w-[30rem]">
                  <UserProfile />
                </div>
              </div>
              <Segmented
                className="jura mt-4"
                options={[
                  "Overview",
                  "Comparative Imaging",
                  "Wound Progression",
                ]}
              />
            </header>
            <Content className="grow p-6">
              <div className="flex h-full">
                <div className="w-full h-full flex flex-col space-y-2">
                  {/* Input Filter */}
                  <div className="flex space-x-2 items-center">
                    <Typography className="jura text-[#4C577C]">
                      Progression Stage :{" "}
                    </Typography>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Search to Select"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      options={[
                        {
                          value: "1",
                          label: "Not Identified",
                        },
                        {
                          value: "2",
                          label: "Closed",
                        },
                        {
                          value: "3",
                          label: "Communicated",
                        },
                        {
                          value: "4",
                          label: "Identified",
                        },
                        {
                          value: "5",
                          label: "Resolved",
                        },
                        {
                          value: "6",
                          label: "Cancelled",
                        },
                      ]}
                    />
                  </div>
                  {/* Body */}
                  <div
                    id="timeline-container"
                    className="h-full overflow-y-auto"
                  >
                    <div className="inner-container pt-4">
                      <ul className="timeline pl-20">
                        {/* <li id="test" /> */}
                        <li
                          className="timeline-item flex flex-wrap gap-3"
                          data-date="17 Jan"
                        >
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                          {renderImage()}
                        </li>
                        <li
                          className="timeline-item flex flex-wrap gap-3"
                          data-date="3 Feb"
                        >
                          {renderImage()}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div id="history" className="flex flex-col border-l-2">
                  <div className="head-history h-14 w-72 bg-[#EEEEEE] rounded-xl ">
                    <p className="jura text-[#555554] text-lg p-3">History</p>
                  </div>
                  <div className="flex flex-col border-2 rounded-xl p-2 jura mt-4">
                    <div className="flex justify-between bg-[#F2F2F2] p-2 rounded-lg">
                      <p className="text-[#4C577C]">Jul 19, 2023 08:23</p>
                      <p className="text-[#626060]">HN.6643793</p>
                    </div>
                    <div className="flex pt-3">
                      <img className="w-16 rounded-lg" src={WoundHist} alt="" />
                      <p className="text-[#4C577C] p-3.5">Jul 14, 2023 18:44</p>
                    </div>
                    <div className="flex pt-3">
                      <img className="w-16 rounded-lg" src={WoundHist} alt="" />
                      <p className="text-[#4C577C] p-3.5">Jul 14, 2023 18:44</p>
                    </div>
                    <div className="flex flex-row space-x-1.5 mt-1">
                      <div className="w-24 bg-[#F4DEE7] rounded mt-2">
                        <p className="text-center text-[#4C577C]">Diabetes</p>
                      </div>
                      <div className="w-20 bg-[#F4DEE7] rounded mt-2">
                        <p className="text-center text-[#4C577C]">Pressure</p>
                      </div>
                      <div className="w-20 bg-[#F4DEE7] rounded mt-2">
                        <p className="text-center text-[#4C577C]">Asthma</p>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between h-8 border-2 rounded-full mt-3">
                      <p className="jura text-[#9198AF] p-1 pl-3">
                        View result
                      </p>
                      <img className="pr-1" src={ViewResultHist} alt="" />
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