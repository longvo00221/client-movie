import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import symbolLogo from "../../assets/Netflix_Symbol/symbol.png";
import menuConfigs from "../../configs/menu.configs";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
const ScrollAppBar = ({ children, window }) => {
  const { themeMode } = useSelector((state) => state.themeMode);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: trigger
        ? "text.primary"
        : themeMode === themeModes.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "RGBA(0,0,0,0.1)"
        : themeMode === themeModes.light
        ? "RGBA(255,255,255,0.5)"
        : "RGBA(0,0,0,0.1)",
      backdropFilter: "blur(25px)",
    },
  });
};
const Topbar = () => {
  const [userState, setUserState] = useState({});
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUserState(userInfoFromLocalStorage);
  }, []);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();

  const onSwithTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const navigate = useNavigate();
  const HandleNavigate = () => {
    navigate("/signin");
  };
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const checkIntroState = appState === "intro" ? true : false;
  const checkSigninState = appState === "signin" ? true : false;
  const checkSignupState = appState === "signup" ? true : false;
 
  return (
    <>
      {checkIntroState || checkSigninState || checkSignupState || !userState ? (
        <>
          {checkIntroState && checkSigninState && checkSignupState && (
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
          )}
          <ScrollAppBar>
            <AppBar elevation={0} sx={{ zIndex: 9999 }}>
              <Toolbar
                sx={{
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  {checkIntroState && checkSigninState && checkSignupState && (
                    <IconButton
                      color="inherit"
                      sx={{ mr: 2, display: { md: "none" } }}
                      onClick={toggleSidebar}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}

                  <Box sx={{ display: { xs: "inline-block", md: "block" } }}>
                    <Logo />
                  </Box>
                </Stack>

                {/* user menu */}
                <Stack spacing={3} direction="row" alignItems="center">
                  {!userState && !isMobile && (
                    <Button
                      variant="contained"
                      onClick={() => HandleNavigate()}
                    >
                      sign in
                    </Button>
                  )}
                </Stack>
                {userState && <UserMenu />}
                {/* user menu */}
              </Toolbar>
            </AppBar>
          </ScrollAppBar>
        </>
      ) : (
        <>
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
          <ScrollAppBar>
            <AppBar elevation={0} sx={{ zIndex: 9999 }}>
              <Toolbar
                sx={{
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{
                    width: { xs: "100%", md: "unset" },
                    justifyContent: { xs: "space-between", md: "unset" },
                  }}
                >
                  <IconButton
                    color="inherit"
                    sx={{ mr: 2, display: { md: "none" } }}
                    onClick={toggleSidebar}
                  >
                    <MenuIcon />
                  </IconButton>

                  <Box sx={{ display: { xs: "inline-block", md: "none" } }}>
                    {/* <Logo /> */}
                    <img
                      style={{
                        width: "35px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                      src={symbolLogo}
                      alt="logo"
                    />
                  </Box>
                </Stack>

                {/* main menu */}
                <Box
                  flexGrow={1}
                  alignItems="center"
                  display={{ xs: "none", md: "flex" }}
                >
                  <Box sx={{ marginRight: "30px" }}>
                    <Logo />
                  </Box>
                  <Box sx={{ display: "flex", marginX: "auto" }}>
                    {menuConfigs.main.map((item, index) => (
                      <Button
                        key={index}
                        sx={{
                          color: appState.includes(item.state)
                            ? "primary.contrastText"
                            : "inherit",
                          mr: 2,
                        }}
                        component={Link}
                        to={item.path}
                        variant={
                          appState.includes(item.state) ? "contained" : "text"
                        }
                      >
                        {item.display}
                      </Button>
                    ))}
                    <IconButton
                      sx={{ color: "inherit" }}
                      onClick={onSwithTheme}
                    >
                      {themeMode === themeModes.dark && (
                        <DarkModeOutlinedIcon />
                      )}
                      {themeMode === themeModes.light && (
                        <WbSunnyOutlinedIcon />
                      )}
                    </IconButton>
                  </Box>
                </Box>
                {/* main menu */}

                {/* user menu */}
                <Stack spacing={3} direction="row" alignItems="center">
                  {!userState && !isMobile && (
                    <>
                      <Button
                        variant="contained"
                        sx={{ color: "#fff" }}
                      >
                        {" "}
                        <NotificationsIcon />
                      </Button>

                      <Button
                        variant="contained"
                        onClick={() => HandleNavigate()}
                      >
                        sign in
                      </Button>
                    </>
                  )}
                </Stack>
                {userState && <UserMenu />}
                {/* user menu */}
              </Toolbar>
            </AppBar>
          </ScrollAppBar>
        </>
      )}
    </>
  );
};

export default Topbar;
