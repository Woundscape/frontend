// Loading.tsx
import React, { createContext, useContext, ReactNode, useState } from "react";
import { Spin } from "antd";

interface LoadingContextProps {
  isLoading: boolean;
  message?: string;
  changeLoading: (loadingState: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeLoading = (loadingState: boolean) => {
    setIsLoading(loadingState);
  };

  const contextValue: LoadingContextProps = { isLoading, changeLoading };

  return (
    <LoadingContext.Provider value={contextValue}>
      {isLoading ? (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255, 255, 255, 0.8)",
              zIndex: 9999,
            }}
          >
            <Spin size="large" />
          </div>
          {children}
        </>
      ) : (
        children
      )}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }

  return context;
};
