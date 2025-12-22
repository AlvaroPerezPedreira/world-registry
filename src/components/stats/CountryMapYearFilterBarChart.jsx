import React, { useEffect, useRef, useState } from "react";
import { useMarkers } from "../../hooks/useMarkers";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BarChart } from "@mui/x-charts";

export default function CountryMapYearFilterBarChart() {
  const { getTripsPerYear } = useMarkers();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        const size = Math.max(300, Math.min(450, width - 48));
        setDimensions({
          width: size,
          height: size,
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const tripsData = getTripsPerYear();
  const dataset = Object.entries(tripsData).map(([year, count]) => ({
    year: year,
    trips: count,
  }));

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl shadow-card p-4 sm:p-6 overflow-hidden"
    >
      <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-6">
        <FaRegCalendarAlt size={24} className="text-stats-blue" />
        <span>Países visitados por año</span>
      </h2>
      <div className="w-full flex justify-center">
        <BarChart
          dataset={dataset}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "year",
            },
          ]}
          series={[
            {
              dataKey: "trips",
              label: "Número de viajes",
              color: "#3b82f6",
            },
          ]}
          width={dimensions.width}
          height={dimensions.height}
          sx={{
            "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
              transform: "rotate(-90deg) translateY(-2px) translateX(-18px)",
              textAnchor: "end !important",
              fontSize: "11px",
            },
          }}
        />
      </div>
    </div>
  );
}
