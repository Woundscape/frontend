import { ThemeConfig } from "antd";
import { BaseOptionType } from "antd/es/select";

export const httpAPI: string = "https://ck7tw01q-3000.asse.devtunnels.ms";
export enum lineLiffID {
  UPLOAD_IMAGE = "2001180435-mZ7YAEj4",
  SIGNIN = "2001180435-eBkJB6ZQ",
}

export const themeConfig: ThemeConfig = {
  components: {
    Segmented: {
      itemSelectedBg: "#d2dceb",
      itemSelectedColor: "#424241",
      itemHoverBg: "transparent",
    },
    Checkbox: {
      colorBgContainer: "#D9D9D9",
      colorBorder: "#FFF",
      colorPrimary: "#D9D9D9",
      colorPrimaryHover: "#D9D9D9",
      colorWhite: "#4C577C",
      controlInteractiveSize: 24,
    },
    Button: {
      colorPrimaryHover: "none",
    },
    Select: {
      fontFamily: "jura",
    },
    Modal: {
      titleColor: "#4C577C",
      fontFamily: "jura",
      wireframe: true,
    },
    Input: {
      activeShadow: "transparent",
      activeBorderColor: "",
      hoverBorderColor: "#B4B4B4",
      fontFamily: "jura",
      colorBgContainerDisabled: "transparent",
      colorTextDisabled: "black",
    },
    DatePicker: {
      activeShadow: "transparent",
      activeBorderColor: "#B4B4B4",
      hoverBorderColor: "#B4B4B4",
      fontFamily: "jura",
      cellActiveWithRangeBg: "#E2EDFF",
      colorText: "#555554",
    },
    Collapse: {
      headerBg: "white",
    },
    Card: {
      fontFamily: "jura",
      headerFontSize: 14,
      colorTextHeading: "#4C577C",
      colorText: "#4C577C",
      colorBorderSecondary: "#D9D9D9",
    },
  },
};

export const tagInputStyle: React.CSSProperties = {
  width: 64,
  height: 22,
  marginInlineEnd: 8,
  verticalAlign: "top",
};

export const tagPlusStyle: React.CSSProperties = {
  borderStyle: "dashed",
};

export const filterOptions = (
  value: string,
  option: BaseOptionType | undefined
) => (option?.label as string).toLowerCase().includes(value.toLowerCase());

export const filterSort = (optionA: BaseOptionType, optionB: BaseOptionType) =>
  (optionA?.label ?? "")
    .toLowerCase()
    .localeCompare((optionB?.label ?? "").toLowerCase());
