import React, {useState, useEffect} from "react";
import './statblocks.css';
import pomodoro from '../../../images/tomato2.svg';
import tomato from '../../../images/tomato.svg';
import { SelectWeek } from "./SelectWeek/SelectWeek";
import { Chart } from "./Chart/Chart";
import { CirclesIcon } from "../../Icons/CirclesIcon";
import { StopIcon } from "../../Icons/StopIcon";
import { WatchIcon } from "../../Icons/WatchIcon";
import { useStore } from "react-redux";

export function StatBlocks() {
  const [isDayOfWeek, setIsDayOfWeek] = useState('Понедельник');
  const [isTomato, setIsTomato] = useState(false);
  const [week, setWeek] = useState(0);

  const store = useStore();
  const data = store.getState().data;
  const selected = document.querySelectorAll('.select-hide');
  
  useEffect(() => {
    setWeek(1);
  }, [selected])
  
  function getDayOfWeek(e) {
    //const date = new Date();
    const date = e.target.dataset.id;
    const days = [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ];
    if (date == 7) {
      setIsDayOfWeek(days[0]);
    } else {
      setIsDayOfWeek(days[date]);
    }
  }

  function getData(e) {
    const divs = document.querySelectorAll('.statFooter div');
    divs.forEach(div => div.classList.remove('non-active'));
    setIsTomato(true)
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
      }
    }
  }

  function getTimeShort(length) {
    let hour, minutes;
    if (length > 0) {
      hour = Math.floor(length / 60);
      minutes = length - hour * 60;
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
          <h2>{isDayOfWeek}</h2>
          <p>Вы&nbsp;работали над задачами в&nbsp;течение 
            <span className="statMain__day_span"> {getTime(data[0][0]['Пн'].time)}</span>
          </p>
        </div>
        <div className="statMain__pomodoro">
          {isTomato 
            ? <div className="statMain__pomodoro_wrap">
                <div className="statMain__pomodoro_header">
                  <img className="statMain__pomodoro_img" src={tomato} alt='Помидор' />
                  <span className="statMain__pomodoro_span">х 2</span>
                </div>
                <div className="statMain__pomodoro_footer">2 помидора</div>
              </div>
            : <img className="tomato" src={pomodoro} alt='Помидор' />
          }
        </div>
        <div className="statMain__chart">
          <div className="statMain__chart_header">
            <Chart/>
          </div>
            
          <div className="statMain__chart_footer" onClick={(e) => {
            getDayOfWeek(e); 
            changeColor(e);
            getData(e);
          }}>
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) =>
              <span data-id={index + 1}>{day}</span> 
            )}
          </div>
        </div>
      </div>
      <div className="statFooter">
        
        <div className="statFooter__focus non-active">
          <div className="wrap">
            <p className="statFooter__title">Фокус</p>
            <span className="statFooter__span">
              {data ? `${data[0][0]['Пн'].focus}` : '0%'}
            </span>
          </div>
          
          <CirclesIcon/>
        </div>
        
        <div className="statFooter__time non-active">
          <div className="wrap">
            <p className="statFooter__title">Время на паузе</p>
            <span className="statFooter__span">
              {data ? `${getTimeShort(data[0][0]['Пн'].pause)}` : '0м'}
            </span>
          </div>
       
          <WatchIcon/>
        </div>
        
        <div className="statFooter__pause non-active">
          <div className="wrap">
            <p className="statFooter__title">Остановки</p>
            <span className="statFooter__span">
              {data ? data[0][0]['Пн'].stops : 0}
            </span>
          </div>
          
          <StopIcon/>
        </div>
      </div>
    </div>
    
  )
}