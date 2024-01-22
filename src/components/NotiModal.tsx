import { Avatar, Divider, List, Modal } from "antd";
import React, { useState } from "react";
import NotiAll from "@assets/icons/all_noti.svg";
import PatientNoteIcon from "@assets/icons/patient_note_noti.svg";
import SuggestNotiIcon from "@assets/icons/sugggest_noti.svg";
import UnreadIcon from "@assets/unread-noti-icon.svg";

interface NotificationModalProps {
  isOpen: boolean;
  setModal: () => void;
}

export default function NotiModal({
  isOpen,
  setModal,
}: NotificationModalProps) {
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
      <Modal
        open={isOpen}
        onOk={setModal}
        onCancel={setModal}
        width={630}
        footer={null}
        style={{
          borderRadius: "1.25rem",
        }}
      >
        <div className="flex flex-col space-y-5 h-[30rem]">
          <div className="w-full text-[#4C577C] text-lg">Notification</div>
          <Divider className="m-0" />
          <div className="flex text-[#4C577C] space-x-7">
            <div className="flex justify-center items-center cursor-pointer rounded-full space-x-2 bg-[#EEEEEE] w-[4.5rem] ">
              <img src={NotiAll} className="w-5.5" alt="" />
              <p>All</p>
            </div>
            <div className="flex space-x-1.5 cursor-pointer">
              <img className="w-5" src={PatientNoteIcon} alt="" />
              <p className="w-24">Patient note</p>
            </div>
            <div className="flex space-x-1.5 cursor-pointer">
              <img className="w-5" src={SuggestNotiIcon} alt="" />
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

            {/* noti with button in Sugggestion Tab */}
            <div className="flex p-4 jura hover:bg-[#f2f1f1]">
              <div className="flex h-16">
                <img src={UnreadIcon} className="w-8" alt="" />
              </div>
              <div className="flex p-4 space-x-1">
                <div className="flex flex-col">
                  <div className="flex">
                    <p className="">Dr.Prasert has sent you a message</p>
                    <p className="text-[#61708C]">Consult #6643793</p>
                  </div>
                  <p className="text-[#908F8F]">1 hour ago</p>
                  <div className="flex space-x-3 mt-3">
                    <div className=" px-5 text-[.8rem] bg-[#D2D4EB] text-[#4C577C] border-[#8087A7] border-2 rounded">
                      Accept
                    </div>
                    <div className="px-5 text-[.8rem] rounded border-2 border-[#8087A7] ">
                      Decline
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}