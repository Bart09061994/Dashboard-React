import { createSlice } from "@reduxjs/toolkit";

const signInSlice = createSlice({
  name: "signIn",
  initialState: {
    email: "",
    password: "",
    users: JSON.parse(localStorage.getItem("users")) || [],
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
    authenticateUser: (state) => {
      const { email, password, users } = state;
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        state.isAuthenticated = true;
        state.isAdmin = user.isAdmin;
      } else {
        state.isAuthenticated = false;
        state.isAdmin = false;
      }
    },
    registerUser: (state, action) => {
      const { email, password } = action.payload;
      const isEmailExists = state.users.some((user) => user.email === email);
      if (isEmailExists) {
        alert("L'email è già registrata. Per favore, utilizza un'altra email.");
        return;
      }
      let isAdmin = false;
      if (email === "bart@bart.com") {
        isAdmin = true;
      }
      const newUser = { email, password, isAdmin };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
      alert("Registrazione effettuata con successo!");
    },
  },
});

export const { setEmail, setPassword, authenticateUser, registerUser } =
  signInSlice.actions;
export default signInSlice.reducer;
