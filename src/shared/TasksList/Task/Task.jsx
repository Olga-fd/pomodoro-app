import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu } from '../../Menu/Menu';
// import { setNumberOfWeek} from '../../../store/store';
import './task.css';

export function Task({task}) {
  const [taskTitle, setTaskTitle] = useState(`${task.title}`);
  const [isTitled, setTitled] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector(state => state.statData);
  const toDoList = useSelector(state => state.toDoList);
  const week = useSelector(state => state.selectedWeek);
  const currentDay = useSelector(state => state.selectedDay);
  const numberOfWeek = useSelector(state => state.numberOfWeek);

  function getTomatoes(e) {
    if (data.length !== 0) {
      if (data[week][currentDay]) {
    dispatch({
      type: 'GET_TOMATO',
      id: week,
      day: currentDay,
      tomato: toDoList[e.target.dataset.id - 1].quantity
    })
      }  
    }
  }
  
  return (
    <tr className={`taskItem ${task.quantity == 0
      ? 'crossed' 
      : ''
  }`}  data-id={`${task.id}`}>
      <td> <span className="quantity">{task.quantity}</span></td>
      <td className="taskItem_title" onClick={(e) => {
        document.querySelector('.timer-header span:first-child').textContent = e.target.closest('.taskItem_input').value;
        document.querySelector('.timer-main span:last-child').textContent = e.target.closest('.taskItem_input').value;
        document.querySelector('.timer-main span:first-child').textContent = `Задача ${e.target.dataset.id} - `
        setTitled(true);
        dispatch({type: 'SET_NAME', position: true});
        localStorage.setItem('numOfTask', JSON.stringify(e.target.dataset.id))
        //getTomatoes(e);
      }}>
        <input className="taskItem_input"
          data-id={`${task.id}`} 
          value={taskTitle} 
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