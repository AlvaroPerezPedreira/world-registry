export const countryMappings = {
  España: { iso_a3: "ESP", name: "Spain" },
  Francia: { iso_a3: "FRA", name: "France" },
  Alemania: { iso_a3: "DEU", name: "Germany" },
  Italia: { iso_a3: "ITA", name: "Italy" },
  Inglaterra: { iso_a3: "GBR", name: "United Kingdom" },
  Portugal: { iso_a3: "PRT", name: "Portugal" },
  Holanda: { iso_a3: "NLD", name: "Netherlands" },
  Bélgica: { iso_a3: "BEL", name: "Belgium" },
  Suiza: { iso_a3: "CHE", name: "Switzerland" },
  Austria: { iso_a3: "AUT", name: "Austria" },
  Suecia: { iso_a3: "SWE", name: "Sweden" },
  Noruega: { iso_a3: "NOR", name: "Norway" },
  Dinamarca: { iso_a3: "DNK", name: "Denmark" },
  Finlandia: { iso_a3: "FIN", name: "Finland" },
  Polonia: { iso_a3: "POL", name: "Poland" },
  Rusia: { iso_a3: "RUS", name: "Russia" },
  Ucrania: { iso_a3: "UKR", name: "Ukraine" },
  "Ciudad del Vaticano": { iso_a3: "VAT", name: "Vatican City" },

  // América
  "Estados Unidos": { iso_a3: "USA", name: "United States of America" },
  Canadá: { iso_a3: "CAN", name: "Canada" },
  México: { iso_a3: "MEX", name: "Mexico" },
  Argentina: { iso_a3: "ARG", name: "Argentina" },
  Brasil: { iso_a3: "BRA", name: "Brazil" },
  Chile: { iso_a3: "CHL", name: "Chile" },
  Colombia: { iso_a3: "COL", name: "Colombia" },
  Perú: { iso_a3: "PER", name: "Peru" },
  Venezuela: { iso_a3: "VEN", name: "Venezuela" },
  Uruguay: { iso_a3: "URY", name: "Uruguay" },
  Paraguay: { iso_a3: "PRY", name: "Paraguay" },
  Ecuador: { iso_a3: "ECU", name: "Ecuador" },
  Bolivia: { iso_a3: "BOL", name: "Bolivia" },
  "Costa Rica": { iso_a3: "CRI", name: "Costa Rica" },
  Panamá: { iso_a3: "PAN", name: "Panama" },

  // Asia
  China: { iso_a3: "CHN", name: "China" },
  Japón: { iso_a3: "JPN", name: "Japan" },
  India: { iso_a3: "IND", name: "India" },
  "Corea del Sur": { iso_a3: "KOR", name: "South Korea" },
  "Corea del Norte": { iso_a3: "PRK", name: "North Korea" },
  Australia: { iso_a3: "AUS", name: "Australia" },
  "Nueva Zelanda": { iso_a3: "NZL", name: "New Zealand" },
  Indonesia: { iso_a3: "IDN", name: "Indonesia" },
  Tailandia: { iso_a3: "THA", name: "Thailand" },
  Vietnam: { iso_a3: "VNM", name: "Vietnam" },
  Filipinas: { iso_a3: "PHL", name: "Philippines" },
  Malasia: { iso_a3: "MYS", name: "Malaysia" },
  Singapur: { iso_a3: "SGP", name: "Singapore" },

  // África
  Sudáfrica: { iso_a3: "ZAF", name: "South Africa" },
  Egipto: { iso_a3: "EGY", name: "Egypt" },
  Nigeria: { iso_a3: "NGA", name: "Nigeria" },
  Kenia: { iso_a3: "KEN", name: "Kenya" },
  Marruecos: { iso_a3: "MAR", name: "Morocco" },
  Argelia: { iso_a3: "DZA", name: "Algeria" },
  Etiopía: { iso_a3: "ETH", name: "Ethiopia" },

  // Oriente Medio
  "Arabia Saudita": { iso_a3: "SAU", name: "Saudi Arabia" },
  Irán: { iso_a3: "IRN", name: "Iran" },
  Israel: { iso_a3: "ISR", name: "Israel" },
  Turquía: { iso_a3: "TUR", name: "Turkey" },

  // Centroamérica y Caribe
  Cuba: { iso_a3: "CUB", name: "Cuba" },
  "República Dominicana": { iso_a3: "DOM", name: "Dominican Republic" },
  "Puerto Rico": { iso_a3: "PRI", name: "Puerto Rico" },
  Jamaica: { iso_a3: "JAM", name: "Jamaica" },
  Haití: { iso_a3: "HTI", name: "Haiti" },

  // Otros países europeos
  Irlanda: { iso_a3: "IRL", name: "Ireland" },
  Grecia: { iso_a3: "GRC", name: "Greece" },
  "República Checa": { iso_a3: "CZE", name: "Czech Republic" },
  Hungría: { iso_a3: "HUN", name: "Hungary" },
  Rumania: { iso_a3: "ROU", name: "Romania" },
  Bulgaria: { iso_a3: "BGR", name: "Bulgaria" },
  Croacia: { iso_a3: "HRV", name: "Croatia" },
  Serbia: { iso_a3: "SRB", name: "Serbia" },
  Eslovaquia: { iso_a3: "SVK", name: "Slovakia" },
  Eslovenia: { iso_a3: "SVN", name: "Slovenia" },
  Lituania: { iso_a3: "LTU", name: "Lithuania" },
  Letonia: { iso_a3: "LVA", name: "Latvia" },
  Estonia: { iso_a3: "EST", name: "Estonia" },
};

