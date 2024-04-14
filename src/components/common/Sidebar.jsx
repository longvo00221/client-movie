import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  Button,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import uiConfigs from "../../configs/ui.configs";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useEffect, useState } from "react";
import userApi from "../../api/modules/user.api";
import { themeModes } from "../../configs/theme.configs";
import { setThemeMode } from "../../redux/features/themeModeSlice";
import { setUser } from "../../redux/features/userSlice";
const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUserState(userInfoFromLocalStorage);
  }, []);
  const { appState } = useSelector((state) => state.appState);
  const { themeMode } = useSelector((state) => state.themeMode);

  const sidebarWidth = uiConfigs.size.sidebarWith;

  const onSwitchTheme = () => {
    const theme =
      themeMode === themeModes.dark ? themeModes.light : themeModes.dark;
    dispatch(setThemeMode(theme));
  };
  const navigate = useNavigate();
  const HandleNavigate = () => {
    navigate("/signin");
  };
  const handleSignOut = async () => {
    const { data } = await userApi.signout();
    dispatch(setUser(null));
  };
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const checkIntroState = appState === "intro" ? true : false;
  const checkSigninState = appState === "signin" ? true : false;
  const checkSignupState = appState === "signup" ? true : false;
  const drawer = (
    <>
      {!checkIntroState && (
        <>
          <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
            {/* <Stack width="100%" direction="row" justifyContent="center">
            <Logo />
          </Stack> */}
          </Toolbar>
          <List sx={{ paddingX: "30px" }}>
            <Typography variant="h6" marginBottom="20px">
              MENU
            </Typography>
            {menuConfigs.main.map((item, index) => (
              <ListItemButton
                key={index}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                  backgroundColor: appState.includes(item.state)
                    ? "primary.main"
                    : "unset",
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}

            <Typography
              variant="h6"
              marginBottom="20px"
              sx={{ display: appState === "intro" && "none" }}
            >
              THEME
            </Typography>
            <ListItemButton
              onClick={onSwitchTheme}
              sx={{
                display: appState === "intro" && "none",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            >
              <ListItemIcon>
                {themeMode === themeModes.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeModes.light && <WbSunnyOutlinedIcon />}
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase">
                    {themeMode === themeModes.dark ? "dark mode" : "light mode"}
                  </Typography>
                }
              />
            </ListItemButton>
            {userState && (
              <>
                <Typography variant="h6" marginBottom="20px">
                  PERSONAL
                </Typography>
                {menuConfigs.user.map((item, index) => (
                  <ListItemButton
                    key={index}
                    sx={{
                      borderRadius: "10px",
                      marginY: 1,
                      backgroundColor: appState.includes(item.state)
                        ? "primary.main"
                        : "unset",
                    }}
                    component={Link}
                    to={item.path}
                    onClick={() => toggleSidebar(false)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText
                      disableTypography
                      primary={
                        <Typography textTransform="uppercase">
                          {item.display}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                ))}
                <ListItemButton
                  sx={{ borderRadius: "10px" }}
                  onClick={() => handleSignOut()}
                >
                  <ListItemIcon>
                    <LogoutOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography textTransform="uppercase">
                        sign out
                      </Typography>
                    }
                  />
                </ListItemButton>
              </>
            )}
            {!userState && (
              <Typography variant="h6" marginBottom="20px">
                ACCOUNT
              </Typography>
            )}
            <ListItemButton>
              {!userState && (
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  onClick={() => HandleNavigate()}
                >
                  sign in
                </Button>
              )}
            </ListItemButton>
          </List>
        </>
      )}
    </>
  );

  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          widh: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
