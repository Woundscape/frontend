import {
  AppstoreOutlined,
  BarsOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import UserProfile from "@features/UserProfile";
import { Input, DatePicker, Segmented, Button, Select } from "antd";
import SearchIcon from "@assets/icon-search-upload.svg";
import { Content } from "antd/es/layout/layout";
import ViewResult from "@assets/view_result.svg";

const { RangePicker } = DatePicker;
export default function Patient() {
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full py-8 bg-white">
          <div className="w-full h-full">
            <header className="flex justify-between px-6 border-b-2 pb-5 border-[#E9EBF5]">
              <div className="flex items-center space-x-4">
                <p className="jura text-xl text-[#424241">Patient</p>
              </div>
              <div className="w-[30rem]">
                <UserProfile />
              </div>
            </header>
            <Content className="px-6 pt-6">
              <div className="flex flex-row">
                <div className="w-full flex flex-col">
                  {/* Input Filter */}
                  <div id="react__patient__input" className="flex space-x-2">
                    <Input
                      size="middle"
                      placeholder="Search by hospital number"
                      prefix={<img src={SearchIcon} />}
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
                      prefixCls="ds"
                      bordered={false}
                      style={{ width: 120 }}
                      options={[{ value: "lucy", label: "Sort by :" }]}
                    />
                    <Button className="button_add" icon={<UserAddOutlined />}>
                      Add Patient
                    </Button>
                  </div>
                  {/* Body */}
                  <Content id="content__patient" className="flex pt-7 flex-wrap gap-2">
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
                  </Content>
                </div>
              </div>
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
