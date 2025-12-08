var SPOTS = {
  "eiffel-tower": {
    title: "Eiffel Tower",
    image: "eiffel-tower.jpg",
    body:
      "The Eiffel Tower is the symbol of Paris, originally built for the 1889 World's Fair. It is worth visiting for its unmatched views over the city and its nightly light show. You can go to climb or take the elevator to the viewing platforms, enjoy a 360-degree panorama, and watch the tower sparkle on the hour after dark."
  },
  "the-louvre-museum": {
    title: "The Louvre Museum",
    image: "the-louvre-museum.jpg",
    body:
      "The Louvre is the world's largest art museum and a former royal palace. It is worth visiting for its vast collection, from ancient civilizations to masterpieces like the Mona Lisa and the Venus de Milo. You can go to walk through its historic courtyards, explore its glass pyramid entrance, and focus on a few key wings instead of trying to see everything in one visit."
  },
  "arc-de-triomphe": {
    title: "Arc de Triomphe",
    image: "arc-de-triomphe.jpg",
    body:
      "The Arc de Triomphe is a monumental arch commissioned by Napoleon to honor the French army. It is worth visiting for its powerful reliefs and for the view from the rooftop. You can go to stand at the center of the Place Charles de Gaulle, watch the crazy traffic circle below, and climb to the top to look straight down the Champs-Élysées."
  },
  "champs-elysees": {
    title: "Champs-Élysées",
    image: "champs-elysees.jpg",
    body:
      "The Champs-Élysées is Paris's most famous avenue, stretching from the Arc de Triomphe toward the Tuileries Garden. It is worth visiting as a classic promenade lined with shops, cinemas, and cafés. You can go to stroll the boulevard, pop into flagship stores, and continue on foot toward the Seine and central Paris landmarks."
  },
  "notre-dame-cathedral": {
    title: "Notre-Dame Cathedral",
    image: "notre-dame-cathedral.jpg",
    body:
      "Notre-Dame is a Gothic masterpiece standing on the Île de la Cité in the heart of Paris. It is worth visiting for its dramatic façade, rose windows, and riverside setting, even while restoration continues after the 2019 fire. You can go to admire the exterior details, walk around the island, and take in views of the cathedral from the nearby bridges and riverbanks."
  },
  "sacred-heart-of-montmartre": {
    title: "Montmartre & Sacré-Cœur",
    image: "sacred-heart-of-montmartre.jpg",
    body:
      "Montmartre is a hilltop neighborhood once home to artists like Picasso and Toulouse-Lautrec, crowned by the white Sacré-Cœur Basilica. It is worth visiting for its village-like streets and sweeping views. You can go to climb the steps (or take the funicular), sit on the basilica steps overlooking the city, and wander the side streets away from the busiest tourist spots."
  },
  "orsay-museum": {
    title: "Musée d'Orsay",
    image: "orsay-museum.jpg",
    body:
      "Musée d'Orsay is an art museum housed in a former Beaux-Arts railway station on the Left Bank. It is worth visiting for its world-class collection of Impressionist and Post-Impressionist works. You can go to see paintings by Monet, Van Gogh, Degas, and Renoir, and enjoy the building itself, including the giant clock windows that look out over the Seine."
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