import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfigs from "./configs/theme.configs";
import { ToastContainer } from "react-toastify";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/routes";
import PageWrapper from "./components/common/PageWrapper";
import publicRoutes from "./routes/publicRoutes";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect } from "react";
import "./App.css";
import { useState } from "react";
const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);
  const [userState, setUserState] = useState({});
  useEffect(() => {
    const userInfoFromLocalStorage = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUserState(userInfoFromLocalStorage);
  }, []);
  console.log(process.env.REACT_APP_API_URL)
  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
      {/* mui reset css */}
      <CssBaseline />

      {/* app routes */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            {/* {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )} */}
            {userState
              ? routes.map((route, index) => {
                  return route.index ? (
                    <Route
                      index
                      key={index}
                      element={
                        route.state ? (
                          <PageWrapper state={route.state}>
                            {route.element}
                          </PageWrapper>
                        ) : (
                          route.element
                        )
                      }
                    />
                  ) : (
                    <Route
                      path={route.path}
                      key={index}
                      element={
                        route.state ? (
                          <PageWrapper state={route.state}>
                            {route.element}
                          </PageWrapper>
                        ) : (
                          route.element
                        )
                      }
                    />
                  );
                })
              : publicRoutes.map((route, index) => {
                  return route.index ? (
                    <Route
                      index
                      key={index}
                      element={
                        route.state ? (
                          <PageWrapper state={route.state}>
                            {route.element}
                          </PageWrapper>
                        ) : (
                          route.element
                        )
                      }
                    />
                  ) : (
                    <Route
                      path={route.path}
                      key={index}
                      element={
                        route.state ? (
                          <PageWrapper state={route.state}>
                            {route.element}
                          </PageWrapper>
                        ) : (
                          route.element
                        )
                      }
                    />
                  );
                })}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* app routes */}
    </ThemeProvider>
  );
};

export default App;
