document.addEventListener("DOMContentLoaded", () => {

  const options = ["🗿", "📰", "✂️"];
  let isVsCPU = false;

  const gameModeCheckbox = document.getElementsByClassName("game-mode")[0];
  gameModeCheckbox.addEventListener("change", ({ target }) => {
    isVsCPU = target.checked;
    const labels = document.getElementsByClassName("cpu-label");
    const player2Button = document.getElementsByClassName("player-area__selection")[1];
    [...labels].map((label) => {
      if (isVsCPU) {
        label.classList.remove("hidden");
        player2Button.disabled = true;
        player2Button.innerText = "🤖";
      } else {
        label.classList.add("hidden");
        player2Button.disabled = false;
        player2Button.innerText = "";
      }
    });
  });

  const getNextOptionForButton = ({ innerText }) => {
    switch(innerText) {
      case "":
        return options[0];
      case options[0]:
        return options[1];
      case options[1]:
        return options[2];
      case options[2]:
        return "";
      default:
        return; 
    }
  }

  const onButtonClick = ({ target:button }) => {
    button.innerText = getNextOptionForButton(button);
    button.classList.add("ready");
  }

  const buttons = document.getElementsByClassName("player-area__selection");
  [...buttons].map(button => {
    button.onclick = onButtonClick;
  });

  const getResults = (player1, player2) => { 
    if (!player1 || !player2) {
      return "Make a choice!";
    }

    if (player1 === player2) {
      return "Draw!";
    }

    if (
      player1 === options[0] && player2 === options[2] ||
      player1 === options[2] && player2 === options[1] ||
      player1 === options[1] && player2 === options[0]
    ) {
      return `Player 1 wins! - ${player1} beats ${player2}`;
    }

    return `Player 2 wins! - ${player2} crushes ${player1}`;
  }

  const setResults = (results) => {
    const resultsContainer = document.getElementsByClassName("results")[0];
    resultsContainer.innerText = results;
  }

  const submitButton = document.getElementsByClassName("submit")[0]; 
  submitButton.onclick = () => {
    let [{innerText:player1}, {innerText:player2}] = buttons;

    if (isVsCPU) {
      player2 = options[Math.floor(Math.random() * 3)];
    }
  
    const results = getResults(player1, player2);
    setResults(results);

    // Clear unless choice is required
    if (results !== "Make a choice!") {
      buttons[0].innerText = "";
      buttons[1].innerText = isVsCPU ? "🤖" : "";
      buttons[0].classList.remove("ready");
      buttons[1].classList.remove("ready");
    }
  }
});
