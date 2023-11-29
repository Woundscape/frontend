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
                  options={[{ value: "lucy", label: "Lucy" }]}
                />
                <Button icon={<UserAddOutlined />}>Add Patient</Button>
              </div>
              {/* Body */}
              
            </Content>
          </div>
        </div>
      </div>
    </>
  );
}
