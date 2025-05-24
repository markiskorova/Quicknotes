import { useEffect, useState } from 'react';
import axios from 'axios';
import NoteCard from '../components/NoteCard';

const API_URL = 'http://localhost:5000/api/notes';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const fetchNotes = async () => {
    const res = await axios.get(API_URL);
    setNotes(res.data);
  };

  const handleCreate = async () => {
    if (!newNote.title) return;
    await axios.post(API_URL, newNote);
    setNewNote({ title: '', content: '' });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <input
          className="border p-2 w-full mb-2"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Content"
          rows={3}
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Note
        </button>
      </div>
      <div>
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} refresh={fetchNotes} />
        ))}
      </div>
    </div>
  );
}
