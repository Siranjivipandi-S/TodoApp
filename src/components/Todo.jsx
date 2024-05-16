import { useDispatch, useSelector } from "react-redux";
import { selectAll, TodoStatus, Deletetodo } from "../Stateslice/Todoslice";
import { Example } from "./Loading";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

function Todo() {
  const dispatch = useDispatch();
  const Response = useSelector(selectAll);
  const Rply = Response.slice().sort((a, b) => b.id - a.id);
  const ResponseStatus = useSelector(TodoStatus);
  const [checkedItems, setCheckedItems] = useState([]);

  if (ResponseStatus === "pending") {
    return <Example type={"balls"} color={"#000000"} />;
  }

  async function handleDelete(id) {
    await dispatch(Deletetodo(id)).unwrap();
    toast.success("Successfully Deleted!");
  }

  const handleCheckboxChange = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !checkedItems[index];
    setCheckedItems(newCheckedItems);
  };
  return (
    <div className="mt-2">
      <Toaster position="top-center" reverseOrder={false} />
      <ul className="flex-col w-[285px]">
        {Rply.map((item, index) => (
          <li
            key={index}
            className="flex mt-1 gap-1 items-center justify-between cursor-pointer bg-red-300 hover:bg-red-400 p-2 rounded-lg"
          >
            <input
              type="checkbox"
              className="border-grey focus:ring-blue-500"
              checked={checkedItems[index] || false}
              onChange={() => handleCheckboxChange(index)}
            />
            <p
              className={`${
                checkedItems[index]
                  ? " line-through  opacity-55"
                  : "no-underline"
              } text-1xl ml-2 mr-2`}
            >
              {item.title.slice(0, 1).toUpperCase() + item.title.slice(1)}
            </p>
            <button
              className="bg-red-500 p-1 rounded-lg text-white hover:bg-red-400 hover:text-black"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
