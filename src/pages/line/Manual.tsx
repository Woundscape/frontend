import Logo_Wound from "@assets/logo/logo-wound.svg";
import footer_watermark from "@assets/footer_watermark.svg";
import Upload from "@assets/upload_manual.svg";
import TakePhoto from "@assets/take_photo.svg";

export default function Manual() {
  return (
    <>
      <div className="w-full flex flex-col justify-between bg-white prompt relative select-none">
        <div className="w-full flex flex-col justify-center p-10 items-center space-y-6">
          <div className="logo-box flex flex-col items-center space-y-2 py-4">
            <img className="w-20" src={Logo_Wound} alt="" />
            <h1 className="text-lg michroma">Woundscape</h1>
          </div>
          <div
            id="how-to-upload"
            className="w-full flex flex-col items-center mx-10 rounded-xl border border-[#B4B4B4] border-dashed space-y-4"
          >
            <div className="w-full py-3 prompt text-center border-b border-[#B4B4B4] border-dashed text-[#A3802D]">
              <p>วิธีการอัปโหลดรูปภาพ</p>
            </div>
            <div className="px-5 pb-5">
              <img src={Upload} />
            </div>
          </div>
          <div
            id="how-to-photo"
            className="w-full flex flex-col items-center mx-10 rounded-xl border border-[#B4B4B4] border-dashed space-y-4"
          >
            <div className="w-full py-3 prompt text-center border-b border-[#B4B4B4] border-dashed text-[#A3802D]">
              <p>วิธีการถ่ายภาพบาดแผล</p>
            </div>
            <div className="px-5 pb-5">
              <img src={TakePhoto} />
            </div>
          </div>
        </div>
        <div className="signup_line_footer_watermark relative w-full bottom-0 overflow-hidden">
          <img className="w-full" src={footer_watermark} alt="" />
        </div>
      </div>
    </>
  );
}
