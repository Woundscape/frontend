import logo_wound from "@assets/logo-wound.svg";
import arrow_start from "@assets/arrow-start.svg";
import logo_it from "@assets/it-logo.svg";
import doctor_women from "@assets/doctor_women.svg"
function ContactUs() {
  return (
    <div className="contact-background w-full bg-white h-screen">
      <div className="w-full h-full flex flex-row justify-between p-14 ">
        <div className="space-y-2">
          <div className="flex flex-row items-center">
            <img className="w-16" src={logo_wound} alt="" />
            <h1 className="michroma text-3xl text-[#424241]">Woundscape</h1>
          </div>
          <div className="jura  text-2xl text-[#A3802D]">contact us</div>
          <div className="flex flex-row">
            <div className="jura text-2xl text-[#4C577C]">Doctor</div>
            <div className="border-b-2 h-5 mx-3 border-[#B4B4B4] w-full"></div>
          </div>
          <div className="relative flex flex-row ">
            <div className="w-52 card_background border-2 rounded-lg border-[#e7e2e2]">
              <img src={doctor_women} alt="" />
            </div>
            <div className="absolute w-52 bottom-2 left-2.5 rounded-full bg-white border-[#949CB6] border-2">
              <div className="text-[#4C577C] p-1.5 px-3">หมอนัชชา นาชัช</div>
            </div>
          </div>
          
        </div>

        <div className="p-4">
          <img className="absolute right-14 w-80" src={logo_it} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
