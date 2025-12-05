import { Radio, RadioGroup } from "@nextui-org/react";
import React from "react";

export default function MapFilter({ markers, setFilteredMarkers }) {
  return (
    <div className="map-filter">
      <RadioGroup label="Select your favorite city">
        <Radio value="buenos-aires">Buenos Aires</Radio>
        <Radio value="sydney">Sydney</Radio>
        <Radio value="san-francisco">San Francisco</Radio>
        <Radio value="london">London</Radio>
        <Radio value="tokyo">Tokyo</Radio>
      </RadioGroup>
    </div>
  );
}
