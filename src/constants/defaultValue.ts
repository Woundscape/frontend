import { SEGMENT_STATE } from "./defaultState";

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
