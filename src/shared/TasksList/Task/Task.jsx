import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setName, setNumTask, setSelectedTitle } from "../../../store/store";
import { Menu } from '../../Menu/Menu';
import './task.css';

export function Task({task}) {
  const [taskTitle, setTaskTitle] = useState(`${task.title}`);
  const dispatch = useDispatch();
 
  function changeTitle(e) {
    if (e.target.tagName == 'INPUT') {
      dispatch(setNumTask(parseInt(e.target.dataset.id)));
      dispatch(setSelectedTitle(e.target.value))
    } else {
      dispatch(setSelectedTitle(e.target.children[0].value))
      dispatch(setNumTask(parseInt(e.target.parentElement.dataset.id)));
    }
    dispatch(setName(true));
  }

  function setWidthFocus(e) {
    document.activeElement.style.width = ((e.target.value.length + 1) * 6) + 'px'
  }  

  function setWidthActive(e) {
    document.activeElement.style.width = ((e.target.value.length + 1) * 8 - (e.target.value.length + 1)) + 'px';
  }

  return (
    <tr className={`taskItem ${task.quantity == 0
                                ? 'crossed' 
                                : ''
                              }
                  `}  
        data-id={`${task.id}`}
    >
      <td> <span className="quantity">{task.quantity}</span></td>
      <td className="taskItem_title" onClick={(e) => {changeTitle(e)}}>
        <input className="taskItem_input" 
          maxLength="41"
          data-id={`${task.id}`} 
          value={taskTitle} 
          onFocus={(e) => {setWidthFocus(e)}}
          onChange={(e) => {
              setTaskTitle(e.target.value);
              setWidthActive(e)
            }
          } 
          onBlur={(e) => {
              let index = parseInt(e.target.dataset.id);
              dispatch({
                type: 'UPDATE_TITLE', 
                id: index, 
                title: e.target.value, 
              });
              changeTitle(e);
              e.target.setAttribute('disabled', 'disabled');
            }
          } disabled />  
      </td>
      <td>
        <Menu/>
      </td>
    </tr>
  )
}