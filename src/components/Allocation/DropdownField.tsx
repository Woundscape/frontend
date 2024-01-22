// Used In: { Management }
import { useEffect, useState } from "react";
import { ICase, IDoctor, IFormattedErrorResponse } from "@constants/interface";
import { ConfigProvider, Select, notification } from "antd";
import ConfirmModal from "@components/ConfirmModal";
import { CheckCircleOutlined } from "@ant-design/icons";
import { UseMutationResult } from "react-query";
import { IUpdateCase } from "@api-caller/caseApi";
import { filterOptions, filterSort } from "@config";

interface DropdownFieldProps {
  data: ICase;
  doctor: IDoctor[];
  updateMutation: UseMutationResult<
    boolean,
    IFormattedErrorResponse,
    IUpdateCase
  >;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  data,
  doctor,
  updateMutation,
}) => {
  // const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectLoading, setSelectLoading] = useState(true);
  const [selectValue, setSelectValue] = useState(data.doctor_assign);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = () => {
    api["success"]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const onCancel = () => {
    setIsModalOpen(!isModalOpen);
    setOpen(false);
  };
  const onSubmit = () => {
    setSubmitLoading(true);
    updateMutation.mutate(
      {
        case_id: data.case_id,
        body: { doctor_id: selectValue },
      },
      {
        onSuccess: () => {
          setIsModalOpen(false);
          setOpen(false);
          setSubmitLoading(false);
          openNotificationWithIcon();
        },
      }
    );
  };
  useEffect(() => {
    if (doctor) {
      setSelectLoading(false);
    }
    setSelectValue(data.doctor_assign);
  }, [data]);
  return (
    <>
      {contextHolder}
      <div className="w-auto flex justify-end items-center gap-3">
        {data?.doctor_assign && (
          <CheckCircleOutlined style={{ color: "#A0A7DB" }} />
        )}
        <ConfigProvider
          theme={{
            components: {
              Select: { zIndexPopup: 10 },
            },
          }}
        >
          <Select
            showSearch
            open={open}
            defaultActiveFirstOption
            className="w-full"
            placeholder="Select"
            value={data.doctor_assign || null}
            loading={selectLoading}
            optionFilterProp="children"
            onDropdownVisibleChange={(open) => {}}
            onClick={() => setOpen(true)}
            onBlur={() => !isModalOpen && setOpen(false)}
            filterOption={filterOptions}
            filterSort={filterSort}
            options={doctor.map((doctor) => {
              const label = `${doctor.doctor_firstname}  ${doctor.doctor_lastname}`;
              const value = doctor.doctor_id;
              return { label, value };
            })}
            onChange={(value) => {
              setSelectValue(value);
              setOpen(true);
              showModal();
            }}
          />
        </ConfigProvider>

        <ConfirmModal
          title="Change new doctor"
          description={
            "If you change new doctor, it will disappear from current doctor and send this patient to new doctor"
          }
          isOpen={isModalOpen}
          confirmLoading={submitLoading}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </div>
    </>
  );
};
