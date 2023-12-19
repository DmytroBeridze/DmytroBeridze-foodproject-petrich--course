const menuCards = () => {
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
};

module.exports = menuCards;
