import React, { useState } from "react";
import "./CodeBlockWithCopy.css"; // Import CSS

const CodeBlockWithCopy = ({ code }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    
  };

  return (
    <div
      className="code-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <pre className="code-block">
        <code>{code}</code>
      </pre>
      {isHovered && (
        <button className="copy-button" onClick={handleCopy}>
          Copy
        </button>
      )}
    </div>
  );
};

export default CodeBlockWithCopy;
