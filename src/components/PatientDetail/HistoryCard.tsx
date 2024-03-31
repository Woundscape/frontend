import ViewResultHist from "@assets/view_result_hist.svg";
import { IImage, SEGMENT_STATE } from "@constants";
import { formatDate, formatImage } from "@utils";
import { useNavigate } from "react-router-dom";

interface HistoryCardProps {
  data: any;
  stage: SEGMENT_STATE;
  hn_id: string;
}

export default function HistoryCard({ data, stage, hn_id }: HistoryCardProps) {
  const router = useNavigate();
  const onClick = () => {
    if (stage == SEGMENT_STATE.COMPARE) {
      router(`/compare/${data.compare_id}`, { state: { hn_id } });
    } else if (stage == SEGMENT_STATE.PROGRESS) {
      router(`/progress/${data.prog_id}`, {
        state: { hn_id },
      });
    }
  };
  return (
    <>
      <div className="flex flex-col border-2 rounded-xl p-2 jura mt-4">
        <div className="flex justify-between bg-[#F2F2F2] p-2 rounded-lg">
          <p className="text-[#4C577C]">{formatDate(data?.created_at)}</p>
          <p className="text-[#626060]">HN. {hn_id}</p>
        </div>
        {data.images.map((image: IImage, index: number) => (
          <div key={index} className="flex pt-3">
            <img
              className="w-14 h-14 object-cover rounded-lg"
              src={formatImage(image?.img_path)}
            />
            <p className="text-[#4C577C] p-3.5">
              {formatDate(image?.created_at)}
            </p>
          </div>
        ))}
        <div
          className="flex flex-row justify-between h-8 border-2 rounded-full mt-3 hover:bg-[#E1E7FF]"
          onClick={onClick}
        >
          <p className="jura text-[#9198AF] p-1 pl-3">View result</p>
          <img className="pr-1" src={ViewResultHist} alt="" />
        </div>
      </div>
    </>
  );
}
