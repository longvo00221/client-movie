import React from "react";
import SigninForm from "../components/common/SigninForm";
import { Paper, Box, Typography } from "@mui/material";
import background from "../assets/img/background.jpg";

const SigninPage = () => {
 
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
        
      }}
    >

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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth:"450px",
            outline: "none",
          }}
        >
          <Box
            sx={{
              boxShadow: 24,
              backgroundColor: "rgba(0,0,0,.75)",
              padding: "60px 68px 40px",
              borderRadius: "10px",
              minHeight:"500px",
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
              In
            </Typography>
            <Box sx={{ textAlign: "center", marginBottom: "2rem" }}></Box>

            <SigninForm />
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default SigninPage;
