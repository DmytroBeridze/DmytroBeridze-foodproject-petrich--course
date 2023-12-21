const tabs = (containerSelector, tabsSelector, cardsSelector, activeClass) => {
  //----------------- tabs
  const tabsContainer = document.querySelector(containerSelector),
    tabs = document.querySelectorAll(tabsSelector),
    cards = document.querySelectorAll(cardsSelector);

  // tabsSow
  const tabsShow = (i = 0) => {
    cards[i].classList.add("tabsShow");
    cards[i].classList.remove("tabsHide");
    tabs[i].classList.add(activeClass);
  };
  // tabsHide
  const tabsHide = () => {
    cards.forEach((elem) => elem.classList.add("tabsHide"));
    tabs.forEach((elem) => elem.classList.remove(activeClass));
  };
  tabsHide();
  tabsShow();

  //  tabsToggle
  tabsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((elem, index) => {
        if (e.target == elem) {
          tabsHide();
          tabsShow(index);
        }
      });
    }
  });
};
// module.exports = tabs;
export default tabs;
