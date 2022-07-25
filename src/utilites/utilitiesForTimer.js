import sound from '../sound/sound.mp3'
//Функция добавления звукового сигнала
export function soundClick() {
  const audio = new Audio(); // Создаём новый элемент Audio
  audio.src = sound; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}

export function getUnfinishedTime(display) {
  let total = display.innerText.split(":");
  total = parseInt(total[0] * 60) + parseInt(total[1]);
  let initialTime = JSON.parse(sessionStorage.timeTomato) * 60;
  let remnant = initialTime - total;
  sessionStorage.setItem('unfinished_time', remnant)
}

//Добавляем нули в таймере при одиночном "формате"
export function addZero (num) {
  if (num <= 9) {
    return '0' + num;
  } else {
    return num;
  }
};

export function getNumOfWeek() {
  let date = new Date();
  let day = date.getDay();
  let firstJan = new Date(date.getFullYear(),0,1);
  if (firstJan == 0) firstJan = 7;
  if (day == 0) day = 7;
  let daysForFirstWeek = 7 - (7 - firstJan.getDay() + 1);
  let daysForLastWeek = 7 - day;
  let numberOfDays = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  let result = (daysForFirstWeek + numberOfDays + daysForLastWeek + 1) / 7;
  return result
}
