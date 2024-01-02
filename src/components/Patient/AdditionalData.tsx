import { Input, InputRef, Select, Space, Tag, Tooltip, Typography } from "antd";
import ConfirmModal from "@components/ConfirmModal";
import { useEffect, useRef, useState } from "react";
import { tagInputStyle, tagPlusStyle } from "@config";
import { PlusOutlined } from "@ant-design/icons";
import { IPatient, selectStage } from "@constraint/constraint";
import { getCaseByCaseId } from "@api-caller/caseApi";

interface IAdditionalDataProps {
  case_id: string | undefined;
}

export default function AdditionalData({case_id}:IAdditionalDataProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState(["Diabete", "Wound"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  
  useEffect(() => {
    editInputRef.current?.focus();
  }, [editInputValue]);

  useEffect(()=>{
    if(case_id){
      getCase()
    }    
  })
  async function getCase(){
    const _case:IPatient = await getCaseByCaseId(case_id as string);
    console.log(_case);
    

  }
  const handleClose = (e: React.MouseEvent<HTMLElement>, value: string) => {
    e.preventDefault();
    showModal();
    console.log("Clicked! But prevent default.", value);
  };
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
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
    // const handleClose = (removedTag: string) => {

  // const newTags = tags.filter((tag) => tag !== removedTag);
  // console.log(newTags);
  // setTags(newTags);
  // };
  return (
    <>
      <div className="flex space-x-2 items-center">
        <Typography id="text__primary">Progression Stage :</Typography>
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
            confirmLoading={false}
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
    </>
  );
}
