var SPOTS = {
  "maruyama": {
    title: "Maruyama",
    image: "maruyama.jpg",
    body:
      "Maruyama is a peaceful green district featuring Maruyama Park, Hokkaido Shrine, and stylish cafés. It offers a calm contrast to Sapporo’s city center."
  },
  "jozankei": {
    title: "Jozankei",
    image: "jozankei.jpg",
    body:
      "Jozankei is Sapporo’s famous onsen valley, known for hot springs, riverside views, and beautiful seasonal foliage—especially stunning during autumn."
  },
  "otaru": {
    title: "Otaru",
    image: "otaru.jpg",
    body:
      "Otaru is a charming port town known for its canal, historic warehouses, glass workshops, and fresh seafood, making it a popular day trip from Sapporo."
  },
  "susukino": {
    title: "Susukino",
    image: "susukino.jpg",
    body:
      "Susukino is Sapporo’s bustling nightlife district filled with neon lights, bars, ramen alleys, and entertainment—famous for Sapporo miso ramen and vibrant evening energy."
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
      if (!config) return;

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

  function positionCardsRandomly(container, cardsList) {
    var rect = container.getBoundingClientRect();
    var placed = [];

    for (var i = 0; i < cardsList.length; i++) {
      var card = cardsList[i];
      var size = getCardSize(card);

      var maxAttempts = 80;
      var margin = 20;
      var chosen = null;

      var topMin = margin;
      var topMax = rect.height - size.height - margin - 80;
      var leftMin = 0;
      var leftMax = rect.width - size.width - margin;

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
    var w = card.offsetWidth;
    var h = card.offsetHeight;

    if (!w || !h) {
      if (card.classList.contains("vertical")) {
        w = 230; h = 360;
      } else {
        w = 260; h = 260;
      }
    }
    return { width: w, height: h };
  }

  function randomBetween(min, max) {
    if (max <= min) return min;
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
      if (intersects(candidate, list[i])) return true;
    }
    return false;
  }
});