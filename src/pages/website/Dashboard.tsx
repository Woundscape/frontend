import type { MenuProps } from "antd";
import { Dropdown, Divider, List, Avatar } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import UndefinedProfile from "@assets/undefined-profile-icon.svg";
import NotificationIcon from "@assets/noti-icon.svg";
import PatientTable from "@components/PatientTable";
import Calendar from "react-calendar";
import { useEffect, useState } from "react";
import ListNotification from "@components/ListNotification";

export interface CardPatient {
  title: string;
  value: string;
}
export default function Dashboard() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  const card: CardPatient[] = [
    {
      title: "Total",
      value: "22",
    },
    {
      title: "Follow-up",
      value: "19",
    },
    {
      title: "Unread",
      value: "3",
    },
  ];
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="flex gap-3 h-full relative">
          {/* Body */}
          <div className="grow w-full bg-white px-6">
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
              <p className="absolute bottom-5 michroma text-sm text-[#626060]">
                © 2023 Copyright – Woundscape – All Rights Reserved.
              </p>
            </div>
          </div>
          {/* Right Sidebar */}
          <div className="w-[30rem] relative py-4 px-4">
            <div className="relative w-full h-full flex">
              <div className="flex flex-col w-full h-full space-y-3">
                <div id="user-respond" className="px-4 ">
                  <div className="flex justify-end items-center space-x-3">
                    <img src={NotificationIcon} width={45} height={45} alt="" />
                    <img src={UndefinedProfile} width={40} height={40} alt="" />
                    <div className="jura">
                      <p id="user_fullname" className="text-[#535352]">
                        Phufa R.
                      </p>
                      <span id="user_role" className="text-[#4C577C]">
                        doctor
                      </span>
                    </div>
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <img className="pl-2" src={DownOutlinedIcon} alt="" />
                    </Dropdown>
                  </div>
                </div>
                <ListNotification />
                <div
                  id="time"
                  className="relative flex flex-col space-y-2 justify-center items-center jura bg-white rounded-xl py-4"
                >
                  <p className="top-1 absolute text-xs text-[#868686]">Time</p>
                  <div className="flex justify-center items-center">
                    <div className="flex flex-col items-center space-y-1">
                      <h1 className="px-4 py-2 bg-[#EDEFFF] text-[#626060] rounded-lg text-2xl">
                        {hours < 10 ? `0${hours}` : hours}{" "}
                      </h1>
                      <h2 className="text-[#4C577C] text-xs">HOURS</h2>
                    </div>
                    <Divider className="" type="vertical" />
                    <div className="flex flex-col items-center space-y-1">
                      <h1 className="px-4 py-2 bg-[#EDEFFF] text-[#626060] rounded-lg text-2xl">
                        {minutes < 10 ? `0${minutes}` : minutes}
                      </h1>
                      <h2 className="text-[#4C577C] text-xs">MINUTES</h2>
                    </div>
                    <Divider type="vertical" />
                    <div className="flex flex-col items-center space-y-1">
                      <h1 className="px-4 py-2 bg-[#EDEFFF] text-[#626060] rounded-lg text-2xl">
                        {seconds < 10 ? `0${seconds}` : seconds}
                      </h1>
                      <h2 className="text-[#4C577C] text-xs">SECONDS</h2>
                    </div>
                  </div>
                </div>
                <div id="calendar">
                  <Calendar
                    formatShortWeekday={(_, value) =>
                      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"][value.getDay()]
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
