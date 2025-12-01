import { useState } from "react";

const ToDoList = ({ todos, deleteTodo, toggleCompleted, addTodo, setTodoBeingEdited }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");

  const today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !due) return;

    addTodo({ title, description, due });

    setTitle("");
    setDescription("");
    setDue("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        To-Do List
      </h1>

      {/* Add Todo Form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 mb-6 border p-4 rounded-xl bg-gray-50"
      >
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded-lg"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          className="border p-2 rounded-lg"
          value={due}
          onChange={(e) => setDue(e.target.value)}
        />

        <button 
          type="submit"
          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition hover:cursor cursor-pointer"
        >
          Add Todo
        </button>
      </form>

      {/* Existing Todos */}
      <div className="flex flex-col gap-5">
        {todos
          .filter((item) => !item.completed)
          .map((item) => {
            const dueDate = new Date(item.due);
            const alreadyDue = dueDate < today;

            return (
              <div
                key={item._id}
                className={`border rounded-xl p-4 transition-all ${
                  alreadyDue
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                {/* existing list UI */}
                <input
                  type="checkbox"
                  className="mt-1 h-5 w-5 accent-green-600 cursor-pointer"
                  checked={item.completed}
                  onChange={() => toggleCompleted(item)}
                />
                <h2 className="text-xl font-semibold">
                  {item.title}
                </h2>
                <p className="mt-1 text-gray-600 break-all whitespace-normal" >{item.description}</p>
                <p className="text-sm text-gray-500">Due: {item.due}</p>

                <button
                  onClick={() => deleteTodo(item._id || item.id)}
                  className="px-4 py-2 mt-3 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => setTodoBeingEdited(item)}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Edit
                </button>

              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ToDoList;

