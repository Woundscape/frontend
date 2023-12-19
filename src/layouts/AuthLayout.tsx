import Menu from "@components/Menu";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <>
      <div className="flex w-full bg-[#EEEEEE] relative">
        <div className="flex w-full h-screen gap-5 relative">
          <div className="bg-white py-6 rounded-tr-2xl rounded-br-2xl">
            <Menu />
          </div>
          <div className="relative grow">
            <Outlet />
          </div>
          <div className="w-full absolute text-center bottom-5 michroma text-sm select-none text-[#626060]">
            © 2023 Copyright – Woundscape – All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
}
