import React, {useState, useEffect, useRef} from "react";
import { useStore } from "react-redux";
import './chart.css';
//style={"display: block; box-sizing: border-box; height: 279.489px; width: 562.842px;"}

export function Chart() {
  const [heights, setHeights] = useState(['5', '5', '5', '5', '5', '5', '5']);
  //let data = JSON.parse(localStorage.getItem('data'));
  const store = useStore();
  const data = store.getState().data;
  localStorage.setItem('data', JSON.stringify(data))

  function getTransformedArray(array) {
    let max = Math.max.apply(null, array);
    let transformedArr = array.map((x) => (420 * x) / max);
    const min = Math.min.apply(null, transformedArr);
    let arr = transformedArr.map((y) => y - min);
    let maximum = Math.max.apply(null, arr);
    let spotOn = arr.map((y) => (420 * y) / maximum);
    let final = spotOn.reduce((newArr, y) => {
      if (y === 0) {
        newArr.push(5);
      } else { newArr.push(y)}
      return newArr;
    }, []);
    return final;
  }
 
  useEffect(() => {
    if (data !== null) {
      let arrHeights = getTransformedArray([data[0][0]['Пн'].time, '50', '3', '30', '60', '56', '33'])
      setHeights(arrHeights);
    }
  }, []);
  
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
