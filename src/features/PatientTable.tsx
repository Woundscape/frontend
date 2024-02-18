import { useEffect, useState } from "react";
import { MenuProps, Tag, Typography } from "antd";
import { formatDate } from "../utils/formatDate";
import { getCaseByDoctorId } from "@api-caller/caseApi";
import { useAuth } from "@components/AuthProvider";
import { IPatient } from "@constants";

export default function DashboardTable() {
  const { me } = useAuth();
  const [cases, setCases] = useState<IPatient[]>();
  useEffect(() => {
    async function getCase() {
      if (me) {
        const _cases = await getCaseByDoctorId({ doctor_id: me.doctor_id });
        setCases(_cases);
      }
    }
    getCase();
  }, []);
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
                Start date & time
              </th>
            </tr>
          </thead>
          <tbody className="bg-grey-light flex flex-col items-center w-full h-full overflow-y-auto">
            {cases &&
              cases?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="flex w-full py-3 bg-white border-b-2 border-[#E9EBF5] select-none hover:bg-[#EEEEEE]"
                  >
                    <td className="w-1/6">{item.hn_id}</td>
                    <td className="w-1/6">{item.admit_no}</td>
                    <td className="w-1/6">{item.status}</td>
                    <td className="w-1/6 flex justify-center items-center">
                      {item.disease && item.disease?.length > 0 ? (
                        <>
                          <Tag
                            color={
                              item.disease[0].length > 5 ? "geekblue" : "green"
                            }
                            className="jura"
                          >
                            {item.disease[0]}
                          </Tag>
                          {item.disease.length > 1 && (
                            <Typography id="text__disease">
                              +{item.disease.length - 1}
                            </Typography>
                          )}
                        </>
                      ) : (
                        <div className="jura text-center">-</div>
                      )}
                    </td>
                    <td className="w-1/6">{formatDate(item.updated_at)}</td>
                    <td className="w-1/6 flex justify-center items-center">
                      {formatDate(item.created_at)}
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
