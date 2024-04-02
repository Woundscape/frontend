import { Button, Collapse, Image } from "antd";
import UnreadIcon from "@assets/unread-noti-icon.svg";
import { formatDate, formatImage } from "@utils";
import { INotification } from "@constants";
import { useState } from "react";
import Avatar from "react-avatar";

const Panel = Collapse.Panel;

interface IConfirmConsultProps {
  name: string;
  data: INotification;
  onAccept: (data: INotification) => void;
  onDecline: (data: INotification) => void;
}

export default function ConfirmConsult({
  name,
  data,
  onAccept,
  onDecline,
}: IConfirmConsultProps) {
  const [viewMore, setViewMore] = useState(false);

  const handleCollapse = () => {
    setViewMore(!viewMore);
  };

  return (
    <>
      <Collapse bordered={false}>
        <Panel
          key={data.noti_id}
          showArrow={false}
          header={
            <div
              className="flex px-4 jura hover:bg-[#f2f1f1]"
              onClick={handleCollapse}
            >
              <div className="flex h-16">
                <img src={UnreadIcon} width={32} alt="" />
              </div>
              <div className="flex p-4 space-x-1">
                <div className="flex flex-col">
                  <span>{`${name} has sent you a message`}</span>
                  <p className="text-[#908F8F]">
                    {formatDate(data.created_at)}
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
        >
          <div className="border rounded">
            <div className="jura border-b-2 flex justify-between items-center pr-5">
              <div className="w-1/2 flex p-3 gap-3">
                <Avatar name={name} size="40" round="20px" />
                <div className="w-full jura flex flex-col">
                  <p className="w-full text-[#424241] truncate">{name}</p>
                  <p className="text-xs text-[#B4B4B4]">Doctor</p>
                </div>
              </div>
              <p className="w-1/2 text-[#61708C] truncate text-right">
                Consult #{data.hn_id}
              </p>
            </div>
            <div className="flex p-3 w-full">
              <div className="flex flex-col space-y-3">
                <div className="text-lg jura text-[#61708C] underline ">
                  {data.noti_title}
                </div>
                <p className="jura text-[#9198AF] bg-gray-100 p-2 rounded text-[.8rem]">
                  {data.noti_desc}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {data.noti_img?.length > 0 &&
                    data.noti_img.map((image: string, index: number) => {
                      return (
                        <Image
                          key={index}
                          width={100}
                          height={100}
                          src={formatImage(image)}
                          className="object-cover rounded"
                        />
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="border-t-2 w-full"></div>
            <div className="flex p-3 gap-3 justify-end">
              <Button
                onClick={() => onDecline(data)}
                className="px-9 h-7 flex items-center jura text-[.8rem] rounded border-2 text-[#4C577C] border-[#8087A7] "
              >
                Decline
              </Button>
              <Button
                onClick={() => onAccept(data)}
                className="px-9 h-7 flex items-center jura text-[.8rem] bg-[#D2D4EB] text-[#4C577C] border-[#8087A7] border-2 rounded"
              >
                Accept
              </Button>
            </div>
          </div>
        </Panel>
      </Collapse>
    </>
  );
}
