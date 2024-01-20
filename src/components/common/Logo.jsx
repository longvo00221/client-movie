import { Box, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Logo = () => {
  const theme = useTheme();
  const { themeMode } = useSelector((state) => state.themeMode);
  const isLightTheme = themeMode === "light";
  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      <Link to="/" style={{ textDecoration: "none" }}>
        <Box sx={{ color: isLightTheme?"#000":"#ffff",display:"inline-block" }}>Meo</Box>
        <span style={{ color: theme.palette.primary.main }}>Flix</span>
      </Link>
    </Typography>
  );
};

export default Logo;
