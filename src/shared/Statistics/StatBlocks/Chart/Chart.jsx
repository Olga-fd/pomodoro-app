import React, {useState, useEffect, useRef} from "react";
import { useSelector } from "react-redux";
import './chart.css';
//style={"display: block; box-sizing: border-box; height: 279.489px; width: 562.842px;"}

export function Chart() {
  const defaultArr = [5, 5, 5, 5, 5, 5, 5];
  const [heights, setHeights] = useState(defaultArr);
  //let data = JSON.parse(localStorage.getItem('data'));
  const data = useSelector(state => state.statData);
  const selectedWeek = useSelector(state => state.selectedWeek);
  // localStorage.setItem('data', JSON.stringify(data))

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
  console.log(data['1'] == undefined);
 
  useEffect(() => {
    if (data[selectedWeek] !== undefined) {
      let array = [];
      const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      for (let i = 0; i < 7; i++) {
        let time = data[selectedWeek][days[i]].time;
        array.push(time)
      }
      let arrHeights = getTransformedArray(array)
      setHeights(arrHeights);
    } else {
      setHeights(defaultArr);
    }
  }, [selectedWeek]);
  
  return (
    <>
      {heights.map((height, index) =>
        <div className={`initial ${parseInt(height) > 5 ? 'colored': ''}`} 
             style={{ height: `${height}px` }}
             data-num={index + 1}>
        </div> 
      )}
    </>
  )
}
