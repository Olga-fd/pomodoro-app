import React, {useEffect, useState} from 'react';
import { MoonIcon } from '../Icons/MoonIcon';
import { SunIcon } from '../Icons/SunIcon';
import { useDispatch } from 'react-redux';
import './theme.css';

export function Theme() {
  const [isLightTheme, setLightTheme] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLightTheme) {
      dispatch({
        type: 'SET_THEME',
        theme: true
      })
    } else {
      dispatch({
        type: 'SET_THEME',
        theme: false
      })
    }
    
  }, [isLightTheme])
  
  return (
    <button className='size' onClick={() => setLightTheme(!isLightTheme)}>
      {isLightTheme
        ? <MoonIcon/>
        : <SunIcon/>
      }
    </button>
  )
}