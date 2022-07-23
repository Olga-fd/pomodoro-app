import React, {useState, useEffect} from "react";
import './statblocks.css';
import { SelectWeek } from "./SelectWeek/SelectWeek";
import { Chart } from "./Chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDay } from "../../../store/store";
import { changeColor } from "../../../utilites/utilitesForStat";
import { StatFooter } from "./StatFooter/StatFooter";
import { StatDayInfo } from "./StatDayInfo/StatDayInfo";
import { StatTomatoInfo } from "./StatTomatoInfo/StatTomatoInfo";

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
  const selectedDay = useSelector(state => state.selectedDay);
  const [indexObj, setIndexObj] = useState(0);
  const week = useSelector(state => state.selectedWeek);
  const data = useSelector(state => state.statData);
  const numberOfWeek = useSelector(state => state.numberOfWeek);
  let id;

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

  return (
    <div>    
      <div className="statHeader">
        <h1>Ваша активность</h1>
        <SelectWeek />
      </div>
      
      <div className="statMain">
        <StatDayInfo indexObj={indexObj} 
                     selectedDay={selectedDay} 
                     data={data}
                     fullNameOfDay={fullNameOfDay}
        />
        <StatTomatoInfo indexObj={indexObj} selectedDay={selectedDay} data={data}/>

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

      <StatFooter indexObj={indexObj} selectedDay={selectedDay} data={data}/>
    </div>
  )
}