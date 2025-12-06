import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { Box } from "@mui/material";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage({ onLogin }) {
  const [formVisible, setFormVisible] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useHotkeys("a", () => setFormVisible("form1"));
  useHotkeys(import.meta.env.VITE_HOT_KEY_FORM1, () => setFormVisible("form1"));
  useHotkeys(import.meta.env.VITE_HOT_KEY_FORM2, () => setFormVisible("form2"));

  useHotkeys("esc", () => setFormVisible(null));

  const handleLogin = async (e) => {
    e.preventDefault();
    let email;
    if (formVisible === "form1") {
      email = import.meta.env.VITE_ADMIN_EMAIL;
    } else if (formVisible === "form2") {
      email = import.meta.env.VITE_ANOM_EMAIL;
    } else {
      alert("Selecciona un formulario válido");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      onLogin(userCredential.user);
      navigate("/map-dashboard");
    } catch (error) {
      alert("Contraseña incorrecta", error.message);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          transform: "translate(-50%, -50%) scale(1.5)",
          zIndex: -1,
          objectFit: "cover",
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </Box>
      {formVisible && (
        <LoginForm
          handleLogin={handleLogin}
          formVisible={formVisible}
          changePassword={(e) => setPassword(e.target.value)}
        />
      )}
    </Box>
  );
}
