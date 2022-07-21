import React from 'react';
import { MenuItemsList } from './MenuItemsList';
import './menulistbtn.css';

export function MenuListBtn({ref}) {
  return (
    <div className="dropdown" ref={ref}>
      <MenuItemsList/>
    </div>
  );
}
