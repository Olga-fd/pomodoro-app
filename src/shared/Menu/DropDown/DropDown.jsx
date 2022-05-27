import React, {useState, useEffect}  from 'react';
import { useModal } from '../../../hooks/useModal';
import {DarkBack} from '../../TasksList/Task/DeleteTask/DarkBack/DarkBack';
import './dropdown.css';

const NOOP = () => {};

export function DropDown({button, children, isOpen, onOpen = NOOP, onClose = NOOP}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(() => isDropdownOpen ? onOpen() : onClose(), [isDropdownOpen]);
  
  let isModalOpened;
  if (localStorage.getItem('isModalOpened') !== undefined) {
    isModalOpened = JSON.parse(localStorage.getItem('isModalOpened'))
  }
  
  const handleOpen = () => {
    if (isDropdownOpen === undefined) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }
  
  return (
    <div className="container">
      <div onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen && (
        <div className="listContainer">
          <div className="list" onClick={() => setIsDropdownOpen(false)}>
            {children}
          </div>
        </div>
      )}
      
      {isModalOpened && (
        document.querySelector('#modal_root').classList.add('modal'),
        <DarkBack/>
      )}
    </div>
  );
}

