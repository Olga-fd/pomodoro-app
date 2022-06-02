import React, {useState, useEffect} from "react";
import './statblocks.css';
import pomodoro from '../../../images/tomato2.svg';
import { SelectWeek } from "./SelectWeek/SelectWeek";
import { Chart } from "./Chart/Chart";
import { CirclesIcon } from "../../Icons/CirclesIcon";
import { StopIcon } from "../../Icons/StopIcon";
import { WatchIcon } from "../../Icons/WatchIcon";
import { useStore } from "react-redux";

export function StatBlocks() {
  const [isDayOfWeek, setIsDayOfWeek] = useState('Понедельник');
  //const [isRust, setIsRust] = useState(false);
  const store = useStore();
  const data = store.getState().data;

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

  function changeColor(e) {
    const bars = document.querySelectorAll('.initial');
    const bar = document.querySelector('.colored-rust');
    if (bar) {
      bar.classList.remove('colored-rust');
    }
    const day = e.target.dataset.id;
    const arr = Array.from(bars, bar => bar.dataset.num);
    let found = arr.findIndex(item => parseInt(item) === parseInt(day));
    bars[found].classList.add('colored-rust'); 
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
          <p>Вы&nbsp;работали над задачами в&nbsp;течение {data[0][0]['Пн'].time}&nbsp;минуты</p>
        </div>
        <div className="statMain__pomodoro">
          <img className="tomato" src={pomodoro} alt='Помидор' />
        </div>
        <div className="statMain__chart">
          <div className="statMain__chart_header">
            <Chart/>
          </div>
            
          <div className="statMain__chart_footer" onClick={(e) => {
            getDayOfWeek(e); 
            changeColor(e)
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
        
        <div className="statFooter__time">
          <div className="wrap">
            <p className="statFooter__title">Время на паузе</p>
            <span className="statFooter__span">
              {data ? `${data[0][0]['Пн'].pause}м` : '0м'}
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