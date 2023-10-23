import logo_wound from "@assets/logo-wound.svg";
import footer_watermark from "@assets/footer_watermark.svg";
import arrow_start from "@assets/arrow-start.svg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import liff from "@line/liff";
import { useEffect } from "react";

export default function SignUp() {
  useEffect(() => {
    liff
      .init({
        liffId: "2001180435-mZ7YAEj4",
      })
      .catch((err) => {
        alert(`error ${err}`);
      });
  });
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-white prompt relative">
      <div className="container mx-auto h-full flex items-center relative">
        <div className="w-full flex flex-col items-center justify-center p-10">
          <div className="w-full space-y-2 flex flex-col">
            <img className="w-12" src={logo_wound} alt="" />
            <h1 className="michroma text-md">SIGN UP</h1>
          </div>
          <form className="w-full flex flex-col justify-center items-center mt-5 space-y-6">
            <Input
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
              type="text"
              name="firstname"
              placeholder="Firstname"
            />
            <Input
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
              type="text"
              name="lastname"
              placeholder="Lastname"
            />
            <Input
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
              type="email"
              name="email"
              placeholder="Email"
            />
            <Input.Password
              placeholder="Password"
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Input.Password
              placeholder="Confirm Password"
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Input
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
              type="tel"
              name="tel"
              placeholder="Tel"
            />
            <Input
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
              type="text"
              name="referral_code"
              placeholder="Referral Code"
            />
            <div className="w-full flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
              <button type="submit" className="text-md jura font-bold">
                SIGN UP
              </button>
              <img className="w-10" src={arrow_start} alt="" />
            </div>
          </form>
          <p className="text-sm text-[#A7A6A5] text-center mt-5">
            Already have an account?{" "}
            <a
              href="/line/signin"
              className="text-[#A3802D] underline underline-offset-2"
            >
              SIGN IN
            </a>
          </p>
        </div>
      </div>
      <div className="signup_line_footer_watermark relative w-full bottom-0 overflow-hidden">
        <img className="w-full" src={footer_watermark} alt="" />
      </div>
    </div>
  );
}
