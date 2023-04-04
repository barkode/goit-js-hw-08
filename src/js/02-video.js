import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
const CURRENT_TIME_KEY = 'videoplayer-current-time';
const DELAY_KEY = 1000;

const iframe = document.querySelector('iframe');

const player = new Player(iframe);
const getCurrentTime = localStorage.getItem(CURRENT_TIME_KEY);

if (getCurrentTime) {
  player.setCurrentTime(getCurrentTime);
}

player.on('timeupdate', throttle(currentTime, DELAY_KEY));

function currentTime(data) {
  let currentTime = Math.round(data.seconds);
  localStorage.setItem(CURRENT_TIME_KEY, currentTime);
}
