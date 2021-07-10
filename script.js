"use strict";
const productContainer = document.querySelector(".corona-test-prod-container");
let count = document.querySelector(".count");
let num = 0;
const key = "8c345229b3cb4964bce436c658f439d5";

let map = document.getElementById("map");
function getGeoCoord() {
  navigator.geolocation.getCurrentPosition(
    function (pos) {
      const { latitude, longitude } = pos.coords;
      getAdress(latitude, longitude);
      map = L.map("map").setView([latitude, longitude], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([latitude, longitude]).addTo(map);
    },
    function (err) {
      console.log(err);
    }
  );
}
getGeoCoord();
const getAdress = async (lat, lon) => {
  try {
    let adress;
    const resp = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${key}`
    );
    const data = await resp.json();
    data.results.forEach((el) => {
      adress = el.formatted;
    });
    document.querySelector(".mottagning").innerHTML = adress;
    let city = adress.split(",");

    let myCity = city[2].substr(8);
  } catch (error) {
    console.error(error);
  }
};

document.querySelector(".covidVaccin-btn").addEventListener("click", (e) => {
  window.open(
    "https://www.vgregion.se/ov/vaccinationstider/bokningsbara-tider/"
  );
});

document.querySelector(".visa-testerna-btn").addEventListener("click", (e) => {
  document.querySelector(".villbe").classList.add("hidden");
  productContainer.classList.remove("hidden");
});

document.querySelector(".buy-btn").addEventListener("click", (e) => {
  document.querySelector(".cart").classList.remove("hide");
  ++num;
  count.innerHTML = `${parseInt(num)}`;
  e.target.classList.add("hide");
  document.querySelector(".varukorg-btn").classList.remove("hide");
});

document.querySelector(".varukorg-btn").addEventListener("click", (e) => {
  document.querySelector(".cart").scrollIntoView({ behavior: "smooth" });
});
