import {
  Box,
  // Button,
  Grid,
  // Paper,
  // TextField,
  Typography,
  useMediaQuery,
  // useTheme,
} from "@mui/material";
import React, { useState } from "react";
import background from "../assets/img/background.jpg";
// import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import tv from "../assets/img/tvnobg.png";
import video1 from "../assets/img/videobg.m4v";
import mobileBg from "../assets/img/mobilebg.png";
import devicebg from "../assets/img/device-pile-vn.png";
import downloadGif from "../assets/img/download-icon.gif";
import minibgmobile from "../assets/img/minibgmobile.png";
import kidBg from "../assets/img/kid.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import userApi from "../api/modules/user.api";
import { setUser } from "../redux/features/userSlice";
// import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
const IntroducePage = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const isLightTheme = themeMode === "light"; 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const signinForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username minimum 8 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(8, "Password minimum 8 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
    
      setIsLoginRequest(true);
      const { response, err } = await userApi.signin(values);

      setIsLoginRequest(false);

      if (response) {
        signinForm.resetForm();
        dispatch(setUser(response));
        window.location.reload();
      }

      if (err) {
        toast.error(err.message);
       
      }
    },
  });
  const { appState } = useSelector((state) => state.appState);
  const [isStart, setIsStart] = useState(false);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const checkIntroState = appState === "intro" ? true : false;
  const handleNavigateMobile = () => {
    navigate("/signin");
  };
  const inputlabelcss = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
    "& label.Mui-focused": {
      color: "#fff",
    },
  };
  return (
    <div style={{ marginTop: "64px" }}>
      <Box
        sx={{
          width: "100%",
          height: { md: "100vh", xs: "100%" },
          background: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            position: "relative",
            inset: 0,
            width: "100%",
            height: "100%",
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: isLightTheme ? "#fff" : "#fff",
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
          }}
        >
          <Typography
            variant="h1"
            sx={{ fontSize: { md: "3rem", xs: "2rem", fontWeight: "700" } }}
          >
            Unlimited movies, TV shows, and more.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              marginTop: "10px",
              marginBottom: "20px",
              fontSize: { md: "1.5rem", xs: "1.125rem" },
            }}
          >
            Watch anywhere. Cancel anytime.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { md: "1.5rem", xs: "1.125rem" } }}
          >
            Ready to watch? Enter your email to create or restart your
            membership.
          </Typography>
          {/* {checkIntroState && !isMobile ? (
            <Box
              component="form"
              onSubmit={signinForm.handleSubmit}
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
                justifyContent: "center",
                flexDirection: isStart ? "column" : " row",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" },
                  width: isStart ? "55%" : "20%",
                  gap: "10px",
                  marginRight: { md: "10px", xs: "0px" },
                  transition: "all .5s ease",
                }}
              >
                <TextField
                  type="text"
                  label="UserName"
                  autoComplete="off"
                  name="username"
                  fullWidth
                  sx={{
                    height: "100%",
                    transition: ".5s ease",
                    bgcolor: "rgba(22,21,21,.8)",
                    ...inputlabelcss,
                  }}
                  value={signinForm.values.username}
                  onChange={signinForm.handleChange}
                  color="success"
                  error={
                    signinForm.touched.username &&
                    signinForm.errors.username !== undefined
                  }
                  helperText={
                    signinForm.touched.username && signinForm.errors.username
                  }
                />
                <TextField
                  type="password"
                  label="Password"
                  autoComplete="off"
                  name="password"
                  fullWidth
                  sx={{
                    height: "100%",
                    display: isStart ? "block" : "none",
                    transition: ".5s ease",
                    bgcolor: "rgba(22,21,21,.8)",
                    ...inputlabelcss,
                  }}
                  value={signinForm.values.password}
                  onChange={signinForm.handleChange}
                  color="success"
                  error={
                    signinForm.touched.password &&
                    signinForm.errors.password !== undefined
                  }
                  helperText={
                    signinForm.touched.password && signinForm.errors.password
                  }
                />
              </Box>
              {isStart ? (
                <LoadingButton
                  type="submit"
                  size="medium"
                  variant="contained"
                  sx={{ marginTop: 4 }}
                  loading={isLoginRequest}
                >
                  sign in
                </LoadingButton>
              ) : (
                <Button
                  onClick={() => setIsStart(true)}
                  variant="contained"
                  style={{
                    width: "200px",
                    padding: "15px 0",
                    display: isStart ? "none" : "flex",
                    alignItems: "center",
                  }}
                >
                  Let Start{" "}
                  <ArrowForwardIosIcon sx={{ width: "15px", height: "15px" }} />
                </Button>
              )}
            </Box>
          ) : (
            <Button
              onClick={() => handleNavigateMobile()}
              variant="contained"
              size="medium"
              sx={{ marginTop: "20px" }}
            >
              Let Start
            </Button>
          )} */}
        </Box>
      </Box>
      <Box
        style={{
          borderTop: "5px solid #ccc",

          padding: "4.5rem 0",
        }}
        sx={{ display: { md: "none", xs: "none", lg: "block" } }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: { md: "1379px", sx: "100%" },
            margin: "0 auto",
            textAlign: { xs: "center", md: "unset" },
          }}
          alignItems="center"
        >
          <Grid item padding="0px" md={6} xs={12}>
            <Typography
              sx={{
                fontSize: { md: "3rem", xs: "2rem" },
                fontWeight: "900",
                marginBottom: "1rem",
              }}
              variant="h2"
            >
              Enjoy on your TV.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.5rem", xs: "1.125rem" },
                fontWeight: "400",
              }}
              variant="subtitle1"
            >
              Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </Typography>
          </Grid>
          <Grid item padding="0px" md={6} xs={12} position="relative">
            <Box
              sx={{
                background: `url(${tv})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: { md: "434px", xs: "256px" },
              }}
            />{" "}
            <Box
              sx={{
                zIndex: "-1",
                overflow: "hidden",
                width: "100%",
                height: "100%",
                maxWidth: "73%",
                maxHeight: "65%",
                position: "absolute",
                top: "58%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <video
                src={video1}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: "100%",
                  height: "100%",
                  display: "inline-block",
                  verticalAlign: "baseline",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        style={{
          borderTop: "5px solid #ccc",
          padding: "4.5rem 0",
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: { md: "auto", lg: "1379px", xs: "auto" },
            flexDirection: { md: "row", xs: "column-reverse" },
            textAlign: { xs: "center", md: "unset" },
            marginX: "auto",
          }}
          alignItems="center"
        >
          <Grid item padding="0px" md={6} xs={12} position="relative">
            <Box sx={{ width: { xs: "100%" } }}>
              <img style={{ width: "100%" }} src={mobileBg} alt="Mobile" />
            </Box>
            <Box
              sx={{
                position: "absolute",
                width: { md: "50%", xs: "70%" },
                display: "flex",
                alignItems: "center",
                padding: "10px",
                justifyContent: "space-between",
                border: "2px solid #ccc",
                borderRadius: "20px",
                maxHeight: { md: "auto", xs: "90px" },

                bottom: "40px",
                left: { md: "50%", xs: "50%" },
                top: { md: "unset", xs: "50%" },
                transform: {
                  md: "translateX(-50%)",
                  xs: "translate(-50%,10px)",
                },
                background: "#000",
              }}
            >
              <div
                className="img"
                style={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={minibgmobile}
                  style={{
                    maxWidth: "51px",
                    width: "100%",
                    height: "100%",
                    maxHeight: "72px",
                  }}
                  alt=""
                />
              </div>
              <Box sx={{ marginLeft: "10px", width: "60%" }}>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 1)",
                    fontWeight: "500",
                    fontSize: "1rem",
                  }}
                >
                  Stranger Things
                </Typography>
                <Typography
                  sx={{
                    fontWeight: "400",
                    color: "#0071eb",
                    fontSize: "0.875rem",
                    marginTop: "5px",
                  }}
                >
                  Downloading...
                </Typography>
              </Box>
              <div
                style={{
                  width: "100%",
                  maxWidth: "48px",
                  minWidth: "48px",
                  maxHeight: "100%",
                  height: "60px",
                  background: `url(${downloadGif})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
            </Box>
          </Grid>
          <Grid item padding="0px" md={6} xs={12}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { md: "3rem", xs: "2rem" },
                fontWeight: "900",
                marginBottom: "1rem",
                maxWidth: "579px",
              }}
            >
              Download your shows to watch offline.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.5rem", xs: "1.125rem" },
                maxWidth: "579px",
              }}
              variant="subtitle1"
            >
              Save your favorites easily and always have something to watch.
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box
        style={{
          borderTop: "5px solid #ccc",
          padding: "4.5rem 0",
        }}
        sx={{ display: { md: "none", xs: "none", lg: "block" } }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: { md: "1379px", xs: "auto" },
            margin: "0 auto",
            textAlign: { xs: "center", md: "unset" },
          }}
          alignItems="center"
        >
          <Grid item padding="0px" md={6} xs={12}>
            <Typography
              sx={{
                fontSize: { md: "3rem", xs: "2rem" },
                fontWeight: "900",
                marginBottom: "1rem",
              }}
              variant="h2"
            >
              Watch everywhere.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.5rem", xs: "1.125rem" },
                fontWeight: "400",
              }}
              variant="subtitle1"
            >
              Stream unlimited movies and TV shows on your phone, tablet,
              laptop, and TV.
            </Typography>
          </Grid>
          <Grid item padding="0px" md={6} xs={12} position="relative">
            <Box
              sx={{
                background: `url(${devicebg})`,
                backgroundSize: { md: "cover", xs: "contain" },
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                width: "100%",
                height: "434px",
              }}
            />
            <Box
              sx={{
                zIndex: "-1",
                overflow: "hidden",
                width: "100%",
                height: "100%",
                maxWidth: "73%",
                maxHeight: "54%",
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <video
                style={{
                  width: "100%",
                  height: "100%",
                  display: "inline-block",
                  verticalAlign: "baseline",
                }}
                src={video1}
                autoPlay
                muted
                loop
                playsInline
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          borderTop: "5px solid #ccc",
          padding: "4.5rem 0",
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            width: { md: "auto", lg: "1379px", xs: "auto" },
            margin: "0 auto",
            flexDirection: { md: "row", xs: "column-reverse" },
            textAlign: { xs: "center" },
          }}
          alignItems="center"
        >
          <Grid item padding="0px" md={6} xs={12} position="relative">
            <Box>
              <img
                style={{ width: "100%", height: "100%" }}
                src={kidBg}
                alt="Mobile"
              />
            </Box>
          </Grid>
          <Grid item padding="0px" md={6} xs={12}>
            <Typography
              variant="h2"
              sx={{
                fontSize: { md: "3rem", xs: "2rem" },
                fontWeight: "900",
                marginBottom: "1rem",
                maxWidth: "579px",
              }}
            >
              Create profiles for kids.
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "1.5rem", xs: "1.125rem" },
                maxWidth: "579px",
              }}
              variant="subtitle1"
            >
              Send kids on adventures with their favorite characters in a space
              made just for them—free with your membership.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default IntroducePage;
