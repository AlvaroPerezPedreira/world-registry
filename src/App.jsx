import { useState } from "react";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Globe from "./pages/globe/Globe";

function App() {
  const [user, setUser] = useState(null);
  const isAdmin = user?.email === "admin@app.com";

  return (
    <>
      {isAdmin && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage onLogin={setUser} />} />
        <Route
          path="/map-dashboard"
          element={user ? <Home /> : <Navigate to="/" replace />}
        />
        <Route
          path="/globe"
          element={user ? <Globe /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
