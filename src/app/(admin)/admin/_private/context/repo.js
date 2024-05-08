'use client'
import React, { createContext, useContext } from "react";

const RepoContext = createContext();
const RepoProvider = ({ repo, children }) => {
  return (
    <RepoContext.Provider value={repo}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => useContext(RepoContext);
export default RepoProvider;
