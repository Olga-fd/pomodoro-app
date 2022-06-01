import { CLIEngine } from 'eslint';
import React, {useEffect, useState} from 'react';
import { Button } from './Button/Button';
// import { getDayOfWeek } from '../../Statistics/StatBlocks/StatBlocks';
import './timer.css';

let timer;

export function Timer() {
  const [isStartPressed, setIsStartPressed] = useState(false);
  const [isPausePressed, setIsPausePressed] = useState(false);
  const [isStopPressed, setIsStopPressed] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [numOfWeek, setNumOfWeek] = useState(0);
  const display = document.querySelector('.display');
  
  let date = new Date();
  let day = date.getDay();
  let firstJan = new Date(date.getFullYear(),0,1);
  let numberOfDays = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  let result = Math.ceil((day + 1 + numberOfDays) / 7);
  
  // useEffect(() => {
  //   //let pauseTimer;
  //   let counter = 0;
  //   if (isPausePressed) {
  //     pauseTimer = setTimeout(() => {counter++}, 1000);
  //   } else {
  //     clearTimeout(pauseTimer);
  //   }
  //   console.log(counter);
  // }, [isPausePressed])

  useEffect(() => {
    if (isStopPressed) setIsStartPressed(false)
  }, [isStopPressed])

  // useEffect(() => { 
  //   const display = document.querySelector('.display');
  //   let total = display.innerText.split(":");
  //   total = parseInt(total[0] * 60) + parseInt(total[1]);
  //   let arr = [];
  //   let week = {};
    
  //   if (day === new Date().getDay()) {
  //     let obj = {};
  //     obj[day] = {};
  //     obj[day].time = total;
  //     obj[day].tomato = 0;
  //     obj[day].pause = 0;
  //     obj[day].stop = 0;
  //     let base = JSON.parse(localStorage.getItem('base'));
  //     if (base && base.find((item) => Object.keys(item) == result)) {
  //       return;
  //     }
  //     week[result] = obj;
  //     arr.push(week);
  //     localStorage.setItem('base', JSON.stringify(arr));
  //   }
  // }, [day, result])

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

  let i = 1,
      j = 1;

  function setTimer(timeMinute = 10) {
    const display = document.querySelector('.display');
    localStorage.setItem('time', timeMinute);
    timer = setInterval(() => {
      let seconds = timeMinute%60;
      let minutes = timeMinute/60%60;
      if (timeMinute < 0) {
        clearInterval(timer);
        localStorage.setItem('timeEnd', i++);
        setIsStartPressed(false);
        setIsPausePressed(false);
        setIsStopPressed(false);
        localStorage.setItem('tomato', j++);
        setBreak(true);
        setTimer(3)
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
                          : ""}
      `}>
        <span>Задача</span>
        <span>Помидор 1</span>
      </p>
      <div className="timer-center">
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
          <button className="btn-plus" onClick={() => {}}>
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
                      setTimer();
                      setIsStartPressed(true);
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
