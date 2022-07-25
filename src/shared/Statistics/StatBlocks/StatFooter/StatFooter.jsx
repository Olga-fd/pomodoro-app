import React, {useState, useEffect} from "react";
import { CirclesIcon } from "../../../Icons/CirclesIcon";
import { StopIcon } from "../../../Icons/StopIcon";
import { WatchIcon } from "../../../Icons/WatchIcon";
import { getTimeShort } from "../../../../utilites/utilitesForStat";
import './statfooter.css';

export function StatFooter({data, indexObj, selectedDay}) {
  const [coloredFooter, setColoredFooter] = useState(false);
 
  //Окрашивание футера
  useEffect(() => {
    if (data[indexObj] 
        && data[indexObj][selectedDay] 
        && data[indexObj][selectedDay].time !== (undefined || 0)
    ) {
      setColoredFooter(true)
    } else {
      setColoredFooter(false)
    }
  }, [data, selectedDay, indexObj])


  return (
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
  )
}