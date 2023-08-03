import React, { useState, useEffect } from "react";
import "./styles.css";

const BaseMap = () => {
  const [counters, setCounters] = useState(0);

  useEffect(() => {
    (() => {})();
  }, []);

  return <div>{process.env.REACT_APP_USER}</div>;
};

export default BaseMap;
