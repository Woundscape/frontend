import logo_wound from "@assets/logo/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import { useNavigate } from "react-router-dom";
function ConfirmReset() {
  const router = useNavigate();

  const redirect = () => {
    router("/");
  };
  return (
    <div className="wound-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-4 ">
        <form
          action=""
          className="w-1/2 h-full flex flex-col justify-center items-center space-y-8 "
        >
          <div className="w-1/2 flex flex-col items-center space-y-7 ">
            <img className="w-20" src={logo_wound} alt="" />
            <h1 className="michroma text-4xl text-[#424241]">Woundscape</h1>
          </div>

          <div className="w-1/2 flex flex-row justify-center space-x-3">
            <div className="text-[#9a9999] w-full text-center text-base">
              Please check your email. We have sent email to confirm for reset
              your password.
            </div>
          </div>

          <div onClick={redirect} className="w-80 flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
            <button type="submit" className=" text-xl jura font-bold">
              BACK TO HOME
            </button>
            <img className="w-14" src={arrow_start} alt="" />
          </div>

          <div className="absolute bottom-12 flex space-x-2">
            <a href="#" className="text-[#A7A6A5] cursor-pointer">
              If you not got any email ?
            </a>
            <span className="text-[#A3802D] underline cursor-pointer">
              Resend confirmation email
            </span>
          </div>
        </form>
        <div className="w-1/2 p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ConfirmReset;
