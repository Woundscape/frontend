import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import MyApp from "./App.tsx";
import { ConfigProvider } from "antd";
import { themeConfig } from "@config/index.ts";
import "@styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeConfig}>
        <MyApp />
      </ConfigProvider>
    </QueryClientProvider>
  // </StrictMode>
);
