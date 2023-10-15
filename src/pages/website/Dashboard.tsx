import type { MenuProps } from "antd";
import { useState } from "react";
import { Tag, Dropdown, List, Skeleton, Divider } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import UndefinedProfile from "@assets/undefined-profile-icon.svg";
import NotificationIcon from "@assets/noti-icon.svg";
import Calendar from "react-calendar";
interface TableType {
  id: Number;
  hn_id: String;
  admit_no: String;
  status: String;
  disease: String;
  last_updated: String;
}
export default function Dashboard() {
  function openModal() {
    return false;
  }
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
  const tableData: TableType[] = [
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
  ];
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="grid grid-cols-8 gap-5 h-full relative">
          {/* Body */}
          <div className="col-span-6 w-full bg-white px-6">
            <div className="flex flex-col items-center py-10">
              <div id="content" className="w-full">
                <div className="h-full space-y-4">
                  <div id="body-content-dashboard" className="h-1/2 space-y-4">
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
                    <div id="card-patient" className="grid grid-cols-3 gap-8">
                      <div
                        id="box-dashboard"
                        className="rounded-xl border-2 border-[#D2D7EB] px-6 py-4 space-y-1"
                      >
                        <p className="text-6xl text-[#9198AF] jura">22</p>
                        <p className="text-lg text-[#4C577C] prompt">Total</p>
                      </div>
                      <div
                        id="box-dashboard"
                        className="rounded-xl border-2 border-[#D2D7EB] px-6 py-4 space-y-1"
                      >
                        <p className="text-6xl text-[#9198AF] jura">15</p>
                        <p className="text-lg text-[#4C577C] prompt">
                          Follow up
                        </p>
                      </div>
                      <div
                        id="box-dashboard"
                        className="rounded-xl border-2 border-[#D2D7EB] px-6 py-4 space-y-1"
                      >
                        <p className="text-6xl text-[#9198AF] jura">7</p>
                        <p className="text-lg text-[#4C577C] prompt">Unread</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-64 py-4">
                    <div
                      id="footer-content-dashboard"
                      className="relative rounded-xl"
                      style={{ boxShadow: "0px 0px 10px 0px #D2D7EB" }}
                    >
                      <table className="w-full text-center jura text-[#4C577C]">
                        <thead className="text-md w-full">
                          <tr className="flex border-b-2 py-4 border-[#E9EBF5]">
                            <th scope="col" className="w-1/6">
                              Hospital No.
                            </th>
                            <th scope="col" className="w-1/6">
                              Admit No.
                            </th>
                            <th scope="col" className="w-1/6">
                              Status
                            </th>
                            <th scope="col" className="w-1/6">
                              Disease
                            </th>
                            <th scope="col" className="w-1/6">
                              Last updated
                            </th>
                            <th scope="col" className="w-1/6">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-grey-light flex flex-col items-center overflow-y-scroll w-full h-48">
                          {tableData?.map((item, index) => {
                            return (
                              <tr
                                key={index}
                                className="flex w-full py-3 bg-white border-b-2 border-[#E9EBF5] select-none hover:bg-[#EEEEEE]"
                              >
                                <td className="w-1/6">{item.hn_id}</td>
                                <td className="w-1/6">{item.admit_no}</td>
                                <td className="w-1/6">{item.status}</td>
                                <td className="w-1/6">
                                  <Tag
                                    color="#EBD2DD"
                                    style={{
                                      color: "#4C577C",
                                      fontFamily: "jura",
                                    }}
                                  >
                                    {item.disease}
                                  </Tag>
                                </td>
                                <td className="w-1/6">{item.last_updated}</td>
                                <td className="w-1/6">$2999</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <p className="absolute bottom-5 michroma text-sm text-[#626060]">
                © 2023 Copyright – Woundscape – All Rights Reserved.
              </p>
            </div>
          </div>
          {/* Right Sidebar */}
          <div className="col-span-2 relative py-4 px-4 ">
            <div className="relative w-full h-full">
              <div className="h-2/5 space-y-3">
                <div id="user-respond" className="px-4">
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
                <div
                  id="notification-box"
                  className="jura select-none bg-white rounded-xl"
                >
                  <div
                    id="header-notification"
                    className="py-4 px-4 flex justify-between items-center"
                  >
                    <h1 className=" text-md text-[#4C577C]">Notification</h1>
                    <p
                      className="cursor-pointer text-sm text-[#9198AF]"
                      onClick={openModal}
                    >
                      View all
                    </p>
                  </div>
                  <Divider className="m-0" />
                  <div id="body-notification" className=""></div>
                </div>
              </div>
              <div className="h-3/5 ">
                <Calendar
                  formatShortWeekday={(locale, value) =>
                    ["Su","Mo", "Tu", "We", "Th", "Fr", "Sa",][value.getDay()]
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
