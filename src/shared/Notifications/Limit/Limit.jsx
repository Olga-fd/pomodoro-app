import React from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { setLimit } from '../../../store/store';

export function Limit() {
  const dispatch = useDispatch();
  const node = document.querySelector('#modal_root');
  if (!node) return null;

  function close() {
    dispatch(setLimit(false))
    node.classList.remove('modal');
  }

  return ReactDOM.createPortal ((
    <div className='div'>
      <h3 className='title'>
        Вы можете прибавить до 10 минут или добавьте количество помидорок   
      </h3>
      <button className='delBtn' onClick={() => close()}>Понятно</button>
    </div>
  ), node);
}