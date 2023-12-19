window.addEventListener("DOMContentLoaded", () => {
  const tabs = require("./modules/tabs"),
    timer = require("./modules/timer"),
    modalWindow = require("./modules/modalWindow"),
    menuCards = require("./modules/menuCards"),
    complex = require("./modules/complexSlider"),
    calculator = require("./modules/calculator");

  tabs();
  timer();
  modalWindow();
  menuCards();
  complex();
  calculator();
});
