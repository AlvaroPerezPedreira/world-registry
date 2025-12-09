import { create } from "zustand";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useMarkersStore = create((set, get) => ({
  markers: [],
  filteredMarkers: [],
  isLoading: false,
  error: null,
  uniqueCountries: [],
  uniqueLCountries: [],
  uniqueACountries: [],

  // Fetch markers from Firebase
  fetchMarkers: async () => {
    set({ isLoading: true, error: null });
    try {
      const querySnapshot = await getDocs(collection(db, "markers"));
      const markersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const countriesSet = new Set();
      const l_CountriesSet = new Set();
      const a_CountriesSet = new Set();
      markersData.forEach((marker) => {
        if (marker.location && marker.location.country) {
          const country = marker.location.country;

          countriesSet.add(country);

          if (marker.data && marker.data.visitor) {
            if (marker.data.visitor === "Lara") {
              l_CountriesSet.add(country);
            } else if (marker.data.visitor === "Álvaro") {
              a_CountriesSet.add(country);
            }
          }

          if (marker.data && Array.isArray(marker.data.visitors)) {
            if (marker.data.visitors.includes("Lara")) {
              l_CountriesSet.add(country);
            }
            if (marker.data.visitors.includes("Álvaro")) {
              a_CountriesSet.add(country);
            }
          }
        }
      });

      const uniqueCountriesArray = Array.from(countriesSet).sort();
      const uniqueLCountriesArray = Array.from(l_CountriesSet).sort();
      const uniqueACountriesArray = Array.from(a_CountriesSet).sort();

      set({
        markers: markersData,
        filteredMarkers: markersData,
        uniqueCountries: uniqueCountriesArray,
        uniqueLCountries: uniqueLCountriesArray,
        uniqueACountries: uniqueACountriesArray,
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

  getUniqueCountries: () => {
    const state = get();
    return state.uniqueCountries;
  },

  extractUniqueCountries: () => {
    const state = get();
    const countriesSet = new Set();

    state.markers.forEach((marker) => {
      if (marker.location && marker.location.country) {
        countriesSet.add(marker.location.country);
      }
    });

    return Array.from(countriesSet).sort();
  },

  // filterByCountry: (country) => {
  //   const state = get();
  //   if (!country) {
  //     set({ filteredMarkers: state.markers });
  //     return;
  //   }

  //   const filtered = state.markers.filter(
  //     (marker) => marker.location && marker.location.country === country
  //   );

  //   set({ filteredMarkers: filtered });
  // },

  // filterByMultipleCountries: (countries) => {
  //   const state = get();
  //   if (!countries || countries.length === 0) {
  //     set({ filteredMarkers: state.markers });
  //     return;
  //   }

  //   const countrySet = new Set(countries);
  //   const filtered = state.markers.filter(
  //     (marker) =>
  //       marker.location &&
  //       marker.location.country &&
  //       countrySet.has(marker.location.country)
  //   );

  //   set({ filteredMarkers: filtered });
  // },

  // updateUniqueCountries: () => {
  //   const state = get();
  //   const countriesSet = new Set();

  //   state.markers.forEach((marker) => {
  //     if (marker.location && marker.location.country) {
  //       countriesSet.add(marker.location.country);
  //     }
  //   });

  //   const uniqueCountriesArray = Array.from(countriesSet).sort();
  //   set({ uniqueCountries: uniqueCountriesArray });
  // },
}));
