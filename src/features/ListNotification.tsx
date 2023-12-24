import UnreadIcon from "@assets/unread-noti-icon.svg";
import { List, Avatar, Divider, Modal } from "antd";
import { useState } from "react";
import NotiAll from "@assets/icons/all_noti.svg";
import PatientNote from "@assets/icons/patient_note_noti.svg";
import SuggestNoti from "@assets/icons/sugggest_noti.svg";

export default function ListNotification() {
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
    <>
      <div
        id="notification-box"
        className="w-full h-full flex flex-col jura select-none bg-white rounded-xl"
      >
        <div
          id="header-notification"
          className="py-4 px-4 flex justify-between items-center"
        >
          <h1 className=" text-md text-[#4C577C]">Notification</h1>
          <p
            className="cursor-pointer text-sm text-[#9198AF]"
            onClick={handleModal}
          >
            View all
          </p>
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
        </div>
        <Divider className="m-0" />
        <div className="flex flex-col h-24 overflow-y-auto grow">
          <List
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={<Avatar src={UnreadIcon} className="rounded-none" />}
                  className="px-4 jura hover:bg-[#EEE]"
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
    </>
  );
}
