"use client";
import React, { createContext, useContext, useState } from "react";
import { JSONTree } from "react-json-tree";

const RepoContext = createContext();
const RepoProvider = ({ repo, children }) => {
  const [data, setData] = useState(repo);
  return (
    <RepoContext.Provider value={[data, setData]}>
      {children}
    </RepoContext.Provider>
  );
};

export const useRepo = () => useContext(RepoContext);
export default RepoProvider;
