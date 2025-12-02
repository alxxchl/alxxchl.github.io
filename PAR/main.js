const SPOTS = {
  "eiffel-tower": {
    title: "Eiffel Tower",
    image: "eiffel-tower.jpg",
    body:
      "The Eiffel Tower is the undisputed symbol of Paris and France, originally built for the 1889 World's Fair. It is worth visiting because it is a monumental feat of engineering and offers the most iconic, unobstructed views of the entire City of Light. You can go to ascend to its three levels (by elevator or stairs) to enjoy a breathtaking 360-degree panorama, dine at one of its restaurants, and witness its spectacular hourly light show after dark."
  },
  "the-louvre-museum": {
    title: "The Louvre Museum",
    image: "the-louvre-museum.jpg",
    body:
      "Westminster Abbey is a stunning Gothic church and a UNESCO World Heritage Site that has been the coronation church for British monarchs since 1066. It is worth visiting to marvel at its magnificent architecture and to experience the profound historical weight of the nation. You can go to explore the tombs of 17 monarchs, including Elizabeth I, visit Poets' Corner where literary greats like Charles Dickens and Jane Austen are buried, and see the Coronation Chair."
  },
  "arc-de-triomphe": {
    title: "Arc de Triomphe",
    image: "arc-de-triomphe.jpg",
    body:
      "The British Museum is one of the world's most renowned museums, showcasing human history, art, and culture from every continent. It is worth visiting because of its vast and free-to-enter collection spanning millions of years of human civilization. You can go to see priceless artifacts like the Rosetta Stone, the Parthenon Sculptures, and the mummies in the Egyptian Gallery."
  },
  "champs-elysees": {
    title: "Champs-Élysées",
    image: "champs-elysees.jpg",
    body:
      "Buckingham Palace is the official London residence and administrative headquarters of the monarch of the United Kingdom. It is worth visiting to witness the pomp and ceremony associated with the British royalty. You can go to watch the spectacular Changing of the Guard ceremony on the forecourt, and during the summer months, you can purchase tickets to tour the opulent State Rooms."
  },
  "notre-dame-cathedral": {
    title: "Notre-Dame Cathedral",
    image: "notre-dame-cathedral.jpg",
    body:
      "The London Eye is a massive cantilevered observation wheel located on the South Bank of the River Thames. It is worth visiting for the best 360-degree views of the city's landmarks. You can go to take a 30-minute ride in one of its glass capsules, from which you can spot up to 40 kilometers on a clear day, identifying iconic sites like the Houses of Parliament and St. Paul's Cathedral."
  },
  "sacred-heart-of-montmartre": {
    title: "Montmartre & Sacré-Cœur",
    image: "sacred-heart-of-montmartre.jpg",
    body:
      "Borough Market is London's most historic and celebrated food market, located beneath the railway lines near London Bridge. It is worth visiting for its incredible variety of fresh produce, gourmet foods, and international street food stalls. You can go to sample artisan cheeses, freshly baked goods, and exotic cuisines, making it a perfect spot for lunch or for discovering unique food souvenirs."
  },
  "orsay-museum": {
    title: "Musée d'Orsay",
    image: "orsay-museum.jpg",
    body:
      "Trafalgar Square is a famous public space and a major cultural center, known for its colossal Nelson's Column and lion statues. It is worth visiting as the heart of London, offering great photo opportunities and often hosting public events. You can go to visit the National Gallery, which sits on the square's north side, to view masterpieces of European painting, including works by Van Gogh, Da Vinci, and Monet (entry to the main collection is free)."
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