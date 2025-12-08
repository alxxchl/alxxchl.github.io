
const cities = [
  {
    id: "tokyo",
    name: "Tokyo",
    bannerColor: "#f6cd3b",
    mainTitleSrc: "tyo/nextstop_tyo_blk.png", 
    cityTitleSrc: "tyo/tyo_wht.png", 
    heroImageSrc: "tyo_cover.jpg", 
    detailPage: "tyo/index.html", 
  },
  {
    id: "la",
    name: "Los Angeles",
    bannerColor: "#ffffff", 
    mainTitleSrc: "lax/nextstop_lax_blk.png",
    cityTitleSrc: "lax/lax_wht.png",
    heroImageSrc: "lax_cover.jpg",
    detailPage: "lax/index.html",
  },
  {
    id: "shanghai",
    name: "Shanghai",
    bannerColor: "#a1ff00",
    mainTitleSrc: "sha/nextstop_sha_blk.png",
    cityTitleSrc: "sha/sha_wht.png",
    heroImageSrc: "sha_cover.jpg",
    detailPage: "sha/index.html",
  },
  {
    id: "grindelwald",
    name: "Grindelwald",
    bannerColor: "#f2ff00",
    mainTitleSrc: "grindelwald/nextstop_grindelwald_blk.png",
    cityTitleSrc: "grindelwald/grindelwald_wht.png",
    heroImageSrc: "grindelwald_cover.jpg",
    detailPage: "grindelwald/index.html",
  },
  {
    id: "osa",
    name: "Osaka",
    bannerColor: "#ff0000",
    mainTitleSrc: "osa/nextstop_osa_blk.png",
    cityTitleSrc: "osa/osa_wht.png",
    heroImageSrc: "osa_cover.jpg",
    detailPage: "osa/index.html",
  },
  {
    id: "spk",
    name: "Sapporo",
    bannerColor: "#ffffff",
    mainTitleSrc: "spk/nextstop_spk_red.png",
    cityTitleSrc: "spk/spk_wht.png",
    heroImageSrc: "spk_cover.jpg",
    detailPage: "spk/index.html",
  },
  {
    id: "par",
    name: "Paris",
    bannerColor: "#2f7e51",
    mainTitleSrc: "par/nextstop_par_blk.png",
    cityTitleSrc: "par/par_wht.png",
    heroImageSrc: "par_cover.jpg",
    detailPage: "par/index.html",
  },
  {
    id: "lnd",
    name: "London",
    bannerColor: "#ffe100",
    mainTitleSrc: "lnd/nextstop_lnd_blk.png",
    cityTitleSrc: "lnd/lnd_wht.png",
    heroImageSrc: "lnd_cover.jpg",
    detailPage: "lnd/index.html",
  },
  {
    id: "sel",
    name: "Seoul",
    bannerColor: "#fffebd",
    mainTitleSrc: "sel/nextstop_sel_blk.png",
    cityTitleSrc: "sel/sel_wht.png",
    heroImageSrc: "sel_cover.jpg",
    detailPage: "sel/index.html",
  },

];

function pickRandomCity() {
  if (cities.length === 0) return null;
  if (cities.length === 1) return cities[0]; 
  const lastCityId = localStorage.getItem("lastCityId");
  let city;

  do {
    const index = Math.floor(Math.random() * cities.length);
    city = cities[index];
  } while (city.id === lastCityId);

  localStorage.setItem("lastCityId", city.id);

  return city;
}

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("banner");
  const mainTitleImage = document.getElementById("mainTitleImage");
  const hero = document.getElementById("hero");
  const cityTitleImage = document.getElementById("cityTitleImage");

  const city = pickRandomCity();
  if (!city) return;

  banner.style.backgroundColor = city.bannerColor;
  mainTitleImage.src = city.mainTitleSrc;
  hero.style.backgroundImage = `url('${city.heroImageSrc}')`;
  cityTitleImage.src = city.cityTitleSrc;
  cityTitleImage.alt = city.name;

  hero.addEventListener("click", () => {
    window.location.href = city.detailPage;
  });
});