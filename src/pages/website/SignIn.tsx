import logo_wound from "@assets/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import logo_google from "@assets/google_logo.svg";
import logo_line from "@assets/line_logo.svg";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useGoogleLogin } from "@react-oauth/google";
import { getOAuthInstance } from "@api/apiOAuthGoogle";
import { useState } from "react";
import {
  IFormInputsLogin,
  LoginSuccessResponse,
  login,
} from "@api-caller/authenApi";
import { useNavigate } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { IFormattedErrorResponse } from "@constraint/constraint";
function Signin() {
  const router = useNavigate();
  const loginMutation: UseMutationResult<
    LoginSuccessResponse,
    IFormattedErrorResponse,
    IFormInputsLogin
  > = useMutation(login);
  const [formInputs, setFormInputs] = useState<IFormInputsLogin>({
    user_email: "",
    user_password: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate(formInputs, {
      onSuccess: (data) => {
        sessionStorage.setItem('token', JSON.stringify(data.accessToken))
        router('/dashboard')
      },
    });
  };
  const signInGoogleLogin = useGoogleLogin({
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
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-4">
        <form
          onSubmit={onSubmit}
          className="w-1/2 h-full flex flex-col justify-center items-center space-y-8"
        >
          <div className="w-1/2 flex flex-col items-center space-y-4">
            <img className="w-20" src={logo_wound} alt="" />
            <h1 className="michroma text-4xl text-[#424241]">Woundscape</h1>
          </div>
          <button className="relative w-1/2 p-2.5 border border-[#B4B4B4] border-1 rounded-[50px] outline-none cursor-pointer">
            <img
              className="w-6 absolute left-3 bottom-2"
              src={logo_google}
              alt=""
            />
            <div className="jura text-sm text-center text-[#626060]">
              SIGN IN WITH GOOGLE
            </div>
          </button>
          <div className="relative w-1/2 p-2.5 text-sm text-center border border-[#B4B4B4] border-1 rounded-[50px] outline-none cursor-pointer">
            <img
              className="w-6 absolute left-3 bottom-2"
              src={logo_line}
              alt=""
            />
            <div className="jura text-sm text-center text-[#626060]">
              SIGN IN WITH LINE
            </div>
          </div>

          <div className="w-1/2 flex flex-row justify-center space-x-3">
            <div className="border-b-2 h-3 w-1/3 border-[#B4B4B4]"></div>
            <div className="text-[#B4B4B4] w-64 text-center text-sm">
              OR SIGN IN WITH EMAIL
            </div>
            <div className="border-b-2 h-3 w-1/3 border-[#B4B4B4] "></div>
          </div>
          <Input
            className="w-1/2 py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
            type="email"
            name="user_email"
            placeholder="Email"
            onChange={handleInputChange}
          />
          <div className="w-1/2 relative ">
            <Input.Password
              name="user_password"
              placeholder="Password"
              className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={handleInputChange}
            />
            <div className="mt-2 mb-4">
              <div className="absolute right-3 forgot_pass text-[#626060] cursor-pointer">
                <span>Forgot password</span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-1/2 flex px-4 py-1.5 justify-between items-center btn-homepage cursor-pointer"
          >
            <div className="text-xl jura font-bold">SIGN IN</div>
            <img className="w-14" src={arrow_start} alt="" />
          </button>
          <div className="flex space-x-2">
            <span className="text-[#A7A6A5]">Don’t have an account yet?</span>
            <span className="text-[#A3802D] underline cursor-pointer">
              SIGN UP
            </span>
          </div>
        </form>
        <div className="w-1/2 p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
