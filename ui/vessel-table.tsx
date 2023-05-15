"use client";

import { VesselData } from "#/lib/hooks/useWebSocket";

interface VesselTableProps {
  vessels: VesselData[];
}

export function VesselTable({ vessels }: VesselTableProps) {
  return (
    <div className="p-4">
      <div className="w-full overflow-auto max-h-96">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead className="">
            <tr>
              <th className="px-4 py-2">MMSI</th>
              <th className="px-4 py-2">LAT</th>
              <th className="px-4 py-2">LON</th>
            </tr>
          </thead>
          <tbody>
            {vessels.map((vessel, index) => (
              <tr
                key={index}
                className={index % 2 ? "bg-neutral-800" : "bg-neutral-700"}
              >
                <td className="border px-4 py-2">{vessel.MMSI}</td>
                <td className="border px-4 py-2">{vessel.LAT}</td>
                <td className="border px-4 py-2">{vessel.LON}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
