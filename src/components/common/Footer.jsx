import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Container from "./Container";
const Footer = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const isLightTheme = themeMode === "light";
 
  return (
   <>
      <Container style={{}}>
        <Box
          square={true}
          sx={{
            backgroundImage: "unset",
            width: "100%",
            padding:"0 20px",
            backgroundColor: isLightTheme ? "#f5f5f5" : "#000",
          }}
        >
          {/* <Stack
            alignItems="center"
            justifyContent="space-between"
            direction={{ xs: "column", md: "row " }}
            sx={{ height: "max-content" }}
          >
            <Logo />
          </Stack> */}
          {/* <Stack sx={{ marginTop: "20px" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6} md={4}>
                <Typography style={{ fontSize: "25px" }}>About me</Typography>
                <Box sx={{ marginTop: "15px" }}>
                  <LinkMui
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    sx={{ color: "inherit" }}
                  >
                    Facebook
                  </LinkMui>
                  <LinkMui
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    sx={{ color: "inherit" }}
                  >
                    LinkedIn
                  </LinkMui>
                  <LinkMui
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    sx={{ color: "inherit" }}
                  >
                    Github
                  </LinkMui>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography style={{ fontSize: "25px" }}>Question ?</Typography>
                <Box sx={{ marginTop: "15px" }}>
                  <LinkMui
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    sx={{ color: "inherit" }}
                  >
                    Need Help ?
                  </LinkMui>
                  <LinkMui
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    sx={{ color: "inherit" }}
                  >
                    How To Use ?
                  </LinkMui>
                  <LinkMui
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    sx={{ color: "inherit" }}
                  >
                    Fact
                  </LinkMui>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Typography style={{ fontSize: "25px" }}>
                  Privacy & Policy
                </Typography>
                <Box sx={{ marginTop: "15px" }}>
                  <LinkMui
                    style={{
                      fontSize: "15px",
                      textDecoration: "none",
                      display: "block",
                    }}
                    sx={{ color: "inherit" }}
                  >
                    Privacy & Policy
                  </LinkMui>
                </Box>
              </Grid>
            </Grid>
          </Stack> */}
          <Stack
            spacing={2}
            sx={{
              marginTop: "20px",
              textAlign: "center",
              padding: "20px 0",
            }}
          >
            <Typography sx={{ fontSize: "15px", color: "#ccc" }}>
              © 2023 Powered Long
            </Typography>
          </Stack>
        </Box>
      </Container>
   </>
  );
};

export default Footer;
