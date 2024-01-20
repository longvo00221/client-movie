import { createSlice } from "@reduxjs/toolkit";
const userInfoFromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const userState = userInfoFromLocalStorage ? userInfoFromLocalStorage.user : null;

const initialState = {
  userState,
  listFavorites: []
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser: (state, action ) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token) localStorage.setItem("actkn", action.payload.token);
      }
      
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(e => e.mediaId.toString() !== mediaId.toString());
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    }
  }
});

export const {
  setUser,
  setListFavorites,
  addFavorite,
  removeFavorite
} = userSlice.actions;

export default userSlice.reducer;