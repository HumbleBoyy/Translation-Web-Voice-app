const voiceSelect = document.querySelector('#voiceSelect')
const playBtn = document.querySelector('#play_btn')
const textInput = document.querySelector('#text_input')
const languageSelect = document.querySelector('#language_select')

//  Array of supported languages with their ISO codes
const languages = [
    {code:"uz", name:"Uzbek"},
    {code:"en", name:"English"},
    {code:"es", name:"Spanish"},
    {code:"fr", name:"French"},
    {code:"de", name:"German"},
    {code:"it", name:"Italian"},
    {code:"ja", name:"Japanese"},
    {code:"zh-CN", name:"Chinese (Simplified)"},
];

// Populate language select box
languages.forEach(({code, name})=> {
    const option = document.createElement('option')
    option.value = code;
    option.textContent = name;
    languageSelect.appendChild(option)
})
//  Load available voices
let voices = [];
function loadVoices(){
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = voices.map((item, index)=> 
        ` <option value="${index}">${item.name}</option>`
    ).join('')
}

//  Trigger loading voices
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();
// Play TTS
playBtn.addEventListener('click', ()=> {
     const utterance = new SpeechSynthesisUtterance(textInput.value);
     const selectedVoice = voices[voiceSelect.value];
     if(selectedVoice) {
        utterance.voice = selectedVoice
     }
     speechSynthesis.speak(utterance)
})