import React, {useState} from 'react';
import { Timer } from './Timer/Timer';
import { TasksList } from '../TasksList/TasksList';
import { useTime } from '../../hooks/useTime';
import { useDispatch, useSelector } from 'react-redux';
import './mainblock.css';

export function MainBlock() {
  const [inputValue, setInputValue] = useState('');
  const [hours] = useTime();
  const toDoList = useSelector(state => state.toDoList);
  const dispatch = useDispatch();
 
  function handleChange(e) {
    setInputValue(e.currentTarget.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    //addTask(inputValue);
    dispatch({
      type: 'CREATE_TASK', 
      id: toDoList.length + 1, 
      title: inputValue, 
      quantity: 1, 
      time: 25
    });
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
    setInputValue('');
  }

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
          <input className="input-add" 
                 value={inputValue} type="text" 
                 onChange={handleChange} 
                 placeholder='Название задачи'
          />
          <button type="submit" className="btn-add btn--green">Добавить</button>
        </form>
        <TasksList toDoList={(toDoList != false) 
                              ? toDoList 
                              : JSON.parse( localStorage.toDoList )  
                            }
        />
        <p className="hours">
          {hours}
        </p>
      </div> 
      <Timer/>
    </div>
  );
}
