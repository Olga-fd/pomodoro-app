import React, {useState, useEffect}  from 'react';
import './dropdown.css';

export function DropDown({button, children}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  function handleOpen() {
    setIsDropdownOpen(!isDropdownOpen)
  }
  
  return (
    <div className="container">
      <div onClick={() => handleOpen()}>
        {button}
      </div>
      {isDropdownOpen && (
        <div className="listContainer">
          <div className="list" onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

