import Avatar from "react-avatar";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import UndefinedProfile from "@assets/undefined-profile-icon.svg";
import NotificationIcon from "@assets/noti-icon.svg";
import { useState } from "react";
import NotiModal from "@components/NotiModal";
import { useAuth } from "@components/AuthProvider";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
        className="jura"
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
        className="jura"
      >
        Logout
      </a>
    ),
  },
];
export default function UserProfile() {
  const { me } = useAuth();
  const fullName = me?.firstname + " " + me?.lastname;
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <div id="user-profile" className="px-4 select-none">
      <div className="flex justify-end items-center space-x-3">
        <img
          onClick={handleModal}
          src={NotificationIcon}
          width={45}
          height={45}
        />
        <NotiModal isOpen={openModal} setModal={handleModal} />
        <Avatar name={fullName} size="40" round="20px" />
        <div className="jura">
          <p id="user_fullname" className="text-[#535352]">
            {fullName}
          </p>
          <span id="user_role" className="text-[#4C577C]">
            {me?.doctor_type}
          </span>
        </div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <img className="pl-2" src={DownOutlinedIcon} />
        </Dropdown>
      </div>
    </div>
  );
}
