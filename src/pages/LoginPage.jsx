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

export default function LoginPage({ onLogin }) {
  const [formVisible, setFormVisible] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useHotkeys("a+d+m+i+n+0", () => setFormVisible("form1"));
  useHotkeys("a+n+o+m", () => setFormVisible("form2"));

  const handleLogin = async (e) => {
    e.preventDefault();
    let email;

    if (formVisible === "form1") {
      email = "admin@app.com";
    } else if (formVisible === "form2") {
      email = "anom@app.com";
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
    } catch (err) {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {formVisible && (
        <form onSubmit={handleLogin}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Card
              sx={{
                minWidth: 300,
                maxWidth: 400,
                borderRadius: 3,
                boxShadow: 3,
                p: 2,
                bgcolor: "white",
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
        </form>
      )}

      {!formVisible && <p>Presiona 1 para Admin o 2 para Usuario Anónimo</p>}
    </Box>
  );
}
