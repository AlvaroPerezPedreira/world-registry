import { useState } from "react";
import Home from "./pages/home/Home";
import LoginPage from "./pages/login/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={setUser} />} />
        <Route
          path="/map-dashboard"
          element={user ? <Home user={user} /> : <Navigate to="/" replace />}
        />
      </Routes>
    </>
  );
}

export default App;
