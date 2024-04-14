import ProtectedPage from "../components/common/ProtectedPage";
import FavoriteList from "../pages/FavoriteList";
import HomePage from "../pages/HomePage";
import MediaDetail from "../pages/MediaDetail";
import MediaList from "../pages/MediaList";
import MediaSearch from "../pages/MediaSearch";
import PasswordUpdate from "../pages/PasswordUpdate";
import PersonDetail from "../pages/PersonDetail";
import ReviewList from "../pages/ReviewList";


export const routesGen = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};

const routes = [
  {
    index: true,
    element: <HomePage />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: (
      <ProtectedPage>
        <PersonDetail />
      </ProtectedPage>
    ),
    state: "person.detail",
  },
  {
    path: "/search",
    element: (
      <ProtectedPage>
        <MediaSearch />
      </ProtectedPage>
    ),
    state: "search",
  },
  {
    path: "*",
    element: <HomePage />,
    state: "any",
  },

  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: (
      <ProtectedPage>
        <MediaList />,
      </ProtectedPage>
    ),
  },
  {
    path: "/:mediaType/:mediaId",
    element: (
      <ProtectedPage>
        <MediaDetail />
      </ProtectedPage>
    ),
  },
];

export default routes;
