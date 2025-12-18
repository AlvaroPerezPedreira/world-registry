import React, { useMemo, useEffect, useState, useRef } from "react";
import { BarChart } from "@mui/x-charts";
import { useMarkers } from "../../hooks/useMarkers";
import { getContinent } from "../../utils/CountryMapUtils";
import { VscGraph } from "react-icons/vsc";

export default function CountryMapBarChart() {
  const { uniqueCountries, uniqueLCountries, uniqueACountries } = useMarkers();
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 450 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        setDimensions({
          width: Math.max(280, width - 48),
          height: Math.max(350, Math.min(500, width * 0.9))
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const continentStats = useMemo(() => {
    const getCountsByContinent = (countries) => {
      const counts = {};

      countries.forEach((country) => {
        const continent = getContinent(country);
        if (continent) {
          counts[continent] = (counts[continent] || 0) + 1;
        }
      });

      return counts;
    };

    return {
      total: getCountsByContinent(uniqueCountries),
      lara: getCountsByContinent(uniqueLCountries),
      alvaro: getCountsByContinent(uniqueACountries),
    };
  }, [uniqueCountries, uniqueLCountries, uniqueACountries]);

  const continentCodes = {
    Europa: "EU",
    "América del Norte": "NA",
    "América del Sur": "SA",
    "América Central": "CA",
    Asia: "AS",
    África: "AF",
    Oceanía: "OC",
  };

  const continents = [
    "Europa",
    "América del Norte",
    "América del Sur",
    "América Central",
    "Asia",
    "África",
    "Oceanía",
  ];

  const chartData = continents.map((continent) => ({
    continent: continentCodes[continent],
    total: continentStats.total[continent] || 0,
    lara: continentStats.lara[continent] || 0,
    alvaro: continentStats.alvaro[continent] || 0,
  }));

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl shadow-card p-4 sm:p-6 overflow-hidden"
    >
      <h1 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-6">
        <VscGraph size={24} className="text-stats-blue" />
        <span>Gráfico por continente</span>
      </h1>
      <div className="w-full flex justify-center">
        <BarChart
          dataset={chartData}
          yAxis={[{ scaleType: "band", dataKey: "continent" }]}
          series={[
            { dataKey: "total", label: "Total", color: "#3b82f6" },
            { dataKey: "lara", label: "Lara", color: "#FF6FAF" },
            { dataKey: "alvaro", label: "Álvaro", color: "#10b981" },
          ]}
          layout="horizontal"
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    </div>
  );
}
