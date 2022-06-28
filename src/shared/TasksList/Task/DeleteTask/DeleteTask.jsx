import React, {useEffect, useState} from 'react';
import { CrossIcon } from '../../../Icons/CrossIcon';
import { useDispatch, useSelector } from "react-redux";
import { updateStatusModal, deleteTask } from '../../../../store/store';
import './deletetask.css';

export function DeleteTask() {
  const toDoList = useSelector(state => state.toDoList);
  const dispatch = useDispatch();

  const node = document.querySelector('#modal_root');
  if (!node) return null;
    
  function changeId() {
    for (let i = 0; i < toDoList.length; i++) {
      toDoList[i].id = i + 1;
    }
    dispatch({
      type: 'CHANGE_ID',
      toDoList: toDoList
    })
  }
  function changeDataId() {
    const rows = document.querySelectorAll('tr');
    rows.forEach((row, index) => {
      row.setAttribute("data-id", `${index + 1}`);
    })
  }

  function closeModal() {
    dispatch(updateStatusModal(false));
  }

  function deleteRow() {
    let index = JSON.parse(localStorage.index);
    dispatch(deleteTask(index));
    closeModal();     
    setTimeout(() => {
      changeDataId();
    }, 3000)   
  }

  useEffect(() => {
    changeId();
  }, [toDoList.length])

  return (
    <div className="del">
      <p className="question">Удалить задачу?</p>
      <button className="closeBtn" onClick={() => {closeModal()}}>
        <CrossIcon/>
      </button>

      <button className="delBtn" onClick={() => {
          deleteRow();
        }
      }>
        Удалить
      </button>

      <button className="cancelBtn" onClick={() => {closeModal()}}>Отмена</button>
    </div>    
  );
}