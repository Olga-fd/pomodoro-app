import sound from '../sound/sound.mp3'
//Функция добавления звукового сигнала
export function soundClick() {
  const audio = new Audio(); // Создаём новый элемент Audio
  audio.src = sound; // Указываем путь к звуку "клика"
  audio.autoplay = true; // Автоматически запускаем
}