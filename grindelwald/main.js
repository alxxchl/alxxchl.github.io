var SPOTS = {
  "jungfraujoch": {
    title: "JUNGFRAUJOCH",
    image: "jungfraujoch.jpg",
    body:
      "Jungfraujoch is the highest railway station in Europe, situated at 3,454 meters, offering a year-round snowy experience and jaw-dropping views over the Aletsch Glacier, a UNESCO World Heritage Site. It is worth visiting because it is a once-in-a-lifetime journey to the heart of the Alps, accessible via a stunning train ride through the Eiger mountain. You can go to walk through the magical Ice Palace, step out onto the Sphinx Observation Deck for panoramic views, and enjoy snow activities even in the summer months."
  },
  "grindelwald-first": {
    title: "Grindelwald First",
    image: "grindelwald-first.jpg",
    body:
      "Grindelwald First, often called the Top of Adventure, is the most accessible peak and activity hub directly above the village, reached by a scenic gondola ride. It is worth visiting as the ultimate playground for thrilling mountain experiences while offering spectacular views of the Eiger North Face. You can go to enjoy a variety of high-octane activities known as the First Mountain Activities, including the First Flyer zip line, the First Glider, and zooming down the slopes on a Mountain Cart or Trottibike Scooter."
  },
  "bachalpsee": {
    title: "Bachalpsee",
    image: "bachalpsee.jpg",
    body:
      "Bachalpsee is a pristine alpine lake famous for its mirror-like reflections of the Schreckhorn and other snowy peaks, making it one of Switzerland's most photographed spots. It is worth visiting as it is the most rewarding and accessible classic hike in the area, offering quintessential Swiss alpine scenery. You can go to take the easy, approximately one-hour-long hike from the Grindelwald First station, enjoy a tranquil picnic by the clear blue waters, and capture the perfect reflection photo, especially in the early morning."
  },
  "gletscherschlucht": {
    title: "Gletscherschlucht",
    image: "gletscherschlucht.jpg",
    body:
      "Carved out over millions of years by the Lower Grindelwald Glacier, this narrow gorge features 300-meter-high sheer rock walls and the rushing Lütschine River at the bottom. It is worth visiting for the immersive sensory experience of walking deep inside the mountain's core, feeling the raw power of nature. You can go to explore the kilometer-long steel catwalks and tunnels built into the rock, watch waterfalls cascade down, and for the adventurous, climb onto the Spiderweb net suspended high above the water."
  },
  "mannlichen": {
    title: "Männlichen",
    image: "mannlichen.jpg",
    body:
      "Männlichen is a popular viewing mountain accessible by a long, scenic cable car from Grindelwald Terminal, renowned for its family-friendly trails and supreme views of the 'Big Three' mountains: Eiger, Mönch, and Jungfrau. It is worth visiting for the famous and relatively easy 'Royal Walk,' which leads to a crowned viewing platform at the summit for a 360-degree panorama. You can go to start the panoramic trail to Kleine Scheidegg, or simply take the short, 20-minute Royal Walk to the peak to feel like royalty overlooking the dramatic Bernese Alps."
  }
};

document.addEventListener("DOMContentLoaded", function () {
  var page = document.querySelector(".page");
  var floatingArea = document.getElementById("floatingArea");
  var cards = document.querySelectorAll(".spot-card");

  var overlay = document.getElementById("spotOverlay");
  var overlayBackdrop = document.getElementById("spotOverlayBackdrop");
  var panel = document.getElementById("spotPanel");
  var panelImage = document.getElementById("spotPanelImage");
  var panelTitle = document.getElementById("spotPanelTitle");
  var panelBody = document.getElementById("spotPanelBody");
  var panelClose = document.getElementById("spotClose");

  positionCardsRandomly(floatingArea, cards);

  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
      var id = this.getAttribute("data-spot");
      var config = SPOTS[id];

      if (!config) {
        return;
      }

      openSpot(config);
    });
  }

  function openSpot(config) {
    panelImage.style.backgroundImage = "url('" + config.image + "')";
    panelTitle.textContent = config.title;
    panelBody.textContent = config.body;

    overlay.classList.add("is-open");
    page.classList.add("has-open-spot");
  }

  function closeSpot() {
    overlay.classList.remove("is-open");
    page.classList.remove("has-open-spot");
  }

  panelClose.addEventListener("click", closeSpot);
  overlayBackdrop.addEventListener("click", closeSpot);


  function positionCardsRandomly(container, cardsNodeList) {
    var rect = container.getBoundingClientRect();
    var placed = [];

    for (var i = 0; i < cardsNodeList.length; i++) {
      var card = cardsNodeList[i];
      var size = getCardSize(card);

      var maxAttempts = 80;
      var margin = 20;

      var topMin = margin;
      var topMax = rect.height - size.height - margin - 80;
      var leftMin = 0;
      var leftMax = rect.width - size.width - margin;

      var chosen = null;

      for (var attempt = 0; attempt < maxAttempts; attempt++) {
        var top = randomBetween(topMin, topMax);
        var left = randomBetween(leftMin, leftMax);

        var candidate = {
          top: top,
          left: left,
          width: size.width,
          height: size.height
        };

        if (!intersectsAny(candidate, placed)) {
          chosen = candidate;
          break;
        }
      }

      if (!chosen) {
        chosen = {
          top: margin,
          left: margin + i * 20,
          width: size.width,
          height: size.height
        };
      }

      card.style.top = chosen.top + "px";
      card.style.left = chosen.left + "px";

      placed.push(chosen);
    }
  }

  function getCardSize(card) {
    var width = card.offsetWidth;
    var height = card.offsetHeight;

    if (!width || !height) {
      if (card.classList.contains("vertical")) {
        width = 230;
        height = 360;
      } else {
        width = 260;
        height = 260;
      }
    }

    return { width: width, height: height };
  }

  function randomBetween(min, max) {
    if (max <= min) {
      return min;
    }
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function intersects(a, b) {
    return !(
      a.left + a.width <= b.left ||
      b.left + b.width <= a.left ||
      a.top + a.height <= b.top ||
      b.top + b.height <= a.top
    );
  }

  function intersectsAny(candidate, list) {
    for (var i = 0; i < list.length; i++) {
      if (intersects(candidate, list[i])) {
        return true;
      }
    }
    return false;
  }
});