import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Dashboard_LOGO from "@assets/dashboard-logo.svg";
import Patient_LOGO from "@assets/patient_logo.svg";
import Equipment_LOGO from "@assets/equipment_logo.svg";
import Account_LOGO from "@assets/account_logo.svg";
import Contact_LOGO from "@assets/contact_logo.svg";
import Logo_Wound from "@assets/logo-wound.svg";

export interface IMenu {
  title: string;
  pathname: string;
  icon: string;
}

const defaultMenuRoutes: IMenu[] = [
  {
    title: "Dashboard",
    pathname: "/dashboard",
    icon: Dashboard_LOGO,
  },
  {
    title: "Patient",
    pathname: "/patient",
    icon: Patient_LOGO,
  },
  {
    title: "Equipment",
    pathname: "/equipment",
    icon: Equipment_LOGO,
  },
  {
    title: "Account",
    pathname: "/account",
    icon: Account_LOGO,
  },
  {
    title: "Contact Us",
    pathname: "/contactus",
    icon: Contact_LOGO,
  },
];

export default function Menu() {
  const [menus] = useState<IMenu[]>(defaultMenuRoutes);
  const location = useLocation();
  console.log(location);
  return (
    <>
      <nav id="nav">
        <div className="w-[16rem] py-6">
          <div className="flex justify-center items-center">
            <img height={40} width={40} src={Logo_Wound} alt="" />
            <p className="michroma text-lg">Woundscape</p>
          </div>
        </div>
        <ul className="space-y-2 px-6">
          {menus?.map((item, index) => (
            <li className=" text-de" key={index}>
              <NavLink
                to={item.pathname}
                className={`flex py-3 px-4 rounded-lg ${
                  location.pathname === item.pathname
                    ? "bg-[#D2D7EB]"
                    : "hover:bg-[#EEEEEE]"
                }`}
              >
                <img src={item.icon} width={20} alt="" />
                <span className="ml-3 text-sm jura">{item.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
