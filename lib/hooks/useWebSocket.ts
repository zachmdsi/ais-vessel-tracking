import { useEffect, useState } from "react";

export interface VesselData {
  MMSI: string;
  BaseDateTime: string;
  LAT: number;
  LON: number;
  SOG: number;
  COG: number;
  Heading: number;
  VesselName: string;
  IMO: string;
  CallSign: string;
  VesselType: number;
  Status: number;
  Length: number;
  Width: number;
  Draft: number;
  Cargo: number;
  TransceiverClass: string;
}

const useWebSocket = (url: string, shouldConnect: boolean) => {
  const [data, setData] = useState<VesselData[]>([]);

  useEffect(() => {
    if (shouldConnect) {
      const ws = new WebSocket(url);

      ws.onmessage = (event) => {
        const newVessel = JSON.parse(event.data);
        setData((prevData) => [...prevData, newVessel]);
      };

      return () => {
        ws.close();
      };
    }
  }, [url, shouldConnect]);

  return data;
};

export default useWebSocket;
