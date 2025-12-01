import { useEffect, useState } from "react";
import axios from "axios";
import ToDoList from "./ToDoList";
import CompletedTodos from "./CompletedTodos";
import Login from "./Login";
import EditModal from "./EditModal.jsx"

function App() {
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const [todoBeingEdited, setTodoBeingEdited] = useState(null);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    async function getTodos() {
      try {
        const res = await axios.get("http://localhost:3000/todos");
        const normalized = res.data.map(todo => ({
          ...todo,
          _id: todo._id.toString()
        }));
        setTodos(normalized);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }

    getTodos();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setTodos([]); // wipe UI
  };

  const addTodo = async (todoData) => {
    try {
      const res = await axios.post("http://localhost:3000/todos", todoData);
      setTodos((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  };

  const toggleCompleted = async (todo) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/todos/${todo._id}`,
        { completed: !todo.completed }
      );

      setTodos((prev) =>
        prev.map((t) => (t._id === res.data._id.toString() ? res.data : t))
      );

    } catch (err) {
      console.error("Failed to update todo:", err);
    }
  };


  const updateTodo = async (id, updatedFields) => {
    try {
      const res = await axios.patch(`http://localhost:3000/todos/${id}`, updatedFields);

      setTodos(prev => prev.map(t => (t._id === id ? res.data : t)));

    } catch (err) {
      console.error("Update failed:", err);
    }
  };



  
  if (!token) return <Login onAuth={setToken} />;
  if (loading) return <h3>Loading...</h3>;

  return (
    <>
      <button onClick={logout} style={{ marginBottom: "1rem" }} className="cursor-pointer">
        Logout
      </button>

      <ToDoList
        todos={todos}
        addTodo={addTodo}
        deleteTodo={deleteTodo}
        toggleCompleted={toggleCompleted}
        setTodoBeingEdited={setTodoBeingEdited}
      />

      <CompletedTodos
        todos={todos}
        toggleCompleted={toggleCompleted}
        deleteTodo={deleteTodo}
        setTodoBeingEdited={setTodoBeingEdited}
      />
      {todoBeingEdited && (
        <EditModal
          todo={todoBeingEdited}
          onClose={() => setTodoBeingEdited(null)}
          onSave={updateTodo}
        />
      )}
    </>
  );  
 }

export default App;

