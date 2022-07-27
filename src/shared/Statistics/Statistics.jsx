import React from "react";
import { Link } from "react-router-dom";
import "./statistics.css";

export function Statistics() {
  return (
    <Link to="/statistics" 
          className="flex-block btn-stat" 
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="none"/>
      </svg>
      <span className="equalizer">Статистика</span>
    </Link>
  )}