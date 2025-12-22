import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMarkers } from "../../hooks/useMarkers";
import { FaRegCalendarAlt } from "react-icons/fa";
import { BarChart } from "@mui/x-charts";

export default function CountryMapYearVisitorFilterBarChart() {
  const { getTripsPerYearByVisitor } = useMarkers();
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 });

  const containerRef = useRef(null);

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

  const tripsData = getTripsPerYearByVisitor();

  const chartData = useMemo(() => {
    // Obtener todos los años únicos
    const allYears = new Set([
      ...Object.keys(tripsData.total),
      ...Object.keys(tripsData.lara),
      ...Object.keys(tripsData.alvaro),
    ]);

    // Ordenar años
    const sortedYears = Array.from(allYears).sort(
      (a, b) => Number(a) - Number(b)
    );

    // Crear datos para el gráfico
    return sortedYears.map((year) => ({
      year: year,
      total: tripsData.total[year] || 0,
      lara: tripsData.lara[year] || 0,
      alvaro: tripsData.alvaro[year] || 0,
    }));
  }, [tripsData]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl shadow-card p-4 sm:p-6 overflow-hidden"
    >
      <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-6">
        <FaRegCalendarAlt size={24} className="text-stats-blue" />
        <span>Países visitados por persona y año</span>
      </h2>
      <div className="w-full flex justify-center">
        <BarChart
          dataset={chartData}
          xAxis={[
            {
              scaleType: "band",
              dataKey: "year",
              categoryGapRatio: 0.3,
              barGapRatio: 0.1,
            },
          ]}
          series={[
            {
              dataKey: "total",
              label: "Total",
              color: "#3b82f6",
            },
            {
              dataKey: "lara",
              label: "Lara",
              color: "#ec4899",
            },
            {
              dataKey: "alvaro",
              label: "Álvaro",
              color: "#10b981",
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
