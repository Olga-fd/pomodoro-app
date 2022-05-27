import React, {useEffect, useState} from 'react';
import { CrossIcon } from '../../../Icons/CrossIcon';
import { useTime } from '../../../../hooks/useTime';
import './deletetask.css';

export function DeleteTask() {
  let arr = JSON.parse( localStorage.toDoList );
  const [tr, setTr] = useState(document.querySelectorAll('tr'));
  useEffect(() => {setTr(document.querySelectorAll('tr'))}, [arr.length]);
  const [hours] = useTime();
  
  const node = document.querySelector('#modal_root');
  if (!node) return null;
    
  function changeId(count = 1) {
    arr.map((item) => {
      item.id = count++;
    })
  }

  function closeModal() {
    localStorage.setItem('isModalOpened', false);
    document.querySelector('#modal_root').classList.remove('modal');
    document.querySelector('.backColor').remove();
  }

  function deleteRow() {
    let indexLS = JSON.parse(localStorage.index);
    arr.splice(indexLS, 1);
    changeId();
    localStorage.setItem('toDoList', JSON.stringify(arr));
    localStorage.removeItem('index');
    
    tr[indexLS].remove();
    document.querySelector('.hours').textContent = hours;
    closeModal();        
    changeDataId()
  }

  function changeDataId() {
    const rows = document.querySelectorAll('tr');
    rows.forEach((row, index) => {
    row.setAttribute("data-id", `${index + 1}`);
    })
  }

  return (
    <div className="del">
      <p className="question">Удалить задачу?</p>
      <button className="closeBtn" onClick={() => {
        closeModal()
      }}>
        <CrossIcon/>
      </button>

      <button className="delBtn" onClick={() => {
          deleteRow();
        }
      }>
        Удалить
      </button>

      <button className="cancelBtn">Отмена</button>
    </div>    
  );
}