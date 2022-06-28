import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
//import { useOutsideClick } from '../../hooks/useOutsideClick';
import './notfound.css';

export function NotFound() {
  const [ref] = useRef(null);
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  return ReactDOM.createPortal ((
    <div className='div' ref={ref}>
      <h3 className='title'>Что-то пошло не так...</h3>
    </div>
  ), node);
}