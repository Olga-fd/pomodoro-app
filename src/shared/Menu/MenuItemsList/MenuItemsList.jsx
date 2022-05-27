import React, { useState, useEffect } from 'react';
import { PlusIcon, MinusIcon, EditIcon, DeleteIcon} from '../../Icons/Icons';
import { useTime } from '../../../hooks/useTime';
import './menuitemslist.css';
import { DeleteTask } from '../../TasksList/Task/DeleteTask/DeleteTask';
import { useModal } from '../../../hooks/useModal';

export function MenuItemsList() {
  // let [isModalOpened] = useModal();
  const [hours] = useTime();
  let indexLS;
  let arr = JSON.parse( localStorage.toDoList );
  let lengthArr = document.querySelectorAll('tr').length;

  const [storageLength, setStorageLen] = useState(0);

  useEffect(() => {
    setStorageLen(JSON.parse(localStorage.getItem("toDoList")).length);
  }, [lengthArr])

  function getIndex(e) {
    let index = e.target.closest('tr').dataset.id;
    indexLS = arr.findIndex(key => key.id === parseInt(index)); 
  }

  return (
    <ul className="menuItemsList">
      <li className="menuItem" onClick={(e) => {
        getIndex(e);
        arr[indexLS].time = arr[indexLS].time + 25;
        arr[indexLS].quantity = arr[indexLS].quantity + 1;
        localStorage.setItem('toDoList', JSON.stringify(arr));
        document.querySelector('.hours').textContent = hours;
        e.target.closest('tr').firstChild.children[0].textContent = arr[indexLS].quantity;
      }}>
        <PlusIcon/>
        <span>Увеличить</span>
      </li>
      

      <li className="menuItem" onClick={(e) => {
        getIndex(e);
        arr[indexLS].time = arr[indexLS].time - 25;
        arr[indexLS].quantity = arr[indexLS].quantity - 1;
        localStorage.setItem('toDoList', JSON.stringify(arr));
        document.querySelector('.hours').textContent = hours;
        e.target.closest('tr').firstChild.children[0].textContent = arr[indexLS].quantity;
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
        localStorage.setItem('index', indexLS)
        localStorage.setItem('isModalOpened', true)
       
        // arr.splice(indexLS, 1);
        // changeId();
        // localStorage.setItem('toDoList', JSON.stringify(arr));
        // e.target.closest('tr').remove();
        // let tr = document.querySelectorAll('tr');
        // for (let i = 1, j = 0; i = tr.length; i++, j++) {
        //   tr[j].dataset.id = i++;
        // }
        // document.querySelector('.hours').textContent = hours;
        
      }}>
        <DeleteIcon/>
        <span>Удалить</span>
      </li>

    </ul>
  );
}


 //row.firstChild.nextSibling.contentEditable = true;