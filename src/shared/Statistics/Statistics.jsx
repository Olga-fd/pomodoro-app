import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNumberOfWeek } from "../../store/store";
import "./statistics.css";

export function Statistics() {
  const dispatch = useDispatch();
 
  // function setDataForStat() {
  //   const dataForStat = useSelector(state => state.statData);
  //   if (localStorage.stat !== undefined && dataForStat.length == 0) {
  //     let data = JSON.parse(localStorage.stat);
  //     dispatch(setNumberOfWeek(0));
  //     dispatch({
  //       type: 'SET_INIT',
  //       base: data
  //     });  
  //   } else return
  // }

  return (
    <Link to="/statistics" 
          className="flex-block btn-stat" 
          //onClick={setDataForStat()}  
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="none"/>
      </svg>
      <span className="equalizer">Статистика</span>
    </Link>
  )}