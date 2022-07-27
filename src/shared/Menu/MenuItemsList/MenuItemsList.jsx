import React from 'react';
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
  }

  return (
    <ul className="menuItemsList">
      <li className="menuItem" onClick={(e) => {
        let array;
        getIndex(e);
        if (Array.isArray(toDoList[indexLS].time)) {
          array = toDoList[indexLS].time;
          array.push(25);
        } else {
          array = [toDoList[indexLS].time];
          array.push(25);
        }
        
        dispatch({
          type: 'UPDATE_TASK', 
          id: index, 
          quantity: toDoList[indexLS].quantity + 1, 
          time: array,
        })
      }}>
        <PlusIcon/>
        <span>Увеличить</span>
      </li>
      
      <li className="menuItem" onClick={(e) => {
        getIndex(e);
        let array;
        if (Array.isArray(toDoList[indexLS].time)) {
          array = toDoList[indexLS].time;
          array.pop();
        } else { return }

        if (toDoList[indexLS].quantity > 1) {
          dispatch({
            type: 'UPDATE_TASK', 
            id: index, 
            quantity: toDoList[indexLS].quantity - 1, 
            time: array,
          });
        } else if (toDoList[indexLS].quantity == 1) {
          dispatch(updateStatusModal(true));
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