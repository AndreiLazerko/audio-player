const player = document.querySelector('.player');
const backMain = document.querySelector('.fons');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const audio = document.querySelector('.audio');
const progressContainer = document.querySelector('.progress_container');
const progress = document.querySelector('.progress');
const title = document.querySelector('.song');
const titleAutor = document.querySelector('.title');
const cover = document.querySelector('.cover');
const coverImg = document.querySelector('.cover_img');
const imgScr = document.querySelector('.img_scr');
const nowTime = document.querySelector('.now');
const allTime = document.querySelector('.all');

// console.log(allTime )

// Все песни
const songs = ['Hotline Bling','Годы Неправды','Откровение', 'Счастье В Простом',  'Это пройдёт'];
const autors = ['Drake','Каста','Tony Tonite', 'Loc-Dog',  'Порнофильмы'];

// Начальная песня
let songIndex = 0;
let autorIndex = 0;

// Init
function loadSong(song, autor){
  title.innerHTML = song;
  titleAutor.innerHTML = autor;
  audio.src = `audio/${song}.mp3`;
  coverImg.src = `images/cover${songIndex + 1}.jpg`;
  backMain.src = `images/cover${songIndex + 1}.jpg`;

}
loadSong(songs[songIndex], autors[autorIndex])

// Play
function playSong(){
  player.classList.add('play');
  imgScr.src = './images/svg/pause.png'
  audio.play()
}

// Pause
function pauseSong(){
  player.classList.remove('play');
  imgScr.src = './images/svg/play.png'
  audio.pause()
}
playBtn.addEventListener('click', () =>{
  const isPlaying = player.classList.contains('play')
  if(isPlaying){
    pauseSong()
  }else playSong()
})

// Next song
function nextSong(){
  songIndex++;
  autorIndex++;

  if(songIndex > songs.length -1){
    songIndex = 0;
    autorIndex =0;
  }
  loadSong(songs[songIndex], autors[autorIndex]);
  playSong()
}
nextBtn.addEventListener('click', nextSong)

// Prev song 
function prevSong(){
  songIndex--;
  autorIndex--;

  if(songIndex < 0){
    songIndex = songs.length -1;
    autorIndex = autors.length -1
  }
  loadSong(songs[songIndex], autors[autorIndex]);
  playSong()
}
prevBtn.addEventListener('click', prevSong)

// Progress bar строка прогреса
function updateProgress(e){
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime/duration)*100;
  progress.style.width = `${progressPercent}%`;
  // console.log(duration.getMinutes())


  time = Math.floor(currentTime);
var minutes = Math.floor(time / 60);
var seconds = Math.floor(time - minutes * 60);
var minutesVal = minutes;
var secondsVal = seconds;
if(minutes < 10) {
minutesVal = '0' + minutes;
}
if(seconds < 10) {
secondsVal = '0' + seconds;
}
nowTime.innerHTML = minutesVal + ':' + secondsVal;

time = Math.floor(duration);
var minutes = Math.floor(time / 60);
var seconds = Math.floor(time - minutes * 60);

allTime.innerHTML = minutes + ':' + seconds;
}
audio.addEventListener('timeupdate',  updateProgress)

// Set progress перемотка
function setProgress(e){
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width)*duration;
}

progressContainer.addEventListener('click', setProgress)

// Autoplay
audio.addEventListener('ended', nextSong)