import { useState } from "react";
import logo_wound from "@assets/logo/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import { Button, Form, Input, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { IUser, IFormattedErrorResponse } from "@constants/interface";
import { UseMutationResult, useMutation } from "react-query";
import { webRegister } from "@api-caller/authenApi";
import { DefaultUserForm } from "@constants/defaultForm";

function Signup() {
  const registerMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUser
  > = useMutation(webRegister);
  const [form, setForm] = useState<IUser>(DefaultUserForm);
  const [forms] = Form.useForm();
  const [registrationFailed, setRegistrationFailed] = useState<string>("");
  const onSubmit = async () => {
    try {
      const values = await forms.validateFields();
      if (values) {
        registerMutation.mutate(form, {
          onSuccess: (e) => {
            notification.success({
              message: "Success",
              description: "Registration successful!",
            });
            setForm(DefaultUserForm);
            forms.resetFields();
            setRegistrationFailed("");
          },
          onError: (e) => {
            if (e.message) {
              setRegistrationFailed(e.message);
              notification.error({
                message: "Error",
                description: e.message,
              });
            }
          },
        });
      }
    } catch (error) {}
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-4">
        <Form
          form={forms}
          action=""
          className="bg-rd-200 w-1/2 h-full flex flex-col justify-center items-center  space-y-6"
        >
          <div className="w-1/2">
            <img className="w-14" src={logo_wound} alt="" />
            <h1 className="michroma text-3xl text-[#424241]">SIGN UP</h1>
          </div>
          <Form.Item
            hasFeedback
            validateDebounce={1000}
            name={"user_firstname"}
            className="w-1/2"
            rules={[
              { required: true, message: "Enter your first name" },
              { max: 10, message: "First name cannot exceed 10 characters" },
            ]}
          >
            <Input
              name="user_firstname"
              className="input__authentication"
              placeholder="Firstname"
              type="text"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateDebounce={1000}
            name={"user_lastname"}
            className="w-1/2"
            rules={[
              { required: true, message: "Enter your last name" },
              { max: 20, message: "Last name cannot exceed 10 characters" },
            ]}
          >
            <Input
              name="user_lastname"
              className="input__authentication"
              placeholder="Lastname"
              type="text"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            hasFeedback
            validateStatus={
              registrationFailed == "Email already exists" ? "error" : undefined
            }
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

          <Form.Item
            hasFeedback
            validateStatus={
              registrationFailed == "Tel already exists" ? "error" : undefined
            }
            name={"user_tel"}
            className="w-1/2"
            rules={[
              { required: true, message: "Enter your phone number" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number",
              },
            ]}
          >
            <Input
              name="user_tel"
              className="input__authentication"
              placeholder="Tel"
              type="text"
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            name={"user_password"}
            className="w-1/2"
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
          <Form.Item
            name={"user_cpassword"}
            className="w-1/2"
            rules={[
              { required: true, message: "Enter your password" },
              validateConfirmPassword,
            ]}
          >
            <Input.Password
              name="user_cpassword"
              placeholder="Confirm Password"
              className="py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Button
            type="text"
            htmlType="submit"
            onClick={onSubmit}
            className="w-1/2 py-5 justify-between text-lg text-[#424241] jura font-bold flex items-center btn-homepage cursor-pointer"
          >
            <p>SIGN UP</p>
            <img className="w-14" src={arrow_start} alt="" />
          </Button>
          <div className="flex space-x-2">
            <p className="text-[#A7A6A5] ">Already have an account?</p>
            <a href="/signin" className="text-[#A3802D] underline">
              SIGN IN
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

export default Signup;
