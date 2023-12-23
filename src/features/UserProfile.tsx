import { Avatar, Divider, Dropdown, List, Modal } from "antd";
import type { MenuProps } from "antd";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import UndefinedProfile from "@assets/undefined-profile-icon.svg";
import NotificationIcon from "@assets/noti-icon.svg";
import NotiAll from "@assets/icons/all_noti.svg";
import PatientNote from "@assets/icons/patient_note_noti.svg";
import SuggestNoti from "@assets/icons/sugggest_noti.svg";
import { useState } from "react";
import UnreadIcon from "@assets/unread-noti-icon.svg";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        Edit Profile
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
        Logout
      </a>
    ),
  },
];
export default function UserProfile() {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const data = [
    {
      id: "Consult #6643793",
      message: "Dr.Prasert has sent you a message",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: "Consult #6643793",
      message: "Dr.Prasert has sent you a message",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: "Consult #6643793",
      message: "Dr.Prasert has sent you a message",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: "Consult #6643793",
      message: "Dr.Prasert has sent you a message",
      time: "1 hour ago",
      status: "unread",
    },
    {
      id: "Consult #6643793",
      message: "Dr.Prasert has sent you a message",
      time: "1 hour ago",
      status: "unread",
    },
  ];
  return (
    <div id="user-profile" className="px-4 select-none">
      <div className="flex justify-end items-center space-x-3">
        <img
          onClick={handleModal}
          src={NotificationIcon}
          width={45}
          height={45}
          alt=""
        />
        <Modal
          open={openModal}
          onOk={handleModal}
          onCancel={handleModal}
          width={630}
          style={{
            borderRadius: "1.25rem",
          }}
        >
          <div className="flex flex-col space-y-5 h-96">
            <div className="w-full text-[#4C577C] text-lg">Notification</div>
            <Divider className="m-0" />
            <div className="flex text-[#4C577C] space-x-7">
              <div className="flex justify-center items-center cursor-pointer rounded-full space-x-2 bg-[#EEEEEE] w-[4.5rem] ">
                <img src={NotiAll} className="w-5.5" alt="" />
                <p>All</p>
              </div>
              <div className="flex space-x-1.5 cursor-pointer">
                <img className="w-5" src={PatientNote} alt="" />
                <p className="w-24">Patient note</p>
              </div>
              <div className="flex space-x-1.5 cursor-pointer">
                <img className="w-5" src={SuggestNoti} alt="" />
                <p className="w-24">Suggestion</p>
              </div>
            </div>
            <div className="flex flex-col h-24 overflow-y-auto grow">
              <List
                dataSource={data}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={UnreadIcon} className="rounded-none" />
                      }
                      className="p-4 jura hover:bg-[#f2f1f1]"
                      title={
                        <p>
                          {item.message}{" "}
                          <span className="text-[#61708C]">{item.id}</span>
                        </p>
                      }
                      description={item.time}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Modal>
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
  );
}
