import React from "react";

export function StatFooterItem({children, text, className, coloredFooter, title}) {
  return (
    <div className={`${className} ${coloredFooter ? '' : 'non-active'}`}>
      <div className="wrap">
        <p className="statFooter__title">{title}</p>
        <span className="statFooter__span">
          {text}
        </span>
      </div>
      {children}
    </div>
  )
}