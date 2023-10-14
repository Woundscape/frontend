import { Spin, Upload } from "antd";
import Logo_Wound from "@assets/logo-wound.svg";
import Arrow_Start from "@assets/arrow-start.svg";
import SearchUploadIcon from "@assets/icon-search-upload.svg";
import AddUploadIcon from "@assets/icon-add-upload-file.svg";
// import CancelUploadIcon from "../customize/CanceledUploadIcon";

export default function UploadImage() {
    return (
        <div className="w-full h-screen bg-white p-10">
            <div className="w-full flex flex-col justify-center items-center space-y-4">
                <div className="logo-box flex flex-col items-center space-y-2 py-4">
                    <img className="w-20" src={Logo_Wound} alt="" />
                    <h1 className="text-2xl michroma">Woundscape</h1>
                </div>
                <Upload.Dragger
                    multiple
                    listType="picture"
                    action={"http://localhost:5173/"}
                    accept=".png,.jpeg"
                    beforeUpload={(file) => {
                        console.log(file);
                        return false;
                    }}
                    //   defaultFileList={[
                    //     {
                    //         uid:"abc",
                    //         name:"existing_file.png",
                    //         status:"uploading",
                    //         percent:50,
                    //         url:"http://www.google.com"
                    //     }
                    //   ]}
                    iconRender={() => {
                        return <Spin></Spin>;
                    }}
                    progress={{
                        strokeWidth: 10,
                        strokeColor: {
                            "0%": "#D8C290",
                            "100%": "#D8C290",
                        },
                        style: { top: 5 },
                    }}
                    // showUploadList={{ removeIcon: <CancelUploadIcon /> }}
                //   showUploadList={{showRemoveIcon:false}}
                >
                    <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                        <img className="w-16" src={AddUploadIcon} alt="" />
                        <div className="flex space-x-2">
                            <h1 className="jura text-lg text-[#A3802D]">ADD FILE</h1>
                            <img className="w-4" src={SearchUploadIcon} alt="" />
                        </div>
                    </div>
                    <br />
                </Upload.Dragger>
                <h1 className="prompt font-brown select-none">กรุณาอัปโหลดรูปเพื่อวินิจฉัยชั้นแผล</h1>
                <Upload.Dragger
                    multiple
                    listType="picture"
                    action={"http://localhost:5173/"}
                    accept=".png,.jpeg"
                    beforeUpload={(file) => {
                        console.log(file);
                        return false;
                    }}
                    //   defaultFileList={[
                    //     {
                    //         uid:"abc",
                    //         name:"existing_file.png",
                    //         status:"uploading",
                    //         percent:50,
                    //         url:"http://www.google.com"
                    //     }
                    //   ]}
                    iconRender={() => {
                        return <Spin></Spin>;
                    }}
                    progress={{
                        strokeWidth: 10,
                        strokeColor: {
                            "0%": "#D8C290",
                            "100%": "#D8C290",
                        },
                        style: { top: 5 },
                    }}
                    // showUploadList={{ removeIcon: <CancelUploadIcon /> }}
                //   showUploadList={{showRemoveIcon:false}}
                >
                    <div className="flex flex-col items-center justify-center select-none cursor-pointer">
                        <img className="w-16" src={AddUploadIcon} alt="" />
                        <div className="flex space-x-2">
                            <h1 className="jura text-lg text-[#A3802D]">ADD FILE</h1>
                            <img className="w-4" src={SearchUploadIcon} alt="" />
                        </div>
                    </div>
                    <br />
                </Upload.Dragger>
                <h1 className="prompt font-brown select-none">กรุณาอัปโหลดรูปอุปกรณ์ที่ใช้ทำแผล </h1>
                <div className="w-80 flex px-4 py-1.5 justify-between btn-homepage cursor-pointer">
                    <div className="text-xl jura font-bold">NEXT</div>
                    <img className="w-14" src={Arrow_Start} alt="" />
                </div>
            </div>
        </div>
    );
}