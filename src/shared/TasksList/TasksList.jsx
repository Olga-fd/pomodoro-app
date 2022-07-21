import React from "react";
import {Task} from './Task/Task';
import './taskslist.css';

export function TasksList({toDoList}) {
  const taskName = toDoList.map(task => <Task 
      key={task.id}
      task={task}
    />
  )
  
  return (
    <table className="tasksList">
      <tbody>
        {taskName} 
      </tbody>
    </table>
  )
}