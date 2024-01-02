import { Dropdown, MenuProps, Tag } from "antd";
import MoreIcon from "@assets/icons/more_icon.svg";
interface TableType {
  id: Number;
  hn_id: String;
  admit_no: String;
  status: String;
  disease: String;
  last_updated: String;
}
export default function DashboardTable() {
  const tableData: TableType[] = [
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
    {
      id: 1,
      hn_id: "9877065",
      admit_no: "001",
      status: "In progress",
      disease: "Disease",
      last_updated: "21 Minutes ago",
    },
  ];
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Edit
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Consult
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Delete
        </a>
      ),
    },
  ];
  return (
    <>
      <div
        className="relative rounded-xl h-full"
        style={{ boxShadow: "0px 0px 10px 0px #D2D7EB" }}
      >
        <table className="w-full h-full text-center jura text-[#4C577C]">
          <thead className="text-md w-full">
            <tr className="flex border-b-2 py-4 border-[#E9EBF5]">
              <th scope="col" className="w-1/6">
                Hospital No.
              </th>
              <th scope="col" className="w-1/6">
                Admit No.
              </th>
              <th scope="col" className="w-1/6">
                Status
              </th>
              <th scope="col" className="w-1/6">
                Disease
              </th>
              <th scope="col" className="w-1/6">
                Last updated
              </th>
              <th scope="col" className="w-1/6">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-grey-light flex flex-col items-center w-full h-full overflow-y-auto">
            {tableData?.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="flex w-full py-3 bg-white border-b-2 border-[#E9EBF5] select-none hover:bg-[#EEEEEE]"
                >
                  <td className="w-1/6">{item.hn_id}</td>
                  <td className="w-1/6">{item.admit_no}</td>
                  <td className="w-1/6">{item.status}</td>
                  <td className="w-1/6">
                    <Tag
                      color="#EBD2DD"
                      style={{
                        color: "#4C577C",
                        fontFamily: "jura",
                      }}
                    >
                      {item.disease}
                    </Tag>
                  </td>
                  <td className="w-1/6">{item.last_updated}</td>
                  <td className="w-1/6 flex justify-center items-center">
                    <Dropdown menu={{ items }} trigger={["click"]}>
                      <img src={MoreIcon} alt="" />
                      {/* <EllipsisOutlined style={{fontSize:24}} /> */}
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
