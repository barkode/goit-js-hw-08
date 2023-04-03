import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');

const player = new Player(iframe);
const getCurrentTime = localStorage.getItem('videoplayer-current-time');

if (getCurrentTime) {
  player.setCurrentTime(getCurrentTime);
}

player.on('timeupdate', throttle(currentTime, 1000));

function currentTime(data) {
  let currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}
