import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import "./Styles.css";

export default function LoginPage({ onLogin }) {
  const [formVisible, setFormVisible] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
          transform: "translate(-50%, -50%) scale(0.6)",
          zIndex: -1,
          objectFit: "contain",
        }}
      >
        <source src="/background.mp4" type="video/mp4" />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          zIndex: 0,
        }}
      />

      {formVisible && (
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            position: "relative",
            zIndex: 1,
          }}
        >
          <Card
            sx={{
              minWidth: 300,
              maxWidth: 400,
              borderRadius: 3,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              p: 2,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
            }}
          >
            <CardContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <Typography variant="h5" gutterBottom align="center">
                  {formVisible === "form1" ? "Admin" : "Anom"}
                </Typography>
                <TextField
                  id="standard-basic"
                  label="Password"
                  type="password"
                  variant="standard"
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
                <Button variant="contained" type="submit" fullWidth>
                  Confirm
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
}
