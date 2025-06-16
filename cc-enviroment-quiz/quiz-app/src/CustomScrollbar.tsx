import React, { ReactNode } from 'react';
import './CustomScrollbar.css'; // Import the CSS file for styling

interface CustomScrollbarProps {
  children: ReactNode; // Define the type for children
}

const CustomScrollbar: React.FC<CustomScrollbarProps> = ({ children }) => {
  return (
    <div className="scroll-container">
      {children}
    </div>
  );
};

export default CustomScrollbar;
