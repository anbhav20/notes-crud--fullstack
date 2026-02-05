import axios from "axios";
import { useState, useEffect } from "react";

const App = () => {
  const [note, setNote] = useState([]);
  const [form, setForm] = useState({
    title: "",
    discription: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

 const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.discription) return;

    if (editId) {
      // UPDATE
      await axios.put(`http://localhost:5000/api/notes/${editId}`, {
        title: form.title,
        discription: form.discription,
      });

      setEditId(null);
      setIsEditing(false);
    } else {
      // CREATE
      await axios.post("http://localhost:5000/api/create-note", {
        title: form.title,
        discription: form.discription,
      });
    }

    setForm({ title: "", discription: "" });
    fetchNotes();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNote(res.data.notes);
  };

const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  const handleEdit = (note) => {
    setIsEditing(true);
    setEditId(note._id);
    setForm({
      title: note.title,
      discription: note.discription,
    });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-2">
      <div className="w-full max-w-6xl">
  
        <form
          onSubmit={handleSubmit}
          className={`bg-white w-full lg:w-[70%] flex flex-col lg:flex-row gap-3 p-4 rounded-2xl shadow-md
          transition-all duration-300
          ${isEditing ? "ring-2 ring-gray-400 scale-[1.02]" : ""}
        `}
        >
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Note title"
            className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-gray-300"
          />

          <textarea
            name="discription"
            value={form.discription}
            onChange={handleChange}
            placeholder="Write your note..."
            rows={2}
            className="flex-1 border rounded-xl px-4 py-2 outline-none resize-none focus:ring-2 focus:ring-gray-300"
          />

          <button
            disabled={!form.title || !form.discription}
            className={`px-6 py-2 rounded-xl text-white font-semibold transition
            ${
              isEditing
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-700 hover:bg-gray-800"
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          >
            {isEditing ? "Update Note" : "Create Note"}
          </button>
        </form>


        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {note.map((n) => (
            <div
              key={n._id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition"
            >
              <h1 className="text-lg font-bold text-gray-800 break-words">
                {n.title}
              </h1>

              <p className="text-sm text-gray-600 mt-1 break-words">
                {n.discription}
              </p>

              <div className="mt-4 flex justify-between">
                <button
                  onClick={() => handleDelete(n._id)}
                  className="px-4 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleEdit(n)}
                  className="px-4 py-1 text-sm rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
