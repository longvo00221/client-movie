import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import {
  Button,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
  useMediaQuery,
  MenuItem,
  Paper,
  ListItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import menuConfigs from "../../configs/menu.configs";
import { setUser } from "../../redux/features/userSlice";
import avatar from "../../assets/img/NetflixAvatar.png";
import { Box } from "@mui/system";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import userApi from "../../api/modules/user.api";
import SettingsIcon from "@mui/icons-material/Settings";
const UserMenu = () => {
  const { user } = useSelector((state) => state.user);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUserState(userInfoFromLocalStorage);
  }, []);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleSignOut = async () => {
    const { data } = await userApi.signout();
    dispatch(setUser(null));
  };
  const [notification, setNotification] = useState(null);
  const open = Boolean(notification);
  const handleClick = (event) => {
    setNotification(event.currentTarget);
  };
  const handleClose = () => {
    setNotification(null);
  };
  return (
    <>
      {userState && !isMobile && (
        <>
          <Box sx={{ position: "relative" }}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "#fff",postion:"relative" }}
            >
              {" "}
              <NotificationsIcon  />
              <Box sx={{
                width:"15px",
                height:"14px",
                borderRadius:"50%",
                backgroundColor:"primary.main",
                fontSize:"8px",
                display:"grid",
                placeItems:"center",
                position:"absolute",
                top:"5px",
                right:"18px"
              }}>1</Box>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={notification}
              open={open}
              onClose={handleClose}
            >
              <Box sx={{ width: 320 }}>
                <Box>
                  <Typography sx={{ fontSize: "20px", textAlign: "center" }}>
                    Notification
                  </Typography>
                </Box>
                <Box
                  sx={{
                    maxHeight: 300,
                    overflowY: "scroll",
                    fontSize: "17px",
                    marginY: "10px",
                  }}
                >
                  <ListItem>
                    <SettingsIcon />
                    <Typography sx={{marginLeft:"5px"}} >Phiên Bản Vừa Được Cập Nhật</Typography >
                  </ListItem>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    padding: "10px",
                    borderTop: "1px solid #ccc",
                  }}
                >
                  Xem Thêm
                </Box>
              </Box>
            </Menu>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              userSelect: "none",
              width: "30px",
              height: "30px",
              display: "flex",
              alignItems: "center",
            }}
            onClick={toggleMenu}
          >
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "5px",
              }}
              src={avatar}
              alt="avatar"
            />
            {anchorEl === null ? (
              <ArrowDropDownOutlinedIcon />
            ) : (
              <ArrowDropUpOutlinedIcon />
            )}
          </Box>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            <ListItemText
              disableTypography
              sx={{
                textAlign: "center",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
              }}
              primary={
                <Typography textTransform="uppercase">
                  Hi, {userState.username}
                </Typography>
              }
            />
            {menuConfigs.user.map((item, index) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={index}
                onClick={() => setAnchorEl(null)}
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
                  <Typography textTransform="uppercase">sign out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
