function checkCompatibilty() {
    if (!('speechSynthesis' in window)) {
        alert('Your browser is not supported. If it is Google Chrome, please upgrade!!');
    }
};

checkCompatibilty();

var voiceOptions = document.getElementById('voiceOptions');

var voiceMap = [];

function speak(text) {
    var msg = new SpeechSynthesisUtterance();
    msg.volume = 1;
    msg.voice = voiceMap[voiceOptions.value];
    msg.rate = 0.8;
    msg.Pitch = 1;
    msg.text = text;
    setTimeout(function() {
        window.speechSynthesis.speak(msg);
    }, 1000);
};
function loadVoices() {
    voiceOptions.innerHTML = '';
    var voices = speechSynthesis.getVoices();
    for (var i = 0; i < voices.length; i++) {
        var voice = voices[i];
        var option = document.createElement('option');
        option.value = voice.name;
        option.innerHTML = voice.name;
        voiceOptions.appendChild(option);
        voiceMap[voice.name] = voice;
    };
};

window.speechSynthesis.onvoiceschanged = function (e) {
    loadVoices();
};