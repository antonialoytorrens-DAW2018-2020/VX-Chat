function creaGrafic(rq) {
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
    responsiveVoice.speak("You are in the statistical graphic section");
    var headerMessage = "In this graphic, you can see the 20th users that have typed more messages. It goes with the following order: ";
    var resultText = '';
    for (i in dades) {
      var speak = key[i] + ", with " + value[i] + "messages; ";
      var resultText = resultText + speak;
    }
    var speakMessage = headerMessage + resultText;
    setTimeout(function() {
      responsiveVoice.speak(speakMessage)
    }, 3000);

    new Chart(document.getElementById("graphic").getContext("2d"), {
      type: 'horizontalBar',
      data: {
        labels: key,
        datasets: [
          {
            label: "Message count: ",
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
          text: '20th users'
        }
      }
    });
  }
}