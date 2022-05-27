import React, {useEffect, useState} from 'react';
import { Timer } from './Timer/Timer';
import { TasksList } from '../TasksList/TasksList';
import { useTime } from '../../hooks/useTime';
import './mainblock.css';
import { StatBlocks } from '../Statistics/StatBlocks/StatBlocks';

export function MainBlock() {
  const [inputValue, setInputValue] = useState('');
 
  const [hours] = useTime();
  let data;
 
  if (localStorage.getItem('toDoList') !== null) {
    data = JSON.parse( localStorage.getItem('toDoList') );
  } else {
    data = [];
  }

  const [toDoList, setToDoList ] = useState(data);

  function handleChange(e) {
    setInputValue(e.currentTarget.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    addTask(inputValue);
    setInputValue('');
  }

  function addTask(inputValue ) {
    let copy = [...toDoList];
    copy = [...copy, { id: toDoList.length + 1, title: inputValue, quantity: 1, time: 25 }];
    setToDoList(copy); 
  }

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList))
  }, [toDoList]);

  return (
    <div className="mainblock">
      <div>
        <p className="paragraph">Ура! Теперь можно начать работать:</p>
        <ul className="listInstr">
          <li>Выберите категорию и напишите название текущей задачи</li>
          <li>Запустите таймер («помидор»)</li>
          <li>Работайте пока «помидор» не прозвонит</li>
          <li>Сделайте короткий перерыв (3-5 минут)</li>
          <li>Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).</li>
        </ul>
        <form onSubmit={handleSubmit}>
          <input className="input-add" value={inputValue} type="text" onChange={handleChange} placeholder='Название задачи'/>
          <button type="submit" className="btn-add btn--green">Добавить</button>
        </form>
        <TasksList toDoList={toDoList}/>
        <p className="hours">
          {hours}
        </p>
      </div> 
      <Timer/>
    </div>
  );
}
