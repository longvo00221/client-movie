import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import SignupForm from "../components/common/SignupForm";
import background from "../assets/img/background.jpg";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Logo from "../components/common/Logo";
const SignupPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  useEffect(() => {
    handleOpen();
  }, []);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    textAlign:"center",
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius:"20px",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Paper
      style={{
        background: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
        width: "100vw",
        height: "100vh",
        paddingBottom: "60px",
      }}
    >
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <Logo/>
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Hello , hiện tại web chỉ có 80% phim . Và để có trải nghiệm xem
              phim tốt hơn bạn hãy cài đặt adblock trên google Chrome nhé <br />
              Xin Cảm Ơn !!
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Box
        sx={{
          background: "rgba(0,0,0,0.5)",
          inset: 0,
          position: "relative",
          width: "100%",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth:"450px",
            padding: 4,
            outline: "none",
          }}
        >
          <Box
            sx={{
              padding: 4,
              boxShadow: 24,
              backgroundColor: "rgba(0,0,0,.75)",

              borderRadius: "10px",
            }}
          >
            <Typography
              sx={{ textAlign: "center", fontSize: "30px", color: "#fff" }}
            >
              <Typography
                sx={{
                  color: "primary.main",
                  fontSize: "30px",
                  display: "inline-block",
                }}
              >
                Sign
              </Typography>{" "}
              Up
            </Typography>
            <Box sx={{ textAlign: "center", marginBottom: "2rem" }}></Box>

            <SignupForm />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default SignupPage;
