import React, {useState, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import './chart.css';

export function Chart({indexObj}) {
  const defaultArr = [5, 5, 5, 5, 5, 5, 5];
  const [heights, setHeights] = useState(defaultArr);
  const data = useSelector(state => state.statData);
  const selectedWeek = useSelector(state => state.selectedWeek);

  function getTransformedArray(array) {
    let transformedArr = array.map((x) => (84 * x) / 25);
    let final = transformedArr.reduce((newArr, y) => {
      if (y === 0) {
        newArr.push(5);
      } else if (y > 420) {
        newArr.push(420);
      } else { newArr.push(y)}
      return newArr;
    }, []);
    return final;
  }
   
  useEffect(() => {
    if (data[indexObj] !== undefined) {
      let array = [];
      const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      for (let i = 0; i < 7; i++) {
        let time;
        if (data[indexObj][days[i]] == undefined) {
          time = 0
        } else {
          time = data[indexObj][days[i]].time;
        }
        array.push(time)
      }
      let arrHeights = getTransformedArray(array)
      setHeights(arrHeights);
    } else {
      setHeights(defaultArr);
    }
  }, [indexObj]);
  
  return (
    <>
      {heights.map((height, index) =>
        <div key={index} className={`initial ${parseInt(height) > 5 ? 'colored': ''}`} 
             style={{ height: `${height}px` }}
             data-num={index + 1}>
        </div> 
      )}
    </>
  )
}
