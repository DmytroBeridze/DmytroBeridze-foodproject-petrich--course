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
    sendForm("POST", "./server.php", closeModal, openModal);
  };
  modalWindowOpen("[data-modal]", ".modal", ".modal__close");

  // ----------------------menu cards
  // const menuCardsData = [
  //   {
  //     img: "img/tabs/vegy.jpg",
  //     alt: "vegy",
  //     subtitle: 'Меню "Фитнес"',
  //     description:
  //       'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  //     price: "29",
  //   },
  //   {
  //     img: "img/tabs/elite.jpg",
  //     alt: "elite",
  //     subtitle: "Меню “Премиум”",
  //     description:
  //       "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
  //     price: "50",
  //   },
  //   {
  //     img: "img/tabs/post.jpg",
  //     alt: "post",
  //     subtitle: 'Меню "Постное"',
  //     description:
  //       "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля,  овса, кокоса или гречки, правильное количество белков за счет тофу  и импортных вегетарианских стейков.",
  //     price: "30",
  //   },
  // ];

  const fetchMenuCards = async (url, method) => {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-type": "application/json" },
    });
    const res = await response.json();
    return res;
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
  fetchMenuCards("http://localhost:3000/menu", "GET").then((data) =>
    data.forEach((elem) => {
      let { img, altimg, title, descr, price } = elem;
      new MenuCards(
        ".menu__field .container",
        img,
        altimg,
        title,
        descr,
        price
      ).createCards();
    })
  );

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
});
