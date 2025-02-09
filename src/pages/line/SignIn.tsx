import liff from "@line/liff";
import { useEffect, useState } from "react";
import { Input, Divider, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import logo_wound from "@assets/logo/logo-wound.svg";
import footer_watermark from "@assets/footer_watermark.svg";
import arrow_start from "@assets/arrow-start.svg";
import line_icon from "@assets/icons/line_icon.svg";
import {
  login,
  LineCredential,
  lineLiffLogin,
  IFormInputsLogin,
} from "@api-caller";
import {
  IFormattedErrorResponse,
  NotifyType,
  PLATFORM,
  UserField,
  UserType,
} from "@constants";
import { lineLiffID } from "@config";
import { displayNotification } from "@utils";
import { UseMutationResult, useMutation } from "react-query";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

export default function SignIn() {
  const loginMutation: UseMutationResult<
    any,
    IFormattedErrorResponse,
    IFormInputsLogin
  > = useMutation(login);
  const [user, setUser] = useState<LineCredential>();
  const [loginFailed, setLoginFailed] = useState<string>();
  const [form, setForm] = useState<IFormInputsLogin>({
    user_email: "",
    user_password: "",
    uid: "",
    platform: PLATFORM.LINE_APP,
  });
  const [forms] = Form.useForm();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevValues) => ({
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
  async function handleSubmit() {
    if (user) {
      await lineLiffLogin({
        userId: user.userId,
        displayName: user.displayName,
        type: UserType.Patient,
      })
        .then((response) => {
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
      setIsLoading(true);
      handleSubmit();
    } else {
      liff.login();
    }
  }

  const onSubmit = async () => {
    const values = await forms.validateFields();
    if (values) {
      setIsLoading(true);
      const body: IFormInputsLogin = {
        ...form,
        uid: user?.userId ?? "",
      };
      loginMutation.mutate(body, {
        onSuccess: () => {
          liff.closeWindow();
        },
        onError: (e) => {
          setIsLoading(false);
          if (e.message == "User not found") {
            setLoginFailed(e.message);
            displayNotification(NotifyType.NOTFOUND);
          }
        },
      });
    }
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-white prompt relative select-none">
      <LoadingOverlayWrapper
        active={isLoading}
        spinner
        text="Loading ..."
        className="w-full h-full absolute"
      />
      <div className="container h-full mx-auto flex items-center relative">
        <div className="w-full flex flex-col items-center justify-center p-10">
          <div className="w-full space-y-2 flex flex-col items-center">
            <img className="w-16" src={logo_wound} alt="" />
            <h1 className="michroma text-lg">Woundscape</h1>
          </div>
          <div className="w-full flex flex-col justify-center items-center mt-10 space-y-6">
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
            <Form form={forms} className="w-full">
              <Form.Item
                hasFeedback
                validateStatus={loginFailed ? "error" : undefined}
                name={UserField.EMAIL}
                className="w-full"
                rules={[
                  { required: true, message: "Enter your email address" },
                  {
                    type: "email",
                    message: "Please enter a valid email address",
                  },
                ]}
              >
                <Input
                  name={UserField.EMAIL}
                  className="input__authentication"
                  placeholder="Email"
                  type="text"
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item
                name={UserField.PASSWORD}
                validateStatus={loginFailed ? "error" : undefined}
                className="w-full"
                rules={[
                  { required: true, message: "Enter your password" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  name={UserField.PASSWORD}
                  placeholder="Password"
                  className="py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Form>
            <div
              className="w-full flex px-4 py-1.5 justify-between btn-homepage cursor-pointer text-md jura font-bold"
              onClick={onSubmit}
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
