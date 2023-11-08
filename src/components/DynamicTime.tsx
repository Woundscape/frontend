import { Divider } from "antd";
import { useEffect, useState } from "react";

export default function DynamicTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  return (
    <div
      id="time"
      className="relative flex flex-col space-y-2 justify-center items-center jura bg-white rounded-xl py-4"
    >
      <p className="top-1 absolute text-xs text-[#868686]">Time</p>
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center space-y-1">
          <h1 className="px-4 py-2 bg-[#EDEFFF] text-[#626060] rounded-lg text-2xl">
            {hours < 10 ? `0${hours}` : hours}{" "}
          </h1>
          <h2 className="text-[#4C577C] text-xs">HOURS</h2>
        </div>
        <Divider className="" type="vertical" />
        <div className="flex flex-col items-center space-y-1">
          <h1 className="px-4 py-2 bg-[#EDEFFF] text-[#626060] rounded-lg text-2xl">
            {minutes < 10 ? `0${minutes}` : minutes}
          </h1>
          <h2 className="text-[#4C577C] text-xs">MINUTES</h2>
        </div>
        <Divider type="vertical" />
        <div className="flex flex-col items-center space-y-1">
          <h1 className="px-4 py-2 bg-[#EDEFFF] text-[#626060] rounded-lg text-2xl">
            {seconds < 10 ? `0${seconds}` : seconds}
          </h1>
          <h2 className="text-[#4C577C] text-xs">SECONDS</h2>
        </div>
      </div>
    </div>
  );
}