const SPOTS = {
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
  "männlichen": {
    title: "Männlichen",
    image: "männlichen.jpg",
    body:
      "Männlichen is a popular viewing mountain accessible by a long, scenic cable car from Grindelwald Terminal, renowned for its family-friendly trails and supreme views of the 'Big Three' mountains: Eiger, Mönch, and Jungfrau. It is worth visiting for the famous and relatively easy 'Royal Walk,' which leads to a crowned viewing platform at the summit for a 360-degree panorama. You can go to start the panoramic trail to Kleine Scheidegg, or simply take the short, 20-minute Royal Walk to the peak to feel like royalty overlooking the dramatic Bernese Alps."
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const floatingArea = document.getElementById("floatingArea");
  const cards = Array.from(document.querySelectorAll(".spot-card"));

  const overlay = document.getElementById("spotOverlay");
  const overlayBackdrop = document.getElementById("spotOverlayBackdrop");
  const panel = document.getElementById("spotPanel");
  const panelImage = document.getElementById("spotPanelImage");
  const panelTitle = document.getElementById("spotPanelTitle");
  const panelBody = document.getElementById("spotPanelBody");
  const panelClose = document.getElementById("spotClose");

  positionCardsRandomly(floatingArea, cards);

  cards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.spotId;
      const config = SPOTS[id];
      if (!config) return;

      openSpot(config);
    });
  });

  function closeSpot() {
    overlay.classList.remove("is-open");
    page.classList.remove("has-open-spot");
  }

  panelClose.addEventListener("click", closeSpot);
  overlayBackdrop.addEventListener("click", closeSpot);

  function openSpot(config) {
    panelImage.style.backgroundImage = `url('${config.image}')`;
    panelTitle.textContent = config.title;
    panelBody.textContent = config.body;

    overlay.classList.add("is-open");
    page.classList.add("has-open-spot");
  }

  function positionCardsRandomly(container, cards) {
    const rect = container.getBoundingClientRect();
    const placed = [];

    cards.forEach(card => {
      const cardRect = getCardSize(card);
      const maxAttempts = 80;
      let attempt = 0;
      let placedPos = null;

      while (attempt < maxAttempts && !placedPos) {
        attempt++;

        const margin = 20;
        const topMin = margin;
        const topMax = rect.height - cardRect.height - margin - 80;
        const leftMin = 0;
        const leftMax = rect.width - cardRect.width - margin;

        const top = randomBetween(topMin, topMax);
        const left = randomBetween(leftMin, leftMax);

        const candidate = {
          top,
          left,
          width: cardRect.width,
          height: cardRect.height
        };

        if (!intersectsAny(candidate, placed)) {
          placedPos = candidate;
        }
      }

      const finalPos = placedPos || {
        top: 0,
        left: 0,
        width: cardRect.width,
        height: cardRect.height
      };

      card.style.top = `${finalPos.top}px`;
      card.style.left = `${finalPos.left}px`;

      placed.push(finalPos);
    });
  }

  function getCardSize(card) {
    const width = card.offsetWidth || 260;
    const height = card.offsetHeight || 260;
    return { width, height };
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
    return list.some(item => intersects(candidate, item));
  }
});