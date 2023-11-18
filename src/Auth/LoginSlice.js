import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    email: "",
    password: "",
    isAuthenticated: false,
    isAdmin: false,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    authenticateUser: (state, action) => {
      const { email, password, users } = action.payload;
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        state.isAuthenticated = true;
        state.isAdmin = user.isAdmin;
      } else {
        state.isAuthenticated = false;
        state.isAdmin = false;
      }
    },
  },
});

export const { setEmail, setPassword, authenticateUser } = loginSlice.actions;
export default loginSlice.reducer;
