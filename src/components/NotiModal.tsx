import { useEffect, useState } from "react";
import { ConfigProvider, List, Modal, Segmented } from "antd";
import { UseMutationResult, useMutation } from "react-query";
import { useAuth } from "./AuthProvider";
import ConfirmConsult from "./ConfirmConsult";
import UnreadIcon from "@assets/unread-noti-icon.svg";
import {
  IFormattedErrorResponse,
  INotification,
  NotificationType,
} from "@constants";
import { listConfig } from "@config";
import { formatDate, optionNotification } from "@utils";
import {
  IAcceptConsult,
  acceptConsult,
  declineConsult,
  getNotification,
} from "@api-caller";
interface NotificationModalProps {
  isOpen: boolean;
  setModal: () => void;
}

export default function NotiModal({
  isOpen,
  setModal,
}: NotificationModalProps) {
  const { me } = useAuth();
  const acceptMutation: UseMutationResult<
    any,
    IFormattedErrorResponse,
    IAcceptConsult
  > = useMutation(acceptConsult);
  const declineMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    string
  > = useMutation(declineConsult);
  const [data, setData] = useState<INotification[]>([]);
  const [formatData, setFormatData] = useState<INotification[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
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
  }, [filterType, data]);

  useEffect(() => {
    getNotificationByMe();
  }, [isOpen]);

  async function getNotificationByMe() {
    if (me) {
      setIsLoading(true);
      getNotification(me).then((response: INotification[]) => {
        setData(response);
        setFormatData(response);
        setIsLoading(false);
      });
    }
  }

  const onAccept = async (data: INotification) => {
    try {
      const body: IAcceptConsult = {
        noti_id: data.noti_id,
        hn_id: data.hn_id ?? "",
        doctor_id: me?.doctor_id ?? "",
        case_id: data.case_id ?? "",
      };
      acceptMutation.mutate(body, {
        onSuccess: (response) => {
          getNotificationByMe();
          //TODO - notify when success
        },
        onError: (response) => {
          //TODO - notify when error
        },
      });
    } catch (error) {
      console.log("Accept Consult Error", error);
    }
  };

  const onDecline = async (data: INotification) => {
    try {
      declineMutation.mutate(data.noti_id, {
        onSuccess: () => {
          getNotificationByMe();
          //TODO - notify when success
        },
        onError: () => {
          //TODO - notify when error
        },
      });
    } catch (error) {
      console.log("Decline Consult Error", error);
    }
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
                loading={isLoading}
                dataSource={formatData}
                renderItem={(item, index) => {
                  const senderName =
                    item.sender.user_firstname +
                    " " +
                    item.sender.user_lastname;
                  if (item.approveStatus) {
                    return (
                      <List.Item key={index}>
                        <List.Item.Meta
                          avatar={<img src={UnreadIcon} width={32} />}
                          className="p-4 jura hover:bg-[#f2f1f1]"
                          title={
                            <p className="space-x-2">
                              <span>
                                {item.noti_type == NotificationType.CONSULT
                                  ? `${senderName} has sent you a message`
                                  : item.noti_title}
                              </span>
                              <span className="text-[#61708C]">
                                {item.noti_type} #{item.hn_id}
                              </span>
                            </p>
                          }
                          description={formatDate(item.created_at)}
                        />
                      </List.Item>
                    );
                  } else {
                    return (
                      <ConfirmConsult
                        name={senderName}
                        data={item}
                        onAccept={onAccept}
                        onDecline={onDecline}
                      />
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
