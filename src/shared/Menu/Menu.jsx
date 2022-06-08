import React, {useState, useRef} from 'react';
import { MenuIcon } from '../Icons/MenuIcon';
import { DropDown } from './DropDown/DropDown';
import { MenuListBtn } from './MenuItemsList/MenuListBtn';
import './menu.css';

export function Menu() {
  const [isDropOpened, setIsDropOpened] = useState(false);
  const ref = useRef(null);
  const rect = ref.current?.getBoundingClientRect();

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
          <MenuListBtn rect={rect}/>
        )
      }
      </DropDown>
    </div>
  );
}
  

{/* <div className={s.execution__info}>
  <button id={index} onClick={this.handleModal} className={s.execution__button}>откликнуться</button>
  {this.state.showModal && <Modal handleModal={this.handleModal} /> }
  <p className={s.execution__participants}>0 участников</p>
</div>

handleModal = () => {
  this.setState({showModal: !this.state.showModal})
} */}