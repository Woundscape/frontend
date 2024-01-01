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
    },
    Input:{
      activeShadow:'transparent',
      activeBorderColor:'',
      hoverBorderColor:'#B4B4B4',
      fontFamily:'jura',
    },
    DatePicker:{
      activeShadow:'transparent',
      activeBorderColor:'#B4B4B4',
      hoverBorderColor:'#B4B4B4',
      fontFamily:'jura',
  
      cellActiveWithRangeBg:'#E2EDFF',
      colorText:'#555554',
    },
    Collapse:{
      headerBg:'white'
    }
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

