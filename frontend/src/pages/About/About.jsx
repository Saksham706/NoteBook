import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="about-card">
        <h1>📝 About MyNotebook</h1>
        <p>
          <strong>MyNotebook</strong> is a sleek and intuitive note-taking application designed to help you stay organized and productive. 
        </p>
        <p>
          Easily create folders, write and save notes in real time, and keep track of word count, lines, and characters with our smart editor.
        </p>
        <p>
          Whether you're a studaent, a developer, or just someone who loves jotting down ideas, MyNotebook is built to simplify your workflow.
        </p>

        <h2> Key Features</h2>
        <ul>
          <li>Create and manage folders</li>
          <li>Write, edit, and auto-save notes</li>
          <li>Track word, character, and line counts</li>
          <li>Modern UI inspired by VS Code</li>
          <li>Responsive design for all devices</li>
        </ul>

        <p className="footer-note">Thanks for using MyNotebook! ❤️</p>
      </div>
    </div>
  );
};

export default About;
