import logo_wound from "@assets/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

export default function NewPassword() {
  return (
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-4">
        <form
          action=""
          className="w-1/2 h-full flex flex-col justify-center items-center space-y-8"
        >
          <div className="w-1/2 flex flex-col items-center space-y-4">
            <img className="w-20" src={logo_wound} alt="" />
            <h1 className="michroma text-3xl text-[#424241]">Reset Password</h1>
          </div>

          <div className="w-1/2  ">
            <div className="flex flex-col space-y-5">
              <Input.Password
                placeholder="Password"
                className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              <Input.Password
                placeholder="Confirm Password"
                className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
          </div>

          <div className="w-1/2 flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
            <button type="submit" className="text-xl jura font-bold">
              Confirm
            </button>
            <img className="w-14" src={arrow_start} alt="" />
          </div>
        </form>
        <div className="w-1/2 p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}
