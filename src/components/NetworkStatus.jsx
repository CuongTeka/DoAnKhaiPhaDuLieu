import React from "react";
import { notification } from "antd";

const getOnLineStatus = () =>
  typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
    ? navigator.onLine
    : true;

const useNavigatorOnLine = () => {
  const [status, setStatus] = React.useState(getOnLineStatus());

  const setOnline = () => setStatus(true);
  const setOffline = () => setStatus(false);

  React.useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return status;
};

const checkNetworkStatus = async () => {
  try {
    const response = await fetch("https://www.google.com/favicon.ico", {
      method: "HEAD",
      cache: "no-cache",
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = React.useState(getOnLineStatus());

  React.useEffect(() => {
    const interval = setInterval(async () => {
      const isActuallyOnline = await checkNetworkStatus();
      setIsOnline(isActuallyOnline);
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return isOnline;
};

const NetworkStatusIndicator = () => {
  const isOnline = useNetworkStatus();
  const firstUpdate = React.useRef(true);
  const [api, contextHolder] = notification.useNotification();

  React.useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    isOnline
      ? api.success({
          message: "Internet Connected",
          description: "Your internet connection is back.",
          duration: 3,
        })
      : api.error({
          message: "Internet Unstable",
          description: "Your connection is lost or experiencing issues.",
          duration: 0,
        });
  }, [api, isOnline]);

  return <>{contextHolder}</>;
};

export default NetworkStatusIndicator;
