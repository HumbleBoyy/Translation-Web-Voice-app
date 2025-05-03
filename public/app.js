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

// Translate Text with serverless function
async function translateText(text, targetLang) {
    try{
        const response = await fetch('/api/translate', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                text,
                target: targetLang
            })
        })

        if(!response.ok){
            throw new Error(`Error ${response.status}: ${await response.text()}`)
        }

        const data = await response.json();
        return data.data.translations[0].transLatedText;
    }catch(error){
       console.error("Translations Error", error)
    //    alert("Failed to translate text")
       return text
    }
}

function playText(text, voiceIndex){
    const utterance = new SpeechSynthesisUtterance(text);
    if(voices[voiceIndex]){
        utterance.voice = voices[voiceIndex]
    }
    speechSynthesis.speak(utterance)
}

// Play TTS
playBtn.addEventListener('click', async ()=> {
     const text = textInput.value.trim();
     const targetLang = languageSelect.value;
     const selectedVoiceIndex = voiceSelect.value

     if(!text){
        alert("Please enter some text")
        return
     }

     try{
       // Translate Text
       const translatedText = await translateText(text, targetLang)
       playText(translatedText, selectedVoiceIndex)
     
    }catch(error){
       console.error("Error during processing", error)
    //    alert("An Error Occured")
     }
})



// How to read text inside input with google voices
// playBtn.addEventListener('click',  ()=> {
//     const utterance = new SpeechSynthesisUtterance(textInput.value);
//     const selectedVoice = voices[voiceSelect.value];
//     if(selectedVoice) {
//        utterance.voice = selectedVoice
//     }
//     speechSynthesis.speak(utterance)
// })