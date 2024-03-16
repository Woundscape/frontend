import liff from "@line/liff";
import { Button, Spin, Upload } from "antd";
import { useEffect, useState } from "react";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import { lineLiffID } from "@config";
import Logo_Wound from "@assets/logo/logo-wound.svg";
import Arrow_Start from "@assets/arrow-start.svg";
import SearchUploadIcon from "@assets/icon-search-upload.svg";
import AddUploadIcon from "@assets/icon-add-upload-file.svg";
import CancelUploadIcon from "@assets/icons/cancel_upload_patient_icon.svg";
import { UseMutationResult, useMutation } from "react-query";
import { IFormattedErrorResponse } from "@constants";
import { LineCredential, getLineMe, lineUpload } from "@api-caller";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

export default function UploadImage() {
  const uploadMutation: UseMutationResult<
    any,
    IFormattedErrorResponse,
    FormData
  > = useMutation(lineUpload);
  const [user, setUser] = useState<LineCredential>();
  const [wound, setWound] = useState<UploadFile<any>[]>([]);
  const [equip, setEquip] = useState<UploadFile<any>[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    liff
      .init({
        liffId: lineLiffID.UPLOAD_IMAGE,
      })
      .then(() => {
        if (liff.isLoggedIn()) {
          liff.getProfile().then((profile) => {
            getLineMe(profile).then((data: LineCredential) => {
              setUser(data);
            });
          });
        } else {
          liff.login();
        }
      })
      .catch((err) => {
        alert(`error ${err}`);
      });
  }, []);

  async function onSubmit() {
    if (wound.length > 0) {
      setIsLoading(true);
      try {
        const form = new FormData();
        wound.forEach((file, _) => {
          let fileBlob = file.originFileObj ?? new Blob();
          form.append("wound", fileBlob);
        });
        equip.forEach((file, _) => {
          let fileBlob = file.originFileObj ?? new Blob();
          form.append("equip", fileBlob);
        });
        form.append("hn_id", user?.hn_id ?? "");
        form.append("line_uid", user?.userId ?? "");
        uploadMutation.mutate(form, {
          onSuccess: () => {
            liff.closeWindow();
          },
          onError: () => {
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error("Error during file upload:", error);
      }
    }
  }
  return (
    <div className="w-full h-screen bg-white">
      <LoadingOverlayWrapper
        active={isLoading}
        spinner
        text="Loading ..."
        className="w-full h-full absolute"
      />
      <div
        id="line__upload_container"
        className="w-full flex flex-col justify-center items-center space-y-4 p-10"
      >
        <div className="logo-box flex flex-col items-center space-y-2 py-4">
          <img className="w-20" src={Logo_Wound} alt="" />
          <h1 className="text-lg michroma">Woundscape</h1>
        </div>
        <Upload.Dragger
          multiple
          listType="picture"
          accept="image/png, image/jpeg"
          fileList={wound}
          maxCount={7}
          beforeUpload={(_) => {
            return false;
          }}
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
          onChange={(info: UploadChangeParam) => {
            setWound(info.fileList);
          }}
          showUploadList={{ removeIcon: <img src={CancelUploadIcon} /> }}
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
        <h1 className="prompt font-brown select-none text-sm">
          กรุณาอัปโหลดรูปเพื่อวินิจฉัยชั้นแผล
        </h1>
        <Upload.Dragger
          listType="picture"
          accept="image/png, image/jpeg"
          fileList={equip}
          maxCount={1}
          beforeUpload={(_) => {
            return false;
          }}
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
          onChange={(info: UploadChangeParam) => {
            setEquip(info.fileList);
          }}
          showUploadList={{ removeIcon: <img src={CancelUploadIcon} /> }}
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
        <h1 className="prompt font-brown select-none text-sm">
          กรุณาอัปโหลดรูปอุปกรณ์ที่ใช้ทำแผล{" "}
        </h1>
        <Button
          className="w-80 h-10 flex px-4 py-1.5 justify-between items-center btn-homepage cursor-pointer text-center"
          onClick={onSubmit}
        >
          <div className="text-lg jura font-bold">Upload</div>
          <img className="w-14" src={Arrow_Start} alt="" />
        </Button>
      </div>
    </div>
  );
}
