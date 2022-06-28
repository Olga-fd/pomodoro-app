import React, {useEffect, useState } from "react";
import { useSelector } from "react-redux";

export function useTimeForTimer() {
  const [minTimer, setMinTimer] = useState('25:00');
  const week = useSelector(state => state.selectedWeek);
  const currentDay = useSelector(state => state.selectedDay);
  const data = useSelector(state => state.statData);  
  
  function addZero (num) {
    if (num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  };

  useEffect(() => {
    let hour, minutes;
    if (data.length !== 0) {
      const length = data[week][currentDay].time;
      if (length > 0) {
        hour = Math.floor(length / 60);
        minutes = length - hour * 60;
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
  }, [data])

  return [minTimer];
}