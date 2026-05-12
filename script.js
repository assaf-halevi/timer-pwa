let timer;
let remainingSeconds = 300;

const timerElement = document.getElementById("timer");
const plusBtn = document.getElementById("plusBtn");
const minusBtn = document.getElementById("minusBtn");
const closeBtn = document.getElementById("closeBtn");

function playStartSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.value = 880;

    gain.gain.value = 0.08;

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();

    osc.stop(audioCtx.currentTime + 0.15);
}

function playEndSound() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();

    const gain = audioCtx.createGain();

    osc1.type = "sine";
    osc2.type = "sine";

    osc1.frequency.value = 880;
    osc2.frequency.value = 1320;

    gain.gain.value = 0.08;

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();

    osc1.stop(audioCtx.currentTime + 0.4);
    osc2.stop(audioCtx.currentTime + 0.4);
}

function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    timerElement.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
}

function startTimer(playSound = false) {
    clearInterval(timer);

    if (playSound) {
        playStartSound();
    }

    updateDisplay();

    timer = setInterval(() => {

        remainingSeconds--;

        updateDisplay();

        if (remainingSeconds <= 0) {

            clearInterval(timer);

            playEndSound();

            setTimeout(() => {

                window.close();

                document.body.innerHTML = `
                    <div style="
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        height:100vh;
                        font-size:32px;
                        font-family:sans-serif;
                        background:#222;
                        color:white;
                    ">
                        הטיימר הסתיים
                    </div>
                `;

            }, 700);
        }

    }, 1000);
}

plusBtn.addEventListener("click", () => {
    remainingSeconds += 30;
    startTimer(false);
});

minusBtn.addEventListener("click", () => {
    remainingSeconds = Math.max(30, remainingSeconds - 30);
    startTimer(false);
});

closeBtn.addEventListener("click", () => {
    clearInterval(timer);
    window.close();
});

window.addEventListener("load", () => {

    setTimeout(() => {
        startTimer(true);
    }, 150);

});

updateDisplay();