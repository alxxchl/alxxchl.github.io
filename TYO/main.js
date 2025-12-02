const AREA_CONFIG = {
  Asakusa: {
    image: "asakusa.jpg",
  },
  Shinjuku: {
    image: "shinjuku.jpg",
  },
  Ginza: {
    image: "ginza.jpg",
  },
  Roppongi: {
    image: "roppongi.jpg",
  },
  Marunouchi: {
    image: "marunouchi.jpg",
  },
  Yanaka: {
    image: "yanaka.jpg",
  },
  Omotesando: {
    image: "omotesando.jpg",
  },
  Ebisu: {
    image: "ebisu.jpg",
  },
  Nakano: {
    image: "nakano.jpg",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".page");
  const strips = Array.from(document.querySelectorAll(".strip"));
  const topNav = document.getElementById("topNav");
  const navAreaTitle = document.getElementById("navAreaTitle");
  const navBackButton = document.getElementById("navBackButton");

  strips.forEach(strip => {
    const areaId = strip.dataset.areaId;
    const config = AREA_CONFIG[areaId];
    if (config && config.image) {
      strip.style.backgroundImage = `url('${config.image}')`;
    }
  });

  let activeStrip = null;

  strips.forEach(strip => {
    strip.addEventListener("click", () => {
      const alreadyActive = strip.classList.contains("is-active");

      if (alreadyActive) return;

      setActiveStrip(strip);
    });
  });

  navBackButton.addEventListener("click", () => {
    resetToCollapsedState();
  });

  function setActiveStrip(strip) {
    page.classList.add("has-expanded");
    topNav.classList.add("is-expanded");

    if (activeStrip) {
      activeStrip.classList.remove("is-active");
    }

    activeStrip = strip;
    activeStrip.classList.add("is-active");

    const title = strip.dataset.title || "";
    navAreaTitle.textContent = title;
  }

  function resetToCollapsedState() {
    page.classList.remove("has-expanded");
    topNav.classList.remove("is-expanded");

    if (activeStrip) {
      activeStrip.classList.remove("is-active");
      activeStrip = null;
    }
  }
});