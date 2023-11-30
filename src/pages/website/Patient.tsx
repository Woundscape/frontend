import {
  AppstoreOutlined,
  BarsOutlined,
  LeftOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import UserProfile from "@features/UserProfile";
import { Input, DatePicker, Segmented, Button, Select } from "antd";
import SearchIcon from "@assets/icon-search-upload.svg";
import { Content } from "antd/es/layout/layout";
import ViewResult from "@assets/view_result.svg";
import ViewResultHist from "@assets/view_result_hist.svg";
import WoundHist from "@assets/wound/img_10.jpg";

const { RangePicker } = DatePicker;
export default function Patient() {
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <LeftOutlined />
                <p className="jura text-xl">Patient</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6">
              <div className="flex flex-row">
                <div className="flex flex-col">
                  {/* Input Filter */}
                  <div className="flex space-x-2">
                    <Input
                      size="middle"
                      placeholder="Search by hospital number"
                      prefix={<img src={SearchIcon} />}
                      style={{ width: "20%" }}
                    />
                    <RangePicker size="middle" />
                    <Segmented
                      size="middle"
                      options={[
                        { value: "Kanban", icon: <AppstoreOutlined /> },
                        { value: "List", icon: <BarsOutlined /> },
                      ]}
                      onChange={(e) => {
                        console.log(e);
                      }}
                    />
                    <Select
                      defaultValue="lucy"
                      bordered={false}
                      style={{ width: 120 }}
                      options={[{ value: "lucy", label: "Sort by :" }]}
                    />
                    <Button className="button_add" icon={<UserAddOutlined />}>
                      Add Patient
                    </Button>
                  </div>
                  {/* Body */}
                  <div className="flex pt-7">
                    <div className="flex flex-col w-64 h-44 patient_img p-3 justify-between">
                      <div className="flex flex-row justify-between text-white jura border-b-2">
                        <p className="">HN.9877065</p>
                        <p className="">01/02/23</p>
                      </div>
                      <div className="flex flex-row justify-between h-8 border-2 rounded-full">
                        <p className="jura text-white p-1 pl-3">View result</p>
                        <img
                          className="pt-0.5 pb-0.5"
                          src={ViewResult}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
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
                    <div className="flex flex-row space-x-1.5">
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
                    <div className="flex flex-row justify-between h-8 border-2 rounded-full mt-2">
                        <p className="jura text-[#9198AF] p-1 pl-3">View result</p>
                        <img
                          className="pr-1"
                          src={ViewResultHist}
                          alt=""
                        />
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
