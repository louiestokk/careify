"use strict";
const bokaBtn = document.querySelector(".boka-tid-btn");
const bokaTiderContainer = document.querySelector(".boka-tid-container");
const cart = document.querySelector(".cart");
const renderQliniqs = async () => {
  try {
    const resp = await fetch("vardcentral.json");
    const data = await resp.json();
    const { klinik } = data;
    buildBoard(klinik);
  } catch (error) {
    console.error(error);
  }
};
renderQliniqs();
const buildBoard = (klinik) => {
  let nummer = 0;
  for (let x = 0; x < klinik.length; x++) {
    const div = document.createElement("div");
    div.classList.add("bokahollare");
    const klinikname = document.createElement("h5");
    klinikname.classList.add("klinikname");
    const klinikadress = document.createElement("p");
    klinikadress.classList.add("klinikadress");
    const kliniktime = document.createElement("p");
    kliniktime.classList.add("klinikadress");
    klinikname.textContent = klinik[x].name;
    klinikadress.textContent = klinik[x].adress;
    kliniktime.innerHTML = `${klinik[x].oppet} <i class="fas fa-phone-square"></i> <i class="fas fa-calendar-check"></i>`;
    kliniktime.classList.add(x);
    bokaTiderContainer.append(klinikname);
    bokaTiderContainer.append(klinikadress);
    bokaTiderContainer.append(kliniktime);
  }
  document.querySelectorAll(".fa-phone-square").forEach((el) => {
    el.addEventListener("click", (e) => {
      let num = 0;
      num = parseInt(el.parentElement.className.substr(13));
      nummer = parseInt(klinik[num].number);
      callNumber(nummer);
    });
  });
  document.querySelectorAll(".fa-calendar-check").forEach((calend) => {
    calend.addEventListener("click", (e) => {
      renderCalender(
        calend.parentElement.previousSibling.previousSibling.textContent
      );
    });
  });
};

bokaBtn.addEventListener("click", () => {
  bokaTiderContainer.classList.remove("hide");
  document.querySelector(".ettan").classList.add("hide");
  bokaTiderContainer.scrollIntoView({ behavior: "smooth" });
});

document.querySelector(".close").addEventListener("click", () => {
  bokaTiderContainer.classList.add("hide");
  document.querySelector(".ettan").classList.remove("hide");
});

const callNumber = (number) => {
  window.open(`tel:+${number}`);
};
const apointmentContainer = document.querySelector(".apoointment-container");
const renderCalender = (el, text) => {
  window.open("https://buk.app/stokk-ltd");
};

document.querySelector(".halso-test-btn").addEventListener("click", (e) => {
  window.open(
    "https://response.alexit.se/?language=SE&accountId=3085201&hj=t&w=null"
  );
});

document.querySelector(".input").addEventListener("input", (e) => {
  apointmentContainer.classList.remove("hidden");
});
document.querySelector(".stang").addEventListener("click", () => {
  apointmentContainer.classList.add("hidden");
  document.querySelector(".input").value = "";
});

cart.addEventListener("click", () => {
  location.href = "kassa.html";
});
