import logo_wound from "@assets/logo/logo-wound.svg";
import logo_it from "@assets/it-logo.svg";
import doctor_women from "@assets/doctor_women.svg";
import { Button } from "antd";
function NotApprove() {
  return (
    <div className=" w-full bg-white h-screen p-6">
      <div className="noApprove-background w-full h-full rounded-2xl flex flex-col justify-center items-center ">
        <div className="w-96 text-center jura text-lg space-y-3">
          <div className="text-[#505152]">
            <p>You don't have permission</p>
            <p>on this server</p>
          </div>
          <Button className="jura border-[#8087A7] text-[#6a718f] bg-[#D2D4EB]">Go back to homepage</Button>
        </div>
      </div>
    </div>
  );
}

export default NotApprove;
