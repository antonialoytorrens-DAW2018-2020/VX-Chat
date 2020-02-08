function fadeIn(el, time) {
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

function scrollElementIntoViewTop(elmnt) {
  elmnt.scrollIntoView(true); // Top
}

function scrollElementIntoViewBottom(elmnt) {
  elmnt.scrollIntoView(false); // Bottom
}

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function showIt(el) {
  setTimeout(function () { el.setAttribute("style", "display: flex !important;") }, 1000);
  setTimeout(function () { el.setAttribute("style", "display: none !important;") }, 5000);
}

function speak(text) {
  window.speechSynthesis.cancel();
  var msg = new SpeechSynthesisUtterance();
  var voices = speechSynthesis.getVoices();

  for (var i = 0; i < voices.length; i++) {
    if (voices[i].lang == "es-ES" && voices[i].name == "Google español") {
      var android = "";
      var voice = voiceMap[voices[i].name];
      break;
    }
    if (voices[i].lang == "es-ES" || voices[i].lang == "es_ES") { // GOOGLE CHROME ANDROID uses es_ES
      var android = "";
      var voice = voiceMap[voices[i].name];
    }
  }

  if (android == undefined) {
    alert('Tu navegador no soporta español (es-ES) en síntesis de voz. Si es Google Chrome, por favor, actualízalo.');
  } else {
    msg.voice = voice;
    msg.volume = 1;
    msg.rate = 1.15;
    msg.pitch = 1;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }
}