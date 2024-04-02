import { Button, Form, Input } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UseMutationResult, useMutation } from "react-query";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import logo_wound from "@assets/logo/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import {
  IFormattedErrorResponse,
  NotificationType,
  NotifyType,
} from "@constants";
import { IResetPassword, resetPassword } from "@api-caller";
import { displayNotification } from "@utils";

export default function NewPassword() {
  const resetMutation: UseMutationResult<
    any,
    IFormattedErrorResponse,
    IResetPassword
  > = useMutation(resetPassword);
  const { token } = useParams();
  const router = useNavigate();
  const [forms] = Form.useForm();
  const [password, setPassword] = useState<string>();
  const onSubmit = async () => {
    const values = await forms.validateFields();
    if (values) {
      const body: IResetPassword = {
        user_id: token ?? "",
        password: password ?? "",
      };
      resetMutation.mutate(body, {
        onSuccess: () => {
          router("/signin");
          displayNotification(NotifyType.RESET);
        },
      });
    }
  };
  return (
    <div className="wound-background w-full bg-white h-screen">
      <Form
        form={forms}
        className="w-full h-full flex flex-row justify-between p-4"
      >
        <div className="w-1/2 h-full flex flex-col justify-center items-center space-y-8">
          <div className="w-1/2 flex flex-col items-center space-y-4">
            <img className="w-20" src={logo_wound} alt="" />
            <h1 className="michroma text-3xl text-[#424241]">Reset Password</h1>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col space-y-5">
              <Form.Item
                name={"user_password"}
                className=""
                rules={[
                  { required: true, message: "Enter your password" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  name="user_password"
                  placeholder="Password"
                  className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name={"user_cpassword"}
                className=""
                rules={[
                  { required: true, message: "Enter confirm password" },
                  {
                    min: 6,
                    message: "Password must be at least 6 characters!",
                  },
                ]}
              >
                <Input.Password
                  name="user_cpassword"
                  placeholder="Confirm Password"
                  className="w-full py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
            </div>
          </div>

          <Button
            htmlType="submit"
            onClick={onSubmit}
            className="w-1/2 py-5 justify-between text-lg text-[#424241] jura font-bold flex items-center btn-homepage cursor-pointer"
          >
            <p>Confirm</p>
            <img className="w-14" src={arrow_start} alt="" />
          </Button>
        </div>
      </Form>
      <div className="w-1/2 p-4">
        <img className="absolute right-14 w-80" src={logo_it} alt="" />
      </div>
    </div>
  );
}
