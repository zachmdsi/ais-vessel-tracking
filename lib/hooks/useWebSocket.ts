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

const useWebSocket = (url: string) => {
  const [data, setData] = useState<VesselData | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onmessage = (event) => {
      const vesselData: VesselData = JSON.parse(event.data);
      console.log(vesselData);
      setData(vesselData);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  return data;
};

export default useWebSocket;
