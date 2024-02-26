import { useEffect, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import arrow_start from "@assets/arrow-start.svg";
import logo_wound from "@assets/logo/logo-wound.svg";
import footer_watermark from "@assets/footer_watermark.svg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import {
  IUser,
  UserField,
  DefaultPatientForm,
  IFormattedErrorResponse,
  NotifyType,
} from "@constants";
import liff from "@line/liff";
import { lineLiffID } from "@config";
import { lineRegister } from "@api-caller";
import { displayNotification } from "@utils";

export default function SignUp() {
  const registerMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUser
  > = useMutation(lineRegister);
  const [form, setForm] = useState<IUser>(DefaultPatientForm);
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
        liffId: lineLiffID.SIGNUP,
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            setForm((prevValues) => ({
              ...prevValues,
              line_uid: profile.userId,
            }));
          });
        } else {
          liff.login();
        }
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }, []);

  const onSubmit = async () => {
    try {
      const values = await forms.validateFields();
      if (values) {
        registerMutation.mutate(form, {
          onSuccess: () => {
            liff.closeWindow();
          },
          onError: () => {
            displayNotification(NotifyType.ERROR);
          },
        });
      }
      // forms.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const validateConfirmPassword = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue(UserField.PASSWORD) === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The confirm passwords do not match!"));
    },
  });
  return (
    <div className="w-full h-screen flex flex-col justify-between bg-white prompt relative">
      <div className="container mx-auto h-full flex items-center relative">
        <div className="w-full flex flex-col items-center justify-center p-10">
          <div className="w-full space-y-2 flex flex-col">
            <img className="w-12" src={logo_wound} alt="" />
            <h1 className="michroma text-md">SIGN UP</h1>
          </div>
          <Form
            form={forms}
            action=""
            className="w-full flex flex-col justify-center items-center mt-5"
          >
            <Form.Item
              hasFeedback
              validateDebounce={1000}
              name={UserField.FIRSTNAME}
              className="w-full"
              rules={[
                { required: true, message: "Enter your first name" },
                { max: 10, message: "First name cannot exceed 10 characters" },
              ]}
            >
              <Input
                type="text"
                name={UserField.FIRSTNAME}
                placeholder="Firstname"
                className="input__authentication"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              validateDebounce={1000}
              name={UserField.LASTNAME}
              className="w-full"
              rules={[
                { required: true, message: "Enter your last name" },
                { max: 20, message: "Last name cannot exceed 10 characters" },
              ]}
            >
              <Input
                type="text"
                name={UserField.LASTNAME}
                placeholder="Lastname"
                className="input__authentication"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              hasFeedback
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
              className="w-full"
              rules={[
                { required: true, message: "Enter your password" },
                { min: 6, message: "Password must be at least 6 characters!" },
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
            <Form.Item
              name={UserField.CONFIRM_PASSWORD}
              className="w-full"
              rules={[
                { required: true, message: "Enter your confirm password" },
                validateConfirmPassword,
              ]}
            >
              <Input.Password
                name={UserField.CONFIRM_PASSWORD}
                placeholder="Confirm Password"
                className="py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              name={UserField.TEL}
              className="w-full"
              rules={[
                { required: true, message: "Enter your phone number" },
                {
                  pattern: /^[0-9]{10}$/,
                  message: "Please enter a valid 10-digit phone number",
                },
              ]}
            >
              <Input
                type="text"
                name={UserField.TEL}
                placeholder="Tel"
                className="input__authentication"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item name={UserField.REFERAL_CODE} className="w-full">
              <Input
                type="text"
                name={UserField.REFERAL_CODE}
                placeholder="Referral code (Optional)"
                className="input__authentication"
                onChange={handleInputChange}
              />
            </Form.Item>
            <Button
              htmlType="submit"
              onClick={onSubmit}
              className="w-full py-5 text-left text-md jura font-bold flex items-center justify-between cursor-pointer btn-homepage"
            >
              <p>SIGN UP</p>
              <img className="w-10" src={arrow_start} alt="" />
            </Button>
          </Form>
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
