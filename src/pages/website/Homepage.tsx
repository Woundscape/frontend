import logo_it from "@assets/it-logo.svg";
import logo_wound from "@assets/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";

function Homepage() {
  return (
    <div className="bg-homepage h-screen w-full">
      <div className="flex flex-col h-full justify-between ">
        <div className="flex justify-between w-full p-10">
          <img className="w-72" src={logo_it} alt="" />
          <button className="btn-homepage w-28 h-8 jura">sign in</button>
        </div>
        <div className="flex justify-between w-full p-14">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center">
              <img className="w-24" src={logo_wound} alt="" />
              <p className="text-5xl michroma font-blackbean">Woundscape</p>
            </div>
            <div className="flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
              <div className="text-xl jura font-bold">START</div>
              <img className="w-14" src={arrow_start} alt="" />
            </div>
          </div>
          <div className="flex flex-col justify-end items-end michroma space-y-2">
            <p className="text-2xl font-brown">contact us</p>
            <p className="">
              © 2023 Copyright – Woundscape – All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Homepage;
