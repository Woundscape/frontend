import { Button, Result } from "antd";
function NoApprove() {
  return (
    <div className=" w-full bg-white h-screen p-6">
      <div className="noApprove-background w-full h-full rounded-2xl flex flex-col justify-center items-center ">
        <div className="flex flex-col justify-center items-center w-96 text-center jura text-lg space-y-3">
          <Result status="403" />
          <div className="text-[#505152] text-xl">
            <p>You don't have permission</p>
            <p>on this server</p>
          </div>
          <a href="/">
            <Button className="flex items-center jura border-[#8087A7] text-[#6a718f] bg-[#D2D4EB] text-base">
              Go back to homepage
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NoApprove;
