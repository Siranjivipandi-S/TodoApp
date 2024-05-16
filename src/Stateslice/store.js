import { configureStore } from "@reduxjs/toolkit";
import Todoslice from "./Todoslice";
const store = configureStore({
  reducer: {
    todos: Todoslice,
  },
});
export default store;
