import React, { useState, useEffect } from "react";
import "./styles.css";

const LiveDataTwo = () => {
  const [data, setData] = useState(0);
  const [token, setToken] = useState(0);

  const fetchToken = async () => {
    try {
      const aBody = new URLSearchParams();
      aBody.append("grant_type", "client_credentials");
      aBody.append("client_id", process.env.REACT_APP_USER);
      aBody.append("client_secret", process.env.REACT_APP_SECRET);

      const rawResponse = await fetch(
        "https://opendata.tram.cat/connect/token",
        {
          method: "POST",
          // prettier-ignore
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: aBody.toString(),
        }
      );
      try {
        const content = await rawResponse.json();
        return content.access_token;
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchData = async (token) => {
    try {
      const rawResponse = await fetch(
        "https://opendata.tram.cat/api/v1/activeVehicles?networkId=1&lineId=2",
        {
          method: "GET",
          // prettier-ignore
          headers: {
            "Authorization": "Bearer " + token,
            "Content-type": "application/json; charset=utf-8",
          },
        }
      );
      try {
        const rDataFull = await rawResponse.json();
        const rStatus = await rawResponse.status;
        const rData = rDataFull.map((a) => {
          return {
            next: a.nextStopName,
            pos: a.vehiclePosition,
            delay: a.delay,
            time: Date.now(),
          };
        });
        const response = { data: rData, status: rStatus };
        return response;
      } catch (e) {
        console.log(e);
        return { data: 0, status: 401 };
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getInfo = async () => {
      const info = await fetchData(token);
      if (info.status === 401) {
        const tkn = await fetchToken();
        setToken(tkn);
        const info2 = await fetchData(tkn);
        setData(info2.data);
      } else {
        setData(info.data);
      }
    };
    let id = 0;
    if (token === 0) getInfo();
    else {
      id = setTimeout(getInfo, 31000);
    }

    return () => clearTimeout(id);
  }, [token, data]);

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default LiveDataTwo;
