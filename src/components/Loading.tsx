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
            id="loading-screen"
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-white/40 transition-all`}
          >
            <Spin size="large" className="absolute" />
            {children}
          </div>
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
