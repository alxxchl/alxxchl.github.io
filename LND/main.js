var SPOTS = {
  "the-tower-of-london": {
    title: "The Tower of London",
    image: "the-tower-of-london.jpg",
    body:
      "The Tower of London is a historic castle located on the north bank of the River Thames, steeped in nearly a millennium of history as a royal residence, treasury, arsenal, and infamous prison. It is worth visiting to dive deep into Britain's royal and often gruesome past. You can go to witness the dazzling Crown Jewels exhibition, take a tour guided by a Yeoman Warder (Beefeater), and learn about famous figures like Anne Boleyn and the legendary ravens."
  },
  "westminster-abbey": {
    title: "Westminster Abbey",
    image: "westminster-abbey.jpg",
    body:
      "Westminster Abbey is a stunning Gothic church and a UNESCO World Heritage Site that has been the coronation church for British monarchs since 1066. It is worth visiting to marvel at its magnificent architecture and to experience the profound historical weight of the nation. You can go to explore the tombs of 17 monarchs, including Elizabeth I, visit Poets' Corner where literary greats like Charles Dickens and Jane Austen are buried, and see the Coronation Chair."
  },
  "the-british-museum": {
    title: "The British Museum",
    image: "the-british-museum.jpg",
    body:
      "The British Museum is one of the world's most renowned museums, showcasing human history, art, and culture from every continent. It is worth visiting because of its vast and free-to-enter collection spanning millions of years of human civilization. You can go to see priceless artifacts like the Rosetta Stone, the Parthenon Sculptures, and the mummies in the Egyptian Gallery."
  },
  "buckingham-palace": {
    title: "Buckingham Palace",
    image: "buckingham-palace.jpg",
    body:
      "Buckingham Palace is the official London residence and administrative headquarters of the monarch of the United Kingdom. It is worth visiting to witness the pomp and ceremony associated with the British royalty. You can go to watch the spectacular Changing of the Guard ceremony on the forecourt, and during the summer months, you can purchase tickets to tour the opulent State Rooms."
  },
  "the-london-eye": {
    title: "The London Eye",
    image: "the-london-eye.jpg",
    body:
      "The London Eye is a massive cantilevered observation wheel located on the South Bank of the River Thames. It is worth visiting for the best 360-degree views of the city's landmarks. You can go to take a 30-minute ride in one of its glass capsules, from which you can spot up to 40 kilometers on a clear day, identifying iconic sites like the Houses of Parliament and St. Paul's Cathedral."
  },
  "borough-market": {
    title: "Borough Market",
    image: "borough-market.jpg",
    body:
      "Borough Market is London's most historic and celebrated food market, located beneath the railway lines near London Bridge. It is worth visiting for its incredible variety of fresh produce, gourmet foods, and international street food stalls. You can go to sample artisan cheeses, freshly baked goods, and exotic cuisines, making it a perfect spot for lunch or for discovering unique food souvenirs."
  },
  "trafalgar-square": {
    title: "Trafalgar Square",
    image: "trafalgar-square.jpg",
    body:
      "Trafalgar Square is a famous public space and a major cultural center, known for its colossal Nelson's Column and lion statues. It is worth visiting as the heart of London, offering great photo opportunities and often hosting public events. You can go to visit the National Gallery, which sits on the square's north side, to view masterpieces of European painting, including works by Van Gogh, Da Vinci, and Monet (entry to the main collection is free)."
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