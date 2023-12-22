import { ThemeConfig } from "antd";

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
    Button:{
      colorPrimaryHover: 'none'
    },
    Select:{
      fontFamily: 'jura',
      zIndexPopup:50,
    },
    Modal:{
      titleColor:'#4C577C',
      fontFamily:'jura',
      wireframe:true,
    }
  },
};
