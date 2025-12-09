import { useState } from "react";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import MapsPage from "./pages/map/MapsPage";
import StatsPage from "./pages/stats/StatsPage";

function App() {
  const [user, setUser] = useState(null);
  const isAdmin = user?.email === "admin@app.com";

  return (
    <>
      {/* {isAdmin && <Navbar />} */}

      <Routes>
        <Route path="/" element={<LoginPage onLogin={setUser} />} />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/map-dashboard"
          element={user ? <MapsPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/stats"
          element={user ? <StatsPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
