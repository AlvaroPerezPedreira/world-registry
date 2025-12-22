import React, { useMemo, useEffect, useState, useRef } from "react";
import { RadarChart } from "@mui/x-charts";
import {
  continentCodes,
  continents,
  COUNTRIES_PER_CONTINENT,
  getContinent,
} from "../../utils/CountryMapUtils";
import { useMarkers } from "../../hooks/useMarkers";
import { GiNestedHexagons } from "react-icons/gi";

export default function CountryMapHexChart() {
  const { uniqueCountries, uniqueLCountries, uniqueACountries } = useMarkers();
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

  const chartData = useMemo(() => {
    const calculateRatios = (stats) => {
      return continents.map((continent) => {
        const visited = stats[continent] || 0;
        const total = COUNTRIES_PER_CONTINENT[continent];
        return (visited / total) * 100;
      });
    };

    return {
      total: calculateRatios(continentStats.total),
      lara: calculateRatios(continentStats.lara),
      alvaro: calculateRatios(continentStats.alvaro),
    };
  }, [continentStats]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white rounded-2xl shadow-card p-4 sm:p-6 overflow-hidden"
    >
      <h2 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-6">
        <GiNestedHexagons size={24} className="text-stats-blue" />
        <span>Ratio de países visitados por continente</span>
      </h2>
      <div className="w-full flex justify-center">
        <RadarChart
          width={dimensions.width}
          height={dimensions.height}
          slotProps={{ tooltip: { trigger: "none" } }}
          series={[
            {
              label: "Total",
              data: chartData.total,
              color: "#3b82f6",
            },
            {
              label: "Lara",
              data: chartData.lara,
              color: "#FF6FAF",
            },
            {
              label: "Álvaro",
              data: chartData.alvaro,
              color: "#10b981",
            },
          ]}
          radar={{
            metrics: continents.map((continent) => continentCodes[continent]),
            max: 100,
          }}
        />
      </div>
    </div>
  );
}
