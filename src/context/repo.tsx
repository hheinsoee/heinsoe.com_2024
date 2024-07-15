// RepoContext.tsx
"use client";
import React, { createContext, useContext, ReactNode, useState } from "react";

interface RepoContextType {
  repo: any;
  setRepo: React.Dispatch<React.SetStateAction<any>>;
}

const RepoContext = createContext<RepoContextType | undefined>(undefined);

interface RepoProviderProps {
  init: any;
  children: ReactNode;
}

const RepoProvider: React.FC<RepoProviderProps> = ({ init, children }: RepoProviderProps) => {
  const [repo, setRepo] = useState(init);
  return (
    <RepoContext.Provider value={{ repo, setRepo }}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = (): RepoContextType => {
  const context = useContext(RepoContext);
  if (!context) {
    throw new Error("useRepo must be used within a RepoProvider");
  }
  return context;
};

export default RepoProvider;
