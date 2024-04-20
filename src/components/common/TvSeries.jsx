import {
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import uiConfigs from "../../configs/ui.configs";
import TvShowSeason from "./TvShowSeason";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import mediaApi from "../../api/modules/media.api";
import { toast } from "react-toastify";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";

import { Close } from "@mui/icons-material";
import IframeTvMedia from "./IframeTvMedia";

const TvSeries = ({
  seasons,
  image,
  id,
  movieName,
  rate,
  popularity,
  background,
  mediaType,
}) => {
  const theme = useTheme();
  const { themeMode } = useSelector((state) => state.themeMode);
  const isLightTheme = themeMode === "light";
  const { tvShowSeason } = useSelector((state) => state.tvShowSeason);

  const [mediaEpisode, setMediaEpisode] = useState();
  const [showIframe, setShowIframe] = useState(false);
  const handleEpisode = (episodeNumber) => {
    // window.location.href = `https://www.2embed.cc/embedtv/${id}&s=${tvShowSeason + 1}&e=${episodeNumber}`;
    setShowIframe(true);
    setMediaEpisode(episodeNumber);
  };
  const filteredSeasons = seasons.filter(
    (season) => season.season_number === tvShowSeason + 1
  );
  const seasonsRequest = tvShowSeason + 1;
  const [listEpisode, setListEpisode] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getEpisode = async () => {
      const mediaId = id;
      const seasons = seasonsRequest;
      const { response, err } = await mediaApi.getEpisode({
        mediaId,
        seasons,
        mediaType,
      });
      if (response) await setListEpisode(response);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };
    getEpisode();
  }, [dispatch, id, mediaType, seasonsRequest]);
  return (
    <Box
      sx={{
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundImage: `url(${tmdbConfigs.backdropPath(background)})`,
        height: "100%",
        width: "100%",
        position: "fixed",
        inset: "0",
        zIndex: "10",
        backgroundRepeat: "no-repeat",
        transition: "all .8s ease-in-out",
      }}
    >
      <Box
        sx={{
          // background: isLightTheme ? "#fff" : "#000",
          position: "fixed",
          inset: "0",
          zIndex: "999",
          padding: "64px 0",
          ...uiConfigs.style.gradientBgImage[theme.palette.mode],
          backdropFilter: "blur(6px)",
        }}
      >
        <Grid
          container
          sx={{
            // height: "100%",
            width: "1400px",
            maxWidth: "calc(100% - 80px)",
            margin: "0 auto",
            borderRadius: "10px",

            maxHeight: "100vh",
            color: isLightTheme ? "#000" : "#fff",
            padding: { md: "50px 0", xs: "20px 0" },
            "&::-webkit-scrollbar": {
              width: 0,
              height: 0,
            },
          }}
          spacing={0}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              maxHeight: "80vh",
              transition: "all 0.5s ease-in",
              transformOrigin: "left",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <TvShowSeason
              seasons={seasons}
              movieName={movieName}
              rate={rate}
              popularity={popularity}
            />
          </Grid>
          {filteredSeasons.map((season, index) => (
            <Grid
              key={index}
              sx={{
                marginLeft: { md: "20px", xs: "0" },
                marginTop: { md: "-20px", xs: "20px" },
                paddingBottom: "100px",
                overflowY: "auto",
                overflowX: "hidden",
                maxHeight: { xs: "80vh", md: "100vh" },
                "&::-webkit-scrollbar": {
                  width: 0,
                  height: 0,
                },
                transition: "all .5s ease-in",
                transformOrigin: "bottom",
              }}
              item
              xs={12}
              md={8}
            >
              {listEpisode.episodes ? (
                listEpisode.episodes.map((episode, index) => (
                  <Stack space={2}>
                    {showIframe && (
                      <div
                        style={{
                          position: "fixed",
                          inset: "0",
                          padding: "50px",
                          zIndex: 999999,
                        }}
                      >
                        <div
                          style={{ padding: "10px", cursor: "pointer" }}
                          onClick={() => setShowIframe(false)}
                        >
                          <Close />
                        </div>
                        <IframeTvMedia
                          id={id}
                          season={tvShowSeason + 1}
                          episode={mediaEpisode}
                        />
                      </div>
                    )}
                    <Button
                      className="card"
                      target="_blank"
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: { md: "row", xs: "column" },
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        marginBottom: "20px",
                        paddingBottom: "20px",
                        cursor: "pointer",
                        borderRadius: "20px",
                        transition: ".3s ease",
                        "&:hover": { transform: "scale(1.03)" },
                        "&:hover .card:not(:hover)": { transform: "scale(.5)" },
                        "&:hover .media-play-btn": { opacity: 1 },
                        padding: "20px",
                        textDecoration: "none",
                        color: isLightTheme ? "#000" : "#fff",
                      }}
                      onClick={() => handleEpisode(episode.episode_number)}
                    >
                      <Box
                        sx={{
                          borderRadius: "10px",
                          minWidth: { md: "300px", xs: "100%" },
                          maxWidth: { md: "150px" },
                          height: "180px",
                          objectFit: "cover",
                          position: "relative",
                          ...uiConfigs.style.backgroundImage(
                            tmdbConfigs.posterPath(
                              episode.still_path
                                ? episode.still_path
                                : season.poster_path
                            )
                          ),
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "0",
                            width: "100%",
                            padding: "3px 5px",
                            backdropFilter: "blur(5px)",
                            left: "0",
                            fontSize: { md: "13px", xs: "18px" },
                            borderBottomLeftRadius: "10px",
                            borderBottomRightRadius: "10px",
                            fontWeight: { md: "600", xs: "500" },
                          }}
                        >
                          S{listEpisode.season_number}:E{episode.episode_number}
                        </Box>
                        <PlayCircleIcon
                          className="media-play-btn"
                          variant="contained"
                          starticon={<PlayCircleIcon />}
                          sx={{
                            display: { xs: "flex", md: "flex" },
                            opacity: 0,
                            transition: "all 0.3s ease",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            fontSize: "55px",
                            color: "rgba(255,255,255,0.6)",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                            "& .MuiButton-starticon": { marginRight: "-4px" },
                          }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: { md: "flex", xs: "none" },
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "flex-start",
                          marginLeft: "15px",
                          maxWidth: "80%",
                        }}
                      >
                        <Typography
                          sx={{
                            display: "block",
                            fontSize: { md: "25px", xs: "20px" },
                            textAlign: "left",
                          }}
                        >
                          {episode.name}
                        </Typography>
                        <Typography
                          sx={{
                            color: "#ccc",
                            fontSize: { md: "12px", xs: "9px" },
                            maxWidth: "80%",
                            textAlign: "left",
                          }}
                        >
                          {" "}
                          {episode.overview}
                        </Typography>
                      </Box>
                    </Button>
                  </Stack>
                ))
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: "100vh",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {" "}
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default TvSeries;
