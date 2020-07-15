const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const overLay = document.getElementById("overlay");
const startBtn = document.querySelector(".btn__reset");
const ul = document.querySelector("#phrase ul");
const score = document.querySelector("#scoreboard ol");
let missed = 0;
let match = "";
const phrases = ["html", "css", "javascript", "sass", "github"];

// Remove overlay
startBtn.addEventListener("click", () => {
  overLay.style.display = "none";
});

// Choose random phrase from the array
function getRandomPhraseAsArray(arr) {
  function getRandomArray(arr) {
    const random = Math.floor(Math.random() * phrases.length);
    const word = arr[random];
    return word;
  }
  const split = getRandomArray(arr).split("");
  return split;
}

// Convert random phrase into an array of strings
function addPhraseToDisplay(arr) {
  const phraseArray = getRandomPhraseAsArray(arr);
  for (let i = 0; i < phraseArray.length; i += 1) {
    const li = document.createElement("li");
    if (phraseArray[i] === "") {
      li.innerHTML = "";
      li.className = "space";
      ul.appendChild(li);
    } else {
      li.textContent = phraseArray[i].toUpperCase();
      li.className = "letter";
      ul.appendChild(li);
    }
  }
}

addPhraseToDisplay(phrases);

// Check Letters
function checkLetter(btn) {
  let li = document.getElementsByClassName("letter");
  for (let i = 0; i < li.length; i += 1) {
    if (li[i].textContent.toUpperCase() === btn.textContent.toUpperCase()) {
      li[i].className += " show";
      match = li[i];
    } else {
      li.className = "";
    }
  }
}

// Win checker
function checkWin() {
  let li = document.getElementsByClassName("letter");
  let show = document.getElementsByClassName("show");
  if (show.length === li.length) {
    return true;
  } else {
    return null;
  }
}

// Lose checker
function checkLose() {
  li = score.children;
  if (missed === 5) {
    return true;
  } else {
    return null;
  }
}

// Event Listener
qwerty.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const clicked = e.target;
    const Checked = checkLetter(clicked);
    clicked.disabled = true;
    if (match.textContent === clicked.textContent.toUpperCase()) {
      clicked.className = "match";
    } else {
      clicked.className = "chosen";
      const li = document.querySelector(".tries");
      const heart = li.firstChild;
      heart.src = "images/lostHeart.png";
      li.className = "lost";
      missed += 1;
    }
  }

  const win = checkWin();
  const lose = checkLose();

  if (win === true) {
    const title = document.querySelector(".title");
    const button = document.querySelector(".btn__reset");
    title.textContent = "Congratulations You Won!";
    button.textContent = "play again?";
    overLay.className += " win";
    startBtn.className += " btn_end";
    overLay.style.display = "";
    startBtn.addEventListener("click", (e) => {
      location.reload();
    });
  } else if (lose === true) {
    const title = document.querySelector(".title");
    const button = document.querySelector(".btn__reset");
    title.textContent = "Sorry You lost!";
    button.textContent = "Try again?";
    overLay.className += " lose";
    startBtn.className += " btn_end";
    overLay.style.display = "";
    startBtn.addEventListener("click", (e) => {
      location.reload();
    });
  }
});
