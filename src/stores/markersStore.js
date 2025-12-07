import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useMarkersStore = create((set) => ({
  markers: [],
  filteredMarkers: [],
  isLoading: false,
  error: null,

  // Fetch markers from Firebase
  fetchMarkers: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "markers"));
      const markersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({
        markers: markersData,
        filteredMarkers: markersData,
        isLoading: false,
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.error("Error fetching markers:", error);
    }
  },

  // Set filtered markers
  setFilteredMarkers: (filteredMarkers) => set({ filteredMarkers }),

  // Reset filters
  resetFilters: () => set((state) => ({ filteredMarkers: state.markers })),
}));
