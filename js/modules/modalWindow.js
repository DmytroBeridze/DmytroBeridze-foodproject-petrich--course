const modalWindow = () => {
  // ----------------------madal window
  const modalWindowOpen = (buttonSelector, popupSelector, closeBtn) => {
    const modalButtonsOpen = document.querySelectorAll(buttonSelector),
      popup = document.querySelector(popupSelector);
    // closeModalBtn = popup.querySelector(closeBtn);

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
    // sendForm("POST", "http://localhost:3000/requests", closeModal, openModal);
  };
  modalWindowOpen("[data-modal]", ".modal", ".modal__close");

  // // -----------------------fetch-send-form
  // const statusMessage = {
  //   load: "./img/modal/spinner.svg",
  //   success: "Success",
  //   error: "Error",
  // };

  // const fetchRequest = async (method, url, data) => {
  //   const response = await fetch(url, {
  //     method: method,
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(data),
  //   });

  //   return await response.text();
  // };

  // const prevWindow = document.querySelector(".modal__dialog"),
  //   container = document.querySelector(".modal"),
  //   messageWindow = document.createElement("div");

  // const showStatusFormRequest = (data, openModal) => {
  //   prevWindow.classList.add("tabsHide");
  //   messageWindow.classList.add("modal__dialog");
  //   messageWindow.innerHTML = `
  //     <div class="modal__content">
  //     <div data-close="clo" class="modal__close">×</div>
  //     <div class="modal__title">${data}</div>
  //     </div>
  //     `;
  //   container.append(messageWindow);
  //   openModal();
  // };

  // function sendForm(method, url, closeModal, openModal) {
  //   const allForms = document.forms;
  //   for (let form of allForms) {
  //     form.addEventListener("submit", (e) => {
  //       e.preventDefault();
  //       const spinnerContainer = document.createElement("img");
  //       spinnerContainer.style.cssText = "display:block; margin:20px auto";
  //       spinnerContainer.setAttribute("src", statusMessage.load);
  //       form.insertAdjacentElement("afterend", spinnerContainer);

  //       const formData = new FormData(form),
  //         jsonFormData = Object.fromEntries(formData);
  //       fetchRequest(method, url, jsonFormData)
  //         .then((res) => {
  //           showStatusFormRequest(statusMessage.success, openModal);
  //           console.log(res);
  //         })
  //         .catch((error) => {
  //           showStatusFormRequest(statusMessage.error, openModal);
  //           console.log(error);
  //         })
  //         .finally(() => {
  //           setTimeout(() => {
  //             messageWindow.remove();
  //             spinnerContainer.remove();
  //             prevWindow.classList.remove("tabsHide");
  //             prevWindow.classList.add("tabsShow");
  //             form.reset();
  //             closeModal();
  //           }, 2000);
  //         });
  //     });
  //   }
  // }
};

module.exports = modalWindow;
