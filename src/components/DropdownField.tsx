import { useEffect, useState } from "react";
import { getInstanceLocal } from "@api/apiClient";
import { IDoctor } from "@constraint/constraint";
import { App, Select } from "antd";
import ConfirmModal from "@components/ConfirmModal";

export default function ManagementDropdown({ data }: any) {
  const [doctor, setDoctor] = useState<IDoctor[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(!isModalOpen);
    setOpen(false)
  };
  const onSubmit = () =>{
    setIsModalOpen(!isModalOpen);
    setOpen(false)
  }
  useEffect(() => {
    getInstanceLocal()
      .get("/doctor")
      .then((res) => {
        setDoctor(res.data);
        setIsLoading(false)
      });
  }, []);
  return (
    <>
      <Select
        open={open}
        showSearch
        className="w-36"
        placeholder="Select"
        value={data || null}
        optionFilterProp="children"
        onDropdownVisibleChange={(open) => {}}
        onClick={() => setOpen(true)}
        onBlur={() => !isModalOpen && setOpen(false)}
        filterOption={(input, option) =>
          (option?.label as string)
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0
        }
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        loading={isLoading}
        options={doctor.map((doctor) => {
          const label = `${doctor.doctor_firstname}  ${doctor.doctor_lastname}`;
          const value = doctor.doctor_id;
          return { label, value };
        })}
        onSelect={(_, option) => {
          setOpen(true)
          showModal()
          // .then(()=>{
          //   notification.success({
          //     message: `Notification topLeft`,
          //     description: "Hello, " + option.label,
          //     placement: "topRight",
          //   });
          // })
        }}
      />
      <ConfirmModal
        title="Change new doctor"
        description={"If you change new doctor, it will disappear from current doctor and send this patient to new doctor"}
        isOpen={isModalOpen}
        confirmLoading={false}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </>
  );
}
