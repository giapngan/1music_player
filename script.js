const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const playListBox = document.querySelector(".playlist-box");
const nameSong = document.querySelector(".info-song .song-name");
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
 
songs = ['ava max not your barbie girl' ,'kiseki', 'tiger jk reset', 'walking in the sun']   

let songIndex = 3;

// Khoi chay so bai hat o trong thu muc

loadSong(songs[songIndex]);

// Thay doi bai hat khi bam nut tien hoac lui
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Chuong trinh chay bai hat khi bam nut to o giua
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Chuc nang tam dung bai hat
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Quay ve bai hat truoc do
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Tien toi bai hat tiep theo
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// thanh tien trinh phat bai hat chay duoc bao nhieu phan tram
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// chúc năng hiện ra thanh màu hồng
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//lay thoi gian dang chay cua bai hat
function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// dinh nghia phut
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// dinh nghia giay
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// thay doi thoi gian
	currentTime.innerHTML = min +':'+ sec;

	// dinh nghia so phut cua bai hat
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// dinh nghia so giay cua bai hat
	
	get_sec_d (duration);

	// in ra thong tin thoi gian bai hat
	duration.innerHTML = min_d +':'+ sec_d;
		
};

// Theo doi su kien nut dung hay chay bai hat
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  } 
});

// thay doi bai hat
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// cap nhat thoi gian bai hat
audio.addEventListener('timeupdate', updateProgress);

// Bam vao dong trang thai bai hat
progressContainer.addEventListener('click', setProgress);

// Bai hat ket thuc
audio.addEventListener('ended', nextSong);

// Thoi gian cua bai hat
audio.addEventListener('timeupdate',DurTime);
