import React, { useState, useEffect } from "react";
import "./styles.css";

const LiveData = () => {
  const [info, setInfo] = useState(0);

  const fetchData = async () => {
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
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: aBody.toString(),
        }
      );
      try {
        const content = await rawResponse.json();
        setInfo(content.access_token);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>{info}</div>;
};

export default LiveData;
