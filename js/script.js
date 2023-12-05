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
      if (e.target == popup || e.target == closeModalBtn) {
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
    }, 4000);
  };
  modalWindowOpen("[data-modal]", ".modal", ".modal__close");
});
