import React, { useEffect, useState } from "react";

const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  function handleOnline() {
    setIsOnline(true);
  }

  function handleOffLine() {
    setIsOnline(false);
  }

  useEffect(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffLine);
    };
  }, []);

  console.log("is Online", isOnline);
  return isOnline;
};

export default useOnlineStatus;
