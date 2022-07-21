import React, {useState, useRef, useEffect} from 'react';
import { MenuIcon } from '../Icons/MenuIcon';
import { DropDown } from './DropDown/DropDown';
import { MenuListBtn } from './MenuItemsList/MenuListBtn';
import { useSelector } from 'react-redux/es/exports';
import './menu.css';

export function Menu() {
  const [isDropOpened, setIsDropOpened] = useState(false);
  const isModalOpened = useSelector(state => state.isModalOpened);
  const ref = useRef(null);
  const refClick = useRef(null);
  
  // useEffect(() => {
  //   function handleClick(event) {
  //     if (!isModalOpened && event.target instanceof Node 
  //           && !refClick.current.contains(event.target)
  //           && !ref.current.contains(event.target)
  //        ) 
  //     setIsDropOpened(false)
  //   }
    
  //   document.addEventListener('click', handleClick);
  //   return () => {
  //     document.removeEventListener('click', handleClick);
  //   }
  // }, [isModalOpened])

  return (
    <div className="menu">
      <DropDown 
        button={ 
          <button className="menuButton" 
                  onClick={() => {setIsDropOpened(true)}}
                  ref={ref}
          >
            <MenuIcon/>
          </button> 
        } 
      >
      {isDropOpened && (
          <MenuListBtn ref={refClick}/>
        )
      }
      </DropDown>
    </div>
  );
}
 