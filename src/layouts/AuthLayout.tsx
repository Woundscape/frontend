import Menu from "@components/Menu";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const checkParamsPatient = location.pathname.split("/patient/")[1];
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
          {!checkParamsPatient && (
            <div className="w-full absolute text-center bottom-5 michroma text-sm select-none text-[#626060]">
              © 2023 Copyright – Woundscape – All Rights Reserved.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
