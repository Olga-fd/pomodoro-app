import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsFound } from '../../../store/store';

export function NotFound() {
  const dispatch = useDispatch();
  const isFound = useSelector(state => state.isFound);
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  function close() {
    dispatch(setIsFound(false));
    node.classList.remove('modal');
  }

  return ReactDOM.createPortal ((
    <div className='div'>
      <h3 className='title'>
        {isFound
          ? 'Вы не ввели задачу'
          : 'Что-то пошло не так...'
        }
        </h3>
      <button className='delBtn' onClick={() => close()}>Понятно</button>
    </div>
  ), node);
}