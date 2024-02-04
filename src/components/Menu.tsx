import { List } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Dashboard_LOGO from "@assets/logo/dashboard-logo.svg";
import Patient_LOGO from "@assets/logo/patient_logo.svg";
import Equipment_LOGO from "@assets/logo/equipment_logo.svg";
import Allocation_LOGO from "@assets/logo/allocation_logo.svg";
import UserManage_LOGO from "@assets/logo/user_manage_logo.svg";
import Account_LOGO from "@assets/logo/account_logo.svg";
import Logo_Wound from "@assets/logo/logo-wound.svg";
import ImageMenu from "./ImageMenu";
import { DoctorType } from "@constants";
import { useAuth } from "./AuthProvider";

interface IMenu {
  title: string;
  pathname: string;
  icon: string;
  required: string;
}

const defaultMenuRoutes: IMenu[] = [
  {
    title: "Dashboard",
    pathname: "/dashboard",
    icon: Dashboard_LOGO,
    required: DoctorType.Doctor,
  },
  {
    title: "Patient",
    pathname: "/patient",
    icon: Patient_LOGO,
    required: DoctorType.Doctor,
  },
  {
    title: "Equipment",
    pathname: "/equipment",
    icon: Equipment_LOGO,
    required: DoctorType.Doctor,
  },
  // {
  //   title: "Archive",
  //   pathname: "/archive",
  //   icon: Archive_LOGO,
  // },
  {
    title: "Allocation",
    pathname: "/allocation",
    icon: Allocation_LOGO,
    required: DoctorType.Doctor,
  },
  {
    title: "Users Management",
    pathname: "/management",
    icon: UserManage_LOGO,
    required: DoctorType.Doctor,
  },
  {
    title: "Account",
    pathname: "/account",
    icon: Account_LOGO,
    required: DoctorType.Doctor,
  },
];

export default function Menu() {
  const [menus] = useState<IMenu[]>(defaultMenuRoutes);
  const location = useLocation();
  const pathName = location?.pathname;
  const { me } = useAuth();
  function ListMenu() {
    return menus?.map((item, index) => {
      if (
        true ||
        me?.doctor_type == DoctorType.Admin ||
        item.required == me?.doctor_type
      )
        return (
          <List.Item key={index}>
            <NavLink
              to={item.pathname}
              className={`flex py-3 px-4 rounded-lg ${
                pathName.startsWith(item.pathname)
                  ? "bg-[#D2D7EB]"
                  : "hover:bg-[#EEEEEE]"
              }`}
            >
              <img src={item.icon} width={20} alt="" />
              <span className="ml-3 text-sm jura">{item.title}</span>
            </NavLink>
          </List.Item>
        );
    });
  }
  return (
    <>
      <nav
        id="nav"
        className="w-[16rem] h-full flex flex-col justify-center select-none"
      >
        <div className="py-6">
          <NavLink
            to={"/dashboard"}
            className="flex justify-center items-center"
          >
            <img height={40} width={40} src={Logo_Wound} alt="" />
            <p className="michroma text-lg">Woundscape</p>
          </NavLink>
        </div>
        <div className="grow pb-6 overflow-y-auto">
          <ul className="space-y-2 px-6">
            {pathName.split("/")[1] != "wound" ? ListMenu() : <ImageMenu />}
          </ul>
        </div>
      </nav>
    </>
  );
}
