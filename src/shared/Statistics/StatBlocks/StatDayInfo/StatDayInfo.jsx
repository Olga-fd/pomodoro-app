import React from "react";
import { getTime } from "../../../../utilites/utilitesForStat";
import './statdayinfo.css';

export function StatDayInfo({data, indexObj, selectedDay, fullNameOfDay}) {
  return (
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
  )
}