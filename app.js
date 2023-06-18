import Timer from "./timer.js"

const tempoDisplay = document.querySelector(".tempo")
const tempoText = document.querySelector(".tempo-text")
const decreaseTempoBtn = document.querySelector(".decrease-tempo")
const increaseTempoBtn = document.querySelector(".increase-tempo")
const tempoSlider = document.querySelector(".slider")
const startStopBtn = document.querySelector(".start-stop")
const subtractBeats = document.querySelector(".subtract-beats")
const addBeats = document.querySelector(".add-beats")
const measureCount = document.querySelector(".measure-count")

const click1 = new Audio("metronome-strong-pulse.mp3")
const click2 = new Audio("./metronome-weak-pulse.mp3")

let bpm = 140
let beatsPerMeasure = 4
let count = 0
let isRunning = false
let tempoTextString = "The Riff Realm"

decreaseTempoBtn.addEventListener("click", () => {
    if (bpm <= 20) {return}
    bpm--
    validateTempo()
    updateMetronome()
})

increaseTempoBtn.addEventListener("click", () => {
    if (bpm >= 280) {return}
    bpm++
    validateTempo()
    updateMetronome()
})

tempoSlider.addEventListener("input", () => {
    bpm = tempoSlider.value
    validateTempo()
    updateMetronome()
})

subtractBeats.addEventListener("click", () => {
    if (beatsPerMeasure <= 2) {return}
    beatsPerMeasure--
    measureCount.textContent = beatsPerMeasure
    count = 0
})

addBeats.addEventListener("click", () => {
    if (beatsPerMeasure >= 12) {return}
    beatsPerMeasure++
    measureCount.textContent = beatsPerMeasure
    count = 0
})

startStopBtn.addEventListener("click", () => {
    count = 0
    if (!isRunning) {
        metronome.start()
        isRunning = true
        startStopBtn.textContent = "STOP"
    } else {
        metronome.stop()
        isRunning = false
        startStopBtn.textContent = "START"
    }
})

function updateMetronome() {
    tempoDisplay.textContent = bpm
    tempoSlider.value = bpm

    metronome.timeInterval = 60000 / bpm

    if (bpm <= 40) tempoTextString = "Funeral Doom"
    else if (bpm <= 80) tempoTextString = "Glacial"
    else if (bpm <= 120) tempoTextString = "The Chunky Zone"
    else if (bpm <= 160) tempoTextString = "The Riff Realm"
    else if (bpm <= 200) tempoTextString = "Shred"
    else if (bpm <= 240) tempoTextString = "Blast"
    else tempoTextString = "Skin Blistering"

    tempoText.textContent = tempoTextString
}

function validateTempo() {
    if (bpm <= 20) {return}
    if (bpm >= 280) {return}
}

function playClick() {
    if (count === beatsPerMeasure) {
        count = 0
    }
    if (count === 0) {
        click1.play()
        click1.currentTime = 0
    } else {
        click2.play()
        click2.currentTime = 0
    }
    count++
}

const metronome = new Timer(playClick, 60000 / bpm, { immediate: true })

metronome.start()