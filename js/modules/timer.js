const timer = (timerSelector, time) => {
  // --------------------timer

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

  const timer = document.querySelector(timerSelector),
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

// module.exports = timer;
export default timer;
