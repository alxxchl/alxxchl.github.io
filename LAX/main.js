var SPOTS = {
  "row-dtla": {
    title: "ROW DTLA",
    image: "row_dtla.jpg",
    body:
      "ROW DTLA, formerly the historic Alameda Square produce complex, is a 30-acre adaptive reuse project located near the Arts District in Downtown Los Angeles, transforming old industrial warehouses into a vibrant, walkable urban environment. It serves as a creative hub featuring 1.3 million square feet of commercial workspace alongside a highly curated selection of 100 retail shops and acclaimed restaurants. The architecture preserves its century-old industrial character, including loading docks and raw interiors. A major draw is its culinary scene, which ranges from high-end dining like the two-Michelin-starred Hayato and the James Beard Award-winning KATO, to casual options like Pizzeria Bianco and the diverse vendors at Smorgasburg LA, a large open-air food market that takes over the 7th Street Produce Market every Sunday. ROW DTLA is a destination for fashion, art, and food, offering unique independent boutiques, public plazas, and a constant schedule of events."
  },
  "dtla": {
    title: "DTLA",
    image: "dtla.jpg",
    body:
      "Downtown Los Angeles (DTLA) is the city's rapidly evolving core, showcasing a diverse blend of historic architecture, modern skyscrapers, and distinct cultural districts. It serves as a hub for business, arts, and nightlife. DTLA is divided into areas such as the Arts District (known for its street art, galleries, breweries, and loft living), Historic Core (featuring stunning theaters and turn-of-the-century buildings like the Bradbury Building), and the Financial District. Key destinations include the striking architecture of the Walt Disney Concert Hall and the neighboring Broad Museum (home to contemporary art). The area also offers a mix of dining, from high-end restaurants to historic spots like Grand Central Market (a food hall), and numerous rooftop bars that provide views of the skyline. Other prominent features are the L.A. Live entertainment complex, the Fashion District, and the historic Angel's Flight funicular railway. DTLA's energy shifts throughout the day, moving from a bustling business center to a vibrant nightlife destination in the evenings."
  },
  "santa-monica": {
    title: "Santa Monica",
    image: "santamonica.jpg",
    body:
      "Santa Monica blends a classic Southern California beach town vibe with urban sophistication, anchored by the iconic Santa Monica Pier which features Pacific Park and marks the end of Route 66. The city is highly walkable, centered around the vibrant, pedestrian-only Third Street Promenade for shopping, street performers, and dining. Adjacent to the beach is Palisades Park offering serene ocean views from the bluffs. For different experiences, Main Street provides a relaxed, surf-culture atmosphere while Montana Avenue hosts upscale boutiques. The city emphasizes wellness, offering The Strand bike path and the Original Muscle Beach. Cultural attractions include the Bergamot Station arts complex, making Santa Monica an effortlessly chic destination that perfectly balances relaxation and energy."
  },
  "getty-center": {
    title: "Getty Center",
    image: "getty.jpg",
    body:
      "The Getty Center is a world-renowned cultural complex located in the hills above West Los Angeles, celebrated equally for its stunning modern architecture by Richard Meier, its extensive art collection, and its panoramic views of the city and the Pacific Ocean. Visitors begin their experience with a free tram ride up to the campus, which is built with white travertine stone. The J. Paul Getty Museum primarily focuses on European paintings, drawings, sculptures, and decorative arts from the Middle Ages to the 20th century, including famous works like Van Gogh's *Irises*, alongside 19th- to 21st-century photographs. Beyond the galleries, the complex is famous for its landscaped grounds, especially the Central Garden, a large, evolving botanical artwork designed by Robert Irwin. General admission to the Getty Center is always free, though there is a fee for parking. The Getty Trust also operates a separate location, the Getty Villa, which is dedicated to ancient Greek and Roman art."
  },
  "beverly-hills": {
    title: "Beverly Hills",
    image: "beverlyhills.jpg",
    body:
      "Beverly Hills is a world-renowned, affluent city in Los Angeles County, serving as a global symbol of luxury, wealth, and celebrity. Its most famous street is Rodeo Drive, an iconic, high-end shopping district lined with exclusive designer boutiques. The city is also defined by its legendary and opulent hotels, such as The Beverly Hills Hotel and the Beverly Wilshire, A Four Seasons Hotel. Beyond shopping and luxury accommodation, Beverly Hills boasts a concentration of world-class dining establishments and cultural sites like the Wallis Annenberg Center for the Performing Arts, with public art prominently displayed throughout areas like Beverly Gardens Park. Historically a rancho, the city was developed in the early 1900s and has since become synonymous with pop culture and the Hollywood elite."
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