import React, {useState, useEffect} from "react";
import './selectweek.css';

export function SelectWeek() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectSelected, setSelectSelected] = useState("Эта неделя")
  
  useEffect(() => setIsSelected(isSelected), [isSelected]);

  useEffect(() => {
    const divOptions = Array.from(document.querySelectorAll('.select-items div'));
    let found = divOptions.find(div => div.innerText === selectSelected);
    found.classList.add('select-hide');
    let filtered = divOptions.filter(div => div.innerText !== selectSelected);
    filtered.forEach(div => div.classList.remove('select-hide'));
  }, [selectSelected]);
  
  function handleClick() {
    if (isSelected === false) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }
  return (
    <div className="custom-select">
      <div className={`select-selected ${isSelected 
                                          ? "select-arrow-active" 
                                          : ""
                                        }
      `} onClick={() => handleClick()}>
        {selectSelected}
      </div>
      <div className={`select-items ${isSelected ? "" : "select-hide"}`}>
        <div onClick={(e) => {setSelectSelected(e.target.innerHTML); handleClick()}}>
          Эта неделя
        </div>
        <div onClick={(e) => {setSelectSelected(e.target.innerHTML); handleClick()}}>
          Прошедшая неделя
        </div>
        <div onClick={(e) => {setSelectSelected(e.target.innerHTML); handleClick()}}>
          2 недели назад
        </div>
      </div>
    </div>
  )
}
