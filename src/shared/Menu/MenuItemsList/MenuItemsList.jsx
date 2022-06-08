import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon, EditIcon, DeleteIcon} from '../../Icons/Icons';
import './menuitemslist.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatusModal } from '../../../store/store';

export function MenuItemsList() {
  const dispatch = useDispatch();
  const toDoList = useSelector(state => state.toDoList);
  let index, indexLS;
 
  function getIndex(e) {
    index = parseInt(e.target.closest('tr').dataset.id);
    indexLS = toDoList.findIndex(key => key.id === index); 
    localStorage.setItem('index', index);
    localStorage.setItem('indexLS', indexLS)
  }

  return (
    <ul className="menuItemsList">
      <li className="menuItem" onClick={(e) => {
        getIndex(e);
        dispatch({
          type: 'UPDATE_TASK', 
          id: index, 
          quantity: toDoList[indexLS].quantity + 1, 
          time: toDoList[indexLS].time + 25,
        })
      }}>
        <PlusIcon/>
        <span>Увеличить</span>
      </li>
      
      <li className="menuItem" onClick={(e) => {
        getIndex(e);
        if (toDoList[indexLS].quantity > 1) {
          dispatch({
            type: 'UPDATE_TASK', 
            id: index, 
            quantity: toDoList[indexLS].quantity - 1, 
            time: toDoList[indexLS].time - 25,
          })
        } else {
          dispatch(updateStatusModal(false));
        }
      }}>
        <MinusIcon/>
        <span>Уменьшить</span>
      </li>
 
      <li className="menuItem" onClick={(e) => {
        let row = e.target.closest('tr');
        let inputTask = row.firstChild.nextSibling.firstChild;
        inputTask.removeAttribute('disabled', 'disabled');
        inputTask.focus();    
      }}>
        <EditIcon/>
        <span>Редактировать</span>
      </li>

      <li className="menuItem" onClick={(e) => {
        getIndex(e);
        dispatch(updateStatusModal(true));
      }}>
        <DeleteIcon/>
        <span>Удалить</span>
      </li>
    </ul>
  );
}


 //row.firstChild.nextSibling.contentEditable = true;