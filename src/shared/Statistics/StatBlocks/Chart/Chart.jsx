import React, {useState, useEffect, useRef} from "react";
import tomato from '../../../../images/tomato2.svg';
import './chart.css';
//style={"display: block; box-sizing: border-box; height: 279.489px; width: 562.842px;"}

export function Chart() {
  const [heights, setHeights] = useState(['5px', '5px', '5px', '5px', '5px', '5px', '5px']);
  let data = JSON.parse(localStorage.getItem('data'));
  
  useEffect(() => {
    if (data !== null) {
      setHeights(['200px', '50px', '3px', '30px', '60px', '56px', '33px']);
    }
  }, []);

  // const canvasRef = useRef(null);

  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // const draw = (ctx) => {
  //   ctx.fillStyle = '#f4f4f4';
  //   ctx.fillRect(0, 0, 952, 420);
  //   ctx.strokeStyle = '#cdcdcd';
  //   ctx.lineWidth = 1;
    
  //   ctx.beginPath();
  //   ctx.moveTo(0,84);
  //   ctx.lineTo(843,84);
  //   ctx.stroke();
  //   ctx.font = "48px serif";
  // ctx.fillText("Hello world", 10, 50);
  //   ctx.moveTo(0,166);
  //   ctx.lineTo(843,166);
  //   ctx.stroke();
  //   ctx.moveTo(0,249);
  //   ctx.lineTo(843,249);
  //   ctx.stroke();
  //   ctx.moveTo(0,332);
  //   ctx.lineTo(843,332);
  //   ctx.stroke();  
  //   ctx.save();
  //   // ctx.fillStyle = '#ea8a79';
  //   // ctx.fillRect(56, 40, 77, 420);

  //   // for (let i = 2; i = 4; i++){
  //   //   //ctx.beginPath();
  //   //   ctx.moveTo(0,84*i);
  //   //   ctx.lineTo(843,84*i);
  //   //   ctx.stroke();
  //   // }
   
  //   ctx.translate(0, canvasRef.current.height);
  //   ctx.rotate(-Math.PI / 2);
  // }

  // useEffect(() => {
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
    
  // useEffect(() => {
  //   let animation;
  //   let week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  //   let modified = data.map((el, index) => el[0][`${week[index]}`].time)
  //   const render = () => {
  //     setHeight(`${data[0][0][1].time}px`);
  //     animation = window.requestAnimationFrame(render)
  //   }
  //   render()
    
  //   return () => {
  //     window.cancelAnimationFrame(animation)
  //   }
  // }, [data, height])
  
  return (
    // <canvas ref={canvasRef} width="843" height="420" >${height ? 'parent-height' : ''
    //   <img className="tomato" src={tomato} alt='Помидор' />
    // </canvas>
    <>
      {heights.map((height, index) =>
        <div className={`initial ${parseInt(height) > 5 ? 'colored': ''}`} 
             style={{ height: `${height}` }}
             data-num={index + 1}>
        </div> 
      )}
    </>
  )
}
