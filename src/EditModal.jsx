import { useState, useEffect } from "react";

export default function EditModal({ todo, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setDue(todo.due);
    }
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(todo._id, { title, description, due });
    onClose();
  };

  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input className="border p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea className="border p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input type="date" className="border p-2" value={due} onChange={(e) => setDue(e.target.value)} />

          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

