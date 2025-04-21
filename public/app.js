const voiceSelect = document.querySelector('#voiceSelect')
const playBtn = document.querySelector('#play_btn')
const textInput = document.querySelector('textarea')

// Play TTS
playBtn.addEventListener('click', ()=> {
     const utterance = new SpeechSynthesisUtterance(textInput.value)
     speechSynthesis.speak(utterance)
})