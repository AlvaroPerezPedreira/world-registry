import React, { useMemo } from "react";
import { BarChart } from "@mui/x-charts";
import { useMarkers } from "../../hooks/useMarkers";
import { getContinent } from "../../utils/CountryMapUtils";
import { VscGraph } from "react-icons/vsc";

export default function CountryMapBarChart() {
  const { uniqueCountries, uniqueLCountries, uniqueACountries } = useMarkers();

  console.log("L:", uniqueLCountries);
  console.log("A:", uniqueACountries);

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
    <div className="countryMap-barChart">
      <h1 className="countryMap-barChart-title">
        <VscGraph size={24} /> Gráfico de barras por continente
      </h1>
      <BarChart
        dataset={chartData}
        yAxis={[{ scaleType: "band", dataKey: "continent" }]}
        series={[
          { dataKey: "total", label: "Total", color: "#3b82f6" },
          { dataKey: "lara", label: "Lara", color: "#FF6FAF" },
          { dataKey: "alvaro", label: "Álvaro", color: "#10b981" },
        ]}
        layout="horizontal"
        width={400}
        height={400}
      />
    </div>
  );
}
