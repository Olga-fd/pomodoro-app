import React, {useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Добавляем нули в таймере при одиночном "формате"
export function addZero (num) {
  if (num <= 9) {
    return '0' + num;
  } else {
    return num;
  }
};

export function useTimeForTimer() {
  const [minTimer, setMinTimer] = useState('25:00');
  const toDoList = useSelector(state => state.toDoList); 
  const numOfTask = useSelector(state => state.numOfTask); 
  const indexTask = useSelector(state => state.indexTask);
  const countClick = useSelector(state => state.countClick);
  const isTitled = useSelector(state => state.isTitled); 

  useEffect(() => {
    let hour, minutes; 
    if (toDoList.length !== 0 && numOfTask !== undefined && isTitled) {
      if (indexTask !== undefined ) {
        let array = toDoList[indexTask].time;
        let  quan = toDoList[indexTask].quantity;
        if (quan !== 0) {
          if (array.length > 0) {
            hour = Math.floor(array[quan - 1] * 60 / 3600);
            minutes = Math.floor((array[quan - 1] * 60 - hour * 3600) / 60);
            if (minutes > 0) {
              if (hour >= 1) {
                setMinTimer(`${addZero(hour)}:${addZero(minutes)}`)
              } else {
                setMinTimer(`${addZero(minutes)}:00`)
              }
            } else if (hour > 0 && minutes == 0) {
              setMinTimer(`${addZero(hour)}:00`)
            }
          }
        } else {
          setMinTimer('25:00')
        } 
      }
    }
  }, [indexTask, countClick, isTitled])

  return [minTimer];
}