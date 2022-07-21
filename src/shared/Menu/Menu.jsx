import React, {useState, useRef} from 'react';
import { MenuIcon } from '../Icons/MenuIcon';
import { DropDown } from './DropDown/DropDown';
import { MenuListBtn } from './MenuItemsList/MenuListBtn';
import './menu.css';

export function Menu() {
  const [isDropOpened, setIsDropOpened] = useState(false);
  const ref = useRef(null);
  
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
          <MenuListBtn/>
        )
      }
      </DropDown>
    </div>
  );
}
 