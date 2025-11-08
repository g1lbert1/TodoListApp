// ToDoList.jsx
const ToDoList = ({ todos, deleteTodo, toggleCompleted }) => {
  const today = new Date();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📝 To-Do List
      </h1>

      <div className="flex flex-col gap-5">
        {todos
          .filter((item) => !item.completed)
          .map((item) => {
            const dueDate = new Date(item.due);
            const alreadyDue = dueDate < today;

            return (
              <div
                key={item.id}
                className={`border rounded-xl p-4 transition-all ${
                  alreadyDue
                    ? "border-red-400 bg-red-50"
                    : "border-gray-200 hover:border-blue-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* --- Checkbox toggle --- */}
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 accent-green-600 cursor-pointer"
                    checked={item.completed}
                    onChange={() => toggleCompleted(item)}
                    aria-label={`Toggle completion for ${item.title}`}
                  />

                  <div className="flex-1">
                    <h2
                      className={`text-xl font-semibold ${
                        alreadyDue ? "text-red-600" : "text-gray-800"
                      } ${item.completed ? "line-through text-gray-500" : ""}`}
                    >
                      {item.title}
                    </h2>

                    <p
                      className={`mt-1 ${
                        item.completed ? "line-through text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {item.description}
                    </p>

                    <p
                      className={`mt-2 text-sm ${
                        alreadyDue ? "text-red-500 font-semibold" : "text-gray-500"
                      }`}
                    >
                      Due: {item.due}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => deleteTodo(item.id)}
                        className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ToDoList;
