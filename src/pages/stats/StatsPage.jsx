import React from "react";
import "./styles.css";
import CountryMap from "../../components/stats/CountryMap";

export default function StatsPage() {
  return (
    <div className="stats-container">
      <div className="stats-content">
        <div className="stats-countryMap-info"></div>
        <div className="stats-countryMap-map">
          <CountryMap />
        </div>
      </div>
    </div>
  );
}
