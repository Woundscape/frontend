import { Checkbox, Divider, Layout, List, Modal, Typography } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import DynamicTime from "@components/DynamicTime";
import ListNotification from "@features/ListNotification";
import UserProfile from "@features/UserProfile";
import Calendar from "react-calendar";
import { Content } from "antd/es/layout/layout";
import DashboardTable from "@features/PatientTable";
import { useAuth } from "@components/AuthProvider";
import { useEffect, useState } from "react";
import Logo_Wound from "@assets/logo/logo-wound.svg";
import AddFriend from "@assets/AddFriendQRCODE.png";

export interface CardPatient {
  title: string;
  value: string;
}

export default function Dashboard() {
  const { doctorId } = useAuth();
  console.log(doctorId);
  // const { changeLoading } = useLoading();
  // changeLoading(false)
  const card: CardPatient[] = [
    {
      title: "Total",
      value: "22",
    },
    {
      title: "Special Cases",
      value: "19",
    },
    {
      title: "Unread",
      value: "3",
    },
  ];
  const [isConnect, setIsConnect] = useState(false);
  useEffect(()=>{
    const connectedLine = localStorage.getItem('line_LIFF_SCAN_QRCODE')
    if(!connectedLine){
      setIsConnect(true)
    }
  },[])
  return (
    <>
      <Layout className="w-full h-screen relative">
        <div className="flex gap-3 h-full relative">
          {/* Body */}
          <Modal
            title={"Connect with line"}
            open={isConnect}
            onCancel={() => setIsConnect(false)}
            footer={null}
            centered
            destroyOnClose
          >
            <Content className="flex flex-col justify-center items-center p-2">
              <div className="flex flex-col items-center space-y-3">
                <img width={80} src={Logo_Wound} />
                <Divider>
                  <Typography className="prompt text-[#868686] text-xs">
                    SCAN CODE HERE
                  </Typography>
                </Divider>
                <div className="bg-[#D2D4EB] w-48 h-48 p-2.5 rounded-md">
                  <img src={AddFriend} alt="" className="rounded-md" />
                </div>
                <Typography className="jura text-[#868686] text-xs">
                  Please scan to connect your account with line
                </Typography>
                <Checkbox
                  onChange={() => {
                    localStorage.setItem("line_LIFF_SCAN_QRCODE", "Connected");
                  }}
                  className="jura text-xs flex items-center text-[#868686]"
                >
                  Don't show me again
                </Checkbox>
              </div>
            </Content>
          </Modal>
          <Content className="grow w-full bg-white px-6">
            <div className="flex flex-col items-center h-full py-10">
              <div id="content" className="w-full h-full">
                <div className="h-full flex flex-col space-y-2">
                  <div id="body-content-dashboard" className="space-y-6">
                    <div id="head-dashboard" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h1 className="jura text-xl">Dashboard</h1>
                        <div>
                          <input
                            type="text"
                            id="search_dashboard"
                            className="bg-[#EFEFEF] text-gray-900 text-sm text-center rounded-full border-none focus:outline-none block w-72 p-2.5"
                            placeholder="Search HN, Disease, Doctor"
                          />
                        </div>
                      </div>
                      <div
                        id="watermark-wound"
                        className="w-full h-48 p-8 bg-[#D2D5EB] rounded-2xl"
                      >
                        <div className="jura space-y-3">
                          <p className="font-bold text-2xl text-[#505152]">
                            Hello, puipui
                          </p>
                          <p className="font-bold text-xl text-[#4C577C]">
                            Welcome to Woundscape
                          </p>
                        </div>
                      </div>
                    </div>
                    <List
                      grid={{ gutter: 16, column: 3 }}
                      dataSource={card}
                      renderItem={(item, index) => (
                        <List.Item>
                          <div
                            key={index}
                            id="box-dashboard"
                            className="rounded-xl border-2 border-[#D2D7EB] px-6 py-4 space-y-1"
                          >
                            <p className="text-5xl text-[#9198AF] jura">
                              {item.value}
                            </p>
                            <p className="text-lg text-[#4C577C] prompt">
                              {item.title}
                            </p>
                          </div>
                        </List.Item>
                      )}
                    />
                  </div>
                  <div className="relative flex justify-center items-center">
                    <div className="w-24 border-2 rounded-xl absolute right-0">
                      <p className="jura text-center text-[#9198AF]">
                        View all
                      </p>
                    </div>
                  </div>
                  <div id="footer-content-dashboard" className="pt-3 pb-5 grow">
                    <DashboardTable />
                  </div>
                </div>
              </div>
            </div>
          </Content>
          {/* Right Sidebar */}
          <div className="w-[30rem] relative py-4 px-4">
            <div className="relative w-full h-full flex">
              <div className="flex flex-col w-full h-full space-y-3">
                <UserProfile />
                <ListNotification />
                <DynamicTime />
                <div id="calendar">
                  <Calendar
                    formatShortWeekday={(_: any, value: any) =>
                      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][value.getDay()]
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
