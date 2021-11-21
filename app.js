const song = document.querySelector('.song');
const play = document.querySelector('.play');
const stopButton = document.querySelector('.stop');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');

const sounds = document.querySelectorAll('.sound-picker button');

const timeDisplay = document.querySelector('.time-display');
const timeSelect = document.querySelectorAll('.time-select button');

const outlineLength = outline.getTotalLength();

let fakeDuration = 300;
let currentTime = 0;

outline.style.strokeDasharray = outlineLength;
outline.style.strokeDashoffset = outlineLength;

init();

function init() {

    play.addEventListener('click', () => {
        togglePlay();
    });

    stopButton.addEventListener('click', () => {
        stopIt();
    });

    // Called often, use like update
    song.ontimeupdate = () => {
        currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        seconds = seconds > 9 ? seconds : '0' + seconds;
        let minutes = Math.floor(elapsed / 60);
        
        // Animate circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate counter
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            pauseIt();
            song.currentTime = 0;
        }
    }

    // Add funcitonality to time select buttons
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            fakeDuration = this.getAttribute("data-time"); 
            if (!song.paused) return;  
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${'0' + Math.floor(fakeDuration % 60).toString()}`;     
        });
    });

    // Associate audio and video with there respective buttons
    sounds.forEach(sound => {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            
            togglePlay();
            song.currentTime = currentTime
        });
    });
}

function togglePlay() {
    if (song.paused) {
        playIt();
    } else {
        pauseIt();
    }
};

function pauseIt() {
    song.pause();
    play.src = './svg/play.svg';
    video.pause();
}

function playIt() {
    song.play();
    play.src = './svg/pause.svg';
    video.play();
}

function stopIt() {
    pauseIt();
    song.currentTime = 0;
}
