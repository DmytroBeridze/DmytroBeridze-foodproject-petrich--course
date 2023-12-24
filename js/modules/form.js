import { openModal, closeModal } from "./modalWindow";
import { fetchRequest } from "../services/service.js";

// --------------------------form
const form = (modalSelector, modalDialogSelector, timeoutOpenModal) => {
  const statusMessage = {
    load: "./img/modal/spinner.svg",
    success: "Success",
    error: "Error",
  };

  const prevWindow = document.querySelector(modalDialogSelector),
    container = document.querySelector(modalSelector),
    messageWindow = document.createElement("div");

  const showStatusFormRequest = (data) => {
    prevWindow.classList.add("tabsHide");
    messageWindow.classList.add("modal__dialog");
    messageWindow.innerHTML = `
      <div class="modal__content">
      <div data-close="clo" class="modal__close">×</div>
      <div class="modal__title">${data}</div>
      </div>
      `;
    container.append(messageWindow);
    openModal(modalSelector, timeoutOpenModal);
  };
  function sendForm(method, url) {
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
            showStatusFormRequest(statusMessage.success);
            console.log(res);
          })
          .catch((error) => {
            showStatusFormRequest(statusMessage.error);
            console.log(error);
          })
          .finally(() => {
            setTimeout(() => {
              messageWindow.remove();
              spinnerContainer.remove();
              prevWindow.classList.remove("tabsHide");
              prevWindow.classList.add("tabsShow");
              form.reset();
              closeModal(modalSelector);
            }, 2000);
          });
      });
    }
  }
  sendForm("POST", "http://localhost:3000/requests");
};

export default form;
