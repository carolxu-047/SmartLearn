import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import { getDefaultCategories, createNote } from './utils/notesService';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [categories, setCategories] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => {
    // Initialize with default categories
    setCategories(getDefaultCategories());
  }, []);

  const handleCreateNote = () => {
    const newNote = createNote();
    setActiveNote(newNote);
    setCurrentPage('editor');
  };

  const handleSaveNote = (updatedNote) => {
    setCategories(prev => {
      // Find or create category
      let category = prev.find(c => c.color === updatedNote.color);
      if (!category) {
        category = {
          id: Date.now().toString(),
          name: updatedNote.title,
          color: updatedNote.color,
          notes: []
        };
        prev = [...prev, category];
      }

      // Update or add note
      const noteIndex = category.notes.findIndex(n => n.id === updatedNote.id);
      if (noteIndex >= 0) {
        category.notes[noteIndex] = updatedNote;
      } else {
        category.notes.push(updatedNote);
      }

      return [...prev];
    });
    setCurrentPage('home');
  };

  return (
    <div className="App">
      {currentPage === 'home' ? (
        <HomePage 
          categories={categories}
          onNavigate={handleCreateNote}
          onNoteSelect={(note) => {
            setActiveNote(note);
            setCurrentPage('editor');
          }}
        />
      ) : (
        <EditorPage 
          note={activeNote}
          onNavigate={() => setCurrentPage('home')}
          onSave={handleSaveNote}
        />
      )}
    </div>
  );
}

export default App;
