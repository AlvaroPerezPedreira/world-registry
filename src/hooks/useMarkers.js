import { useEffect } from "react";
import { useMarkersStore } from "../stores/MarkersStore.js";

export const useMarkers = () => {
  const {
    markers,
    filteredMarkers,
    isLoading,
    error,
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
    setFilteredMarkers,
    resetFilters,
    refetch: fetchMarkers,
  };
};
