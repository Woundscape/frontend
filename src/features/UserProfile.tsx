import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import UndefinedProfile from "@assets/undefined-profile-icon.svg";
import NotificationIcon from "@assets/noti-icon.svg";
import { useState } from "react";
import NotiModal from "@components/NotiModal";
import LogoutIcon from "@assets/icons/logout.svg";
import EditProfileIcon from "@assets/icons/editProfile.svg";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className="flex gap-1">
        <img src={EditProfileIcon} width={20} height={20} alt="" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
          className="jura text-[#424241] hover:text-[#424241]"
        >
          Edit Profile
        </a>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="flex gap-1">
        <img src={LogoutIcon} width={20} height={20} alt="" />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
          className="jura text-[#424241] hover:text-[#424241]"
        >
          Logout
        </a>
      </div>
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
