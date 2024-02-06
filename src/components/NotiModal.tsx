import {
  Avatar,
  ConfigProvider,
  Divider,
  List,
  Modal,
  Segmented,
  Collapse,
  Image,
} from "antd";
import UnreadIcon from "@assets/unread-noti-icon.svg";
import { optionNotification } from "@utils/option";
import DoctorMock from "@assets/icons/doctor_mock.svg";
import ImgMock from "@assets/wound/img_5.jpg";
const Panel = Collapse.Panel;
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
            <ConfigProvider
              theme={{
                components: {
                  Segmented: {
                    itemSelectedBg: "#EEEEEE",
                    itemSelectedColor: "#424241",
                    itemHoverBg: "transparent",
                    itemColor: "#4C577C",
                    colorBgContainer: "red",
                  },
                },
              }}
            >
              <div id="head__notification">
                <Segmented
                  className="jura select-none"
                  options={optionNotification}
                  onChange={(stage: any) => {}}
                />
              </div>
            </ConfigProvider>
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
            <Collapse bordered={false} className="">
              <Panel
                showArrow={false}
                header={
                  <div className="flex jura hover:bg-[#f2f1f1]">
                    <div className="flex h-16">
                      <img src={UnreadIcon} className="w-8" alt="" />
                    </div>
                    <div className="flex p-4 space-x-1">
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <p className="">Dr.Prasert has sent you a message</p>
                          <p className="text-[#61708C]">Consult #6643793</p>
                        </div>
                        <p className="text-[#908F8F]">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                }
                key="1"
              >
                <div className="border rounded">
                  <div className="border-b-2 flex p-3 gap-3">
                    <img src={DoctorMock} className="w-8" alt="" />
                    <div className="jura flex flex-col">
                      <p className="text-[#424241]">Dr.Prasert</p>
                      <p className="text-xs text-[#B4B4B4]">Doctor</p>
                    </div>
                  </div>
                  <div className="flex p-3">
                    <div className="flex flex-col space-y-3">
                      <div className="text-lg jura text-[#61708C]">
                        Title na kub
                      </div>
                      <p className="jura text-[#9198AF] bg-gray-100 p-2 rounded text-[.8rem]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Facilis iusto hic magni autem esse est placeat
                        temporibus earum. Dolor architecto adipisci ipsam
                        laboriosam officiis odio necessitatibus id porro eaque
                        ipsum.
                      </p>
                      <Image width={100} src={ImgMock} />
                      <div className="flex gap-3">
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
              </Panel>
            </Collapse>
          </div>
        </div>
      </Modal>
    </>
  );
}
