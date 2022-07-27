import React from 'react';
import { MenuItemsList } from './MenuItemsList';
import './menulistbtn.css';

export function MenuListBtn() {
  return (
    <div className="dropdown">
      <MenuItemsList/>
    </div>
  );
}
