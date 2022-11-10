import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

const FetchData = (params: any) => {
  const [status, setStatus] = useState();
  const [data, setData] = useState<any[]>([]);
  const [refetch, setRefetch] = useState(false);

  const url = "https://www.sunshinedeliver.com/api";

  const loading = require("../assets/nome.gif");

  const fetchData = async () => {
    setStatus(loading);

    let headers = undefined;

    if (params.auth) {
      let value = await AsyncStorage.getItem("authUser");
      let tokenData = JSON.parse(value);
      let tokenvalue = tokenData.user_id;

      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Token ${tokenvalue}`,
      };
    } else {
      headers = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(url + params.endpoint, {
      headers: headers,
      method: params.method,
      ...(params.method == "POST" && { body: JSON.stringify(params.body) }),
    });

    const data = await response.json();
    setData(data);
    setStatus(loading);
  };

  useEffect(() => {
    if (!params) return;

    fetchData();
  }, [refetch]);

  return { status, data, refetch, setRefetch };
};

export default FetchData;
