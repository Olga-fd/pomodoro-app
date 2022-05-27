import React, {useEffect, useState } from "react";

export function useTime() {
  let data;
  const [hours, setHours] = useState('');

  if (localStorage.getItem('toDoList') !== null) {
    data = JSON.parse( localStorage.toDoList );
  } else {
    data = [];
  }

  useEffect(() => {
    let hour, minutes;
    const length = data.map(item => item.time).reduce((sum, current) => sum + current, 0);
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
    }
  }, [data])

  return [hours];
}