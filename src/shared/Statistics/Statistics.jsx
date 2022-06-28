import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import './statistics.css';
import '../../main.css';
import { useDispatch, useSelector } from "react-redux";


export function Statistics() {
  const daysShortened = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const dispatch = useDispatch();

  function getCurrentDay() {
    const day = new Date().getDay();
    dispatch({
      type: 'GET_DAY',
      day: daysShortened[day],
    }); 
  }

  return (
    <Link to="/statistics" 
          className="flex-block btn-stat" 
          onClick={getCurrentDay()}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="none"/>
      </svg>
      <span className="equalizer">Статистика</span>
    </Link>
  )}