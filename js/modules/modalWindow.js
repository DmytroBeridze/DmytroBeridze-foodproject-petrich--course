// ----------------------madal window
// open
const openModal = (popupSelector, timeoutOpenModal) => {
  const popup = document.querySelector(popupSelector);
  popup.style.display = "block";
  document.body.style.overflow = "hidden";
  if (timeoutOpenModal) {
    clearInterval(timeoutOpenModal);
  }
};
// close
const closeModal = (popupSelector) => {
  const popup = document.querySelector(popupSelector);
  popup.style.display = "none";
  document.body.style.overflow = "";
};

function modalWindowOpen(
  buttonSelector,
  popupSelector,
  closeBtn,
  timeoutOpenModal
) {
  const modalButtonsOpen = document.querySelectorAll(buttonSelector),
    popup = document.querySelector(popupSelector);

  modalButtonsOpen.forEach((elem) =>
    elem.addEventListener("click", () => {
      openModal(popupSelector, timeoutOpenModal);
      // clearInterval(timeoutOpenModal);
    })
  );
  popup.addEventListener("click", (e) => {
    if (
      e.target == popup ||
      e.target.classList.contains(closeBtn.replace(".", ""))
    ) {
      // if (e.target == popup || e.target == closeModalBtn) {
      closeModal(popupSelector);
    }
  });

  // escape close
  document.body.addEventListener("keydown", (e) => {
    if (e.key == "Escape" && popup.style.display == "block") {
      closeModal(popupSelector);
    }
  });

  // open at the end of the page
  window.addEventListener("scroll", openPopupCoordinate);
  function openPopupCoordinate() {
    const fullDocumentSize = document.documentElement.scrollHeight,
      wisibleSize = document.documentElement.clientHeight;
    if (window.scrollY + wisibleSize >= fullDocumentSize) {
      openModal(popupSelector, timeoutOpenModal);
      removeEventListener("scroll", openPopupCoordinate);
    }
  }
  // // setTimeout open
  // const timeoutOpenModal = setTimeout(() => {
  //   openModal(popupSelector);
  // }, 3000);
}

// module.exports = modalWindow;
export default modalWindowOpen;
export { openModal, closeModal };
