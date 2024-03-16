import { useEffect, useRef, useState } from "react";
import { UseMutationResult, useMutation } from "react-query";
import { PlusOutlined } from "@ant-design/icons";
import { filterOptions, filterSort } from "@config";
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  InputRef,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import { addTypeEquipment, getTypeEquipment } from "@api-caller/equipApi";
import { IEquipType, IEquipment, IFormattedErrorResponse } from "@constants";

interface IEquipmentModalProps {
  data?: IEquipment;
  forms: FormInstance;
  isOpen: boolean;
  confirmLoading?: boolean;
  setModal: () => void;
  setLoading: (value: boolean) => void;
  onRender?: () => void;
  onSubmit: () => void;
  onChange: (e: any) => void;
  onSelect: (e: string, name: string) => void;
}

export default function EquipmentModal({
  isOpen,
  confirmLoading,
  data,
  forms,
  setModal,
  onRender,
  onSubmit,
  onChange,
  onSelect,
}: IEquipmentModalProps) {
  const addTypeMutation: UseMutationResult<
    IEquipType,
    IFormattedErrorResponse,
    string
  > = useMutation(addTypeEquipment);
  const [type, setType] = useState<IEquipType[]>([]);
  const [name, setName] = useState("");
  const [loadingSelect, setLoadingSelect] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addItem = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    if (name) {
      setLoadingSelect(true);
      addTypeMutation.mutate(name, {
        onSuccess: (response) => {
          setType((previous) => [...previous, response]);
          setName("");
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
          setLoadingSelect(false);
        },
      });
    }
  };
  useEffect(() => {
    getType();
  }, []);
  async function getType() {
    const type: IEquipType[] = await getTypeEquipment();
    setType(type);
  }
  return (
    <>
      <Modal
        title="Add Equipment"
        destroyOnClose
        open={isOpen}
        onOk={setModal}
        onCancel={setModal}
        footer={[
          <div
            key={"footer"}
            className="px-6 py-3 flex justify-between gap-4 text-center"
          >
            <Button
              disabled={confirmLoading}
              onClick={setModal}
              type="default"
              htmlType="reset"
              className="w-36 jura text-[#4C577C] border-[#D2D4EB]"
              style={{ borderWidth: "1.5px" }}
            >
              Cancel
            </Button>
            <Button
              type="default"
              htmlType="submit"
              onClick={onSubmit}
              loading={confirmLoading}
              className="w-36 jura text-[#4C577C] bg-[#D2D4EB] border-[#8088A7]"
              style={{ borderWidth: "1.5px" }}
            >
              Save
            </Button>
          </div>,
        ]}
        style={{
          borderRadius: "1.25rem",
        }}
      >
        <Form
          form={forms}
          onFinish={onSubmit}
          scrollToFirstError
          className="w-full space-y-4"
        >
          <Form.Item
            name="equip_name"
            initialValue={data?.equip_name}
            rules={[{ required: true, message: "please input equipment name" }]}
          >
            <Space.Compact className="space-y-2" direction="vertical" block>
              <Typography id="text__primary" className="text-md">
                Title :
              </Typography>
              <Input
                allowClear
                name="equip_name"
                placeholder="Input Equipment Title"
                onChange={onChange}
                value={data?.equip_name}
              />
            </Space.Compact>
          </Form.Item>
          <Form.Item
            name="equip_type"
            initialValue={data?.equip_type}
            rules={[
              { required: true, message: "please select equipment type" },
            ]}
          >
            <Space.Compact className="space-y-2" direction="vertical" block>
              <Typography id="text__primary" className="text-md">
                Equipment type :
              </Typography>
              <Select
                showSearch
                loading={loadingSelect}
                value={data?.equip_type}
                placeholder="Select Equipment Type"
                filterOption={filterOptions}
                filterSort={filterSort}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <div className="flex" style={{ padding: "0 8px 4px" }}>
                      <Input
                        allowClear
                        placeholder="Please enter new equipment type"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        className="w-full"
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        id="text__primary"
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add item
                      </Button>
                    </div>
                  </>
                )}
                options={type?.map((item) => ({
                  label: item.type_name,
                  value: item.type_id,
                }))}
                onChange={(e) => {
                  onSelect(e, "equip_type");
                }}
              />
            </Space.Compact>
          </Form.Item>
          {/* <Form.Item
            name="equip_subtype"
            initialValue={data?.equip_subtype}
            rules={[
              { required: true, message: "please select equipment subtype" },
            ]}
          >
            <Space.Compact className="space-y-2" direction="vertical" block>
              <Typography id="text__primary" className="text-md">
                Equipment subtype :
              </Typography>
              <Select
                value={data?.equip_subtype}
                placeholder="Select Equipment SubType"
                filterOption={filterOptions}
                filterSort={filterSort}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider style={{ margin: "8px 0" }} />
                    <Space style={{ padding: "0 8px 4px" }}>
                      <Input
                        placeholder="Please enter item"
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                        onKeyDown={(e) => e.stopPropagation()}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
                options={items.map((item) => ({ label: item, value: item }))}
                onChange={(e) => {
                  onSelect(e, "equip_subtype");
                }}
              />
            </Space.Compact>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
}
