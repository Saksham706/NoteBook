import React from 'react';
import './Footer.css';

const Footer = ({ wordCount, lineCount ,charCount }) => {
  return (
    <div className="footer">
      Words: {wordCount} | Lines: {lineCount} | characters: {charCount}
    </div>
  );
};

export default Footer;
