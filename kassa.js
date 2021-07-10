"use strict";
const vara = document.querySelector(".vara");
const pris = document.querySelector(".pris");
const antal = document.querySelector(".antal");
const payBtn = document.querySelector(".pay");

const belopp = document.querySelector(".belopp");
let price = 199;
let num = 1;
let tot = 199;
price = 199;
antal.innerHTML = `${parseInt(num)}st <i class="fas fa-plus-square"></i>`;
belopp.innerHTML = `${parseInt(tot)}kr`;
pris.innerHTML = `${price}kr`;
vara.textContent = "Covid-19 Test";
payBtn.innerHTML = `Betala ${price}kr`;
antal.addEventListener("click", () => {
  num++;
  if (num > 5) return;
  antal.innerHTML = `${parseInt(num)}st <i class="fas fa-plus-square"></i>`;
  belopp.innerHTML = `${parseInt(tot * num)}kr`;
  payBtn.innerHTML = `Betala ${tot * num}kr`;
});

const payFunction = (sum) => {
  if (window.PaymentRequest) {
    // if it is supported on the users browser

    //   payment request object
    const supportedPaymentMethods = [
      {
        supportedMethods: ["basic-card"],
      },
    ];
    //   payment details(cost/currency)
    const paymentdetails = {
      total: {
        label: "Att Betala",
        amount: {
          currency: "SEK",
          value: sum,
        },
      },
    };

    //   custom options
    const options = {};

    //   create request
    const paymentRequest = new PaymentRequest(
      supportedPaymentMethods,
      paymentdetails,
      options
    );
    paymentRequest
      .show()
      .then((payment) => console.log(payment))
      .catch((error) => console.log(error));
  } else {
    // fallback to your other implementation
  }
};

payBtn.addEventListener("click", (e) => {
  let btn1 = e.target.textContent.substr(6);
  payFunction(parseInt(btn1.substr(1, 3)));
});
