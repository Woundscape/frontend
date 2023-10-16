import UnreadIcon from "@assets/unread-noti-icon.svg";
import { List, Avatar, Divider } from "antd";
export default function ListNotification() {
  function openModal() {
    return false;
  }
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
            onClick={openModal}
          >
            View all
          </p>
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
