import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setIsGotten } from '../../../store/store';

export function Gotten() {
  const dispatch = useDispatch();
  const toDoList = useSelector(state => state.toDoList);
  const indexTask = useSelector(state => state.indexTask);
  const node = document.querySelector('#modal_root');
  if (!node) return null;
  
  function close() {
    dispatch(setIsGotten(false));
    node.classList.remove('modal');
  }

  return ReactDOM.createPortal ((
    <div className='div'>
      <h3 className='title'>
        {toDoList.length == 0 || toDoList[indexTask].quantity == (undefined || 0)
          ? 'Задача выполнена!'
          : 'Вы заработали помидор!'
        }
      </h3>
      <button className='delBtn' onClick={() => close()}>Отлично</button>
    </div>
  ), node);
}