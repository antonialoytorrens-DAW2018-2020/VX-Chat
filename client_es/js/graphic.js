function creaGrafic(rq) {

  function speak(text) {
    window.speechSynthesis.cancel();
    var msg = new SpeechSynthesisUtterance();
    var voices = speechSynthesis.getVoices();
  
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang == "es-ES" && voices[i].name == "Google español") {
        var voice = voiceMap[voices[i].name];
        break;
      }
      if (voices[i].lang == "es-ES" || voices[i].lang == "es_ES") { // GOOGLE CHROME ANDROID uses es_ES
        var voice = voiceMap[voices[i].name];
      }
    }
    msg.voice = voice;
    msg.volume = 1;
    msg.rate = 1.15;
    msg.pitch = 1;
    msg.text = text;
    window.speechSynthesis.speak(msg);
  }

  if (rq.readyState == 4 && rq.status == 200) {
    var resposta = JSON.parse(rq.responseText);
    var dades = resposta.dades;
    var key = [];
    var value = [];
    for (i in dades) {
      var nom = dades[i].nom;
      key.push(nom);
    }
    for (i in dades) {
      var nombre = dades[i].numeromissatges;
      value.push(nombre);
    }
    speak("Estás en la sección del gráfico estadístico");
    var headerMessage = "En este gráfico, puedes ver los primeros veinte usuarios que han escrito más mensajes, a partir del siguiente orden: ";
    var resultText = '';
    for (i in dades) {
      var speak = key[i] + ", con " + value[i] + "mensajes; ";
      var resultText = resultText + speak;
    }
    var speakMessage = headerMessage + resultText;
    setTimeout(function() {
      function speak(text) {
        window.speechSynthesis.cancel();
        var msg = new SpeechSynthesisUtterance();
        var voices = speechSynthesis.getVoices();
      
        for (var i = 0; i < voices.length; i++) {
          if (voices[i].lang == "es-ES" && voices[i].name == "Google español") {
            var voice = voiceMap[voices[i].name];
            break;
          }
          if (voices[i].lang == "es-ES" || voices[i].lang == "es_ES") { // GOOGLE CHROME ANDROID uses es_ES
            var voice = voiceMap[voices[i].name];
          }
        }
        msg.voice = voice;
        msg.volume = 1;
        msg.rate = 1.15;
        msg.pitch = 1;
        msg.text = text;
        window.speechSynthesis.speak(msg);
      }
      speak(speakMessage)
    }, 3500);

    new Chart(document.getElementById("graphic").getContext("2d"), {
      type: 'horizontalBar',
      data: {
        labels: key,
        datasets: [
          {
            label: "Recuento de mensajes: ",
            // LES DADES SEMPRE SERAN ELS VINT PRIMERS
            backgroundColor: ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'],
            data: value
          }
        ]
      },
      options: {
        legend: { display: false },
        title: {
          display: false,
          text: 'Los 20 usuarios'
        }
      }
    });
  }
}