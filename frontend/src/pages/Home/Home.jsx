import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Editor from '../../components/Editor/Editor';
import axios from 'axios';
import './Home.css';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState({});
  const [editorStats, setEditorStats] = useState({ wordCount: 0, lineCount: 0, charCount: 0 });

  useEffect(() => {
    fetchFoldersAndNotes();
  }, []);

  const fetchFoldersAndNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found in localStorage');
        return;
      }

      const config = {
        headers: {
          'auth-token': token, 
        },
      };

      const folderRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/folders/fetch`, config);
      setFolders(folderRes.data);

      const notesMap = {};
      for (const folder of folderRes.data) {
        const notesRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/notes/folder/${folder._id}`, config);
        notesMap[folder._id] = notesRes.data;
      }
      setNotes(notesMap);
    } catch (err) {
      console.error('Error fetching folders or notes:', err);
    }
  };

  const updateNoteContent = (id, newContent) => {
    setNotes((prevNotes) => {
      const updatedNotes = { ...prevNotes };
      for (const folderId in updatedNotes) {
        updatedNotes[folderId] = updatedNotes[folderId].map((note) =>
          note._id === id ? { ...note, content: newContent } : note
        );
      }
      return updatedNotes;
    });

    if (selectedNote?._id === id) {
      setSelectedNote((prev) => ({ ...prev, content: newContent }));
    }
  };

  return (
    <div className="home-container">
      <Sidebar
        folders={folders}
        notes={notes}
        fetchFoldersAndNotes={fetchFoldersAndNotes}
        onNoteSelect={setSelectedNote}
      />
      <Editor
        selectedNote={selectedNote}
        selectedFolder={folders.find(f => f._id === selectedNote?.folderId)}
        updateNoteContent={updateNoteContent}
        setEditorStats={setEditorStats}
      />
      <Footer
        wordCount={editorStats.wordCount}
        lineCount={editorStats.lineCount}
        charCount={editorStats.charCount}
      />
    </div>
  );
};

export default Home;
