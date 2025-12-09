import { useEffect } from "react";
import { useMarkersStore } from "../stores/MarkersStore";

export const useMarkers = () => {
  const {
    markers,
    filteredMarkers,
    isLoading,
    error,
    uniqueCountries,
    uniqueLCountries,
    uniqueACountries,
    fetchMarkers,
    setFilteredMarkers,
    resetFilters,
  } = useMarkersStore();

  useEffect(() => {
    if (markers.length === 0) {
      fetchMarkers();
    }
  }, [markers.length, fetchMarkers]);

  return {
    markers,
    filteredMarkers,
    isLoading,
    error,
    uniqueCountries,
    uniqueLCountries,
    uniqueACountries,
    setFilteredMarkers,
    resetFilters,
    refetch: fetchMarkers,
  };
};
