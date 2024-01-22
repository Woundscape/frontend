import { useRef, useState } from "react";
import {
  PlusOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  InputRef,
  Modal,
  Select,
  Space,
  Typography,
} from "antd";
import SearchIcon from "@assets/icon-search-upload.svg";
import SortBy from "@assets/icons/sortBy.svg";
import { UseMutationResult, useMutation } from "react-query";
import { IFormattedErrorResponse } from "@constants/interface";
import { filterOptions, filterSort } from "@config";
import { ICreateEquip, addEquipment } from "@api-caller/equipApi";
import { DefaultEquipForm } from "@constants/defaultForm";

const { RangePicker } = DatePicker;

interface IDefaultEquipProps {
  placeholder?: string;
  segmented?: boolean;
  onFilter: (e: any) => void;
  onRender: () => void;
}
let index = 0;
export default function DefaultInput({
  placeholder,
  segmented,
  onFilter,
  onRender,
}: IDefaultEquipProps) {
  const addMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    ICreateEquip
  > = useMutation(addEquipment);
  const [form, setForm] = useState<ICreateEquip>(DefaultEquipForm);
  const [forms] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [items, setItems] = useState(["jack", "lucy"]);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);
  const setLoading = (value: boolean) => {
    setConfirmLoading(value);
  };
  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
    setForm(DefaultEquipForm);
    forms.resetFields();
  };
  const onChange = async (e: any) => {
    setForm((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onSubmit = async () => {
    try {
      setConfirmLoading(true);
      const values = await forms.validateFields();
      if (values) {
        addMutation.mutate(form, {
          onSuccess: () => {
            onRender()
            setIsModalOpen(false);
            setConfirmLoading(false);
          },
        });
      }
    } catch (error) {
      console.log(error);
      setConfirmLoading(false);
    }
  };
  return (
    <>
      <div id="react__patient__input" className="flex space-x-2">
        <Input
          className="w-1/4"
          size="middle"
          type="text"
          placeholder={placeholder}
          prefix={<img className="pr-1" src={SearchIcon} />}
          onChange={onFilter}
        />
        <RangePicker size="middle" />
        <div className="flex items-center border jura rounded-lg px-3 space-x-1">
          <img className="w-5" src={SortBy} alt="" />
          <p className="text-[#BFBFBF]">Sort by :</p>
          <ConfigProvider
            theme={{
              components: {
                Select: { colorBorder: "" },
              },
            }}
          >
            <Select
              id="select__sortBy"
              className="w-24 outline-none border-[white] text-[#868686]"
              defaultValue="All"
              bordered={false}
              placeholder=""
              options={[
                { value: "All", label: "All" },
                { value: "Unread", label: "Unread" },
              ]}
            />
          </ConfigProvider>
        </div>
        <Button
          className="button_add"
          onClick={handleModal}
          icon={<UserAddOutlined />}
        >
          Add Equipment
        </Button>
        <Modal
          title="Add Equipment"
          destroyOnClose
          open={isModalOpen}
          onOk={handleModal}
          onCancel={handleModal}
          footer={[
            <div
              key={"footer"}
              className="px-6 py-3 flex justify-between gap-4 text-center"
            >
              <Button
                disabled={confirmLoading}
                onClick={handleModal}
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
              rules={[
                { required: true, message: "please input equipment name" },
              ]}
            >
              <Space.Compact className="space-y-2" direction="vertical" block>
                <Typography id="text__primary" className="text-md">
                  Title :
                </Typography>
                <Input
                  name="equip_name"
                  placeholder="Input Equipment Title"
                  onChange={onChange}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item
              name="equip_type"
              rules={[
                { required: true, message: "please select equipment type" },
              ]}
            >
              <Space.Compact className="space-y-2" direction="vertical" block>
                <Typography id="text__primary" className="text-md">
                  Equipment Subtype :
                </Typography>
                <Select
                  placeholder="Select Equipment Subtype"
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
                  onChange={(value) => {
                    forms.setFieldsValue({ equip_type: value });
                    setForm((prevForm) => {
                      return { ...prevForm, equip_type: value };
                    });
                  }}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item
              name="equip_subtype"
              rules={[
                { required: true, message: "please select equipment subtype" },
              ]}
            >
              <Space.Compact className="space-y-2" direction="vertical" block>
                <Typography id="text__primary" className="text-md">
                  Equipment type :
                </Typography>
                <Select
                  placeholder="Select Equipment Type"
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
                  onChange={(value) => {
                    forms.setFieldsValue({ equip_subtype: value });
                    setForm((prevForm) => {
                      return { ...prevForm, equip_subtype: value };
                    });
                  }}
                />
              </Space.Compact>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
}
