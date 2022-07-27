import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useTimeForTimer} from '../../../hooks/useTimeForTimer'
import { deleteTask, setLimit, setIsGotten, setName, saveCountClick } from '../../../store/store';
import { Button } from './Button/Button';
import { addZero } from '../../../utilites/utilitiesForTimer';
import { soundClick, getUnfinishedTime } from '../../../utilites/utilitiesForTimer';
import './timer.css';

let timer, timerBreak, timerPause,
  unit = 0,
  click = 0;

export function Timer() {
  const display = document.querySelector('.display');
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isPausePressed, setIsPausePressed] = useState(false);
  const [isStopPressed, setIsStopPressed] = useState(true);
  const [isBreak, setBreak] = useState(false);
  const [pomodoro, setPomodoro] = useState('Помидор 1');

  const week = useSelector(state => state.selectedWeek);
  const currentDay = useSelector(state => state.currentDay);
  const lightTheme = useSelector(state => state.lightTheme);
  const toDoList = useSelector(state => state.toDoList);
  const data = useSelector(state => state.statData);  
  const isTitled = useSelector(state => state.isTitled); 
  const numOfTask = useSelector(state => state.numOfTask);
  const indexTask = useSelector(state => state.indexTask);
  const selectedTitle = useSelector(state => state.selectedTitle);

  const dispatch = useDispatch();
  const [minTimer] = useTimeForTimer();
  const crossed = document.querySelector('.crossed');
  let timeMin;

  //Считаем количество остановок
  useEffect(() => {  
    let count = 0;
    if (isPausePressed && !isBreak && data.length !== 0) { 
      dispatch({
        type: 'ADD_STOP',
        id: week,
        day: currentDay,
        stop: data[week][currentDay].stops + 1
      });
      
      timerPause = setInterval(() => {
        count = ++count;
        sessionStorage.setItem('count', count)
      }, 1000)
    } 
  }, [isPausePressed, data.length])
  
  //Удаляем задачу из списка и сбрасываем название задачи НЕ РАБОТАЕТ
  useEffect(() => {
    if (crossed) {
      dispatch(setName(false));   
      setTimeout(() => { 
        try {
          dispatch(deleteTask(numOfTask));
        } catch(err) {
          console.error(err);
        } 
      }, 3000)
    }
  }, [crossed]);

  //Сохранение помидорки в хранилище
  function saveTomatoes() {
    let array = toDoList[indexTask].time;
    array.pop();
    ++unit;
    sessionStorage.setItem('unit', unit)
   
    dispatch({
      type: 'GET_TOMATO',
      id: week,
      day: currentDay,
      tomato: data[week][currentDay].tomato + 1, 
      time: data[week][currentDay].time + JSON.parse(sessionStorage.timeTomato)
    });

    dispatch({
      type: 'MINUS_QUANTITY',
      id: numOfTask,
      quantity: toDoList[indexTask].quantity - 1,
      time: array,
    });
    dispatch(setIsGotten(true));
  }

  //При нажатии на СДЕЛАНО
  function doIsDone() {
    stopTimer();
    dispatch(deleteTask(numOfTask));
    dispatch(setName(false));
    if (sessionStorage.count) {
      dispatch({
        type: 'ADD_PAUSE',
        id: week,
        day: currentDay,
        pause: data[week][currentDay].pause + JSON.parse(sessionStorage.count),
      });
    }
    dispatch({
      type: 'GET_TOMATO',
      id: week,
      day: currentDay,
      tomato: data[week][currentDay].tomato + 1, 
      time: data[week][currentDay].time + Math.floor(JSON.parse(sessionStorage.unfinished_time / 60))
    });
  }

  //При нажатии на ПРОДОЛЖИТЬ
  function continueCountDown() {
    let total = display.innerText.split(":");
    total = parseInt(total[0] * 60) + parseInt(total[1]);
    {!isBreak && (
      setIsStartPressed(true)
    )}
    setIsPausePressed(false);
    clearInterval(timerPause);
    if (sessionStorage.count) {
      dispatch({
        type: 'ADD_PAUSE',
        id: week,
        day: currentDay,
        pause: data[week][currentDay].pause + JSON.parse(sessionStorage.count),
      });
    }
    setTimer(total);
  }

  //Сброс таймера до 25
  function reset() {
    let time = toDoList[indexTask].time;
    let display = document.querySelector('.display');
    if (time.length > 0) {
      display.textContent = `${time[time.length - 1]}:00`;
    } else {
      display.textContent = '25:00'
    }
  }

  function resetStates() {
    setIsStopPressed(true);
    setIsStartPressed(false);
    setIsPausePressed(false);
    setBreak(false);
    reset()
  }

  //Функция, запускаемая при Старте
  function startTimer() {
    let total;
    let array = toDoList[indexTask].time;
    let quan = toDoList[indexTask].quantity;
    
    if (data.length !== 0) {
      total = array[quan - 1] * 60
    } else {total = 300}
    sessionStorage.setItem('timeTomato', array[quan - 1])
    setTimer(total); 
    setIsStartPressed(true);

    if (quan >= 1 
          && numOfTask !== undefined
          && !isBreak
        ) {
      setPomodoro(`Помидор ${data[week][currentDay].tomato + 1}`);
    } else {return}
  }

  //Функция добавления минуты при нажатии на Плюс
  function addMinute() {
    let quan = toDoList[indexTask].quantity;
    let array = toDoList[indexTask].time;
    click++;

    if (array[quan - 1] < 35) {
      array[quan - 1] = array[quan - 1] + 1;
      dispatch({
        type: 'ADD_TIME',
        id: numOfTask,
        time: array,
      })
      dispatch(saveCountClick(click))
    } else if (array[quan - 1] == 35) {
      dispatch(setLimit(true))
    }
  }

  //Тотальный сброс таймера
  function stopTimer() {
    setIsStopPressed(true);
    setIsStartPressed(false);
    setIsPausePressed(false);
    setBreak(false);
    clearInterval(timerBreak);
    clearInterval(timerPause);
    clearInterval(timer);
    reset();
  }

  function setTimerBreak() {
    if (unit  === 4) {
      timeMin = 120;
    } else {
       timeMin = 60;
    }
    const display = document.querySelector('.display');
    timerBreak = setInterval(() => {
      let seconds = timeMin % 60;
      let minutes = timeMin / 60 % 60;
      if (timeMin < 0) {
        clearInterval(timerBreak);
        soundClick();
        resetStates(); 
      } else {
          display.innerHTML = `${addZero(Math.trunc(minutes))}:${addZero(seconds)}`;
      }
      --timeMin;
      }, 1000)  
  }

  function setTimer(timeMinute = 1500) {
    const display = document.querySelector('.display');
     
    timer = setInterval(() => {
      let seconds = timeMinute % 60;
      let minutes = timeMinute / 60 % 60;
    
      if (timeMinute < 0) {
        clearInterval(timer);
        soundClick();
        setIsStartPressed(false);
        setIsPausePressed(false);
        setIsStopPressed(true);
        setBreak(true);
        setTimerBreak();
        saveTomatoes();
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
                    }`}
      >
        <span>{isTitled ? selectedTitle : isBreak ? 'ИДЕТ ПЕРЕРЫВ' : 'Выберите задачу'}</span>
        <span>{pomodoro}</span>
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
              ? `${minTimer}`
              : isBreak 
                ? "05:00" 
                : "25:00"
            }
          </p>
          <button className="btn-plus" onClick={() => {addMinute()}} disabled={isTitled ? false : true}>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#C4C4C4"/>
              <path d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z" fill="white"/>
            </svg>
          </button>
        </div>
        <p className="timer-main">
          <span>Задача {isTitled ? numOfTask : ''} - </span>
          <span>{isTitled ? selectedTitle : isBreak ? 'ИДЕТ ПЕРЕРЫВ' : 'Выберите задачу'}</span>
        </p>

        <div className="timer-btns">
          {!isStartPressed && !isPausePressed && !isBreak && (
            <Button className="btn--green"
                    title='Старт'
                    onClick={() => {startTimer()}}
                    disabled={isTitled ? false : true}
            />
          )}

          {isStartPressed && (
            <Button className="btn--green"
                    title='Пауза'
                    onClick={() => {
                      setIsPausePressed(true);
                      setIsStartPressed(false);
                      clearInterval(timer);
                      getUnfinishedTime(display)
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
                    disabled={isTitled ? false : true}
            />
          )}

          {isPausePressed && !isStartPressed && (
            <Button className="btn--green"
                    title='Продолжить'
                    onClick={() => {continueCountDown()}}
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
                    onClick={() => {doIsDone()}}
            />
          )}
        </div>
      </div>
    </div>
  );
} 