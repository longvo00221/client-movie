import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { setSeasonState } from "../../redux/features/tvShowSlice";
const TvShowSeason = ({ seasons, movieName, rate, popularity }) => {
  const theme = useTheme();
  const { themeMode } = useSelector((state) => state.themeMode);
  const { tvShowSeason } = useSelector((state) => state.tvShowSeason);
  const dispatch = useDispatch();
  const [seasonNumber, setSeasonNumber] = useState(0);
  const handleSeasonSelect = (event, index) => {
    const selectedSeason = index.props.itemID;
    setSeasonNumber(selectedSeason.season_number);
    dispatch(setSeasonState(selectedSeason));
  };

  const isLightTheme = themeMode === "light";
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const specialsIndex = seasons.findIndex(
    (season) => season.name === "Specials"
  );
  if (specialsIndex !== -1) {
    seasons.push(seasons.splice(specialsIndex, 1)[0]);
  }
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: { md: "30px", xs: "25px" },
          letterSpacing: "0.4rem",
          fontWeight: "700",
        }}
      >
        {movieName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          aligtItem: "center",
          justifyContent: "space-evenly",
          margin: "20px 0",
        }}
      >
        <Typography
          sx={{
            diplay: "inline",
            color: "green",
            fontWeight: "500",
            fontSize: "15px",
          }}
        >
          Core: {rate}
        </Typography>
        <Typography
          sx={{
            diplay: "inline",
            color: isLightTheme ? "#000" : "#fff",
            fontWeight: "500",
            fontSize: "15px",
          }}
        >
          Popularity: {popularity}
        </Typography>
      </Box>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel id="season-select-label">Select season</InputLabel>
        <Select
          labelId="season-select-label"
          id="season-select"
          defaultValue={seasons[0].name}
          value={seasons.name}
          onChange={handleSeasonSelect}
          input={<OutlinedInput label="Select season" />}
          MenuProps={MenuProps}
          itemID={tvShowSeason + 1}
        >
          {seasons.map((season, index) => (
            <MenuItem
              key={season.id}
              value={season.name}
              itemID={index}
              onChange={() => handleSeasonSelect(index)}
            >
              {season.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default TvShowSeason;
