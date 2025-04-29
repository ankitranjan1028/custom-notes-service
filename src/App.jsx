import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AddNote from './components/AddNote';
import NotesList from './components/NotesList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('add');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handle the event when a new note is added
  const handleNoteAdded = () => {
    // If we're on the add tab, switch to view tab after adding
    setActiveTab('view');
    // Increment the refresh trigger to force NotesList to reload
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {activeTab === 'add' ? (
          <AddNote onNoteAdded={handleNoteAdded} />
        ) : (
          <NotesList refreshTrigger={refreshTrigger} />
        )}
      </main>
      
      <footer className="footer">
        <p>© {new Date().getFullYear()} NoteKeeper App - Made with React</p>
      </footer>
    </div>
  );
}

export default App;