import React from "react";
import useOnlineStatus from "./customHooks/useOnlineStatus";
import useFetchAPI from "./customHooks/useFetchAPI";

const OnlineStatus = () => {
  const onLineStatus = useOnlineStatus();
  const { data, isLoading, isError } = useFetchAPI(
    "https://dummyjson.com/user",
  );
  function handleSavingClick() {
    console.log("Saving is in progress");
  }
  return (
    <div>
      <button disabled={!onLineStatus} onClick={handleSavingClick}>
        {onLineStatus ? "Save progress" : "Reconnecting..."}
      </button>
      {isLoading ? <p>Loading</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  );
};

export default OnlineStatus;
