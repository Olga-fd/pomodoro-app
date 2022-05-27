import React from 'react';
import ReactDOM from 'react-dom';
import { DeleteTask } from '../DeleteTask';
import './darkback.css';

export function DarkBack() {

  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal ((
    <div className="backColor">
      <DeleteTask/>
    </div>
  ), node);
}