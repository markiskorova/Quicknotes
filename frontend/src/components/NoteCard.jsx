import axios from 'axios';
const API_URL = 'http://localhost:5000/api/notes';

export default function NoteCard({ note, refresh }) {
  const handleDelete = async () => {
    await axios.delete(`${API_URL}/${note._id}`);
    refresh();
  };

  return (
    <div className="bg-white p-4 shadow mb-4 rounded">
      <h2 className="font-bold">{note.title}</h2>
      <p>{note.content}</p>
      <button onClick={handleDelete} className="text-red-600 mt-2 text-sm">
        Delete
      </button>
    </div>
  );
}
