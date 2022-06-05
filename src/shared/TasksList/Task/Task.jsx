import React, { useEffect, useState } from "react";
import { Menu } from '../../Menu/Menu';
import './task.css';

export function Task({task}) {
  const [taskTitle, setTaskTitle] = useState(`${task.title}`);
   // const [isDisabled, setIsDisabled] = useState(false);

  // const handleClick = () => {
  //   setIsDisabled(!isDisabled)
  // };

  useEffect(() => {
    setTaskTitle()
  }, [taskTitle])

  return (
    <tr className="taskItem" data-id={`${task.id}`}>
      <td> <span className="quantity">{task.quantity}</span></td>
      <td className="taskItem_title" onClick={(e) => {
        document.querySelector('.timer-header span:first-child').textContent = e.target.closest('.taskItem_input').value;
        document.querySelector('.timer-main span:last-child').textContent = e.target.closest('.taskItem_input').value;
        document.querySelector('.timer-main span:first-child').textContent = `Задача ${e.target.dataset.id} - `
      }}>
        <input className="taskItem_input" data-id={`${task.id}`} value={taskTitle} 
            onChange={(e) => {
              setTaskTitle(e.target.value);
              //e.target.style.width = e.target.offsetWidth + 'px'
            }
          } 
          onBlur={(e) => {
              let index = e.target.dataset.id;
              let arr = JSON.parse(localStorage.getItem("toDoList"));
              let indexLS = arr.findIndex(key => key.id === parseInt(index)); 
              arr[indexLS].title = e.target.value;
              localStorage.setItem('toDoList', JSON.stringify(arr));
            }
          } disabled />  
      </td>
      <td>
        <Menu/>
      </td>
    </tr>
  )}

  //contenteditable="true"