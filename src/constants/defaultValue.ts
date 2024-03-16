import { DefaultOptionType } from "antd/es/select";
import { IStage, SEGMENT_STATE } from "./defaultState";

export const DefaultResolution = {
  width: 0,
  height: 0,
};

export const DefaultDeleteProps = {
  color: "",
  strokeWidth: 4,
  remainPaths: [],
  deletePaths: [],
};

export const DefaultStageSegmented = {
  stage: SEGMENT_STATE.OVERVIEW,
  limit: false,
};

export const selectStage: DefaultOptionType[] = [
  {
    value: IStage.SPECIAL,
    label: IStage.SPECIAL,
  },
  {
    value: IStage.UNSTABLE,
    label: IStage.UNSTABLE,
  },
  {
    value: IStage.STABLE,
    label: IStage.STABLE,
  },
  {
    value: IStage.IMPROVE,
    label: IStage.IMPROVE,
  },
];

export const selectStatus: DefaultOptionType[] = [
  {
    value: "In Progress",
    label: "In Progress",
  },
  {
    value: "Done",
    label: "Done",
  },
];
