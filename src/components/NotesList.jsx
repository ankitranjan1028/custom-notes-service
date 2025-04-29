import React, { useState, useEffect } from 'react';
import { getNotes, deleteNote } from '../utils/storage';
import ErrorBanner from './ErrorBanner';
import './NotesList.css';

const NotesList = ({ refreshTrigger }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Why useEffect to sync storage → state: Ensures component stays in sync with localStorage
  // data and re-renders whenever refreshTrigger changes (i.e., after a new note is added)
  useEffect(() => {
    const loadNotes = () => {
      setLoading(true);
      try {
        const storedNotes = getNotes();
        // Sort notes by creation date (newest first)
        storedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setNotes(storedNotes);
      } catch (err) {
        setError(err.message || 'Failed to load notes');
      } finally {
        setLoading(false);
      }
    };

    loadNotes();
  }, [refreshTrigger]);

  const handleDelete = (id) => {
    try {
      deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete note');
    }
  };

  // Format date to a readable string
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get a snippet of the content (first 100 characters)
  const getContentSnippet = (content) => {
    if (!content) return '';
    return content.length > 100 ? `${content.substring(0, 100)}...` : content;
  };

  if (loading) {
    return <div className="notes-loading">Loading notes...</div>;
  }

  return (
    <div className="notes-list-container">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}
      
      <h2>Your Notes</h2>
      
      {notes.length === 0 ? (
        <div className="no-notes">
          <p>You don't have any notes yet. Create your first note!</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(note => (
            <div className="note-card" key={note.id}>
              <h3 className="note-title">{note.title}</h3>
              <p className="note-date">{formatDate(note.createdAt)}</p>
              <p className="note-content">{getContentSnippet(note.content)}</p>
              <button 
                className="delete-button"
                onClick={() => handleDelete(note.id)}
                aria-label="Delete note"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;