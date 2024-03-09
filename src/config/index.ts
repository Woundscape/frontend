import { ThemeConfig } from "antd";
import { BaseOptionType } from "antd/es/select";

export const configENV = (key: string) => {
  return import.meta.env[key];
};

export const httpAPI: string = import.meta.env.WS_SERVER_ENDPOINT_URL;
export enum lineLiffID {
  UPLOAD_IMAGE = "2001180435-mZ7YAEj4",
  HISTORY = "2001180435-oqJGZzeA",
  SIGNIN = "2001180435-eBkJB6ZQ",
  SIGNUP = "2001180435-Rxmw5e1B",
}

export const themeConfig: ThemeConfig = {
  components: {
    Segmented: {
      itemSelectedBg: "#d2dceb",
      itemSelectedColor: "#424241",
      itemHoverBg: "transparent",
    },
    Checkbox: {
      colorTextDisabled: "#B4B4B4",
      colorBorder: "#D9D9D9",
      colorBgContainerDisabled: "#eeee",
      colorBgContainer: "#E1E7FF",
      colorPrimary: "#E1E7FF",
      colorPrimaryHover: "#eeee",
      colorWhite: "#4C577C",
      controlInteractiveSize: 24,
      borderRadiusSM: 4,
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
      // headerPadding: "0px 0px",
      // contentPadding: "0px 0px",
    },
    Card: {
      fontFamily: "jura",
      headerFontSize: 14,
      colorTextHeading: "#4C577C",
      colorText: "#4C577C",
      colorBorderSecondary: "#D9D9D9",
    },
    Result: {
      extraMargin: 0,
      paddingLG: 0,
    },
    Timeline: {
      margin: 20,
      tailColor: "#E8EAF4",
    },
  },
};

export const listConfig: ThemeConfig = {
  components: {
    Segmented: {
      itemSelectedBg: "#EEEEEE",
      itemSelectedColor: "#424241",
      itemHoverBg: "transparent",
      itemColor: "#4C577C",
      colorBgContainer: "red",
    },
    List: {
      itemPadding: "0px 0",
    },
    Collapse: {
      headerPadding: "0px 0px",
      contentPadding: "0px 0px",
    },
  },
};

export const dividerConfig: ThemeConfig = {
  components: {
    Divider: {
      lineWidth: 2,
      colorSplit: "#e5e7eb",
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
