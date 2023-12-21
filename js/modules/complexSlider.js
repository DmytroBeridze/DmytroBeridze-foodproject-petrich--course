const complex = ({
  sliderSelector,
  sliderWrapper,
  slide,
  buttonPrev,
  buttonNext,
  current,
  total,
}) => {
  // ----------------complex slider
  const mainSlider = document.querySelector(sliderSelector),
    offerSliderWrapper = document.querySelector(sliderWrapper),
    offerSlides = document.querySelectorAll(slide),
    sliderPrev = document.querySelector(buttonPrev),
    sliderNext = document.querySelector(buttonNext),
    currentCounter = document.querySelector(current),
    totaltCounter = document.querySelector(total),
    width = mainSlider.clientWidth;
  let counter = 0,
    pageCount = 0;
  mainSlider.style.overflow = "hidden";
  offerSliderWrapper.style.width = 100 * offerSlides.length + "%";
  offerSliderWrapper.style.display = "flex";
  offerSliderWrapper.style.transition = "1s";

  totaltCounter.textContent = offerSlides.length.toString().padStart(2, 0);
  currentCounter.textContent = "01";

  const firstPageToggle = (p) => {
    if (p > width * (offerSlides.length - 1)) {
      pageCount = 0;
      counter = 0;
    }
    if (p < 0) {
      pageCount = width * (offerSlides.length - 1);
      counter = offerSlides.length - 1;
    }
    currentCounter.textContent = (counter + 1).toString().padStart(2, 0);
  };

  const paginationActive = (c) => {
    pageCount = c * width;
    firstPageToggle(pageCount);
    paginationToggle(paginationElements);
    offerSliderWrapper.style.transform = `translateX(-${pageCount}px)`;
  };

  // next
  sliderNext.addEventListener("click", () => {
    counter++;
    paginationActive(counter);
  });
  // prev
  sliderPrev.addEventListener("click", () => {
    counter--;
    paginationActive(counter);
  });

  // slider pagination
  const paginationContainer = document.querySelector(".paginationContainer"),
    paginationElements = [];

  for (let i = 0; i < offerSlides.length; i++) {
    const paginationElement = document.createElement("li");
    paginationElement.classList.add("paginationItem");
    paginationElement.setAttribute("data-pagNumb", i);
    paginationContainer.append(paginationElement);
    if (i == 0) {
      paginationElement.classList.add("paginationItemActive");
    }
    // Делаем массив точек, чтоб не находить их по document.querySelectorAll
    paginationElements.push(paginationElement);
  }

  // pagination toggle fnc
  const paginationToggle = (arr) => {
    arr.forEach((elem) => elem.classList.remove("paginationItemActive"));
    paginationElements[counter].classList.add("paginationItemActive");
  };

  paginationContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      counter = e.target.getAttribute("data-pagNumb");
      paginationToggle(paginationElements);

      pageCount = counter * width;
      offerSliderWrapper.style.transform = `translateX(-${pageCount}px)`;
      currentCounter.textContent = (+counter + 1).toString().padStart(2, 0);
    }
  });
};

export default complex;
