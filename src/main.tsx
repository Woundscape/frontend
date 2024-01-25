import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import MyApp from "./App.tsx";
import { ConfigProvider } from "antd";
import { themeConfig } from "@config/index.ts";
import "@styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={"7084720936-8m878qplb5v9blu95bdsk47p5h6rqaro.apps.googleusercontent.com"}>
    {/* <StrictMode> */}
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <MyApp />
      </ConfigProvider>
    </QueryClientProvider>
    {/* </StrictMode> */}
  </GoogleOAuthProvider>
);
