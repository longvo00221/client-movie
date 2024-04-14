import {
  Box,
  Chip,
  Divider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Autoplay, EffectFade } from "swiper";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import genreApi from "../../api/modules/genre.api";
import mediaApi from "../../api/modules/media.api";
import uiConfigs from "../../configs/ui.configs";
import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
import '../css/ScreenSaver.css';

const SCREENSAVER_DELAY_MS = 60000;
const SCREENSAVER_ACTIVE_TIME_MS = 10000000000;
const SCREENSAVER_INACTIVE_TIME_MS = 10000;
const TIMESLIDE = 15000;
const styles = {
  screensaver: {
    position: "fixed",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    transition: "all .8s ease",
    display: "flex",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    fontSize: 32,
    color: "white",
  },
};

const ScreenSaver = ({ mediaType, mediaCategory }) => {
  const [screensaverActive, setScreensaverActive] = useState(false);
  const [screensaverVisible, setScreensaverVisible] = useState(false);
  const screensaverTimeout = useRef();
  const secondTimer = useRef();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out",
      delay: 200,
    });
  });
  const activeScreensaver = useCallback(() => {
    setScreensaverActive(true);
    setScreensaverVisible(true);
    loop();

    function loop() {
      const timerRef = setTimeout(() => {
        setScreensaverVisible(false);
        const timerRef2 = setTimeout(() => {
          setScreensaverVisible(true);
          loop();
        }, SCREENSAVER_INACTIVE_TIME_MS);
        secondTimer.current = timerRef2;
      }, SCREENSAVER_ACTIVE_TIME_MS);
      secondTimer.current = timerRef;
    }
  }, []);

  useEffect(() => {
    screensaverTimeout.current = setTimeout(
      () => activeScreensaver(),
      SCREENSAVER_DELAY_MS
    );
    document.addEventListener("touchstart", appTouched);
    document.addEventListener("mousemove", appTouched);

    return () => {
      clearTimeout(screensaverTimeout.current);
      clearTimeout(secondTimer.current);
      document.removeEventListener("touchstart", appTouched);
      document.removeEventListener("mousemove", appTouched);
    };
  }, [activeScreensaver]);

  const screensaverClicked = useCallback(() => {
    setScreensaverActive(false);
    setScreensaverVisible(false);
    startTimeout();
  }, []);

  const startTimeout = useCallback(() => {
    clearTimeout(screensaverTimeout.current);
    clearTimeout(secondTimer.current);
    screensaverTimeout.current = setTimeout(
      () => activeScreensaver(),
      SCREENSAVER_DELAY_MS
    );
  }, [activeScreensaver]);

  const appTouched = useCallback(() => {
    startTimeout();
  }, []);
  const theme = useTheme();
  const dispatch = useDispatch();

  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovies(response.results);
      if (err) toast.error(err.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <>
      {screensaverActive && screensaverVisible && !isMobile && (
        <div
          id="screensaver"
          style={styles.screensaver}
          onClick={screensaverClicked}
        >
          <Swiper
            grabCursor={true}
            loop={true}
            modules={[Autoplay, EffectFade]}
            style={{ width: "100%", height: "100%" }}
            effect="fade"
            autoplay={{
              delay: TIMESLIDE,
              disableOnInteraction: false,
            }}
          >
            {movies.map((movie, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                  id="image-screensaver"
                  className="image-screensaver"
                    style={{
                      height: "100%",
                      width: "100%!important",
                      display:"block",
                      background: `url(${tmdbConfigs.backdropPath(
                        movie.backdrop_path || movie.poster_path
                      )})`,
                      backgroundSize:"cover",
                      backgroundRepeat:"no-repeat"
                    }}
                  ></div>
                  {/* <MediaVideosSlide
                videos={[...media.videos.results].splice(0, 5)}
              /> */}
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,

                      ...uiConfigs.style.horizontalGradientBgImage[
                        theme.palette.mode
                      ],
                    }}
                  />
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      paddingX: { sm: "10px", md: "5rem", lg: "10rem" },
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        paddingX: "30px",
                        color: "text.primary",
                        width: { sm: "unset", md: "30%", lg: "40%" },
                      }}
                    >
                      <Stack
                        spacing={4}
                        direction="column"
                        sx={{ position: "absolute", bottom: "50px" }}
                      >
                        {/* title */}

                        <Typography
                          variant="h4"
                          fontSize={{
                            xs: "1.5rem",
                            md: "1.5rem",
                            lg: "3rem",
                          }}
                          fontWeight="700"
                          sx={{
                            ...uiConfigs.style.typoLines(2, "left"),
                          }}
                        >
                          {movie.title || movie.name}
                        </Typography>

                        {/* title */}

                        <Stack direction="row" spacing={1} alignItems="center">
                          {/* rating */}
                          <Typography>{movie.release_date}</Typography>
                          {/* rating */}
                          <Box
                            sx={{
                              width: "5px",
                              height: "5px",
                              borderRadius: "50%",
                              backgroundColor: "#ccc",
                            }}
                          />
                          <Divider orientation="vertical" />
                          {/* genres */}
                          {[...movie.genre_ids]
                            .splice(0, 2)
                            .map((genreId, index) => (
                              <Chip
                                variant="filled"
                                style={{
                                  background: "transparent",
                                }}
                                color="primary"
                                key={index}
                                label={
                                  genres.find((e) => e.id === genreId) &&
                                  genres.find((e) => e.id === genreId).name
                                }
                              />
                            ))}
                          {/* genres */}
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default ScreenSaver;
