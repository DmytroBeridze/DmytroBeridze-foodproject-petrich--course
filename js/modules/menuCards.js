import { fetchMenuCards } from "../services/service";
const menuCards = (url, containerSelector) => {
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
  fetchMenuCards(url, "GET")
    .then((data) =>
      data.forEach(({ img, altimg, title, descr, price }) => {
        // let { img, altimg, title, descr, price } = elem;
        new MenuCards(
          containerSelector,
          img,
          altimg,
          title,
          descr,
          price
        ).createCards();
      })
    )
    .catch((error) => console.log(error.message));
};

// module.exports = menuCards;
export default menuCards;
