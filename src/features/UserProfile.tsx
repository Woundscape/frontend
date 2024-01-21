import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import UndefinedProfile from "@assets/undefined-profile-icon.svg";
import NotificationIcon from "@assets/noti-icon.svg";
import { useState } from "react";
import NotiModal from "@components/NotiModal";

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
          alt=""
        />
        <NotiModal isOpen={openModal} setModal={handleModal} />
        <img src={UndefinedProfile} width={40} height={40} alt="" />
        <div className="jura">
          <p id="user_fullname" className="text-[#535352]">
            Phufa R.
          </p>
          <span id="user_role" className="text-[#4C577C]">
            doctor
          </span>
        </div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <img className="pl-2" src={DownOutlinedIcon} alt="" />
        </Dropdown>
      </div>
    </div>
  );
}
