import React, { useState } from "react";
import { useMarkers } from "../../hooks/useMarkers";
import countryMappings from "../../utils/CountryMapUtils";
import { Radio, RadioGroup } from "@nextui-org/react";
import { TbUserStar } from "react-icons/tb";

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
      setColor("#3b82f6");
      setSelectedValue("all");
    } else if (value === "lara") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueLCountries)));
      setColor("#FF6FAF");
      setSelectedValue("lara");
    } else if (value === "alvaro") {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueACountries)));
      setColor("#10b981");
      setSelectedValue("alvaro");
    } else {
      setSelectedCountries(new Set(convertToEnglishNames(uniqueCountries)));
      setColor("#3b82f6");
      setSelectedValue("all");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-card p-4 sm:p-6">
      <h1 className="flex items-center gap-3 text-lg sm:text-xl font-bold text-gray-900 mb-4">
        <TbUserStar size={24} className="text-stats-blue" />
        <span>Filtrar por usuario</span>
      </h1>
      <div className="pl-4 sm:pl-6">
        <RadioGroup
          color="warning"
          orientation="vertical"
          value={selectedValue}
          onValueChange={handleValueChange}
          classNames={{
            wrapper: "gap-3"
          }}
        >
          <Radio value="all">Todos</Radio>
          <Radio value="lara">Lara</Radio>
          <Radio value="alvaro">Álvaro</Radio>
        </RadioGroup>
      </div>
    </div>
  );
}
