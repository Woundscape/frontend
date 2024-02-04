import { useEffect, useState } from "react";
import { Input, Divider } from "antd";
import { useGoogleLogin } from "@react-oauth/google";
import liff from "@line/liff";
import { getOAuthInstance } from "@api/apiOAuthGoogle";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import logo_wound from "@assets/logo/logo-wound.svg";
import footer_watermark from "@assets/footer_watermark.svg";
import arrow_start from "@assets/arrow-start.svg";
import google_icon from "@assets/icons/google_icon.svg";
import line_icon from "@assets/icons/line_icon.svg";
import { LineCredential, lineLogin } from "@api-caller/lineApi";
import { UserType } from "@constants";
import { lineLiffID } from "@config";

export default function SignIn() {
  const [user, setUser] = useState<LineCredential>();
  useEffect(() => {
    liff
      .init({
        liffId: lineLiffID.SIGNIN,
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            setUser(profile);
          });
        }
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }, []);
  function handleSubmit() {
    if (user) {
      lineLogin({
        userId: user.userId,
        displayName: user.displayName,
        type: UserType.Patient,
      })
        .then(() => {
          liff.closeWindow();
        })
        .catch((error) => {
          liff.closeWindow();
          console.error("Error in API call:", error);
        });
    } else {
      liff.login();
    }
  }
  function loginLiff() {
    if (liff.isLoggedIn()) {
      handleSubmit();
    } else {
      liff.login();
    }
  }
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      getOAuthInstance()
        .get(`/oauth2/v1/userinfo`, {
          params: {
            access_token: tokenResponse.access_token,
          },
        })
        .then((res) => {
          console.log(res.data);
        });
    },
  });
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-white prompt relative select-none">
      <div className="container h-full mx-auto flex items-center relative">
        <div className="w-full flex flex-col items-center justify-center p-10">
          <div className="w-full space-y-2 flex flex-col items-center">
            <img className="w-16" src={logo_wound} alt="" />
            <h1 className="michroma text-lg">Woundscape</h1>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-10 space-y-6">
            <button
              onClick={() => login()}
              className="w-full flex py-2 px-4 text-sm border border-[#B4B4B4] rounded-[50px] text-center outline-none"
            >
              <img className="w-4 absolute" src={google_icon} alt="" />
              <div className="w-full text-sm flex justify-center space-x-4 jura text-[#626060]">
                SIGN IN WITH GOOGLE
              </div>
            </button>
            {/* <GoogleLogin onSuccess={OAuthGoogle} /> */}
            <button
              className="w-full flex py-2 px-4 text-sm border border-[#B4B4B4] rounded-[50px] text-center outline-none"
              onClick={loginLiff}
            >
              <img className="w-4 absolute" src={line_icon} alt="" />
              <div className="w-full text-sm flex justify-center space-x-4 jura text-[#626060]">
                SIGN IN WITH LINE
              </div>
            </button>
            <Divider plain>
              <span className="prompt text-xs text-[#A7A6A5]">
                OR SIGN IN WITH EMAIL
              </span>
            </Divider>
            <Input
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
              type="email"
              name="email"
              placeholder="Email"
            />
            <Input.Password
              placeholder="Password"
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <div
              className="w-full flex px-4 py-1.5 justify-between btn-homepage cursor-pointer text-md jura font-bold"
              onClick={() => {
                console.log(1);
              }}
            >
              SIGN IN
              <img className="w-10" src={arrow_start} alt="" />
            </div>
          </div>
          <p className="text-sm text-[#A7A6A5] text-center mt-5">
            Don’t have an account yet?{" "}
            <a
              href="/line/signup"
              className="text-[#A3802D] underline underline-offset-2"
            >
              SIGN UP
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
