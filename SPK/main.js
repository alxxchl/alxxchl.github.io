const SPOTS = {
  "maruyama": {
    title: "Maruyama",
    image: "maruyama.jpg",
    body:
      "Maruyama is a peaceful, green district in Sapporo that offers a blend of nature, culture, and upscale living, making it an attractive destination for visitors seeking a tranquil break from the city center. The area is dominated by Maruyama Park, a popular spot for outdoor activities and an excellent location for viewing cherry blossoms in the spring. Within the park is the Maruyama Zoo and the revered Hokkaido Shrine (Hokkaido Jingu), one of the most important Shinto shrines in the region, which draws both tourists and locals. Unlike the bustling downtown areas, Maruyama has a quieter, refined atmosphere, featuring many stylish small cafes, restaurants, and independent boutiques, catering to a more design-conscious crowd."
  },
  "jozankei": {
    title: "Jozankei",
    image: "jozankei.jpg",
    body:
      "Jozankei is a scenic onsen (hot spring) town southwest of Sapporo, widely known as Sapporo's backyard and a peaceful mountain retreat. Situated along the Toyohira River, the town is lined with numerous traditional Japanese inns and modern hotels offering access to natural, mineral-rich hot springs. Jozankei is celebrated for its spectacular natural beauty, particularly during autumn when it becomes a prime destination for viewing vibrant fall foliage. Visitors enjoy the tranquil atmosphere, crossing picturesque bridges, and relaxing far removed from the city bustle."
  },
  "otaru": {
    title: "Otaru",
    image: "otaru.jpg",
    body:
      "Otaru, located just northwest of Sapporo, is a charming port city famous for its beautifully preserved historic canal area, which evokes a nostalgic atmosphere of its 19th and early 20th-century prosperity as a major trade and finance center. The central Otaru Canal is the city’s most recognizable landmark, featuring old stone and brick warehouses that have been converted into museums, shops, and restaurants, and is particularly picturesque at twilight when gas lamps light the walkway. The city is renowned for its crafts, specifically glassware (especially the workshops along Sakaimachi Street), and its music boxes, with the Otaru Music Box Museum being a major attraction. Otaru is also a popular destination for seafood lovers, offering exceptionally fresh sushi and seafood bowls, and is known for its local sweets and unique confectioneries. The historical and romantic ambiance of Otaru makes it a popular day trip destination from Sapporo."
  },
  "susukino": {
    title: "Susukino",
    image: "susukino.jpg",
    body:
      "Susukino is the vibrant entertainment heart of Sapporo, often dubbed the Shinjuku of the North, and is Hokkaido's busiest nightlife and dining district. The area is ablaze with neon lights and hosts thousands of bars, restaurants, karaoke parlors, and nightclubs, making it the ideal place to experience Sapporo's evening atmosphere. Food is a core attraction here; visitors can sample the city's most representative dish, Sapporo miso ramen, at the famous Ramen Yokocho (Ramen Alley). Furthermore, the area offers easy access to the Sapporo Beer Garden, where guests can enjoy specialty Hokkaido cuisine like Genghis Khan (grilled mutton) and fresh beer in historic buildings. Whether you're looking to dive into local nightlife or find various Hokkaido delicacies, Susukino is Sapporo's liveliest and most essential district to explore."
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