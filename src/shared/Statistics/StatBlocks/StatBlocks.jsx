import React, {useState, useEffect} from "react";
import './statblocks.css';
import pomodoro from '../../../images/tomato2.svg';
import tomato from '../../../images/tomato.svg';
import { SelectWeek } from "./SelectWeek/SelectWeek";
import { Chart } from "./Chart/Chart";
import { CirclesIcon } from "../../Icons/CirclesIcon";
import { StopIcon } from "../../Icons/StopIcon";
import { WatchIcon } from "../../Icons/WatchIcon";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../../../store/store";

export function StatBlocks() {
  const dispatch = useDispatch();
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ];
  const [fullNameOfDay, setFullNameOfDay] = useState('');
  const [coloredFooter, setColoredFooter] = useState(false);
  const selectedDay = useSelector(state => state.selectedDay);
  const [indexObj, setIndexObj] = useState(0);
  const week = useSelector(state => state.selectedWeek);
  const data = useSelector(state => state.statData);
  const numberOfWeek = useSelector(state => state.numberOfWeek);
  let id;

  //Нахождение индекса объекта в массиве по id
  useEffect(() => {
    if (data.length !== 0) {
      if (numberOfWeek.length == 2 && week == 0) {
        id = data.findIndex(obj => obj.id == 1);
      } else if (numberOfWeek.length == 2 && week == 1) {
        id = data.findIndex(obj => obj.id == 0);
      } else if (numberOfWeek.length == 2 && week == 2) {
        id = data.findIndex(obj => obj.id == undefined);
      } else if (numberOfWeek.length == 3 && week == 0) {
        id = data.findIndex(obj => obj.id == 2);
      } else if (numberOfWeek.length == 3 && week == 1) {
        id = data.findIndex(obj => obj.id == 1);
      } else if (numberOfWeek.length == 3 && week == 2) {
        id = data.findIndex(obj => obj.id == 0);
      } else {
        id = data.findIndex(obj => obj.id == week);
      }
      setIndexObj(id)
    }
  }, [data, numberOfWeek.length, week])

  //Окрашивание футера
  useEffect(() => {
    if (data[indexObj] && data[indexObj][selectedDay] && data[indexObj][selectedDay].time !== (undefined || 0)) {
      setColoredFooter(true)
    } else {
      setColoredFooter(false)
    }
  }, [data, selectedDay, indexObj])

  //Полное название дня недели
  function getDayOfWeek(e) {
    const date = e.target.dataset.id;
    if (date == 7) {
      setFullNameOfDay(days[0]);
    } else {
      setFullNameOfDay(days[date]);
    }
    dispatch({
      type: 'GET_DAY',
      day: e.target.innerText,
    })
  }

  function changeColor(e) {
    const bars = document.querySelectorAll('.initial');
    const bar = document.querySelector('.colored-punch');
    const text = document.querySelector('.text-punch');
    if (bar && text) {
      bar.classList.remove('colored-punch');
      text.classList.remove('text-punch');
    } else if (text) {
      text.classList.remove('text-punch');
    }
     
    const day = e.target.dataset.id;
    const arr = Array.from(bars, bar => bar.dataset.num);
    let found = arr.findIndex(item => parseInt(item) === parseInt(day));
    if (bars[found].getBoundingClientRect().height > 5) {
      bars[found].classList.add('colored-punch');
    } 
    e.target.classList.add('text-punch');
  }

  function getTime(length) {
    let hour, minutes;
    if (length > 0) {
      hour = Math.floor(length / 60);
      minutes = length - hour * 60;
      if (minutes > 0) {
          if (hour >= 5) {
          return (`${hour} часов ${minutes} минут`)
        } else if (hour >= 2) {
          return (`${hour} часа ${minutes} минут`)
        } else if (hour == 1 ) {
          return (`${hour} час ${minutes} минут`)
        } else {
          return (`${minutes} минут`)
        }
      } else {
        if (hour >= 5) {
          return (`${hour} часов`)
        } else if (hour >= 2) {
          return (`${hour} часа`)
        } else if (hour == 1 ) {
          return (`${hour} час`)
      }
      }
    }
  }

  function getTimeShort(length) {
    let hour, minutes;
    if (length > 0) {
      if (length < 60) {
        return (`${length}c`)
      }
      hour = Math.floor(length / 3600);
      minutes = Math.floor((length - hour * 3600) / 60);
      if (minutes > 0) {
          if (hour >= 5) {
          return (`${hour}ч ${minutes}м`)
        } else if (hour >= 2) {
          return (`${hour}ч ${minutes}м`)
        } else if (hour == 1 ) {
          return (`${hour}ч ${minutes}м`)
        } else {
          return (`${minutes}м`)
        }
      } 
    } else {
      return 0
    }
  }

  function conjugateTomato(quantity) {
    if (quantity == 0) {
      return (`Нет помидоров`)
    } else if (quantity == 1) {
      return (`${quantity} помидор`)
    } else if (quantity <= 4) {
      return (`${quantity} помидора`)
    } else if (quantity > 4) {
      return (`${quantity} помидоров`)
    }
  }

  return (
    <div>    
      <div className="statHeader">
        <h1>Ваша активность</h1>
        <SelectWeek />
      </div>
      
      <div className="statMain">
        <div className="statMain__day">
          <h2>
            {data[indexObj] !== undefined && data[indexObj][selectedDay] !== undefined
              ? fullNameOfDay
              : ''}
          </h2>
          {data[indexObj] !== undefined && data[indexObj][selectedDay] !== undefined
            ? <p>Вы&nbsp;работали над задачами в&nbsp;течение&nbsp;
                <span className="statMain__day_span">
                  {getTime(data[indexObj][selectedDay].time)}
                </span>
              </p>
            : <p>Нет данных</p>                                 
          }
        </div>
        <div className="statMain__pomodoro">
          {data[indexObj] !== undefined && data[indexObj][selectedDay] !== (0 || undefined)
            ? <div className="statMain__pomodoro_wrap">
                <div className="statMain__pomodoro_header">
                  <img className="statMain__pomodoro_img" src={tomato} alt='Помидор' />
                  <span className="statMain__pomodoro_span">х {data[indexObj][selectedDay].tomato}</span>
                </div>
                <div className="statMain__pomodoro_footer">{conjugateTomato(data[indexObj][selectedDay].tomato)}</div>
              </div>
            : <img className="tomato" src={pomodoro} alt='Помидор' />
          }
        </div>
        <div className="statMain__chart">
          <div className="statMain__chart_header">
            <Chart indexObj={indexObj}/>
          </div>
            
          <div className="statMain__chart_footer" onClick={(e) => {
            getDayOfWeek(e); 
            changeColor(e);
            dispatch(setSelectedDay(e.target.innerText))            
          }}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) =>
              <span key={index} data-id={index + 1}>{day}</span> 
            )}
          </div>
        </div>
      </div>
      <div className="statFooter">
        
        <div className={`statFooter__focus ${coloredFooter ? '' : 'non-active'}`}>
          <div className="wrap">
            <p className="statFooter__title">Фокус</p>
            <span className="statFooter__span">
              {data[indexObj] && data[indexObj][selectedDay] ? `${data[indexObj][selectedDay].focus}%` : '0%'}
            </span>
          </div>
          
          <CirclesIcon/>
        </div>
        
        <div className={`statFooter__time ${coloredFooter ? '' : 'non-active'}`}>
          <div className="wrap">
            <p className="statFooter__title">Время на паузе</p>
            <span className="statFooter__span">
              {data[indexObj] && data[indexObj][selectedDay] ? `${getTimeShort(data[indexObj][selectedDay].pause)}` : '0м'}
            </span>
          </div>
       
          <WatchIcon/>
        </div>
        
        <div className={`statFooter__pause ${coloredFooter ? '' : 'non-active'}`}>
          <div className="wrap">
            <p className="statFooter__title">Остановки</p>
            <span className="statFooter__span">
              {data[indexObj] && data[indexObj][selectedDay] ? data[indexObj][selectedDay].stops : 0}
            </span>
          </div>
          
          <StopIcon/>
        </div>
      </div>
    </div>
  )
}