
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const currentTimeText = document.getElementById("currentTime");
const durationText = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");
const autoplay = document.getElementById("autoplay");
const art = document.getElementById("art");

const songs = [
    {
        title: "Summer Vibes",
        artist: "Artist One",
        file: "songs/song1.mp3",
        art: "🌅"
    },
    {
        title: "Dream Music",
        artist: "Artist Two",
        file: "songs/song2.mp3",
        art: "🌙"
    },
    {
        title: "Happy Days",
        artist: "Artist Three",
        file: "songs/song3.mp3",
        art: "🎸"
    },
    {
        title: "Relaxing Melody",
        artist: "Artist Four",
        file: "songs/song4.mp3",
        art: "🌊"
    }
];

let currentSong = 0;

// Display song information
function loadSong(index) {
    currentSong = index;

    audio.src = songs[currentSong].file;
    title.textContent = songs[currentSong].title;
    artist.textContent = songs[currentSong].artist;
    art.textContent = songs[currentSong].art;

    progress.value = 0;
    currentTimeText.textContent = "0:00";
    durationText.textContent = "0:00";

    showPlaylist();
}

// Play or pause music
function playPause() {
    if (audio.paused) {
        audio.play().then(() => {
            playBtn.textContent = "⏸";
        }).catch(() => {
            playBtn.textContent = "▶";
            alert("Cannot play this song. Check the audio file.");
        });
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

// Play next song
function nextSong() {
    loadSong((currentSong + 1) % songs.length);
    playPause();
}

// Play previous song
function previousSong() {
    loadSong(
        (currentSong - 1 + songs.length) % songs.length
    );
    playPause();
}

// Show all songs in the playlist
function showPlaylist() {
    playlist.innerHTML = "";

    songs.forEach((song, index) => {
        const li = document.createElement("li");

        li.textContent = song.art + " " +
            song.title + " - " + song.artist;

        if (index === currentSong) {
            li.classList.add("active");
        }

        li.addEventListener("click", () => {
            loadSong(index);
            playPause();
        });

        playlist.appendChild(li);
    });
}

// Format seconds as minutes and seconds
function formatTime(seconds) {
    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return minutes + ":" + String(secs).padStart(2, "0");
}

// Update the progress bar
audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value =
            (audio.currentTime / audio.duration) * 100;

        currentTimeText.textContent =
            formatTime(audio.currentTime);
    }
});

// Show total duration
audio.addEventListener("loadedmetadata", () => {
    durationText.textContent = formatTime(audio.duration);
});

// Move to the selected position
progress.addEventListener("input", () => {
    if (audio.duration) {
        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});

// Volume control
volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
});

// Update play button when music starts or stops
audio.addEventListener("play", () => {
    playBtn.textContent = "⏸";
});

audio.addEventListener("pause", () => {
    playBtn.textContent = "▶";
});

// Play the next song when current song ends
audio.addEventListener("ended", () => {
    if (autoplay.checked) {
        nextSong();
    } else {
        playBtn.textContent = "▶";
    }
});

// Start the player
audio.volume = Number(volume.value);
loadSong(0);
