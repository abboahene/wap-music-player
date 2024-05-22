const audio = document.getElementById("audio");
const mainPlayImg = document.getElementById("main-play-btn");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const repeatAll = document.getElementById("repeat-all");
const repeatOne = document.getElementById("repeat-one");
const shuffle = document.getElementById("shuffle");

const songTitleDiv = document.getElementById("song-title");
const artistNameDiv = document.getElementById("artist-name");

const playerContainer = document.getElementById("player-container");
const inputRange = document.getElementById("song-range-input");

let currentSong = {};
let audioPlayingMode = "repeat-all";

function changeAudio(thisArg, songPath) {
  if (thisArg === currentSong.imgElement) {
    if (audio.paused) {
      audio.play();
      thisArg.src = "./assets/svgs/pause-primary.svg";
      mainPlayImg.src = "./assets/svgs/pause.svg";
    } else {
      audio.pause();
      thisArg.src = "./assets/svgs/play-primary.svg";
      mainPlayImg.src = "./assets/svgs/play.svg";
    }
    return;
  }
  if (currentSong && currentSong.imgElement) {
    currentSong.imgElement.src = "./assets/svgs/play-primary.svg";
  }
  audio.src = `http://localhost:3000/${songPath}`;
  console.log(thisArg);
  thisArg.src = "./assets/svgs/pause-primary.svg";
  mainPlayImg.src = "./assets/svgs/pause.svg";

  //find song
  const everySong = [...allSongs, ...allPlaylistSongs];
  currentSong.data = everySong.find((s) => s.path === songPath);
  currentSong.imgElement = thisArg;

  songTitleDiv.textContent = currentSong.data.title;
  artistNameDiv.textContent = currentSong.data.singer;
  audio.load();
  audio.play();
}

function playAudio() {
  var audio = document.getElementById("myAudio");
  audio.play();
}

function pauseAudio() {
  var audio = document.getElementById("myAudio");
  audio.pause();
}

// main controls
mainPlayImg.addEventListener("click", function toggleAudioPlay() {
  if (!currentSong.data) return;
  if (audio.paused) {
    audio.play();
    this.src = "./assets/svgs/pause.svg";
    currentSong.imgElement.src = "./assets/svgs/pause-primary.svg";
  } else {
    audio.pause();
    this.src = "./assets/svgs/play.svg";
    currentSong.imgElement.src = "./assets/svgs/play-primary.svg";
  }
});

// play next song
next.addEventListener("click", function playNext() {
  if (!currentSong.data) return;

  const currentSongIndex = allPlaylistSongs.findIndex(
    (s) => s.id === currentSong.data.id
  );
  if (currentSongIndex + 1 > allPlaylistSongs.length - 1) {
    return;
  }
  const nextSong = allPlaylistSongs[currentSongIndex + 1];
  const nextSongImgEl = document.getElementById(
    `pp${(nextSong.title + nextSong.singer + nextSong.id).replace(" ", "")}`
  );
  changeAudio(nextSongImgEl, nextSong.path);
});

// play prev song
prev.addEventListener("click", function playPrev() {
  if (!currentSong.data) return;

  const currentSongIndex = allPlaylistSongs.findIndex(
    (s) => s.id === currentSong.data.id
  );
  if (currentSongIndex - 1 < 0) {
    return;
  }
  const prevSong = allPlaylistSongs[currentSongIndex - 1];
  const prevSongImgEl = document.getElementById(
    `pp${(prevSong.title + prevSong.singer + prevSong.id).replace(" ", "")}`
  );
  changeAudio(prevSongImgEl, prevSong.path);
});

// repeat all songs
repeatAll.addEventListener("click", function playNext() {
  audioPlayingMode = "repeat-one";
  repeatAll.style.display = "none";
  shuffle.style.display = "none";
  repeatOne.style.display = "inline";
});

// repeat one song
repeatOne.addEventListener("click", function loop() {
  audioPlayingMode = "shuffle";
  repeatAll.style.display = "none";
  repeatOne.style.display = "none";
  shuffle.style.display = "inline";
});

// shuffle
shuffle.addEventListener("click", function loop() {
  audioPlayingMode = "repeat-all";
  shuffle.style.display = "none";
  repeatOne.style.display = "none";
  repeatAll.style.display = "inline";
});

//audio has ended
audio.addEventListener("ended", () => {
  currentSong.imgElement.src = "./assets/svgs/play-primary.svg";
  //if for repeat all
  const currentSongIndex = allPlaylistSongs.findIndex(
    (s) => s.id === currentSong.data.id
  );
  if (audioPlayingMode === "repeat-all") {
    if (!currentSong.data) return;
    if (currentSongIndex + 1 > allPlaylistSongs.length - 1) {
      if (!allPlaylistSongs || !allPlaylistSongs[0]) return;
      const nextSong = allPlaylistSongs[0];
      const nextSongImgEl = document.getElementById(
        `pp${(nextSong.title + nextSong.singer + nextSong.id).replace(" ", "")}`
      );
      changeAudio(nextSongImgEl, nextSong.path);
      return;
    }
    const nextSong = allPlaylistSongs[currentSongIndex + 1];
    const nextSongImgEl = document.getElementById(
      `pp${(nextSong.title + nextSong.singer + nextSong.id).replace(" ", "")}`
    );
    changeAudio(nextSongImgEl, nextSong.path);

    //if for repeat one
  } else if (audioPlayingMode === "repeat-one") {
    audio.play();
    //if for shuffle
  } else if (audioPlayingMode === "shuffle") {
    
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * allPlaylistSongs.length);
    } while (randomIndex === currentSongIndex);

    const nextSong = allPlaylistSongs[randomIndex];
    const nextSongImgEl = document.getElementById(
      `pp${(nextSong.title + nextSong.singer + nextSong.id).replace(" ", "")}`
    );
    changeAudio(nextSongImgEl, nextSong.path);
  }
});

// update the range slider as the audio plays
audio.addEventListener("timeupdate", () => {
  const value = (audio.currentTime / audio.duration) * 100;
  inputRange.value = value;
  playerContainer.style.setProperty(
    "--input-range-before-width",
    (inputRange.value / inputRange.max) * 100 + "%"
  );
});

// move to the new position when the range slider is changed
inputRange.addEventListener("input", () => {
  const newTime = (inputRange.value / 100) * audio.duration;
  audio.currentTime = newTime;
});
