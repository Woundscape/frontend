import { useState } from "react";
import { List, Avatar, Divider, ConfigProvider } from "antd";
import UnreadIcon from "@assets/unread-noti-icon.svg";
import NotiModal from "@components/NotiModal";
import { INotification, NotificationType } from "@constants";
import { Content } from "antd/es/layout/layout";
import { capitalizeFirstLetter, formatDate } from "@utils";
import { listConfig } from "@config";

interface IListNotificationProps {
  isLoading: boolean;
  data: INotification[];
}

export default function ListNotification({
  isLoading,
  data,
}: IListNotificationProps) {
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <Content
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
          <NotiModal isOpen={openModal} setModal={handleModal} />
        </div>
        <Divider className="m-0" />
        <ConfigProvider theme={listConfig}>
          <div className="flex flex-col h-24 overflow-y-auto grow">
            <List
              loading={isLoading}
              dataSource={data}
              renderItem={(item, index) => {
                const senderName =
                  item.sender.user_firstname + " " + item.sender.user_lastname;
                return (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src={UnreadIcon} className="rounded-none" />
                      }
                      className="p-4 jura hover:bg-[#EEE]"
                      title={
                        <div className="space-x-2">
                          <span>
                            {item.noti_type == NotificationType.CONSULT
                              ? `${senderName} has sent you a message`
                              : item.noti_title}
                          </span>
                          <span className="text-[#61708C]">
                            {capitalizeFirstLetter(item.noti_type)} #
                            {item.hn_id}
                          </span>
                        </div>
                      }
                      description={formatDate(item.created_at)}
                    />
                  </List.Item>
                );
              }}
            />
          </div>
        </ConfigProvider>
      </Content>
    </>
  );
}