// Función helper para buscar país por nombre español
export const getCountryInfo = (spanishName) => {
  return countryMappings[spanishName] || null;
};

// Función para obtener el nombre en inglés desde español
export const getEnglishName = (spanishName) => {
  const info = getCountryInfo(spanishName);
  return info ? info.name : spanishName;
};

// Función para obtener el código ISO desde español
export const getISOCode = (spanishName) => {
  const info = getCountryInfo(spanishName);
  return info ? info.iso_a3 : null;
};

// Lista de todos los nombres en español para usar fácilmente
export const spanishCountryNames = Object.keys(countryMappings);

// Grupos de países por región
export const countryRegions = {
  europa: [
    "España",
    "Francia",
    "Alemania",
    "Italia",
    "Reino Unido",
    "Portugal",
    "Países Bajos",
    "Bélgica",
    "Suiza",
    "Austria",
    "Suecia",
    "Noruega",
    "Dinamarca",
    "Finlandia",
    "Polonia",
    "Rusia",
    "Ucrania",
    "Irlanda",
    "Grecia",
    "República Checa",
    "Hungría",
    "Rumania",
    "Bulgaria",
    "Croacia",
    "Serbia",
    "Eslovaquia",
    "Eslovenia",
    "Lituania",
    "Letonia",
    "Estonia",
  ],
  norteamerica: ["Estados Unidos", "Canadá", "México"],
  sudamerica: [
    "Argentina",
    "Brasil",
    "Chile",
    "Colombia",
    "Perú",
    "Venezuela",
    "Uruguay",
    "Paraguay",
    "Ecuador",
    "Bolivia",
  ],
  centroamerica: [
    "Costa Rica",
    "Panamá",
    "Cuba",
    "República Dominicana",
    "Puerto Rico",
    "Jamaica",
    "Haití",
  ],
  asia: [
    "China",
    "Japón",
    "India",
    "Corea del Sur",
    "Corea del Norte",
    "Australia",
    "Nueva Zelanda",
    "Indonesia",
    "Tailandia",
    "Vietnam",
    "Filipinas",
    "Malasia",
    "Singapur",
  ],
  africa: [
    "Sudáfrica",
    "Egipto",
    "Nigeria",
    "Kenia",
    "Marruecos",
    "Argelia",
    "Etiopía",
  ],
  orientemedio: ["Arabia Saudita", "Irán", "Israel", "Turquía"],
};

export default countryMappings;
