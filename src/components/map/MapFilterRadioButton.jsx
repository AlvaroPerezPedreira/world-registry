import { Radio, RadioGroup } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useFilter } from "../../contexts/useFilter";

export default function MapFilterRadioButton({ markers, setFilteredMarkers }) {
  const { filterValue, setFilterValue } = useFilter();
  const [selectedValue, setSelectedValue] = useState(filterValue);

  useEffect(() => {
    setSelectedValue(filterValue);
  }, [filterValue]);

  const handleValueChange = (value) => {
    setSelectedValue(value);
    setFilterValue(value);
  };

  useEffect(() => {
    let filtered = [];

    if (selectedValue === "all") {
      filtered = markers;
    } else if (selectedValue === "lara") {
      filtered = markers.filter(
        (marker) =>
          marker.data &&
          marker.data.visitor &&
          marker.data.visitor.toLowerCase() === "lara"
      );
    } else if (selectedValue === "alvaro") {
      filtered = markers.filter(
        (marker) =>
          marker.data &&
          marker.data.visitor &&
          marker.data.visitor.toLowerCase() === "álvaro"
      );
    } else if (selectedValue === "other") {
      filtered = markers.filter((marker) => {
        if (!marker.data || !marker.data.visitor) {
          return true;
        }
        const visitorLower = marker.data.visitor.toLowerCase();
        return visitorLower !== "lara" && visitorLower !== "álvaro";
      });
    }

    setFilteredMarkers(filtered);
  }, [selectedValue, markers, setFilteredMarkers]);

  return (
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
        <Radio value="other">Other</Radio>
      </RadioGroup>
    </div>
  );
}
