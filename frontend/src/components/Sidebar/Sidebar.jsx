import React from 'react';
import axios from 'axios';
import './Sidebar.css';

const Sidebar = ({ folders, notes, onNoteSelect, fetchFoldersAndNotes }) => {
  const token = localStorage.getItem("token");
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      "Content-Type": "application/json",
      "auth-token": token
    }
  });

  // Add Folder
  const addFolder = async () => {
    const name = prompt('Enter folder name:');
    if (name?.trim()) {
      try {
        console.log('Sending request to add folder...');
        const response = await api.post('/api/folders/create', { name });
        console.log('Folder added:', response.data);
        fetchFoldersAndNotes(); 
      } catch (error) {
        console.error('Error adding folder:', error);
        alert(error.response?.data?.message || 'Error adding folder.');
      }
    }
  };

  // Delete Folder
  const deleteFolder = async (id) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      try {
        console.log('Sending request to delete folder...');
        const response = await api.delete(`/api/folders/delete/${id}`);
        console.log('Folder deleted:', response.data);
        fetchFoldersAndNotes(); 
      } catch (error) {
        console.error('Error deleting folder:', error);
        alert('Could not delete folder.');
      }
    }
  };

  // Add Note
  const addNote = async (folderId) => {
    const name = prompt('Enter note name:');
    if (name?.trim()) {
      try {
        console.log('Sending request to add note...');
        const response = await api.post('/api/notes/create', { folderId, name });
        console.log('Note added:', response.data);
        fetchFoldersAndNotes(); 
      } catch (error) {
        console.error('Error adding note:', error);
        alert('Could not add note.');
      }
    }
  };

  // Delete Note
  const deleteNote = async (noteId) => {
    if (window.confirm("Delete this note?")) {
      try {
        console.log('Sending request to delete note...');
        const response = await api.delete(`/api/notes/${noteId}`);
        console.log('Note deleted:', response.data);
        fetchFoldersAndNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Could not delete note.');
      }
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <button onClick={addFolder}>+ Folder</button>
      </div>
      <div className="sidebar-content">
        {folders?.map((folder) => (
          <div key={folder._id} className="folder">
            <div className="folder-header">
              <span>📁 {folder.name}</span>
              <div className="folder-actions">
                <button onClick={() => addNote(folder._id)}>+</button>
                <button onClick={() => deleteFolder(folder._id)}>
                  <i className="bi bi-trash3"></i>
                </button>
              </div>
            </div>
            <ul>
              {(notes[folder._id] || []).map((note) => (
                <li key={note._id} onClick={() => onNoteSelect(note)}>
                  📝 {note.name}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note._id);
                    }}
                  >
                    <i className="bi bi-x"></i>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
