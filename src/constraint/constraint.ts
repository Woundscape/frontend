import { DefaultOptionType } from "antd/es/select";

export enum IStage {
  SPECIAL = "Special",
  UNSTABLE = "Unstable",
  STABLE = "Stable",
  IMPROVE = "Improved",
}

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
