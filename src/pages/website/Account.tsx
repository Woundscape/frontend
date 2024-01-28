import BgProfile from "@assets/profile_bg.svg";
import ImgProfile from "@assets/profile_img.svg";
import AddFriend from "@assets/AddFriendQRCODE.png";
import { Divider, Input, Typography } from "antd";
import { useAuth } from "@components/AuthProvider";
import Avatar from "react-avatar";
export default function Account() {
  const { me } = useAuth();
  const fullName = me?.firstname + " " + me?.lastname;
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full p-8 bg-white">
          <div className="w-full h-full">
            <div className="flex flex-col items-center gap-1.5">
              <div className="h-72 w-full">
                <div className="w-full relative flex justify-center">
                  <img src={BgProfile} alt="" />
                  {/* <Avatar name={fullName} className="absolute w-36 top-[8rem]" size="40" round="20px" /> */}
                  <img
                    src={ImgProfile}
                    className="absolute w-36 top-[8rem]"
                    alt=""
                  />
                </div>
              </div>
              <p className="jura text-3xl text-[#505152]">{fullName}</p>
              <div className="jura flex gap-5 text-[#4C577C] text-lg">
                <p>{me?.doctor_type}</p>
              </div>
              <div className="flex flex-col items-center jura text-[#868686] text-sm gap-7">
                <div className="relative w-full">
                  <Input
                    className=" py-2 pl-4 text-sm text-[#626060] border border-[#B4B4B4] rounded-[50px] outline-none"
                    type="email"
                    name="user_email"
                    placeholder=""
                    value={me?.email}
                    disabled
                    // onChange={handleInputChange}
                  />
                  <div className="mt-2 mb-4">
                    <div className="absolute right-3 forgot_pass text-[#626060] cursor-pointer">
                      <span>Forgot password</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-[#D2D4EB] w-48 h-48 p-2.5 rounded-md">
                    <img src={AddFriend} alt="" className="rounded-md" />
                  </div>
                  <Divider>
                    <Typography className="prompt text-[#868686] text-xs">
                      SCAN CODE HERE
                    </Typography>
                  </Divider>
                  <Typography className="jura text-[#868686] text-xs">
                    Please scan to connect your account with line
                  </Typography>
                </div>

                {/* <Divider>
                  <Typography className="prompt text-[#868686] text-xs">
                  PROFILE CONNECTED
                  </Typography>
                </Divider>
                <div className="relative p-2.5 w-72 text-sm text-center border border-[#B4B4B4] border-1 rounded-[50px] outline-none cursor-pointer">
                  <img
                    className="w-6 absolute left-3 bottom-2"
                    src={logo_line}
                    alt=""
                  />
                  <div className="jura text-sm text-center text-[#626060]">
                    @Paifuiii
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
