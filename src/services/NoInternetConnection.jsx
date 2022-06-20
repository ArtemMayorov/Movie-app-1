import React, { useState, useEffect } from "react";
import { Alert } from "antd";

import "antd/dist/antd.css";

const NoInternetConnection = () => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener("online", () => {
    setOnline(true);
  });
  window.addEventListener("offline", () => {
    setOnline(false);
  });
  if (isOnline) {
    return null;
  }
  return (
    <Alert
      className="no-internet-title"
      message="No Interner Connection. Please try again later."
      type="warning"
    />
  );
};

export default NoInternetConnection;
