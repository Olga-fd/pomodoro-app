import React from 'react';

export function Button({className, title, onClick, disabled}) {
  return (
    <button className={className} 
            onClick={() => {onClick()}}
            disabled={disabled}
    > 
      {title}
    </button>
  )
}