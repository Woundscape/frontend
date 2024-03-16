import { useEffect, useState } from "react";
import {
  ConfigProvider,
  List,
  Modal,
  Segmented,
  Collapse,
  Image,
  Button,
} from "antd";
import UnreadIcon from "@assets/unread-noti-icon.svg";
import { useAuth } from "./AuthProvider";
import { listConfig } from "@config";
import { getNotification } from "@api-caller";
import { formatDate, formatImage, optionNotification } from "@utils";
import { INotification, NotificationType } from "@constants";
import Avatar from "react-avatar";
const Panel = Collapse.Panel;
interface NotificationModalProps {
  isOpen: boolean;
  setModal: () => void;
}

export default function NotiModal({
  isOpen,
  setModal,
}: NotificationModalProps) {
  const { me } = useAuth();
  const [data, setData] = useState<INotification[]>([]);
  const [formatData, setFormatData] = useState<INotification[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [viewMore, setViewMore] = useState(false);
  const handleFilter = (type: any) => {
    setFilterType(type);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      let filterData =
        filterType != "all"
          ? data.filter((item) => item.noti_type === filterType)
          : data;
      setFormatData(filterData);
    }
  }, [filterType]);

  useEffect(() => {
    if (me) {
      getNotification(me).then((response: INotification[]) => {
        setData(response);
        setFormatData(response);
      });
    }
  }, [isOpen]);

  const onMouseClick = () => {
    setViewMore(!viewMore);
  };

  return (
    <>
      <Modal
        destroyOnClose
        open={isOpen}
        onOk={setModal}
        onCancel={setModal}
        width={630}
        title={"Notification"}
        footer={null}
        style={{
          borderRadius: "1.25rem",
        }}
      >
        <ConfigProvider theme={listConfig}>
          <div className="flex flex-col space-y-5 h-[30rem]">
            <div className="flex text-[#4C577C] space-x-7">
              <div id="head__notification">
                <Segmented
                  className="jura select-none"
                  options={optionNotification}
                  onChange={(stage: any) => handleFilter(stage)}
                />
              </div>
            </div>
            <div className="flex flex-col h-24 overflow-y-auto grow">
              <List
                dataSource={formatData}
                renderItem={(item, index) => {
                  const senderName =
                    item.sender.user_firstname +
                    " " +
                    item.sender.user_lastname;
                  if (item.noti_type != NotificationType.CONSULT) {
                    return (
                      <List.Item key={index}>
                        <List.Item.Meta
                          avatar={<img src={UnreadIcon} width={32} alt="" />}
                          className="p-4 jura hover:bg-[#f2f1f1]"
                          title={
                            <p>
                              {item.noti_desc}{" "}
                              <span className="text-[#61708C]">
                                {item.noti_type} #{item.noti_id}
                              </span>
                            </p>
                          }
                          description={formatDate(item.created_at)}
                        />
                      </List.Item>
                    );
                  } else {
                    return (
                      <Collapse bordered={false} className="">
                        <Panel
                          showArrow={false}
                          header={
                            <div
                              className="flex px-4 jura hover:bg-[#f2f1f1]"
                              onClick={onMouseClick}
                            >
                              <div className="flex h-16">
                                <img src={UnreadIcon} width={32} alt="" />
                              </div>
                              <div className="flex p-4 space-x-1">
                                <div className="flex flex-col">
                                  {item.noti_title}
                                  <p className="text-[#908F8F]">
                                    {formatDate(item.created_at)}
                                  </p>
                                  <div className="flex gap-2">
                                    <p className="text-[#61708C] hover:underline ">
                                      {viewMore ? "Less More" : "View More"}
                                    </p>
                                    <p className="text-[#61708C]">v</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                          key="1"
                        >
                          <div className="border rounded">
                            <div className="jura border-b-2 flex justify-between items-center pr-5">
                              <div className="w-1/2 flex p-3 gap-3">
                                <Avatar
                                  name={senderName}
                                  size="40"
                                  round="20px"
                                />
                                <div className="w-full jura flex flex-col">
                                  <p className="w-full text-[#424241] truncate">
                                    {senderName}
                                  </p>
                                  <p className="text-xs text-[#B4B4B4]">
                                    Doctor
                                  </p>
                                </div>
                              </div>
                              <p className="w-1/2 text-[#61708C] truncate">
                                Consult #{item.noti_id}
                              </p>
                            </div>
                            <div className="flex p-3 w-full">
                              <div className="flex flex-col space-y-3">
                                <div className="text-lg jura text-[#61708C] underline ">
                                  {item.noti_title}
                                </div>
                                <p className="jura text-[#9198AF] bg-gray-100 p-2 rounded text-[.8rem]">
                                  {item.noti_desc}
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                  {item.noti_img?.length > 0 &&
                                    item.noti_img.map(
                                      (image: string, index: number) => {
                                        return (
                                          <Image
                                            key={index}
                                            width={100}
                                            height={100}
                                            src={formatImage(image)}
                                            className="object-cover rounded"
                                          />
                                        );
                                      }
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className="border-t-2 w-full"></div>
                            <div className="flex p-3 gap-3 justify-end">
                              <Button className="px-9 h-7 flex items-center jura text-[.8rem] rounded border-2 text-[#4C577C] border-[#8087A7] ">
                                Decline
                              </Button>
                              <Button className="px-9 h-7 flex items-center jura text-[.8rem] bg-[#D2D4EB] text-[#4C577C] border-[#8087A7] border-2 rounded">
                                Accept
                              </Button>
                            </div>
                          </div>
                        </Panel>
                      </Collapse>
                    );
                  }
                }}
              />
              {/* noti with button in Sugggestion Tab */}
            </div>
          </div>
        </ConfigProvider>
      </Modal>
    </>
  );
}
