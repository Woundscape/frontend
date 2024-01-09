import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Select, Space, Typography, Upload } from "antd";
import { Content } from "antd/es/layout/layout";
import TextArea from "antd/es/input/TextArea";
import AddImageIcon from "@assets/icons/add_image_icon.svg";
import { useEffect, useState } from "react";
import getAllEquipment from "@api-caller/equipApi";

interface INoteProps {
  openModal: boolean;
  onModal: () => void;
}

export default function AddNote({ openModal, onModal }: INoteProps) {
  const [data, setData] = useState([])
  useEffect(()=>{
    async function getEquipment(){
      const equipments = await getAllEquipment();
      setData(equipments)
      console.log(equipments);
      
    }
    getEquipment()
  },[])
  return (
    <>
      <Button
        id="add-note"
        className="py-8 flex items-center border-2 border-[#D9D9D9]"
        onClick={onModal}
      >
        <div className="flex space-x-4 jura">
          <PlusOutlined style={{ fontSize: 20, color: "#4C577C" }} />
          <p className="text-lg text-[#4C577C]">ADD NOTE</p>
        </div>
      </Button>
      <Modal
        open={openModal}
        onOk={onModal}
        onCancel={onModal}
        width={800}
        title={"Add Note"}
        style={{
          borderRadius: "1.25rem",
        }}
        footer={null}
        destroyOnClose
      >
        <Content className="w-full space-y-4">
          <Space.Compact className="space-y-2" direction="vertical" block>
            <Typography id="text__primary" className="text-md">
              Title :
            </Typography>
            <Select
              placeholder="Select a person"
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
              className="w-1/2"
            />
          </Space.Compact>
          <Space.Compact className="space-y-2" direction="vertical" block>
            <Typography id="text__primary" className="text-md">
              Equipment :
            </Typography>
            <Select
              mode="tags"
              placeholder="Select a person"
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
              className="w-1/2"
            />
          </Space.Compact>
          <Card
            title="Description"
            extra={"Hospital No. 642846"}
            id="text__primary"
          >
            <div className="flex justify-between pb-4">
              <TextArea
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
                placeholder="Type your message . . ."
                style={{ height: 120, color: "#9198AF" }}
                autoSize={{ minRows: 6, maxRows: 6 }}
                bordered={false}
              />
            </div>
            <div className="flex justify-between items-end">
              <Upload>
                <Button
                  icon={<img src={AddImageIcon} />}
                  className="px-4 h-10 jura flex justify-center items-center border-[#D9D9D9] text-[#4C577C]"
                >
                  Add Image
                </Button>
              </Upload>
              <Button className="px-10 jura border-[#9198AF] text-[#4C577C]">
                Save
              </Button>
            </div>
          </Card>
        </Content>
      </Modal>
    </>
  );
}
