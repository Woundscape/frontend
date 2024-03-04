import {
  Avatar,
  ConfigProvider,
  List,
  Modal,
  Segmented,
  Collapse,
  Image,
  Button,
} from "antd";
import UnreadIcon from "@assets/unread-noti-icon.svg";
import { optionNotification } from "@utils/option";
import DoctorMock from "@assets/icons/doctor_mock.svg";
import ImgMock from "@assets/wound/img_5.jpg";
import { useEffect, useState } from "react";
import { listConfig } from "@config";
import { getNotification } from "@api-caller";
import { INotification, NotificationType } from "@constants";
import { useAuth } from "./AuthProvider";
import { formatImage } from "@utils";
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
      //NOTE - if noti_type == 'all' show them all
      let filterData = filterType
        ? data.filter((item) => item.noti_type === filterType)
        : data;
      setFormatData(filterData);
    }
  }, [filterType]);

  useEffect(() => {
    if (me) {
      getNotification(me).then((response: INotification[]) => {
        setData(response);
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
                  if (item.noti_type != NotificationType.CONSULT) {
                    return (
                      <List.Item key={index}>
                        <List.Item.Meta
                          avatar={
                            <Avatar src={UnreadIcon} className="rounded-none" />
                          }
                          className="p-4 jura hover:bg-[#f2f1f1]"
                          title={
                            <p>
                              {item.noti_desc}{" "}
                              <span className="text-[#61708C]">
                                {item.noti_type} #{item.noti_id}
                              </span>
                            </p>
                          }
                          description={item.created_at}
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
                              <div className="flex h-16 w-[7rem]">
                                <img src={UnreadIcon} width={32} alt="" />
                              </div>
                              <div className="flex p-4 space-x-1">
                                <div className="flex flex-col">
                                  <div className="flex flex-wrap">
                                    <p>
                                      litia cupiditate? Possimus voluptatem modi
                                      doloremque ad ratione error perferendis
                                      incidunt, numquam mollitia ipsam neque
                                      autem atque molestias blanditiis tenetur.
                                      has sent you a Patient for Lorem ipsum
                                      dolor sit amet.
                                    </p>
                                  </div>
                                  <p className="text-[#908F8F]">1 hour ago</p>
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
                              <div className=" flex p-3 gap-3">
                                <img src={DoctorMock} className="w-8" alt="" />
                                <div className="jura flex flex-col">
                                  <p className="text-[#424241]">Dr.Prasert</p>
                                  <p className="text-xs text-[#B4B4B4]">
                                    Doctor
                                  </p>
                                </div>
                              </div>
                              <p className="text-[#61708C]">Consult #6643793</p>
                            </div>
                            <div className="flex p-3 w-full">
                              <div className="flex flex-col space-y-3">
                                <div className="text-lg jura text-[#61708C] underline ">
                                  Title na kub
                                </div>
                                <p className="jura text-[#9198AF] bg-gray-100 p-2 rounded text-[.8rem]">
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Facilis iusto hic magni
                                  autem esse est placeat temporibus earum. Dolor
                                  architecto adipisci ipsam laboriosam officiis
                                  odio necessitatibus id porro eaque ipsum.
                                </p>
                                <div className="flex gap-2 flex-wrap">
                                  {item.noti_img?.length > 0 &&
                                    item.noti_img.map(
                                      (image: string, index: number) => {
                                        return (
                                          <Image
                                            key={index}
                                            width={100}
                                            src={formatImage(image)}
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
