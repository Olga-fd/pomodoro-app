import React from 'react';
//import ReactDOM from 'react-dom';
import { MenuItemsList } from './MenuItemsList';
import './menulistbtn.css';

export function MenuListBtn({rect}) {
  return (
    <div className="dropdown">
      <MenuItemsList/>
    </div>
  );
}


//   <div className="dropdown" style={{
//     left: rect.x - rect.width*2,
//     top: rect.y + 40
//   }}>
//     <MenuItemsList/>
//   </div>
