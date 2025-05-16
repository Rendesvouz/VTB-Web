import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  user: null,
  userRole: null,
  token: null,
  launchScreen: null,
  accessToken: null,
  refreshToken: null,
  error: null,
  destination: null,
  lastAPIFetchTime: null,
  lastLoginTime: null,
  productCategories: null,
  shopProduct: null,
  cartProducts: [],
  wishlistProducts: [],

  truckListings: null,
  bookedTrucks: null,
  editTruckListing: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    saveUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    saveAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    saveRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    saveLaunchScreen: (state, action) => {
      state.launchScreen = action.payload;
    },
    saveLoginTime: (state, action) => {
      state.lastLoginTime = action.payload;
    },
    setLoading: (state, action) => {
      state.loading =
        action.payload?.loading !== undefined
          ? action.payload?.loading
          : state.loading;
    },
    signOut: (state, action) => {
      state.user = null;
      state.userToken = null;
      state.userRole = null;
      state.userPreferences = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.lastLoginTime = null;
      state.truckListings = null;
      state.bookedTrucks = null;
    },
    setUserDestination: (state, action) => {
      state.destination = action.payload;
    },
    APILastFetchTime: (state, action) => {
      state.lastAPIFetchTime = action.payload;
    },
    saveProductCatgeories: (state, action) => {
      state.productCategories = action.payload;
    },
    saveTruckListings: (state, action) => {
      state.truckListings = action.payload;
    },
    saveBookedTrucks: (state, action) => {
      state.bookedTrucks = action.payload;
    },
    saveEditTruckData: (state, action) => {
      state.editTruckListing = action.payload;
    },
    clearEditTruckListingData: (state, action) => {
      state.editTruckListing = null;
    },
  },
});

export const {
  getUser,
  saveUserRole,
  saveAccessToken,
  saveRefreshToken,
  setLoading,
  saveLaunchScreen,
  signOut,
  registerUser,
  setUserDestination,
  APILastFetchTime,
  saveLoginTime,
  saveProductCatgeories,

  // truck section
  saveTruckListings,
  saveBookedTrucks,
  saveEditTruckData,
  clearEditTruckListingData,
} = userSlice.actions;
export default userSlice.reducer;
