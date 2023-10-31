import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import DownOutlinedIcon from "@assets/down-outlined-icon.svg";
import UndefinedProfile from "@assets/undefined-profile-icon.svg";
import NotificationIcon from "@assets/noti-icon.svg";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
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
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

export default function UserProfile() {
  return (
    <div id="user-profile" className="px-4 select-none">
      <div className="flex justify-end items-center space-x-3">
        <img src={NotificationIcon} width={45} height={45} alt="" />
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
