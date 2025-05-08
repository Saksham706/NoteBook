import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Editor.css';

function Editor({ selectedNote, selectedFolder, updateNoteContent, setEditorStats }) {
  const [content, setContent] = useState('');
  const debounceRef = useRef(null);
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    if (selectedNote) {
      setContent(selectedNote.content || '');
    }

    setSaveStatus('');
    if (debounceRef.current) clearTimeout(debounceRef.current);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [selectedNote?._id, selectedNote?.content]);

  useEffect(() => {
    const wordCount = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
    const lineCount = content.split('\n').length;
    const charCount = content.length;
    setEditorStats({ wordCount, lineCount, charCount });
  }, [content, setEditorStats]);

  const handleChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    setSaveStatus('Saving...');

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `/api/notes/${selectedNote._id}`,
          { content: newContent },
          {
            headers: {
              'Content-Type': 'application/json',
              'auth-token': token,
            },
          }
        );

        setSaveStatus('Saved');
        setTimeout(() => setSaveStatus(''), 1000);

        if (updateNoteContent) {
          updateNoteContent(response.data._id, response.data.content);
        }
      } catch (error) {
        console.error('Error updating note:', error);
        setSaveStatus('Error saving');
      }
    }, 1000);
  };

  if (!selectedNote) {
    return <div className="editor disabled">Make the folder to write the note.</div>;
  }

  return (
    <div className="editor">
      <div className="editor-header">
        📁 {selectedFolder?.name} {'<'} 📝 <strong>{selectedNote.name}</strong>
      </div>
      <textarea
        placeholder="Write your notes here..."
        value={content}
        onChange={handleChange}
      />
      <div className="save-status">{saveStatus}</div>
    </div>
  );
}

export default Editor;
