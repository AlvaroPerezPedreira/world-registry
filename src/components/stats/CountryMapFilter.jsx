import React, { useState } from "react";
import { useMarkers } from "../../hooks/useMarkers";
import countryMappings from "../../utils/CountryMapUtils";
import { Radio, RadioGroup } from "@nextui-org/react";
import { BarChart } from "@mui/x-charts";

export default function CountryMapFilter({ setColor, setSelectedCountries }) {
  const { uniqueCountries, uniqueLCountries, uniqueACountries } = useMarkers();
  const [selectedValue, setSelectedValue] = useState("all");
  const convertToEnglishNames = (spanishNames) => {
    return spanishNames
      .map((spanishName) => {
        const countryMapping = countryMappings[spanishName];
        return countryMapping ? countryMapping.name : spanishName;
      })
      .filter((name) => name);
  };

  const handleValueChange = (value) => {
    if (value === "all") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueCountries)));
      setColor("#9B9B9B");
      setSelectedValue("all");
    } else if (value === "lara") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueLCountries)));
      setColor("#FF6FAF");
      setSelectedValue("lara");
    } else if (value === "alvaro") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueACountries)));
      setColor("#4A90E2");
      setSelectedValue("alvaro");
    } else {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueCountries)));
      setColor("#9B9B9B");
      setSelectedValue("all");
    }
  };

  return (
    <div className="countryMap-filter">
      <h1 className="countryMap-filter-title">Filtrar por usuario</h1>
      <div className="pl-4">
        <RadioGroup
          color="warning"
          orientation="vertical"
          value={selectedValue}
          onValueChange={handleValueChange}
        >
          <Radio value="all">Todos</Radio>
          <Radio value="lara">Lara</Radio>
          <Radio value="alvaro">Álvaro</Radio>
        </RadioGroup>
      </div>
      <div>{/* <BarChart dataSet={selectedValue} /> */}</div>
    </div>
  );
}
