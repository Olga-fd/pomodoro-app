export function changeColor(e) {
  const bars = document.querySelectorAll('.initial');
  const bar = document.querySelector('.colored-punch');
  const text = document.querySelector('.text-punch');
  if (bar && text) {
    bar.classList.remove('colored-punch');
    text.classList.remove('text-punch');
  } else if (text) {
    text.classList.remove('text-punch');
  }
   
  const day = e.target.dataset.id;
  const arr = Array.from(bars, bar => bar.dataset.num);
  let found = arr.findIndex(item => parseInt(item) === parseInt(day));
  if (bars[found].getBoundingClientRect().height > 5) {
    bars[found].classList.add('colored-punch');
  } 
  e.target.classList.add('text-punch');
}

export function getTime(length) {
  let hour, minutes;
  if (length > 0) {
    hour = Math.floor(length / 60);
    minutes = length - hour * 60;
    if (minutes > 0) {
        if (hour >= 5) {
        return (`${hour} часов ${minutes} минут`)
      } else if (hour >= 2) {
        return (`${hour} часа ${minutes} минут`)
      } else if (hour == 1 ) {
        return (`${hour} час ${minutes} минут`)
      } else {
        return (`${minutes} минут`)
      }
    } else {
      if (hour >= 5) {
        return (`${hour} часов`)
      } else if (hour >= 2) {
        return (`${hour} часа`)
      } else if (hour == 1 ) {
        return (`${hour} час`)
      }
    }
  }
}

export function getTimeShort(length) {
  let hour, minutes;
  if (length > 0) {
    if (length < 60) {
      return (`${length}c`)
    }
    hour = Math.floor(length / 3600);
    minutes = Math.floor((length - hour * 3600) / 60);
    if (minutes > 0) {
        if (hour >= 5) {
        return (`${hour}ч ${minutes}м`)
      } else if (hour >= 2) {
        return (`${hour}ч ${minutes}м`)
      } else if (hour == 1 ) {
        return (`${hour}ч ${minutes}м`)
      } else {
        return (`${minutes}м`)
      }
    } 
  } else {
    return 0
  }
}

export function conjugateTomato(quantity) {
  if (quantity == 0) {
    return (`Нет помидоров`)
  } else if (quantity == 1) {
    return (`${quantity} помидор`)
  } else if (quantity <= 4) {
    return (`${quantity} помидора`)
  } else if (quantity > 4) {
    return (`${quantity} помидоров`)
  }
}