// get vid to pause if no sound
// switching audio tracks dosen't reset timer
// If changing duration plays the tune it should restart

const song = document.querySelector('.song');
const play = document.querySelector('.play');
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
        togglePlay(song);
    });

    // Called every frame??, use like update
    song.ontimeupdate = () => {
        currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        // Animate circle
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        // Animate counter
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {
            stopIt(song);
            song.currentTime = 0;
        }
    }

    // Add funcitonality to time select buttons
    timeSelect.forEach(option => {
        option.addEventListener("click", function() {
            fakeDuration = this.getAttribute("data-time");   
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${'0' + Math.floor(fakeDuration % 60).toString()}`;     
        });
    });

    // Choose audio track
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
        stopIt();
    }
};

function stopIt() {
    song.pause();
    play.src = './svg/play.svg';
    video.pause();
}

function playIt() {
    song.play();
    play.src = './svg/pause.svg';
    video.play();
}

function swapIt(){
    console.log('Swapping');
}
