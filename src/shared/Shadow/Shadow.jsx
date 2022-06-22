import React from "react";
import { useSelector } from "react-redux";
import './shadow.css';

export function Shadow() {
  const lightTheme = useSelector(state => state.lightTheme); 
  return (
    <div className={`shadow ${lightTheme 
                                ? 'shadow--light'
                                : 'shadow--dark'
                              }`
                    }
    ></div>
  );
}