import tabs from "./modules/tabs.js";
import timer from "./modules/timer.js";
import modalWindowOpen from "./modules/modalWindow.js";
import menuCards from "./modules/menuCards.js";
import complex from "./modules/complexSlider.js";
import calculator from "./modules/calculator.js";
import form from "./modules/form.js";
import { openModal } from "./modules/modalWindow.js";

window.addEventListener("DOMContentLoaded", () => {
  // setTimeout open
  const timeoutOpenModal = setTimeout(() => {
    openModal(".modal", timeoutOpenModal);
  }, 3000);

  tabs(
    ".tabheader__items",
    ".tabheader__item",
    ".tabcontent",
    "tabheader__item_active"
  );
  timer(".timer", "2023-12-23T00:40:00");
  modalWindowOpen("[data-modal]", ".modal", ".modal__close", timeoutOpenModal);
  form(".modal", ".modal__dialog", timeoutOpenModal);
  menuCards("http://localhost:3000/menu", ".menu__field .container");
  complex({
    sliderSelector: ".offer__slider",
    sliderWrapper: ".offer__slider-wrapper",
    slide: ".offer__slide",
    buttonPrev: ".offer__slider-prev",
    buttonNext: ".offer__slider-next",
    current: "#current",
    total: "#total",
  });
  calculator(
    ".calculating__result",
    "#gender",
    ".calculating__choose_big",
    ".calculating__choose_medium",
    "calculating__choose-item_active"
  );
});
