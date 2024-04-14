import { Box, Paper, Toolbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "../css/Loading.css";
import "../css/Logo.css";
const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);
  const { themeMode } = useSelector((state) => state.themeMode);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [globalLoading]);

  return (
    <>
      <Paper
        sx={{
          opacity: isLoading ? 1 : 0,
          pointerEvents: "none",
          transition: ".3s ease",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          backgroundColor: themeMode === "light" ? "#fff" : "#000",
          zIndex: 999,
        }}
      >
        <Toolbar />
        {/* <LinearProgress /> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100%",
            margin: "auto",
          }}
        >
          <div className="logo">
            <Box
              sx={{
                "&:before": {
                  content: "''",
                  position: "absolute",
                  left: "0",
                  bottom: "-100px",
                  width: "100%",
                  height: "120px",
                  background: themeMode === "light" ? "transparent" : "#0d0d0d",
                  zIndex: "2",
                  borderTopLeftRadius: "100%",
                  borderTopRightRadius: "100%",
                  transform: "scalex(1.5)",
                },
                "&:after": {
                  content: "''",
                  position: "absolute",
                  top: "0",
                  right: "0",
                  width: "400%",
                  height: "100%",
                  background:
                    themeMode === "light"
                      ? "linear-gradient(to right, transparent, #fff, #fff)"
                      : "linear-gradient(to right, transparent, #0d0d0d, #0d0d0d)",
                  zIndex: "3",
                },
              }}
              className="netflix"
            >
              <span></span>
              <span></span>
              <span></span>
            </Box>
          </div>
          <Box
            sx={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              display: "inline-block",
              position: "relative",
              background:
                "linear-gradient(0deg, rgba(255, 61, 0, 0.2) 33%, #ff3d00 100%)",
              boxSizing: "border-box",
              animation: "rotation 1s linear infinite",
              marginTop: "30px",
              "&:after": {
                content: "''",
                boxSizing: "border-box",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: themeMode === "light" ? "#fff" : "#0d0d0d",
              },
            }}
            className="loader"
          ></Box>
        </Box>
      </Paper>
    </>
  );
};

export default GlobalLoading;
