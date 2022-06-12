import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from '../../Menu/Menu';
import './task.css';

export function Task({task}) {
  const [taskTitle, setTaskTitle] = useState(`${task.title}`);
  const dispatch = useDispatch();
  
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
              let index = parseInt(e.target.dataset.id);
              dispatch({
                type: 'UPDATE_TITLE', 
                id: index, 
                title: e.target.value, 
              });
              e.target.setAttribute('disabled', 'disabled');
            }
          } disabled />  
      </td>
      <td>
        <Menu/>
      </td>
    </tr>
  )}

  //contenteditable="true"