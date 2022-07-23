import React from "react";
import pomodoro from '../../../../images/tomato2.svg';
import tomato from '../../../../images/tomato.svg';
import { conjugateTomato } from "../../../../utilites/utilitesForStat";
import './stattomato.css';

export function StatTomatoInfo({data, indexObj, selectedDay}) {
  return (
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
  )
}