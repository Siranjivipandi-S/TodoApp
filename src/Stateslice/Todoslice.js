import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const TodoAdapter = createEntityAdapter({
  selectId: (todos) => todos.id,
});

const initialState = TodoAdapter.getInitialState({
  status: "idle",
});

const baseURL = "https://jsonplaceholder.typicode.com/todos?_limit=5";

export const FetchTodos = createAsyncThunk("/getTodo", async () => {
  const response = await axios.get(`${baseURL}`);
  return response.data;
});

export const AddNewTodo = createAsyncThunk("/AddTodo", async (newTodo) => {
  const res = await axios.post(baseURL, newTodo);
  return res.data;
});

export const Deletetodo = createAsyncThunk("/DeleteTodo", async (id) => {
  await axios.delete(`${baseURL}/${id}`);
  return id;
});

const Todoslice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(FetchTodos.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(FetchTodos.rejected, (state) => {
      state.status = "rejected";
    });
    builder.addCase(FetchTodos.fulfilled, (state, action) => {
      state.status = "idle";
      TodoAdapter.upsertMany(state, action.payload);
    });
    builder.addCase(Deletetodo.fulfilled, (state, action) => {
      const { id } = action.payload;
      TodoAdapter.removeOne(state, id);
    });
    builder.addCase(AddNewTodo.fulfilled, (state, action) => {
      TodoAdapter.addOne(state, action.payload);
    });
  },
});

export const { selectAll, selectById, selectTotal } = TodoAdapter.getSelectors(
  (state) => state.todos
);

export const TodoStatus = (state) => state.todos.status;

export default Todoslice.reducer;
