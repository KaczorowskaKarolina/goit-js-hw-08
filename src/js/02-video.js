// // Pobieranie elementu <iframe> o określonym ID
// var vimeoPlayer = document.getElementById('vimeo-player');

// // Funkcja, która zapisuje aktualny czas odtwarzania wideo w local storage
// function savePlaybackTime() {
//   // Pobieranie aktualnego czasu odtwarzania wideo
//   var currentTime = vimeoPlayer.currentTime;

//   // Zapisywanie czasu w local storage
//   localStorage.setItem('playbackTime', currentTime);
// }

// // Funkcja, która odtwarza wideo od zapisanego momentu
// function playFromSavedTime() {
//   // Sprawdzanie, czy czas jest zapisany w local storage
//   if (localStorage.getItem('playbackTime')) {
//     // Pobieranie zapisanego czasu
//     var savedTime = parseFloat(localStorage.getItem('playbackTime'));

//     // Ustawianie czasu odtwarzania wideo na zapisany moment
//     vimeoPlayer.currentTime = savedTime;
//   }
// }

// // Wywołanie funkcji savePlaybackTime przy każdej zmianie czasu odtwarzania wideo
// vimeoPlayer.addEventListener('timeupdate', savePlaybackTime);

// // Wywołanie funkcji playFromSavedTime przy ładowaniu strony
// window.addEventListener('load', playFromSavedTime);


import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', function(data) {
    const currentTime = data.seconds;
    localStorage.setItem('videoplayer-current-time', currentTime);
  });

  const savedTime = localStorage.getItem('videoplayer-current-time');
  player.setCurrentTime(savedTime);

  function updateTime(currentTime) {
    localStorage.setItem('videoplayer-current-time', currentTime);
  }
  
  const throttledUpdateTime = throttle(updateTime, 1000); // 1000 ms = 1s
  
  player.on('timeupdate', function(data) {
    const currentTime = data.seconds;
    throttledUpdateTime(currentTime);
  });

  
