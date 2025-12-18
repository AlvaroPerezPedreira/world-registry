import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import LoginForm from "../../components/login/LoginForm";
import "../../components/login/styles.css";

export default function LoginPage({ onLogin }) {
  const [formVisible, setFormVisible] = useState(null);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useHotkeys("a", () => setFormVisible("form1"));
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
      navigate("/home");
    } catch (error) {
      alert("Contraseña incorrecta", error.message);
    }
  };

  return (
    <div className="relative h-screen flex justify-center items-center overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 scale-150 -z-10 object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>

      {/* Login form */}
      {formVisible && (
        <LoginForm
          handleLogin={handleLogin}
          formVisible={formVisible}
          changePassword={(e) => setPassword(e.target.value)}
        />
      )}
    </div>
  );
}
