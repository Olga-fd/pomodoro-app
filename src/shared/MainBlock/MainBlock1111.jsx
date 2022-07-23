import React, {useEffect, useState} from "react";
import { Timer } from "./Timer/Timer";
import { TasksList } from "../TasksList/TasksList";
import { useTime } from "../../hooks/useTime";
import { useDispatch, useSelector } from "react-redux";
import { DarkBack } from "../TasksList/Task/DeleteTask/DarkBack/DarkBack";
import { Gotten } from "../Notifications/Gotten/Gotten";
import { NotFound } from "../Notifications/NotFound/NotFound" ;
import { Limit } from "../Notifications/Limit/Limit";
import { setIsFound, saveNumberOfWeek } from "../../store/store";
import "./mainblock.css";

export function getNumOfWeek() {
  let date = new Date();
  let day = date.getDay();
  let firstJan = new Date(date.getFullYear(),0,1);
  if (firstJan == 0) firstJan = 7;
  if (day == 0) day = 7;
  let daysForFirstWeek = 7 - (7 - firstJan.getDay() + 1);
  let daysForLastWeek = 7 - day;
  let numberOfDays = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  let result = (daysForFirstWeek + numberOfDays + daysForLastWeek + 1) / 7;
  return result
}

export function MainBlock() {
  const [inputValue, setInputValue] = useState('');
  const [hours] = useTime();
  const toDoList = useSelector(state => state.toDoList);
  const lightTheme = useSelector(state => state.lightTheme); 
  const isGotten = useSelector(state => state.isGotten);
  const isFound = useSelector(state => state.isFound);
  const limit = useSelector(state => state.limit);
  const isModalOpened = useSelector(state => state.isModalOpened);
  const numberOfWeek = useSelector(state => state.numberOfWeek);
  const dispatch = useDispatch();
  const result = getNumOfWeek();
 
  getWeeksForStat();  
  let date = new Date();
  let day = date.getDay();
  
  //Сохраняем в хранилище  текущий день
  useEffect(() => {
    const daysShortened = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    if (numberOfWeek.length !== undefined) {
      dispatch({
        type: 'GET_CURRENT_DAY',
        day: daysShortened[day],
      });      
    } else return
  }, [numberOfWeek.length])
  
  function handleChange(e) {
    setInputValue(e.currentTarget.value);
  }

  function setClassModal() {
    document.querySelector('#modal_root').classList.add('modal')
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    if (inputValue == '') {
      dispatch(setIsFound(true))
    } else {
      if (toDoList.length !== 0 && toDoList[toDoList.length - 1].id != toDoList.length) {
        dispatch({
          type: 'CREATE_TASK', 
          id: toDoList[toDoList.length - 1].id + 1, 
          title: inputValue, 
          quantity: 1, 
          time: [25]
        });
      } else {
        dispatch({
          type: 'CREATE_TASK', 
          id: toDoList.length + 1, 
          title: inputValue, 
          quantity: 1, 
          time: [25]
        });
      }
    }
    setInputValue('');
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
      } 
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
    } 
  }

  useEffect(() => {
    if (numberOfWeek.includes(result) == false) {
      localStorage.setItem('timeTomato', 0)
    }
  }, [numberOfWeek, result])
    
  return (
    <div className="mainblock">
      <div>
        <p className={`paragraph ${lightTheme 
                                    ? ''
                                    : 'text--dark'
                                  }`
                      }
        >Ура! Теперь можно начать работать:</p>
        <ul className={`listInstr ${lightTheme 
                                    ? ''
                                    : 'text--dark'
                                  }`
                      }>
          <li>Выберите категорию и напишите название текущей задачи</li>
          <li>Запустите таймер («помидор»)</li>
          <li>Работайте пока «помидор» не прозвонит</li>
          <li>Сделайте короткий перерыв (3-5 минут)</li>
          <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
        </ul>
        <form onSubmit={handleSubmit}>
          <input className={`input-add ${isFound ? "red-outline" : ""}`}
                 value={inputValue} type="text" 
                 onChange={handleChange} 
                 placeholder='Название задачи'
          />
          <button type="submit" className="btn-add btn--green">Добавить</button>
        </form>
        <TasksList toDoList={toDoList} isGotten={isGotten}/>
        <p className="hours">
          {hours}
        </p>
      </div> 
      <Timer/>

      {isModalOpened && (
        setClassModal(),
        <DarkBack/>
      )} 

      {isGotten && (
        setClassModal(), 
        <Gotten/> 
      )}

      {isFound && (
        setClassModal(), 
        <NotFound/> 
      )}

      {limit && (
        setClassModal(), 
        <Limit/> 
      )}
    </div>
  );
}
