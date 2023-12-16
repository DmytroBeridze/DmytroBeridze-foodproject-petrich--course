window.addEventListener("DOMContentLoaded", () => {
  //----------------- tabs
  const tabsContainer = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    cards = document.querySelectorAll(".tabcontent");

  // tabsSow
  const tabsShow = (i = 0) => {
    cards[i].classList.add("tabsShow");
    cards[i].classList.remove("tabsHide");
    tabs[i].classList.add("tabheader__item_active");
  };
  // tabsHide
  const tabsHide = () => {
    cards.forEach((elem) => elem.classList.add("tabsHide"));
    tabs.forEach((elem) => elem.classList.remove("tabheader__item_active"));
  };
  tabsHide();
  tabsShow();

  //  tabsToggle
  tabsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("tabheader__item")) {
      tabs.forEach((elem, index) => {
        if (e.target == elem) {
          tabsHide();
          tabsShow(index);
        }
      });
    }
  });

  // --------------------timer
  const deadLine = "2023-12-10T00:40:00";
  const setDate = (d) => {
    let timeDifference = Date.parse(d) - Date.now(),
      days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
      hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((timeDifference / (1000 * 60)) % 60),
      seconds = Math.floor((timeDifference / 1000) % 60);
    return {
      days,
      hours,
      minutes,
      seconds,
      timeDifference,
    };
  };

  const showDate = (selector, time) => {
    const timer = document.querySelector(selector),
      daysContainer = timer.querySelector("#days"),
      hoursContainer = timer.querySelector("#hours"),
      minutesContainer = timer.querySelector("#minutes"),
      secondsContainer = timer.querySelector("#seconds"),
      dateInterval = setInterval(updateDate, 1000);

    //   для того чтоб при перезагрузке страницы на секунду
    // не показывалось предыдущее время
    updateDate();

    function updateDate() {
      let { days, hours, minutes, seconds, timeDifference } = setDate(time);
      daysContainer.textContent = days.toString().padStart(2, 0);
      hoursContainer.textContent = hours.toString().padStart(2, 0);
      minutesContainer.textContent = minutes.toString().padStart(2, 0);
      secondsContainer.textContent = seconds.toString().padStart(2, 0);

      if (timeDifference <= 0) {
        clearInterval(dateInterval);
        daysContainer.textContent = "00";
        hoursContainer.textContent = "00";
        minutesContainer.textContent = "00";
        secondsContainer.textContent = "00";
      }
    }
  };
  showDate(".timer", deadLine);

  // ----------------------madal window
  const modalWindowOpen = (buttonSelector, popupSelector, closeBtn) => {
    const modalButtonsOpen = document.querySelectorAll(buttonSelector),
      popup = document.querySelector(popupSelector),
      closeModalBtn = popup.querySelector(closeBtn);

    // open
    const openModal = () => {
      popup.style.display = "block";
      document.body.style.overflow = "hidden";
    };
    // close
    const closeModal = () => {
      popup.style.display = "none";
      document.body.style.overflow = "";
    };

    modalButtonsOpen.forEach((elem) =>
      elem.addEventListener("click", () => {
        openModal();
        clearInterval(timeoutOpenModal);
      })
    );
    popup.addEventListener("click", (e) => {
      if (
        e.target == popup ||
        e.target.classList.contains(closeBtn.replace(".", ""))
      ) {
        // if (e.target == popup || e.target == closeModalBtn) {
        closeModal();
      }
    });

    // escape close
    document.body.addEventListener("keydown", (e) => {
      if (e.key == "Escape" && popup.style.display == "block") {
        closeModal();
      }
    });

    // open at the end of the page
    window.addEventListener("scroll", openPopupCoordinate);
    function openPopupCoordinate() {
      const fullDocumentSize = document.documentElement.scrollHeight,
        wisibleSize = document.documentElement.clientHeight;
      if (window.scrollY + wisibleSize >= fullDocumentSize) {
        openModal();
        removeEventListener("scroll", openPopupCoordinate);
      }
    }
    // setTimeout open
    const timeoutOpenModal = setTimeout(() => {
      openModal();
    }, 3000);

    // вызов функции отправки формы
    sendForm("POST", "http://localhost:3000/requests", closeModal, openModal);
    // sendForm("POST", "./server.php", closeModal, openModal);
  };
  modalWindowOpen("[data-modal]", ".modal", ".modal__close");

  // ----------------------menu cards
  const fetchMenuCards = async (url, method) => {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Error request: ${response.status}`);
    }
    return await response.json();
  };

  class MenuCards {
    constructor(containerSelector, img, alt, subtitle, description, price) {
      this.containerSelector = document.querySelector(containerSelector);
      this.img = img;
      this.alt = alt;
      this.subtitle = subtitle;
      this.description = description;
      this.price = price;
      this.transfer = 36.5;
      this.changeCurrency();
    }

    createCards() {
      const cardItem = `
          <div class="menu__item">
            <img src="${this.img}" alt="${this.alt}" />
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">
              ${this.description}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
          </div>
`;
      this.containerSelector.innerHTML += cardItem;
    }

    changeCurrency() {
      this.price = this.price * this.transfer;
    }
  }
  fetchMenuCards("http://localhost:3000/menu", "GET")
    .then((data) =>
      data.forEach(({ img, altimg, title, descr, price }) => {
        // let { img, altimg, title, descr, price } = elem;
        new MenuCards(
          ".menu__field .container",
          img,
          altimg,
          title,
          descr,
          price
        ).createCards();
      })
    )
    .catch((error) => console.log(error.message));

  // -----------------------fetch-send-form
  const statusMessage = {
    load: "./img/modal/spinner.svg",
    success: "Success",
    error: "Error",
  };

  const fetchRequest = async (method, url, data) => {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    });

    return await response.text();
  };

  const prevWindow = document.querySelector(".modal__dialog"),
    container = document.querySelector(".modal"),
    messageWindow = document.createElement("div");

  const showStatusFormRequest = (data, openModal) => {
    prevWindow.classList.add("tabsHide");
    messageWindow.classList.add("modal__dialog");
    messageWindow.innerHTML = `
    <div class="modal__content">
    <div data-close="clo" class="modal__close">×</div>
    <div class="modal__title">${data}</div>
    </div>
    `;
    container.append(messageWindow);
    openModal();
  };

  function sendForm(method, url, closeModal, openModal) {
    const allForms = document.forms;

    for (let form of allForms) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const spinnerContainer = document.createElement("img");
        spinnerContainer.style.cssText = "display:block; margin:20px auto";
        spinnerContainer.setAttribute("src", statusMessage.load);
        form.insertAdjacentElement("afterend", spinnerContainer);

        const formData = new FormData(form),
          jsonFormData = Object.fromEntries(formData);
        fetchRequest(method, url, jsonFormData)
          .then((res) => {
            showStatusFormRequest(statusMessage.success, openModal);
            console.log(res);
          })
          .catch((error) => {
            showStatusFormRequest(statusMessage.error, openModal);
            console.log(error);
          })
          .finally(() => {
            setTimeout(() => {
              messageWindow.remove();
              spinnerContainer.remove();
              prevWindow.classList.remove("tabsHide");
              prevWindow.classList.add("tabsShow");
              form.reset();
              closeModal();
            }, 2000);
          });
      });
    }
  }
  // ----------------complex slider
  const mainSlider = document.querySelector(".offer__slider"),
    offerSliderWrapper = document.querySelector(".offer__slider-wrapper"),
    offerSlides = document.querySelectorAll(".offer__slide"),
    sliderPrev = document.querySelector(".offer__slider-prev"),
    sliderNext = document.querySelector(".offer__slider-next"),
    currentCounter = document.querySelector("#current"),
    totaltCounter = document.querySelector("#total"),
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

  // const paginationElements = document.querySelectorAll(".paginationItem");

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

  // -----------calculator
  const calculatingResult = document.querySelector(".calculating__result span");
  console.log(localStorage.getItem("userOptions")?.userGender);

  let userGender =
      JSON.parse(localStorage.getItem("userOptions"))?.userGender || "female",
    userHeight =
      JSON.parse(localStorage.getItem("userOptions"))?.userHeight || "",
    userWeight =
      JSON.parse(localStorage.getItem("userOptions"))?.userWeight || "",
    userAge = JSON.parse(localStorage.getItem("userOptions"))?.userAge || "",
    userActivity =
      JSON.parse(localStorage.getItem("userOptions"))?.userActivity || 1.375;

  // JSON.parse(localStorage.getItem("userOptions")).userActivity || 1.375;

  const caloriesCalculate = () => {
    if (
      !userGender ||
      !userHeight ||
      !userWeight ||
      !userAge ||
      !userActivity
    ) {
      calculatingResult.innerHTML = "_ _";
      return;
    }
    if (userGender == "male") {
      calculatingResult.innerHTML = Math.round(
        (88.36 + 13.4 * userWeight + 4.8 * userHeight - 5.7 * userAge) *
          userActivity
      );
    } else
      calculatingResult.innerHTML = Math.round(
        (447.6 + 9.2 * userWeight + 3.1 * userHeight - 4.3 * userAge) *
          userActivity
      );
    storageDataet();
  };
  caloriesCalculate();

  // getStorage
  function storageDataet() {
    const userDataLcalSave = {
      userGender,
      userHeight,
      userWeight,
      userAge,
      userActivity,
    };

    localStorage.setItem("userOptions", JSON.stringify(userDataLcalSave));

    document
      .querySelector(".calculating__choose-item")
      .classList.remove("calculating__choose-item_active");

    document
      .querySelector(`#${userDataLcalSave.userGender}`)
      .classList.add("calculating__choose-item_active");

    document
      .querySelector(
        `.calculating__choose-item[data-userInfo= "${userDataLcalSave.userActivity}" ]`
      )
      .classList.add("calculating__choose-item_active");

    document.querySelector("#height").value = userHeight;
    document.querySelector("#weight").value = userWeight;
    document.querySelector("#age").value = userAge;
  }
  storageDataet();
  // ---//getStorage

  const getUserData = (selector, activeClass) => {
    const container = document.querySelector(selector),
      elements = document.querySelectorAll(`${selector} div`);
    container.addEventListener("click", (e) => {
      if (e.target !== container) {
        if (e.target.getAttribute("data-userInfo")) {
          userActivity = +e.target.getAttribute("data-userInfo");
        } else userGender = e.target.getAttribute("id");
        elements.forEach((elem) => elem.classList.remove(activeClass));
        e.target.classList.add(activeClass);
      }
      caloriesCalculate();
    });
  };
  getUserData("#gender", "calculating__choose-item_active");
  getUserData(".calculating__choose_big", "calculating__choose-item_active");

  const getUserConstitution = (selector) => {
    const inputs = document.querySelectorAll(`${selector} input`);
    inputs.forEach((elem) =>
      elem.addEventListener("input", (e) => {
        // проверка на ввод цифр
        if (e.target.value.match(/\D/g)) {
          elem.style.border = "1px solid red";
        } else elem.style.border = "none";

        switch (e.target.getAttribute("id")) {
          case "height":
            userHeight = +e.target.value;
            break;
          case "weight":
            userWeight = +e.target.value;
            break;
          case "age":
            userAge = +e.target.value;
            break;
        }
        caloriesCalculate();
      })
    );
  };

  getUserConstitution(".calculating__choose_medium");
});
