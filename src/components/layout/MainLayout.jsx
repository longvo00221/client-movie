import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import tmdbConfigs from "../../api/configs/tmdb.configs";
import favoriteApi from "../../api/modules/favorite.api";
import userApi from "../../api/modules/user.api";
import { setListFavorites, setUser } from "../../redux/features/userSlice";
import AuthModal from "../common/AuthModal";
import Footer from "../common/Footer";
import GlobalLoading from "../common/GlobalLoading";
import ScreenSaver from "../common/ScreenSaver";
import Topbar from "../common/Topbar";

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [userState , setUserState] = useState({})
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
      setUserState(userInfoFromLocalStorage)

  },[]);
  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) dispatch(setListFavorites(response));
      if (err) toast.error(err.message);
    };

    if (userState) getFavorites();
    if (!userState) dispatch(setListFavorites([]));
  }, [userState, dispatch]);
  const { appState } = useSelector((state) => state.appState);
  const checkSigninState = appState === "signin" ? true : false;
  const checkSignupState = appState === "signup" ? true : false;
  return (
    <>
      <Box sx={{display:{md:"block",sx:"none"}}}>
        <ScreenSaver
          mediaType={tmdbConfigs.mediaType.movie}
          mediaCategory={tmdbConfigs.mediaCategory.popular}
        />
      </Box>
      {/* global loading */}
      <GlobalLoading />
      {/* global loading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Topbar />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      {checkSigninState || checkSignupState ?<></> : <Footer />}
      {/* footer */}
    </>
  );
};

export default MainLayout;
