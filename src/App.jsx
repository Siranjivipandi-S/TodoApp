import { useState } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import { Theme } from "./components/Theme";
import Todo from "./components/Todo";
import { Example } from "./components/Loading";

function App() {
  const [unload, setunLoad] = useState(false);
  setTimeout(() => {
    setunLoad(true);
  }, 1000);
  if (unload != true) {
    return (
      <div className="relative flex items-center justify-center top-72">
        <Example type={"spinningBubbles"} color={"purple"} />;
      </div>
    );
  }
  return (
    <>
      {unload && (
        <div className="flex items-center justify-center flex-col bg-orange-100 min-h-screen  m-0 p-0 box-border">
          <Theme />
          <AddTodo />
          <Todo />
        </div>
      )}
    </>
  );
}

export default App;
