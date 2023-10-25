import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

// Style
const styleinput = {};
const stylebtnexit = {};
const stylebtn = {
  width: 260,
  height: 50,
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  height: 550,
  bgcolor: "background.paper",
  border: "3px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
  overflowY: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  "&::-webkit-scrollbar": {
    width: "0.2em",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "transparent",
  },
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const options = ["Ativo", "Desativado"];

export default function Next_Video_Register({ open, onClose }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [showVideo, setShowVideo] = useState(true);
  const [showCover, setShowCover] = useState(true);

  const handleOpen = () => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setVideoPreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCoverPreview(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const openImageModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpen} backgroundColor="#d2fa00">
        {" "}
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Button>
      <Modal
        open={modalOpen}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, borderRadius: "50px" }}>
          <h2 id="parent-modal-title">Cadastrar novo vídeo.</h2>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              sx={{ ...styleinput, marginBottom: 2, width: 305 }}
              id="outlined-basic"
              label="Titulo"
              variant="outlined"
            />
            <TextField
              sx={{ ...styleinput, marginBottom: 2, width: 305 }}
              id="outlined-basic"
              label="Descrição"
              variant="outlined"
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ ...stylebtn, marginBottom: 2 }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              ADICIONAR VÍDEO
              <input
                type="file"
                style={{ display: "none" }}
                accept="video/*"
                onChange={handleVideoChange}
              />
            </Button>
            {showVideo && videoPreview && (
              <video controls height="300">
                <source src={videoPreview} type="video/mp4" />
              </video>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ ...stylebtn, marginBottom: 2, marginTop: 2 }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              ADICIONAR CAPA DO VÍDEO
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleCoverChange}
              />
            </Button>
            {showCover && coverPreview && (
              <div>
                <img
                  src={coverPreview}
                  alt="Capa do Vídeo"
                  style={{
                    maxWidth: "300px",
                    maxHeight: "300px",
                    minWidth: "305px",
                    minHeight: "305px",
                    marginBottom: 2,
                  }}
                />
              </div>
            )}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Selecione a data inicio"
                sx={{ ...styleinput, marginBottom: 2, width: 305 }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Selecione a data final"
                sx={{ ...styleinput, marginBottom: 2, width: 305 }}
              />
            </LocalizationProvider>
          </div>
          <Autocomplete
            id="controllable-states-demo"
            options={options}
            sx={{ width: "100%", marginBottom: 2 }}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <Button
              variant="contained"
              color="success"
              sx={{ ...styleinput, marginBottom: 2, width: 150 }}
            >
              Cadastrar
            </Button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="error"
              sx={{ ...styleinput, marginBottom: 2, width: 150, marginLeft: 16 }}
            >
              Cancelar
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
