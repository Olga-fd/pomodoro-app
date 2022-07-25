import React, {useState, useEffect} from "react";
import { CirclesIcon } from "../../../Icons/CirclesIcon";
import { StopIcon } from "../../../Icons/StopIcon";
import { WatchIcon } from "../../../Icons/WatchIcon";
import { getTimeShort } from "../../../../utilites/utilitesForStat";
import { StatFooterItem } from "./StatFooterItem/StatFooterItem";
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
      <StatFooterItem data={data} 
                      indexObj={indexObj}
                      selectedDay={selectedDay}
                      className={'statFooter__focus'}
                      coloredFooter={coloredFooter}
                      title={'Фокус'}
                      text={data[indexObj] && data[indexObj][selectedDay] 
                              ? `${data[indexObj][selectedDay].focus}%` 
                              : '0%'
                           }
      >
        <CirclesIcon/>
      </StatFooterItem>

      <StatFooterItem data={data} 
                      indexObj={indexObj}
                      selectedDay={selectedDay}
                      className={'statFooter__time'}
                      coloredFooter={coloredFooter}
                      title={'Время на паузе'}
                      text={data[indexObj] && data[indexObj][selectedDay] 
                              ? `${getTimeShort(data[indexObj][selectedDay].pause)}` 
                              : '0м'
                      }
      >
         <WatchIcon/>
      </StatFooterItem>

      <StatFooterItem data={data} 
                      indexObj={indexObj}
                      selectedDay={selectedDay}
                      className={'statFooter__pause'}
                      coloredFooter={coloredFooter}
                      title={'Остановки'}
                      text={data[indexObj] && data[indexObj][selectedDay] 
                              ? data[indexObj][selectedDay].stops 
                              : 0
                           }
      >
         <StopIcon/>
      </StatFooterItem>
    </div>
  )
}