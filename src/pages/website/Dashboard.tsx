import { Layout, List, Statistic } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import DynamicTime from "@components/DynamicTime";
import PatientTable from "@features/PatientTable";
import ListNotification from "@features/ListNotification";
import UserProfile from "@features/UserProfile";
import Calendar from "react-calendar";
import { Content } from "antd/es/layout/layout";

export interface CardPatient {
  title: string;
  value: string;
}
export default function Dashboard() {
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
  return (
    <>
      <Layout className="w-full h-screen relative">
        <div className="flex gap-3 h-full relative">
          {/* Body */}
          <Content className="grow w-full bg-white px-6">
            <div className="flex flex-col items-center h-full py-10">
              <div id="content" className="w-full h-full">
                <div className="h-full flex flex-col space-y-2">
                  <div id="body-content-dashboard" className="space-y-6">
                    <div id="head-dashboard" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h1 className="jura">Dashboard</h1>
                        <div>
                          <input
                            type="text"
                            id="search_dashboard"
                            className="bg-[#EFEFEF] text-gray-900 text-sm rounded-full border-none focus:outline-none block w-full p-2.5"
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
                  <div id="footer-content-dashboard" className="pb-6 grow">
                    <PatientTable />
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
