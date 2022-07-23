import React, {useEffect} from "react";
import {Task} from './Task/Task';
import { useDispatch, useSelector } from 'react-redux';
import { saveId, setNumberOfWeek, createData, updateDataDay} from "../../store/store";
import './taskslist.css';

export function TasksList({toDoList}) {
  const isGotten = useSelector(state => state.isGotten);
  const dispatch = useDispatch();
  const week = useSelector(state => state.selectedWeek);
  const currentDay = useSelector(state => state.currentDay);
  const data = useSelector(state => state.statData);  
  const numOfTask = useSelector(state => state.numOfTask);
  const numberOfWeek = useSelector(state => state.numberOfWeek);
  const taskName = toDoList.map(task => <Task 
      key={task.id}
      task={task}
    />
  )

  //Меняем в массиве номер недели на число от 0 до 2
  useEffect(() => {
    if (numberOfWeek.length == 1) {
      dispatch(setNumberOfWeek(0))
    } else if (numberOfWeek.length == 2) {
      dispatch(setNumberOfWeek(1))
    } else if (numberOfWeek.length == 3) {
      dispatch(setNumberOfWeek(2))
    }
    localStorage.setItem('weeks', JSON.stringify(numberOfWeek))
  }, [numberOfWeek.length])

  function createDataOfStat(id) {
    if (data[id] == undefined) {
      dispatch(createData(id, currentDay, 0, 0, 0, 0, 0));
    } else if (data[id].id !== week) {
      dispatch(createData(0, currentDay, 0, 0, 0, 0, 0));
    } else if (data[id][currentDay] == undefined) {
      dispatch(updateDataDay(0, currentDay, 0, 0, 0, 0, 0));
    }
  }

  //Создаем объект с данными текущего дня
  useEffect(() => {
    if (toDoList.length !== 0) {
      if (numberOfWeek.length == 0) {
        createDataOfStat(0)
      } else if (numberOfWeek.length == 1) {
        createDataOfStat(0)
      } else if (numberOfWeek.length == 2) {
        if (data[0] == undefined) {
          dispatch(createData(0, currentDay, 0, 0, 0, 0, 0));
        }
        createDataOfStat(1)
      } else if (numberOfWeek.length == 3) {
        if (data[0] == undefined) {
          dispatch(createData(0, currentDay, 0, 0, 0, 0, 0));
        }
        if (data[1] == undefined) {
          dispatch(createData(1, currentDay, 0, 0, 0, 0, 0));
        }
        createDataOfStat(2)
      }
    }
  }, [toDoList.length, numberOfWeek.length]);

  // Вычисляем индекс
  useEffect(() => {
    if (toDoList.length !== 0 && numOfTask !== undefined) {
      let foundIndex = toDoList.findIndex(item => item.id === numOfTask);
      dispatch(saveId(foundIndex))
    }
  }, [numOfTask])

  useEffect(() => {
    if (isGotten == true && data.length !== 0) {
      let timing = data[week][currentDay].time;
      let pause = data[week][currentDay].pause;
      if (timing > 0)
        dispatch({
          type: 'SET_FOCUS',
          id: week,
          day: currentDay,
          focus: Math.floor(timing / (timing + pause / 60) * 100), 
        });
    }
  }, [isGotten])
  
  return (
    <table className="tasksList">
      <tbody>
        {taskName} 
      </tbody>
    </table>
  )
}