"use client";

import { VesselData } from "#/lib/hooks/useWebSocket";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface VesselGraphProps {
  vessels: VesselData[];
}

export function VesselGraph({ vessels }: VesselGraphProps) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);

      const margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleLinear()
        .domain([
          d3.min(vessels, (d) => d.LON)! - 10,
          d3.max(vessels, (d) => d.LON)! + 10,
        ])
        .rangeRound([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(vessels, (d) => d.LAT)! - 10,
          d3.max(vessels, (d) => d.LAT)! + 10,
        ])
        .rangeRound([height, 0]);

      // Create X axis
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      // Create Y axis
      g.append("g").call(d3.axisLeft(yScale));
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current);
      const g = svg.select("g");

      const xScale = d3
        .scaleLinear()
        .domain([
          d3.min(vessels, (d) => d.LON)! - 10,
          d3.max(vessels, (d) => d.LON)! + 10,
        ])
        .rangeRound([0, +svg.attr("width")]);

      const yScale = d3
        .scaleLinear()
        .domain([
          d3.min(vessels, (d) => d.LAT)! - 10,
          d3.max(vessels, (d) => d.LAT)! + 10,
        ])
        .rangeRound([+svg.attr("height"), 0]);

      g.selectAll(".dot")
        .data(vessels)
        .join(
          (enter) => enter.append("circle").attr("class", "dot"),
          (update) => update,
          (exit) => exit.remove()
        )
        .attr("cx", (d) => xScale(d.LON))
        .attr("cy", (d) => yScale(d.LAT))
        .attr("r", 2.5)
        .attr("fill", "yellow");
    }
  }, [vessels]);

  return <svg ref={ref} width="960" height="500" />;
}
