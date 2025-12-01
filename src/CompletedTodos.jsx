
const CompletedTodos = ({ todos, toggleCompleted, deleteTodo, setTodoBeingEdited }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-700">
         Completed Todos
      </h1>

      <div className="flex flex-col gap-5">
        {todos
          .filter((item) => item.completed)
          .map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 bg-green-50 border-green-200 hover:border-green-400 transition-all"
            >
              <h2 className="text-xl font-semibold text-green-800">
                {item.title}
              </h2>

              <p className="text-gray-700 mt-1">{item.description}</p>

              <p className="mt-2 text-sm text-gray-600">
                <span className="font-semibold text-green-700">Due:</span>{" "}
                {item.due}
              </p>

              <p className="text-green-600 font-semibold mt-2">
                Completed: Yes 
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => toggleCompleted(item)}
                  className="px-4 py-2 text-sm font-medium bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                >
                  Mark Incomplete
                </button>
                <button
                  onClick={() => deleteTodo(item._id)}
                  className="px-4 py-2 text-sm font-medium bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setTodoBeingEdited(item)
                    console.log("Edit clicked", item);
                  }}
                  className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
                >
                  Edit
                </button>

              </div>
            </div>
          ))}

        {todos.filter((item) => item.completed).length === 0 && (
          <p className="text-center text-gray-500 italic">
            No completed tasks yet
          </p>
        )}
      </div>
    </div>
  );
};

export default CompletedTodos
