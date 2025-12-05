import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    country: "",
    state: "",
    lat: "",
    lon: "",
    visitor: "",
    description: "",
    imageUrl: "",
    month: "",
    year: "",
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "markers"), {
        title: formData.title,
        location: {
          country: formData.country,
          state: formData.state,
          lat: parseFloat(formData.lat),
          lon: parseFloat(formData.lon),
        },
        data: {
          visitor: formData.visitor,
          description: formData.description,
          date: {
            month: parseInt(formData.month),
            year: parseInt(formData.year),
          },
        },
        imageUrl: formData.imageUrl,
      });
      setFormData({
        title: "",
        country: "",
        state: "",
        lat: "",
        lon: "",
        visitor: "",
        description: "",
        imageUrl: "",
        month: "",
        year: "",
      });
      handleClose();
    } catch (err) {
      console.error("Error al agregar marker:", err);
      alert("Error al agregar marker");
    }
  };

  return (
    <nav>
      <Box
        sx={{
          p: 2,
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" color="primary">
          World Registry - Panel de Administración
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Añadir Marker
        </Button>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Nuevo Marker
          </Typography>

          <TextField
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            label="País"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <TextField
            label="Estado/Ciudad"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />
          <TextField
            label="Latitud"
            name="lat"
            type="number"
            value={formData.lat}
            onChange={handleChange}
          />
          <TextField
            label="Longitud"
            name="lon"
            type="number"
            value={formData.lon}
            onChange={handleChange}
          />
          <TextField
            label="Visitante"
            name="visitor"
            value={formData.visitor}
            onChange={handleChange}
          />
          <TextField
            label="Descripción"
            name="description"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            label="URL de Imagen"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Mes"
              name="month"
              type="number"
              value={formData.month}
              onChange={handleChange}
            />
            <TextField
              label="Año"
              name="year"
              type="number"
              value={formData.year}
              onChange={handleChange}
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Guardar
            </Button>
          </Box>
        </Box>
      </Modal>
    </nav>
  );
}
