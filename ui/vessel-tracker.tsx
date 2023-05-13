"use client";

import React from "react";
import useWebSocket from "#/lib/hooks/useWebSocket";

const VesselTracker = () => {
  const data = useWebSocket("ws://localhost:8080/ws");

  return (
    <div>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>No data received yet</p>
      )}
    </div>
  );
};

export default VesselTracker;
