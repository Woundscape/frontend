import { List, Tabs, Button, Card, Typography, Image } from "antd";
import UserProfile from "@features/UserProfile";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import Wound from "@assets/wound/img_31.jpg";

const { TabPane } = Tabs;
export default function WoundAnalysis() {
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="h-full relative flex gap-3">
          <div className="w-full bg-white grow px-10">
            <div className="flex flex-col items-center h-full py-10">
              <div className="w-full h-full flex flex-col justify-between space-y-4">
                <div id="button" className="flex justify-between">
                  <Button
                    type="text"
                    icon={<LeftOutlined style={{ color: "#61708C" }} />}
                    className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]"
                  >
                    back
                  </Button>
                  <Button
                    type="text"
                    className="bg-[#E9EBF5] border-[#D2D7EB] border-2 flex justify-center items-center p-4 rounded-2xl jura text-[#61708C]"
                  >
                    HN. 6643793
                  </Button>
                </div>
                <Content className="w-full h-full grow flex flex-col border-2 border-[#D9D9D9]">
                  <div className="w-full h-[4rem] p-4 flex border-b">
                    <Typography className="border">
                      Feb 14, 2023 18:42
                    </Typography>
                  </div>
                  <div className="w-full grow flex-1 min-h-0 p-4">
                    <img src={Wound} className="w-full h-full object-cover rounded-lg" />
                  </div>
                </Content>
                <Card id="add-note" className="border-2 border-[#D9D9D9]">
                  <div className="flex space-x-4 jura">
                    <PlusOutlined style={{ color: "#4C577C" }} />
                    <p className="text-md text-[#4C577C]">ADD NOTE</p>
                  </div>
                </Card>
              </div>
              <p className="absolute bottom-5 michroma text-sm select-none text-[#626060]">
                © 2023 Copyright – Woundscape – All Rights Reserved.
              </p>
            </div>
          </div>
          <div className="w-[30rem] bg-white relative py-4 px-4">
            <div className="flex flex-col">
              <UserProfile />
              <div className="tabs-container__navigation">
                <Tabs type="card">
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Tissue
                      </div>
                    }
                    key="1"
                  >
                    <List>ds</List>
                  </TabPane>
                  <TabPane
                    tab={
                      <div className="text-[#424241] text-center select-none jura">
                        Equipment
                      </div>
                    }
                    key="2"
                  >
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
