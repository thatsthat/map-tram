import React, { useState, useEffect } from "react";
import "./styles.css";

const LiveData = () => {
  const [token, setToken] = useState(0);
  const [data, setData] = useState(0);

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
        setToken(content.access_token);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchData = async () => {
    try {
      if (token === 0) await fetchToken();
      const rawResponse = await fetch(
        /*         "https://opendata.tram.cat/api/v1/activeVehicles?" +
          new URLSearchParams({
            networkId: 1,
            lineId: 1,
          }), */

        "https://opendata.tram.cat/api/v1/networks",
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
        const response = await rawResponse;
        return response;
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetchData();
      return response.status;
    };
    console.log(getData());
    /*       if (response.status === 401) {
        await fetchToken();
        const response2 = await fetchData()
        setData(response2.json())
      }
      else setData(response.json())
    }
    if (response.status === 401) {
          await fetchToken();
        } else setData(response.json());
    fetchData();  */
  }, []);

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(token)}</div>
    </div>
  );
};

export default LiveData;
