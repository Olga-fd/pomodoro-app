import React, {useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useTime() {
  const [hours, setHours] = useState('');
  const toDoList = useSelector(state => state.toDoList);
 
  useEffect(() => {
    let hour, minutes;
    const length = toDoList.map(item => item.time.reduce((sum, current) => sum + current, 0)).reduce((sum, current) => sum + current, 0);
    if (length > 0) {
      hour = Math.floor(length / 60);
      minutes = length - hour * 60;
      if (minutes > 0) {
          if (hour >= 5) {
          setHours(`${hour} часов ${minutes} минут`)
        } else if (hour >= 2) {
          setHours(`${hour} часа ${minutes} минут`)
        } else if (hour == 1 ) {
          setHours(`${hour} час ${minutes} минут`)
        } else {
          setHours(`${minutes} минут`)
        }
      }
    } else {
      setHours('')
    }
  }, [toDoList])

  return [hours];
}