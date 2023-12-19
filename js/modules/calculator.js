const calculator = () => {
  // -----------calculator
  const calculatingResult = document.querySelector(".calculating__result span");
  let userGender, userHeight, userWeight, userAge, userActivity;

  if (localStorage.getItem("gender")) {
    userGender = localStorage.getItem("gender");
  } else localStorage.setItem("gender", "female");

  if (localStorage.getItem("activity")) {
    userActivity = localStorage.getItem("activity");
  } else localStorage.setItem("activity", "1.375");

  const initialStateSetting = (selector, activeClass) => {
    document.querySelectorAll(`${selector} div`).forEach((elem) => {
      elem.classList.remove(activeClass);

      if (elem.getAttribute("id") == localStorage.getItem("gender")) {
        elem.classList.add(activeClass);
      }
      if (
        elem.getAttribute("data-userInfo") == localStorage.getItem("activity")
      ) {
        elem.classList.add(activeClass);
      }
    });
  };
  initialStateSetting("#gender", "calculating__choose-item_active");
  initialStateSetting(
    ".calculating__choose_big",
    "calculating__choose-item_active"
  );

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
  };
  caloriesCalculate();

  const getUserData = (selector, activeClass) => {
    const container = document.querySelector(selector),
      elements = document.querySelectorAll(`${selector} div`);
    container.addEventListener("click", (e) => {
      if (e.target !== container) {
        if (e.target.getAttribute("data-userInfo")) {
          userActivity = +e.target.getAttribute("data-userInfo");
          localStorage.setItem(
            "activity",
            +e.target.getAttribute("data-userInfo")
          );
        } else {
          userGender = e.target.getAttribute("id");
          localStorage.setItem("gender", e.target.getAttribute("id"));
        }

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
};

module.exports = calculator;
