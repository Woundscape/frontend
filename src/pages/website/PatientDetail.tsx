import { useEffect, useRef, useState } from "react";
import type { InputRef } from "antd";
import { Content } from "antd/es/layout/layout";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import {
  Input,
  Segmented,
  Select,
  Space,
  Tag,
  Tooltip,
  Checkbox,
  Button,
} from "antd";
import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import ViewResult from "@assets/view_result.svg";
import ViewResultHist from "@assets/view_result_hist.svg";
import WoundHist from "@assets/wound/img_10.jpg";
import Typography from "antd/es/typography/Typography";
import UserProfile from "@features/UserProfile";
import { selectStage } from "@constraint/constraint";
import ConfirmModal from "@components/ConfirmModal";
import { optionSegmented } from "@utils/option";
import DefaultInput from "@components/Patient/DefaultInput";
import { tagInputStyle, tagPlusStyle } from "@config";

export default function Patient() {
  const [tags, setTags] = useState(["Diabete", "Wound"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  const [stageSegmented, setStageSegmented] = useState("Overview");
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  const handleClose = (e: React.MouseEvent<HTMLElement>, value: string) => {
    e.preventDefault();
    showModal();
    console.log("Clicked! But prevent default.", value);
  };
  const onChange = (checkedValues: CheckboxValueType[]) => {
    console.log("checked = ", checkedValues);
  };
  // const handleClose = (removedTag: string) => {

  // const newTags = tags.filter((tag) => tag !== removedTag);
  // console.log(newTags);
  // setTags(newTags);
  // };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setEditInputValue("");
  };

  const filterPatient = (e: any) => {};
  function renderImage() {
    return "abcderfg".split("").map((value, index) => {
      return (
        <div key={index} className="flex pt-4">
          <div className="w-64 h-44 patient_img p-3 flex justify-end items-start">
            {stageSegmented == "Overview" ? (
              <div className="w-full h-full flex flex-col justify-between">
                <div className="flex flex-row justify-between text-white jura border-b">
                  <p>HN.9877065</p>
                  <p>01/02/23</p>
                </div>
                <div className="flex flex-row justify-between h-8 border rounded-full">
                  <p className="jura text-white p-1 pl-3">Edit</p>
                  <img className="pt-0.5 pb-0.5" src={ViewResult} alt="" />
                </div>
              </div>
            ) : (
              <Checkbox value={value} />
            )}
          </div>
        </div>
      );
    });
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      <div className="w-full h-screen relative">
        <div className="w-full h-full pt-8 bg-white">
          <div className="w-full h-full flex flex-col">
            <header
              id="head__patient"
              className="px-6 border-b-2 pb-5 border-[#E9EBF5]"
            >
              <div className="flex justify-between">
                <div className="flex items-center space-x-4">
                  <LeftOutlined />
                  <p className="jura text-xl">Patient</p>
                </div>
                <div className="w-[30rem]">
                  <UserProfile />
                </div>
              </div>
              <Segmented
                className="jura mt-4 select-none"
                options={optionSegmented}
                onChange={(stage: any) => setStageSegmented(stage)}
              />
            </header>
            <Content className="grow p-6 pb-0">
              <div className="flex h-full space-x-6">
                <div className="w-full h-full flex flex-col space-y-2">
                  {/* Input Filter */}
                  <DefaultInput onFilter={filterPatient} images />
                  <div className="flex space-x-2 items-center">
                    <Typography id="text__primary">
                      Progression Stage :
                    </Typography>
                    <Select
                      style={{ width: 200 }}
                      placeholder="Select"
                      options={selectStage}
                    />
                    <Space size={[0, 8]} wrap>
                      <ConfirmModal
                        title="Are you sure ?"
                        description="Are you sure that the hospital number you entered is 9877069?"
                        isOpen={isModalOpen}
                        confirmLoading={true}
                        onSubmit={handleModal}
                        onCancel={handleModal}
                      />
                      <Typography id="text__primary">Disease :</Typography>
                      {tags.map((tag, index) => {
                        if (editInputIndex === index) {
                          return (
                            <Input
                              ref={editInputRef}
                              key={tag}
                              size="small"
                              style={tagInputStyle}
                              value={editInputValue}
                              onChange={handleEditInputChange}
                              onBlur={handleEditInputConfirm}
                              onPressEnter={handleEditInputConfirm}
                            />
                          );
                        }
                        const isLongTag = tag.length > 20;
                        const tagElem = (
                          <Tag
                            key={tag}
                            closable
                            style={{
                              userSelect: "none",
                              color: "#4C577C",
                              fontFamily: "jura",
                            }}
                            color="#F4DEE7"
                            onClose={(e) => handleClose(e, tag)}
                          >
                            <span
                              onDoubleClick={(e) => {
                                if (index !== 0) {
                                  setEditInputIndex(index);
                                  setEditInputValue(tag);
                                  e.preventDefault();
                                }
                              }}
                            >
                              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                            </span>
                          </Tag>
                        );
                        return isLongTag ? (
                          <Tooltip title={tag} key={tag}>
                            {tagElem}
                          </Tooltip>
                        ) : (
                          tagElem
                        );
                      })}
                      {inputVisible ? (
                        <Input
                          ref={inputRef}
                          type="text"
                          size="small"
                          style={tagInputStyle}
                          value={inputValue}
                          onChange={handleInputChange}
                          onBlur={handleInputConfirm}
                          onPressEnter={handleInputConfirm}
                        />
                      ) : (
                        <Tag
                          style={tagPlusStyle}
                          icon={<PlusOutlined />}
                          onClick={showInput}
                          className="jura"
                        >
                          Add Tag
                        </Tag>
                      )}
                    </Space>
                  </div>
                  {/* Body */}
                  <div
                    id="timeline-container"
                    className="h-full overflow-y-auto"
                  >
                    <div className="inner-container pt-4">
                      <ul className="timeline pl-20">
                        {/* <li id="test" /> */}
                        <li
                          className="timeline-item flex flex-wrap gap-3"
                          data-date="17 Jan"
                        >
                          <Checkbox.Group
                            className="w-full"
                            onChange={onChange}
                          >
                            {renderImage()}
                          </Checkbox.Group>
                        </li>
                        <li
                          className="timeline-item flex flex-wrap gap-3"
                          data-date="3 Feb"
                        >
                          {renderImage()}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {stageSegmented != "Overview" && (
                  <Content id="history" className="flex flex-col">
                    <div className="head-history h-14 w-72 bg-[#EEEEEE] rounded-xl ">
                      <p className="jura text-[#555554] text-lg p-3">History</p>
                    </div>
                    <div className="flex flex-col border-2 rounded-xl p-2 jura mt-4">
                      <div className="flex justify-between bg-[#F2F2F2] p-2 rounded-lg">
                        <p className="text-[#4C577C]">Jul 19, 2023 08:23</p>
                        <p className="text-[#626060]">HN.6643793</p>
                      </div>
                      <div className="flex pt-3">
                        <img
                          className="w-16 rounded-lg"
                          src={WoundHist}
                          alt=""
                        />
                        <p className="text-[#4C577C] p-3.5">
                          Jul 14, 2023 18:44
                        </p>
                      </div>
                      <div className="flex pt-3">
                        <img
                          className="w-16 rounded-lg"
                          src={WoundHist}
                          alt=""
                        />
                        <p className="text-[#4C577C] p-3.5">
                          Jul 14, 2023 18:44
                        </p>
                      </div>
                      <div className="flex flex-row space-x-1.5 mt-1">
                        <div className="w-24 bg-[#F4DEE7] rounded mt-2">
                          <p className="text-center text-[#4C577C]">Diabetes</p>
                        </div>
                        <div className="w-20 bg-[#F4DEE7] rounded mt-2">
                          <p className="text-center text-[#4C577C]">Pressure</p>
                        </div>
                        <div className="w-20 bg-[#F4DEE7] rounded mt-2">
                          <p className="text-center text-[#4C577C]">Asthma</p>
                        </div>
                      </div>
                      <div className="flex flex-row justify-between h-8 border-2 rounded-full mt-3">
                        <p className="jura text-[#9198AF] p-1 pl-3">
                          View result
                        </p>
                        <img className="pr-1" src={ViewResultHist} alt="" />
                      </div>
                    </div>
                  </Content>
                )}
              </div>
            </Content>
            <div
              className="h-20 flex flex-col items-end justify-center px-8"
              style={{ boxShadow: "0px -4px 9px 0px rgba(0, 0, 0, 0.15)" }}
            >
              <div className="flex items-center space-x-6">
                <Typography id="text__primary">
                  Select {tags.length} Images
                </Typography>
                <Button className="w-40 py-0.5 z-10 jura text-[#424241] rounded-md border border-[#9198AF]">
                  {stageSegmented != "Overview" ? "Confirm" : "Select"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
