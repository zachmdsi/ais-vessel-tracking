"use client";

import useWebSocket from "#/lib/hooks/useWebSocket";
import { useState } from "react";
import { VesselTable } from "./vessel-table";
import { VesselGraph } from "./vessel-graph";

export function VesselTracker() {
  const [startSim, setStartSim] = useState(false);
  const data = useWebSocket("ws://localhost:8080/ws", startSim);
  const buttonStyle = "px-4 py-2 bg-zinc-300 text-neutral-900 rounded-lg";
  const containerStyle = "flex p-4 justify-end mr-24";

  return (
    <>
      <div className={containerStyle}>
        {!startSim && (
          <button className={buttonStyle} onClick={() => setStartSim(true)}>
            Start
          </button>
        )}
        {startSim && (
          <button className={buttonStyle} onClick={() => setStartSim(false)}>
            End
          </button>
        )}
      </div>
      <div className="flex justify-start">
        {data ? (
          <div className="flex w-3/4 justify-between">
            <VesselTable vessels={data} />
            <VesselGraph vessels={data} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
