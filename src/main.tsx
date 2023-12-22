import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MyApp from "./App.tsx";
import { ConfigProvider, App } from "antd";
import { themeConfig } from "@config/index.ts";
import "@styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={'7084720936-8m878qplb5v9blu95bdsk47p5h6rqaro.apps.googleusercontent.com'}>
    <React.StrictMode>
      <ConfigProvider theme={themeConfig}>
        {/* <App> */}
          <MyApp />
        {/* </App> */}
      </ConfigProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
