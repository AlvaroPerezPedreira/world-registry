import React from "react";
import CountryMap from "../../components/stats/CountryMap";
import CountryMapHexChart from "../../components/stats/CountryMapHexChart";
import CountryMapYearFilterBarChart from "../../components/stats/CountryMapYearFilterBarChart";
import CountryMapYearVisitorFilterBarChart from "../../components/stats/CountryMapYearVisitorFilterBarChart";

export default function StatsPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="bg-white rounded-2xl shadow-card p-4 sm:p-6 lg:p-8">
          <CountryMap />
        </div>
        <div className="mt-6 lg:mt-8 bg-white rounded-2xl shadow-card p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-6">
          <CountryMapHexChart />
          <CountryMapYearFilterBarChart />
          <CountryMapYearVisitorFilterBarChart />
        </div>
      </div>
    </div>
  );
}
