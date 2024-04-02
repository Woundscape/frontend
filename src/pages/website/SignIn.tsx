import liff from "@line/liff";
import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import logo_it from "@assets/it-logo.svg";
import logo_line from "@assets/line_logo.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_wound from "@assets/logo/logo-wound.svg";
import { UseMutationResult, useMutation } from "react-query";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import {
  IFormInputsLogin,
  Credentials,
  login,
  LineCredential,
  lineLiffLogin,
} from "@api-caller";
import { displayNotification } from "@utils";
import {
  IFormattedErrorResponse,
  NotifyType,
  PLATFORM,
  UserType,
} from "@constants";
import { lineLiffID } from "@config";
function Signin() {
  const router = useNavigate();
  const [loginFailed, setLoginFailed] = useState<string>();
  const [user, setUser] = useState<LineCredential>();
  const [forms] = Form.useForm();
  const loginMutation: UseMutationResult<
    Credentials,
    IFormattedErrorResponse,
    IFormInputsLogin
  > = useMutation(login);
  const [formInputs, setFormInputs] = useState<IFormInputsLogin>({
    user_email: "",
    user_password: "",
    platform: PLATFORM.WEB_APP,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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

  const onSubmit = async () => {
    const values = await forms.validateFields();
    if (values) {
      loginMutation.mutate(formInputs, {
        onSuccess: (data) => {
          sessionStorage.setItem("token", JSON.stringify(data));
          router("/dashboard");
        },
        onError: (e) => {
          if (e.message) {
            setLoginFailed(e.message);
            displayNotification(NotifyType.ERROR);
          }
        },
      });
    }
  };

  async function handleSubmit() {
    if (user) {
      await lineLiffLogin({
        userId: user.userId,
        displayName: user.displayName,
        type: UserType.Doctor,
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
  async function loginLiff() {
    if (liff.isLoggedIn()) {
      handleSubmit();
    } else {
      liff.login();
    }
  }

  return (
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-4">
        <Form
          form={forms}
          className="w-1/2 h-full flex flex-col justify-center items-center space-y-8"
        >
          <div className="w-1/2 flex flex-col items-center space-y-4">
            <img className="w-20" src={logo_wound} alt="" />
            <h1 className="michroma text-4xl text-[#424241]">Woundscape</h1>
          </div>

          <Form.Item
            hasFeedback
            validateStatus={loginFailed ? "error" : undefined}
            name={"user_email"}
            className="w-1/2"
            rules={[
              { required: true, message: "Enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              name="user_email"
              className="input__authentication"
              placeholder="Email"
              type="text"
              onChange={handleInputChange}
            />
          </Form.Item>
          <div className="w-1/2 relative ">
            <Form.Item
              validateStatus={loginFailed ? "error" : undefined}
              name={"user_password"}
              className=""
              rules={[
                { required: true, message: "Enter your password" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                name="user_password"
                placeholder="Password"
                className="py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={handleInputChange}
              />
            </Form.Item>
            <div className="mt-2 mb-4">
              <a
                href="/reset"
                className="absolute right-3 forgot_pass text-[#626060] cursor-pointer hover:text-[#626060] "
              >
                <span>Forgot password</span>
              </a>
            </div>
          </div>
          <Button
            htmlType="submit"
            onClick={onSubmit}
            className="w-1/2 py-5 justify-between text-lg text-[#424241] jura font-bold flex items-center btn-homepage cursor-pointer"
          >
            <p>SIGN IN</p>
            <img className="w-14" src={arrow_start} alt="" />
          </Button>
          <div className="flex space-x-2">
            <span className="text-[#A7A6A5]">Don’t have an account yet?</span>
            <a
              href="/signup"
              className="text-[#A3802D] underline cursor-pointer hover:text-[#A3802D] "
            >
              SIGN UP
            </a>
          </div>
        </Form>
        <div className="w-1/2 p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Signin;
