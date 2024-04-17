"use client";
import axios from "axios";
import { useState } from "react";

export const useRayFetch = ({ url }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const addData = (d) => {
    if (Array.isArray(data)) {
      setData((old) => {
        return [d, ...old];
      });
    } else {
      setData([d]);
    }
  };

  const removeData = (id) => {
    setData((old) => old.filter((x) => x.id != id));
  };

  const updateData = (updatedData) => {
    const newData = data.map((item) => {
      if (item.id === updatedData.id) {
        return updatedData;
      } else {
        return item;
      }
    });
    setData(newData);
  };

  const getData = (props) => {
    setLoading(true);
    axios
      .get(url, { params: props?.params })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        setError(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return { loading, error, data, getData, addData, removeData, updateData };
};
