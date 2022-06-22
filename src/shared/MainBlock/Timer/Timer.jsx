import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveNumberOfWeek, createData, setNumberOfWeek } from '../../../store/store';
import { Button } from './Button/Button';
import './timer.css';

let timer, timerPause, unit;

export function Timer() {
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isPausePressed, setIsPausePressed] = useState(false);
  const [isStopPressed, setIsStopPressed] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [nameDay, setNameDay] = useState('');
  const display = document.querySelector('.display');
  const week = useSelector(state => state.selectedWeek);
  const currentDay = useSelector(state => state.selectedDay);
  const lightTheme = useSelector(state => state.lightTheme);

  const numberOfWeek = useSelector(state => state.numberOfWeek);
  const toDoList = useSelector(state => state.toDoList);

  let date = new Date();
  let day = date.getDay();
  let firstJan = new Date(date.getFullYear(),0,1);
  let days = 7 - (8 - firstJan.getDay());
  let numberOfDays = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  let result = Math.ceil((day + 1 + numberOfDays + days) / 7);
  
  const data = useSelector(state => state.statData);  
  const store = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    setNameDay(days[day])
  }, [result, day])

  // useEffect(() => {
    
  // }, [])

  useEffect(() => {
    if (numberOfWeek.length == 1) {
      dispatch(setNumberOfWeek(0))
    } else if (numberOfWeek.length == 2) {
      dispatch(setNumberOfWeek(1))
    } else if (numberOfWeek.length == 3) {
      dispatch(setNumberOfWeek(2))
    }
  }, [numberOfWeek.length])

  useEffect(() => {
    const display = document.querySelector('.display');
    let total = display.innerText.split(":");
    //total = parseInt(total[0] * 60) + parseInt(total[1]);
    let minutes = parseInt(total[0]);

    if (isStartPressed && toDoList.length !== 0) {
      if (numberOfWeek.length == 1) {
        if (!data[0]) {
          dispatch(createData(0, nameDay, minutes, 0, 0, 0, 0));

          setTimeout(() => {
            localStorage.setItem('stat', JSON.stringify(data));
          }, 3000)
        }
      } else if (numberOfWeek.length == 2) {
        if (!data[1]) {
          dispatch(createData(1, nameDay, minutes, 0, 0, 0, 0));
        }
        setTimeout(() => {
          localStorage.setItem('stat', JSON.stringify(data));
        }, 3000)
      } else if (numberOfWeek.length == 3) {
        if (!data[2]) {
          dispatch(createData(2, nameDay, minutes, 0, 0, 0, 0));
        }
        setTimeout(() => {
          localStorage.setItem('stat', JSON.stringify(data));
        }, 3000)
      }
    }
  }, [numberOfWeek.length, isStartPressed]);

  useEffect(() => {
    localStorage.setItem('stat', JSON.stringify(data))
  }, [data])

  useEffect(() => {  
    let count = 0;
    if (isPausePressed && !isBreak && data.length !== 0) { 
      dispatch({
        type: 'ADD_STOP',
        id: store.selectedWeek,
        day: store.selectedDay,
        stop: data[store.selectedWeek][store.selectedDay].stops + 1
      });
      timerPause = setInterval(() => {
        count = ++count;
        if (localStorage.count) {
          count = JSON.parse(localStorage.count) + count;
        }
        localStorage.setItem('count', count)
      }, 1000)
    } 
    
    if (!isPausePressed && data.length !== 0) {
      clearInterval(timerPause);
      if (localStorage.count) {
        dispatch({
          type: 'ADD_PAUSE',
          id: store.selectedWeek,
          day: store.selectedDay,
          pause: JSON.parse(localStorage.count),
        });
      }
    }
  }, [isPausePressed, data.length])

  function getTime() {
    const display = document.querySelector('.display');
    const numTask = document.querySelector('.timer-main span:first-child').innerText.split(" ");
    const task = numTask[1];
    let total = display.innerText.split(":");
    //total = parseInt(total[0] * 60) + parseInt(total[1]);
    let min = 0;
    let mu = [];
    let obj = {};
        unit = setInterval(() => {
          let total = display.innerText.split(":");
          min++
          if (total[0] == '00' && total[1] == '00') {
            clearInterval(unit);
            obj[task] = min;
            mu.push(obj)
            console.log(mu);
            localStorage.setItem('unit', JSON.stringify(mu))
          }
        }, 1000);
        
        
        // dispatch({
        //   type: 'ADD_TIME',
        //   id: store.selectedWeek,
        //   day: store.selectedDay,
        //   time: total,
        // })
    
    

  }
 
  function getWeeksForStat() {
    if (numberOfWeek.length == 0) {
      dispatch(saveNumberOfWeek(result));

    } else if (numberOfWeek.length == 1) {
      if (numberOfWeek[0] !== result && numberOfWeek[0] == (result - 1)) {
        dispatch(saveNumberOfWeek(result))
      } else if (numberOfWeek[0] !== result && numberOfWeek[0] == (result - 2)) {
        dispatch(saveNumberOfWeek(result - 1));
        dispatch(saveNumberOfWeek(result))
      } else if (numberOfWeek[0] < (result - 2)) { 
        numberOfWeek.splice(0,1);
        dispatch(saveNumberOfWeek(result))
      } else {return}

    } else if (numberOfWeek.length == 2) {
      if (numberOfWeek[1] !== result && numberOfWeek[1] == (result - 1)) {
        dispatch(saveNumberOfWeek(result))
      } else if (numberOfWeek[1] !== result && numberOfWeek[1] == (result - 2)) {
        numberOfWeek.splice(0,1);
        dispatch(saveNumberOfWeek(result - 1));
        dispatch(saveNumberOfWeek(result))
      } else if (numberOfWeek[1] < (result - 2)) { 
        numberOfWeek.splice(0,2);
        dispatch(saveNumberOfWeek(result))
      }
    } else { return }
  }
  
  function addZero (num) {
    if (num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  };

  function reset() {
    document.querySelector('.display').textContent = '25:00';
  }

  function stopTimer() {
    setIsStopPressed(true);
    setIsStartPressed(false);
    setIsPausePressed(false);
    setBreak(false);
    clearInterval(timer);
    reset();
  }

  let i = 1, j = 1;

  function setTimer(timeMinute = 10) {
    let numOfTask;
    if (localStorage.task) {
      numOfTask = parseInt(JSON.parse(localStorage.task))
    }
    const display = document.querySelector('.display');
    localStorage.setItem('time', timeMinute);

        timer = setInterval(() => {
          let seconds = timeMinute%60;
          let minutes = timeMinute/60%60;
          if (timeMinute < 0) {
            clearInterval(timer);
            setIsStartPressed(false);
            setIsPausePressed(false);
            setIsStopPressed(false);
            setBreak(true);
            setTimer(3);
            dispatch({
              type: 'MINUS_TOMATO',
              id: numOfTask,
              quantity: toDoList[numOfTask - 1].quantity - 1,
              time: toDoList[numOfTask - 1].time - 25,
            });
            dispatch({
              type: 'DEL_TOMATO',
              id: week,
              day: currentDay,
              tomato: toDoList[numOfTask - 1].quantity
            })
            
            setTimeout(() => {
              stopTimer();
            }, 3000)
          } else {
            display.innerHTML = `${addZero(Math.trunc(minutes))}:${addZero(seconds)}`;
          }
          --timeMinute;
        }, 1000)  
      } 


  return (
    <div className="timer">
      <p className={`timer-header ${isStartPressed
                      ? "started"
                      : isBreak
                        ? "break"
                        : isPausePressed
                          ? "started"
                          : lightTheme 
                            ? ""
                            : "header--dark"
                          }
      `}>
        <span>Задача</span>
        <span>Помидор 1</span>
      </p>
      <div className={`timer-center ${lightTheme ? "" : "timer--dark"}`}>
        <div className="countdown">
          <p className={`display ${(isBreak && isPausePressed)
                          ? "display"
                          : isBreak
                            ? "break--text display"
                            : isStartPressed
                              ? "timer--red display"
                              : ""}
          `}>
            {isStopPressed
              ? "25:00"
              : isBreak ? "05:00" : "25:00"
            }
          </p>
          <button className="btn-plus"  onClick={() => {
            let btn = document.querySelector('.btn-plus');
            let total = display.innerText.split(":");
            if (parseInt(total[0]) < 59) {
              display.textContent = `${parseInt(total[0]) + 1}` + ':00';
              btn.removeAttribute('disabled', 'disabled')
            } else if (parseInt(total[0]) == 59) {
              btn.setAttribute('disabled', 'disabled')
            }
          }}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
            </svg>
          </button>
        </div>
        <p className="timer-main">
          <span>Задача 1 - </span>
          <span>Неизвестно</span>
        </p>
        <div className="timer-btns">

          {!isStartPressed && !isPausePressed && !isBreak && (
            <Button className="btn--green"
                    title='Старт'
                    onClick={() => {
                      let total = display.innerText.split(":");
                      total = parseInt(total[0] * 60) + parseInt(total[1]);
                      //setTimer(total); оставить
                      setTimer();
                      setIsStartPressed(true);
                      getWeeksForStat();
                      getTime()
                    }}
            />
          )}

          {isStartPressed && (
            <Button className="btn--green"
                    title='Пауза'
                    onClick={() => {
                      setIsPausePressed(true);
                      setIsStartPressed(false);
                      clearInterval(timer);
                    }}
            />
          )}

          {isBreak && !isPausePressed && (
            <Button className="btn--green"
                    title='Пауза'
                    onClick={() => {
                      setIsPausePressed(true);
                      clearInterval(timer);
                    }}
            />
          )}

          {!isPausePressed && !isBreak && (
            <Button className="btn-red--border"
                    title='Стоп'
                    onClick={() => {stopTimer()}}
            />
          )}

          {isPausePressed && !isStartPressed && (
            <Button className="btn--green"
                    title='Продолжить'
                    onClick={() => {
                      let total = display.innerText.split(":");
                      total = parseInt(total[0] * 60) + parseInt(total[1]);
                      {!isBreak && (
                        setIsStartPressed(true)
                      )}
                      setIsPausePressed(false);
                      setTimer(total);
                    }}
            />
          )}

          {isBreak &&(
            <Button className="btn-red--border"
                    title='Пропустить'
                    onClick={() => {stopTimer()}}
            />
          )}

          {isPausePressed && !isBreak && (
            <Button className="btn--red"
                    title='Сделано'
                    onClick={() => {stopTimer()}}
            />
          )}
        </div>
      </div>
    </div>
  );
}
