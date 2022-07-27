import React from 'react';
import { CrossIcon } from '../../../Icons/CrossIcon';
import { useDispatch } from "react-redux";
import { updateStatusModal, deleteTask } from '../../../../store/store';
import './deletetask.css';

export function DeleteTask() {
  const dispatch = useDispatch();
  const node = document.querySelector('#modal_root');
  if (!node) return null;
 
  function closeModal() {
    dispatch(updateStatusModal(false));
    node.classList.remove('modal');
  }

  function deleteRow() {
    let index = JSON.parse(localStorage.index);
    dispatch(deleteTask(index));     
  }

  return (
    <div className="del">
      <p className="question">Удалить задачу?</p>
      <button className="closeBtn" onClick={() => {closeModal()}}>
        <CrossIcon/>
      </button>

      <button className="delBtn" onClick={() => {
          closeModal();
          deleteRow();
        }
      }>
        Удалить
      </button>

      <button className="cancelBtn" onClick={() => {closeModal()}}>Отмена</button>
    </div>    
  );
}