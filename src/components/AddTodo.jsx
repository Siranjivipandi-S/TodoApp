import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { AddNewTodo } from "../Stateslice/Todoslice";
import toast, { Toaster } from "react-hot-toast";
function AddTodo() {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();
  const AddData = async () => {
    try {
      await dispatch(
        AddNewTodo({ id: nanoid(), title: todo, completed: false })
      ).unwrap();

      setTodo("");
      toast.success("Succesfully Added");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-2 mt-6">
      <Toaster position="top-center" reverseOrder={false} />
      <input
        type="text"
        value={todo}
        className="p-2 rounded-lg outline-none"
        placeholder="Create a new todo.."
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        className="bg-purple-700 rounded-lg p-1 w-15 text-1xl text-center text-white hover:bg-purple-500"
        onClick={AddData}
        disabled={!todo.trim()}
      >
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
