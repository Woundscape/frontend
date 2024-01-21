import logo_wound from "@assets/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function Signup() {
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-col justify-between p-4">
        <form
          action=""
          className="bg-rd-200 w-1/2 h-full flex flex-col justify-center items-center  space-y-8"
        >
          <div className="w-1/2">
            <img className="w-14" src={logo_wound} alt="" />
            <h1 className="michroma text-3xl">SIGN UP</h1>
          </div>
          <input
            className="w-1/2 py-2 pl-4 border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
            placeholder="Firstname"
            type="text"
          />
          <input
            className="w-1/2 py-2 pl-4 border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
            placeholder="Lastname"
            type="text"
          />
          <input
            className="w-1/2 py-2 pl-4 border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
            placeholder="Email"
            type="text"
          />

          <input
            className="w-1/2 py-2 pl-4 border border-[#B4B4B4] border-1 rounded-[50px] outline-none"
            placeholder="Tel"
            type="text"
          />
          <Input.Password
            name="user_password"
            placeholder="Password"
            className="w-1/2 py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={handleInputChange}
          />
          <Input.Password
            name="user_password"
            placeholder="Confirm Password"
            className="w-1/2 py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            onChange={handleInputChange}
          />
          <div className="w-1/2 flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
            <button type="submit" className="text-xl jura font-bold">
              SIGN UP
            </button>
            <img className="w-14" src={arrow_start} alt="" />
          </div>
          <div className="flex space-x-2">
            <a href="#" className="text-[#A7A6A5] cursor-pointer">
              Already have an account?
            </a>
            <span className="text-[#A3802D] underline">SIGN IN</span>
          </div>
        </form>
        <div className="w-1/2 p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
