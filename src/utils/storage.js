// storage.js - Utility for handling localStorage operations
// Using 'notes-app-data' as the key to avoid potential collisions with other apps

const STORAGE_KEY = 'notes-app-data';

// Get all notes from localStorage
export const getNotes = () => {
  try {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    throw new Error('Failed to load notes');
  }
};

// Save all notes to localStorage
export const saveNotes = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error('Error writing to localStorage:', error);
    throw new Error('Failed to save notes');
  }
};

// Add a new note to localStorage
export const addNote = (note) => {
  try {
    const notes = getNotes();
    // Add timestamp and unique ID to the note
    const newNote = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    notes.push(newNote);
    saveNotes(notes);
    return newNote;
  } catch (error) {
    console.error('Error adding note:', error);
    throw new Error('Failed to add note');
  }
};

// Delete a note from localStorage
export const deleteNote = (noteId) => {
  try {
    const notes = getNotes();
    const filteredNotes = notes.filter(note => note.id !== noteId);
    saveNotes(filteredNotes);
    return true;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw new Error('Failed to delete note');
  }
};