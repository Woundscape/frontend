import Avatar from "react-avatar";
import { Dropdown, Typography } from "antd";
import type { MenuProps } from "antd";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import { IoNotifications } from "react-icons/io5";
import { useState } from "react";
import NotiModal from "@components/NotiModal";
import { useAuth } from "@components/AuthProvider";
import { Content } from "antd/es/layout/layout";
import { IoLogOutOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
export default function UserProfile() {
  const { me, logout } = useAuth();
  const fullName = me?.firstname + " " + (me?.lastname?.[0] ?? "")+".";
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex gap-1 items-center">
          <IoSettingsOutline size={17} color="#424241"/>
          <p className="jura text-[#424241] hover:text-[#424241]">
            Edit Profile
          </p>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={logout} className="flex gap-1 items-center">
          <IoLogOutOutline size={18} color="#424241"/>
          <p className="jura text-[#424241] hover:text-[#424241]">Logout</p>
        </div>
      ),
    },
  ];
  return (
    <div id="user-profile" className="px-4 select-none">
      <Content className="flex justify-end items-center space-x-3">
        <IoNotifications size={28} color="#E5C17E" onClick={handleModal}/>
        <NotiModal isOpen={openModal} setModal={handleModal} />
        <Avatar name={fullName} size="40" round="20px" />
        <div className="jura">
          <Typography id="user_fullname" className="text-[#535352] jura">
            {fullName}
          </Typography>
          <span id="user_role" className="text-[#4C577C]">
            {me?.doctor_type}
          </span>
        </div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <img className="pl-2" src={DownOutlinedIcon} />
        </Dropdown>
      </Content>
    </div>
  );
}
