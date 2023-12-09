import logo_wound from "@assets/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import logo_google from "@assets/google_logo.svg";
import logo_line from "@assets/line_logo.svg";
import Eye from "@assets/eye_input.svg";
function ResetPassword() {
  return (
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-4 ">
        <form
          action=""
          className="w-1/2 h-full flex flex-col justify-center items-center space-y-8 "
        >
          <div className="w-1/2 flex flex-col items-center space-y-8 ">
            <img className="w-20" src={logo_wound} alt="" />
            <h1 className="michroma text-4xl text-[#424241]">Woundscape</h1>
          </div>
          

          <div className="w-1/2 flex flex-row justify-center space-x-3">
            <div className="border-b-2 h-5 w-1/3 border-[#B4B4B4]"></div>
            <div className="text-[#9a9999] text-center text-[0.95rem]">Please enter your email address to recieve a verification code.</div>
            <div className="border-b-2 h-5 w-1/3 border-[#B4B4B4] "></div>
          </div>

          <div className="w-1/2 relative ">
            <div className="relative p-2.5 pb-3.5 pl-4 border border-[#B4B4B4] border-1 rounded-[50px] ">
              <button className="jura text-sm p-1 btn-homepage w-[5.5rem] absolute right-3">SEND</button>
              <input className="outline-none" placeholder="Email Address" type="password" />
            </div>
            <div className="mt-2 mb-4">
              <div className="absolute text-[0.9rem] right-1 forgot_pass text-[#A7A6A5] cursor-pointer">
              Try another way
              </div>
            </div>
          </div>

          
          <div className="absolute bottom-12 flex space-x-2">
            <a href="#" className="text-[#A7A6A5] cursor-pointer">
            Don’t have an account yet?
            </a>
            <span className="text-[#A3802D] underline cursor-pointer">SIGN IN</span>
          </div>
        </form>
        <div className="w-1/2 p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
