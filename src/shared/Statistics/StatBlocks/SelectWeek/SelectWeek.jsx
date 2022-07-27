import React, {useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import {setNumberOfWeek, setSelectedDay} from "../../../../store/store";
import './selectweek.css';

export function SelectWeek() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectSelected, setSelectSelected] = useState("Эта неделя");
  const dispatch = useDispatch();
  useEffect(() => setIsSelected(isSelected), [isSelected]);

  useEffect(() => {
    const divOptions = Array.from(document.querySelectorAll('.select-items div'));
    const text = document.querySelector('.text-punch');
    
    let found = divOptions.find(div => div.innerText === selectSelected);
    found.classList.add('select-hide');
    dispatch(setNumberOfWeek(found.dataset.week));
    dispatch(setSelectedDay(''));
    let filtered = divOptions.filter(div => div.innerText !== selectSelected);
    filtered.forEach(div => div.classList.remove('select-hide'));
    if (text) text.classList.remove('text-punch');
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
        <div data-week="0" onClick={(e) => {
                            setSelectSelected(e.target.innerHTML); 
                            handleClick()}}
        >
          Эта неделя
        </div>
        <div data-week="1" onClick={(e) => {
                              setSelectSelected(e.target.innerHTML); 
                              handleClick()}}
        >
          Прошедшая неделя
        </div>
        <div data-week="2" onClick={(e) => {
                              setSelectSelected(e.target.innerHTML); 
                              handleClick()}}
        >
          2 недели назад
        </div>
      </div>
    </div>
  )
}
