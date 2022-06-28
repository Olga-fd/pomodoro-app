import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useTimeForTimer} from '../../../hooks/useTimeForTimer'
import { saveNumberOfWeek, createData, setNumberOfWeek, deleteTask } from '../../../store/store';
import { Button } from './Button/Button';
import sound from './sound.mp3'
import './timer.css';

let timer, timerBreak, timerPause, unit;

export function Timer() {
  const display = document.querySelector('.display');
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isPausePressed, setIsPausePressed] = useState(false);
  const [isStopPressed, setIsStopPressed] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [nameDay, setNameDay] = useState('');
  const [taskTitle, setTaskTitle] = useState('Задача');
  const [pomodoro, setPomodoro] = useState('Помидор 1');

  const week = useSelector(state => state.selectedWeek);
  const currentDay = useSelector(state => state.selectedDay);
  const lightTheme = useSelector(state => state.lightTheme);
  const numberOfWeek = useSelector(state => state.numberOfWeek);
  const toDoList = useSelector(state => state.toDoList);
  const store = useSelector(state => state);
  const data = useSelector(state => state.statData);  
  const isTitled = useSelector(state => state.isTitled); 
  const dispatch = useDispatch();
  const [minTimer] = useTimeForTimer();
  //Определяем номер недели
  let date = new Date();
  let day = date.getDay();
  let firstJan = new Date(date.getFullYear(),0,1);
  let days = 7 - (8 - firstJan.getDay());
  let numberOfDays = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  let result = Math.ceil((day + 1 + numberOfDays + days) / 7);
  let crossed = document.querySelector('.crossed');
  
  let numOfTask;
  if (localStorage.numOfTask) {
    numOfTask = parseInt(JSON.parse(localStorage.numOfTask))
  }

  //Сохраняем в хранилище название дня недели
  useEffect(() => {
    const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
    setNameDay(days[day])
  }, [result, day])

  //Делаем кнопки неактивными при отсутствии задачи и ее названия в шапке таймера
  useEffect(() => {
    let btns = document.querySelectorAll('.timer-btns button');
    if (toDoList.length == 0 && !isTitled) {
      btns.forEach(btn => btn.setAttribute('disabled', 'disabled'));
    } else if (toDoList.length !== 0 && isTitled) {
      btns.forEach(btn => btn.removeAttribute('disabled', 'disabled'));
    }
  }, [toDoList.length, isTitled])

  //Меняем в массиве номер недели на число от 0 до 2
  useEffect(() => {
    if (numberOfWeek.length == 1) {
      dispatch(setNumberOfWeek(0))
    } else if (numberOfWeek.length == 2) {
      dispatch(setNumberOfWeek(1))
    } else if (numberOfWeek.length == 3) {
      dispatch(setNumberOfWeek(2))
    }
  }, [numberOfWeek.length])

  //Создаем объект с данными текущего дня
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
    if (isStopPressed && data.length !== 0 && toDoList.length !== 0) {
      dispatch({
        type: 'GET_TOMATO',
        id: week,
        day: currentDay,
        tomato: data[week][currentDay].tomato + 1, 
      })
      if (toDoList[numOfTask - 1].quantity > 0) {
        console.log(toDoList[numOfTask - 1].quantity);
        console.log(`Помидор ${data[week][currentDay].tomato + 1}`);
        setPomodoro(`Помидор ${data[week][currentDay].tomato + 1}`)
      }
    }
  }, [])

  setTimeout(() => {}, )
  //Считаем количество остановок
  // useEffect(() => {  
  //   let count = 0;
  //   if (isPausePressed && !isBreak && data.length !== 0) { 
  //     dispatch({
  //       type: 'ADD_STOP',
  //       id: store.selectedWeek,
  //       day: store.selectedDay,
  //       stop: data[store.selectedWeek][store.selectedDay].stops + 1
  //     });
  //     timerPause = setInterval(() => {
  //       count = ++count;
  //       if (localStorage.count) {
  //         count = JSON.parse(localStorage.count) + count;
  //       }
  //       localStorage.setItem('count', count/60)
  //     }, 1000)
  //   } 
    
  //   if (!isPausePressed && data.length !== 0) {
  //     clearInterval(timerPause);
  //     if (localStorage.count) {
  //       dispatch({
  //         type: 'ADD_PAUSE',
  //         id: store.selectedWeek,
  //         day: store.selectedDay,
  //         pause: JSON.parse(localStorage.count),
  //       });
  //     }
  //   }
  // }, [isPausePressed, data.length])

  //Удаляем задачу из списка и сбрасываем название задачи
  useEffect(() => {
    if (crossed) {
      setTimeout(() => {
       document.querySelector('.timer-header span:first-child').textContent = 'Задача'
      }, 1000)
      setTimeout(() => { 
        try {dispatch(deleteTask(numOfTask))} catch(err) {console.log(err);} }, 3000)
    }
  }, [crossed])

  //Функция добавления звукового сигнала
  function soundClick() {
    const audio = new Audio(); // Создаём новый элемент Audio
    audio.src = sound; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }
  
  //Определяем какая по счету неделя должна быть в массиве
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
  
  //Добавляем нули в таймере при одиночном "формате"
  function addZero (num) {
    if (num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  };

  //Сброс таймера до 25
  function reset() {
    document.querySelector('.display').textContent = '25:00';
  }

  //Тотальная сброс таймера
  function stopTimer() {
    setIsStopPressed(true);
    setIsStartPressed(false);
    setIsPausePressed(false);
    setBreak(false);
    clearInterval(timer);
    clearInterval(timerBreak);
    reset();
  }

  //let i = 1, j = 1;

  function setTimerBreak(timeMin = 300) {
    const display = document.querySelector('.display');
    timerBreak = setInterval(() => {
      let seconds = timeMin%60;
      let minutes = timeMin/60%60;
      if (timeMin < 0) {
        clearInterval(timerBreak);
        soundClick();
      } else {
          display.innerHTML = `${addZero(Math.trunc(minutes))}:${addZero(seconds)}`;
      }
      --timeMin;
      }, 10)  
  }

  function setTimer(timeMinute = 1500) {
    const display = document.querySelector('.display');
    localStorage.setItem('time', timeMinute);
   
    timer = setInterval(() => {
    let seconds = timeMinute%60;
    let minutes = timeMinute/60%60;
    let hour = timeMinute/60/60%60;
    
      if (timeMinute < 0) {
        clearInterval(timer);
        soundClick();
        setIsStartPressed(false);
        setIsPausePressed(false);
        setIsStopPressed(false);
        setBreak(true);
        //setTimer(300);
        setTimerBreak();

        dispatch({
          type: 'MINUS_TOMATO',
          id: numOfTask,
          quantity: toDoList[numOfTask - 1].quantity - 1,
          time: toDoList[numOfTask - 1].time - 25,
        });
        
        localStorage.setItem('numOfTask', JSON.stringify(toDoList[numOfTask - 1].quantity - 1));
        setTimeout(() => {
          stopTimer();
        }, 3000)
      } else {
        if (hour >= 1) {
          display.innerHTML = `${addZero(Math.trunc(hour))}:${addZero(minutes)}`;
        } else {
          display.innerHTML = `${addZero(Math.trunc(minutes))}:${addZero(seconds)}`;
        }
      }
      --timeMinute;
    }, 10) 
    
    
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
        <span>{taskTitle}</span>
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
              ? `${minTimer}`//"25:00"
              : isBreak ? "05:00" : "25:00"
            }
          </p>
          <button className="btn-plus"  onClick={() => {
              // let btn = document.querySelector('.btn-plus');
              // let total = display.innerText.split(":");
              
              dispatch({
                type: 'ADD_TIME',
                id: week,
                day: currentDay,
                time: data[week][currentDay].time + 1,
              })
              display.textContent = minTimer;
            }
          }>
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
                      // let total = display.innerText.split(":");
                      // total = parseInt(total[0] * 60) + parseInt(total[1]);
                      let total 
                      if (data.length !== 0) 
                      {total = data[week][currentDay].time * 60} 
                      else {total = 1500}
                      setTimer(total); 
                      //setTimer();
                      setIsStartPressed(true);
                      getWeeksForStat();
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
