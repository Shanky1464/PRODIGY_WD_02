var startStopButton = document.getElementById("startStop");
var resetButton = document.getElementById("reset");
var lapButton = document.getElementById("lap");
var display = document.getElementById("display");
var para = document.getElementById("para");

var timer;
var startTime;
var elapsedTime = 0;
var running = false;
var lapCounter = 0;

startStopButton.onclick = () => {
    if (!running) {
        startStopButton.innerText = "Stop";
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateDisplay, 1);
        running = true;
    } else {
        startStopButton.innerText = "Start";
        elapsedTime = Date.now() - startTime;
        clearInterval(timer);
        running = false;
    }
};

resetButton.onclick = () => {
    startStopButton.innerText = "Start";
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    display.innerText = "00:00:00.000";
    para.innerHTML = "";  // Clear the lap times
    lapCounter = 0;
};

lapButton.onclick = () => {
    if (running) {
        lapCounter++;
        var lapTime = formatTime(elapsedTime);
        para.innerHTML += `Lap ${lapCounter}: ${lapTime}<br>`;
    }
};

function updateDisplay() {
    elapsedTime = Date.now() - startTime;

    display.innerText = formatTime(elapsedTime);
}

function formatTime(time) {
    var milliseconds = parseInt((time % 1000), 10);
    var seconds = parseInt((time / 1000) % 60, 10);
    var minutes = parseInt((time / (1000 * 60)) % 60, 10);
    var hours = parseInt((time / (1000 * 60 * 60)) % 24, 10);

    milliseconds = milliseconds < 100 ? (milliseconds < 10 ? '00' + milliseconds : '0' + milliseconds) : milliseconds;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    hours = hours < 10 ? '0' + hours : hours;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
}
