import { useState } from "react";
import arrow_start from "@assets/arrow-start.svg";
import logo_wound from "@assets/logo/logo-wound.svg";
import footer_watermark from "@assets/footer_watermark.svg";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import {
  DefaultUserForm,
  UserField,
  IUser,
  IFormattedErrorResponse,
} from "@constants";
import { UseMutationResult, useMutation } from "react-query";
import { lineRegister } from "@api-caller/authenApi";

export default function SignUp() {
  const registerMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUser
  > = useMutation(lineRegister);
  const [form, setForm] = useState<IUser>(DefaultUserForm);
  const [forms] = Form.useForm();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = async () => {
    try {
      console.log(form);
    } catch (error) {}
  };

  const validateConfirmPassword = ({ getFieldValue }: any) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("user_password") === value) {
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
                name="lastname"
                placeholder="Lastname"
                className="input__authentication"
              />
            </Form.Item>
            <Input
              className="w-full input__authentication"
              type="email"
              name="email"
              placeholder="Email"
            />
            <Input.Password
              placeholder="Password"
              className="w-full input__authentication"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Input.Password
              placeholder="Confirm Password"
              className="w-full input__authentication"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
            <Input
              className="w-full input__authentication"
              type="tel"
              name="tel"
              placeholder="Tel"
            />
            <Input
              className="w-full input__authentication"
              type="text"
              name="referral_code"
              placeholder="Referral Code"
            />
            <Button
              type="text"
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
