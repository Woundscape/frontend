import logo_wound from "@assets/logo/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { IUser, UserType } from "@constants/interface";

function Signup() {
  const [form, setForm] = useState<IUser>({
    user_firstname: "",
    user_lastname: "",
    user_email: "",
    user_password: "",
    user_tel: "",
    user_type: UserType.Doctor,
  });
  const [forms] = Form.useForm();
  const onSubmit = async () => {
    const values = await forms.validateFields();
    console.log(form);
  };
  const onChange = (e: any) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-col justify-between p-4">
        <Form
          form={forms}
          className="bg-rd-200 w-1/2 h-full flex flex-col justify-center items-center  space-y-8"
        >
          <div className="w-1/2">
            <img className="w-14" src={logo_wound} alt="" />
            <h1 className="michroma text-3xl">SIGN UP</h1>
          </div>
          <Form.Item
            name="title"
            rules={[{ required: true, message: "Please confirm your title!" }]}
            className="w-1/2"
          >
            <Input
              type="text"
              name="user_firstname"
              placeholder="Firstname"
              className="input__authentication"
            />
          </Form.Item>
          <input
            className="w-1/2 input__authentication"
            placeholder="Lastname"
            type="text"
          />
          <input
            className="w-1/2 input__authentication"
            placeholder="Email"
            type="text"
          />
          <input
            className="w-1/2 input__authentication"
            placeholder="Password"
            type="password"
          />
          <input
            className="w-1/2 input__authentication"
            placeholder="Confirm Password"
            type="password"
          />
          <input
            className="w-1/2 input__authentication"
            placeholder="Tel"
            type="text"
          />
          <div className="w-1/2 flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
            <Button
              onClick={onSubmit}
              type="text"
              htmlType="submit"
              className="text-xl jura font-bold"
            >
              SIGN UP
            </Button>
            <img className="w-14" src={arrow_start} alt="" />
          </div>
          <div className="flex space-x-2">
            <a href="#" className="text-[#A7A6A5] cursor-pointer">
              Already have an account?
            </a>
            <span className="text-[#A3802D] underline">SIGN IN</span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
