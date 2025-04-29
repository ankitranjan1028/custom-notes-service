import React, { useState } from 'react';
import { addNote } from '../utils/storage';
import ErrorBanner from './ErrorBanner';
import './AddNote.css';

const AddNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Why I chose useState + this submit handler: Simple form state management with controlled inputs
  // provides clean validation and submission flow without external form libraries
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    
    // Show saving indicator
    setIsSaving(true);
    
    try {
      // Why show spinner here: Provides immediate feedback that the system is working
      // even if localStorage operations are typically fast
      const newNote = addNote({ title, content });
      
      // Clear form after successful save
      setTitle('');
      setContent('');
      
      // Notify parent component about the new note
      if (onNoteAdded) {
        onNoteAdded(newNote);
      }
    } catch (err) {
      // Handle storage errors
      setError(err.message || 'Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-note-container">
      {error && <ErrorBanner message={error} onClose={() => setError(null)} />}
      
      <h2>Add New Note</h2>
      
      <form className="note-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title"
            disabled={isSaving}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            rows={6}
            disabled={isSaving}
          />
        </div>
        
        <button 
          type="submit" 
          className="save-button"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Note'}
        </button>
      </form>
    </div>
  );
};

export default AddNote;