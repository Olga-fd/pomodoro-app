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

export function StatBlocks() {
  const [isDayOfWeek, setIsDayOfWeek] = useState('Понедельник');
  const [isTomato, setIsTomato] = useState(false);
  const [week, setWeek] = useState(0);
  const dayOfWeek = useSelector(state => state.selectedDay);
  const [selectedDay, setSelectedDay] = useState('Пн');
  const dispatch = useDispatch();

  // const store = useStore();
  // const data = store.getState().data; 
  const base = useSelector(state => state.selectedWeek);
  let dataForStat = useSelector(state => state.statData);
  const selected = document.querySelectorAll('.select-hide');
  
  let data;
  if (dataForStat.length == 0) {
    data = JSON.parse(localStorage.stat);
    dispatch({
      type: 'SET_INIT',
      base: data
    })
    //localStorage.clear()
  } else {
    data = dataForStat;
  }
    
  useEffect(() => {
    setWeek(base);
  }, [selected])

  useEffect(() => {
    setSelectedDay(dayOfWeek)
  }, [dayOfWeek])
  
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
    dispatch({
      type: 'GET_DAY',
      day: e.target.innerText,
    })
  }

  function getStatData(e) {
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
          <h2>{isDayOfWeek}</h2>
          <p>Вы&nbsp;работали над задачами в&nbsp;течение 
            {/* <span className="statMain__day_span"> {getTime(data[week][selectedDay].time)}</span> */}
          </p>
        </div>
        <div className="statMain__pomodoro">
          {isTomato 
            ? <div className="statMain__pomodoro_wrap">
                <div className="statMain__pomodoro_header">
                  <img className="statMain__pomodoro_img" src={tomato} alt='Помидор' />
                  {/* <span className="statMain__pomodoro_span">х {data[week][selectedDay].tomato}</span> */}
                </div>
                {/* <div className="statMain__pomodoro_footer">{conjugateTomato(data[week][selectedDay].tomato)}</div> */}
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
            getStatData(e);
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
              {/* {data ? `${data[week][selectedDay].focus}%` : '0%'} */}
            </span>
          </div>
          
          <CirclesIcon/>
        </div>
        
        <div className="statFooter__time non-active">
          <div className="wrap">
            <p className="statFooter__title">Время на паузе</p>
            <span className="statFooter__span">
              {/* {data ? `${getTimeShort(data[week][selectedDay].pause)}` : '0м'} */}
            </span>
          </div>
       
          <WatchIcon/>
        </div>
        
        <div className="statFooter__pause non-active">
          <div className="wrap">
            <p className="statFooter__title">Остановки</p>
            <span className="statFooter__span">
              {/* {data ? data[week][selectedDay].stops : 0} */}
            </span>
          </div>
          
          <StopIcon/>
        </div>
      </div>
    </div>
    
  )
}