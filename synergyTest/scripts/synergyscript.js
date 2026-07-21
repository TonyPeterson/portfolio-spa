// Cache DOM elements
const stuckPointsDisplay = document.getElementById("stuckpoints");
const answerBlocks = document.querySelectorAll(".answerblock");
const progressBar = document.getElementById("progressBar");
const totalQuestions = answerBlocks.length;
const resultPage = document.querySelectorAll("resultPage");
const pie = document.querySelectorAll(".pie");
const allQuestionContainers = document.querySelectorAll(".questioncontainer");
const submitButton = document.querySelector('input[type="submit"]');
const nextQButton = document.getElementById("nextQ");
const prevQButton = document.getElementById("prevQ");
const beginQuiz = document.getElementById("beginQuiz");
const quizForm = document.getElementById("synergyGrantReadinessQuiz");
const splashScreen = document.getElementById("splashScreen");
const nextprev = document.getElementById("nextprev");
const answeredQuestions = new Array(allQuestionContainers.length).fill(false);
const lowScoreResult = document.getElementById("lowScoreResult");
const midScoreResult = document.getElementById("midScoreResult");
const highScoreResult = document.getElementById("highScoreResult");
const scoreField = document.querySelector("#entry\\.824949683");
const nameInput = document.querySelector("#entry\\.1463236143");
const emailName = document.querySelectorAll(".nameForEmailSubmit");
const prodSubmit = document.querySelectorAll(".prodsForEmailSubmit");
const personalized = document.querySelectorAll(".personalized");
const emailSubmit = document.querySelectorAll(".emailSubmitButton");
const thankYou = document.getElementById("thankYouContainer");
const emailInput = document.querySelectorAll(".emailInput");
const prodCheckboxes = document.querySelectorAll(
  ".prodChecklist, .prodLunch, .prodCall"
);

let totalPoints = 0;
let nameField = null;
let wantedProducts = [];
const answerBlockPoints = {};

// Function to show a specific question
function showQuestion(questionIndex) {
  allQuestionContainers.forEach((container, index) => {
    if (index === questionIndex) {
      container.classList.remove("hidden-question");
      container.classList.add("active-question");
    } else {
      container.classList.remove("active-question");
      container.classList.add("hidden-question");
    }
  });
  updateProgressBar();
}

// Function to update progress bar
function updateProgressBar() {
  const currentQuestionIndex = Array.from(allQuestionContainers).findIndex(
    (container) => container.classList.contains("active-question")
  );
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  progressBar.style.width = `${progressPercent - 1}%`;
}

answerBlocks.forEach((block) => {
  const answerCards = block.querySelectorAll(".answercard");
  const missionStatementInput = block
    .closest(".questioncontainer")
    .querySelector("#missionStatementInput");

  answerCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove "checked" from siblings within the same answer block
      answerCards.forEach((sib) => sib.classList.remove("checked"));
      card.classList.add("checked");

      // Calculate points for this answer block
      const radioInput = card
        .closest("label")
        .querySelector('input[type="radio"]');
      let blockPoints = 0;
      if (radioInput) {
        if (radioInput.classList.contains("tenpoints")) {
          blockPoints = 10;
        } else if (radioInput.classList.contains("sevenpoints")) {
          blockPoints = 7;
        } else if (radioInput.classList.contains("fivepoints")) {
          blockPoints = 5;
        } else if (radioInput.classList.contains("threepoints")) {
          blockPoints = 3;
        } else if (radioInput.classList.contains("zeropoints")) {
          blockPoints = 0;
        }
      }

      // Get the index of the current question
      const currentQuestionIndex = Array.from(allQuestionContainers).indexOf(
        block.closest(".questioncontainer")
      );

      answeredQuestions[currentQuestionIndex] = true;

      // Check if the clicked card is the "Yes" answer for the mission statement question
      if (
        block.id === "q1" &&
        card.querySelector(".cardtext").textContent === "Yes"
      ) {
        missionStatementInput.classList.remove("hidden");
      } else if (block.id === "q1") {
        missionStatementInput.classList.add("hidden");
      }

      if (currentQuestionIndex === allQuestionContainers.length - 1) {
        nextQButton.textContent = "Submit";
        scoreField.value = totalPoints;
        nameField = nameInput.value;
        emailName.forEach((n) => (n.value = nameField));
        personalized.forEach((p) => (p.textContent = `Hey ${nameField},`));
        nextQButton.setAttribute("type", "submit");
        nextQButton.removeEventListener("click", handleNextQuestionClick);
        nextQButton.addEventListener("click", () => {
          quizForm.dispatchEvent(new Event("submit"));
        });
      }

      // Store points for this answer block
      answerBlockPoints[block.id] = blockPoints;

      // Calculate and display total points
      totalPoints = Object.values(answerBlockPoints).reduce(
        (sum, value) => sum + value,
        0
      );
      stuckPointsDisplay.textContent = `Total points: ${totalPoints}`;

      nextQButton.classList.remove("disabled");
      updateProgressBar();
    });
  });
});

// Add event listeners to the next/prev buttons
prevQButton.addEventListener("click", (event) => {
  event.preventDefault();
  const currentQuestionIndex = Array.from(allQuestionContainers).findIndex(
    (container) => container.classList.contains("active-question")
  );
  if (currentQuestionIndex > 0) {
    transitionToQuestion(currentQuestionIndex - 1);
  }
  if (currentQuestionIndex === 1) {
    nextQButton.classList.remove("disabled");
  }
});

nextQButton.addEventListener("click", handleNextQuestionClick);

function handleNextQuestionClick(event) {
  event.preventDefault();
  if (nextQButton.classList.contains("disabled")) {
    return; // Do nothing if the button is disabled
  }
  const currentQuestionIndex = Array.from(allQuestionContainers).findIndex(
    (container) => container.classList.contains("active-question")
  );

  if (currentQuestionIndex < allQuestionContainers.length - 1) {
    transitionToQuestion(currentQuestionIndex + 1);
  } else if (currentQuestionIndex === allQuestionContainers.length - 1) {
    // If it's the last question, allow form submission
    quizForm.submit();
  }

  nextQButton.classList.add("disabled");
}

// Earlier/retired animated transitions & disabled buttons
function transitionToQuestion(questionIndex) {
  const callingcard = document.querySelector(".callingcard");
  const firstQ = document.querySelector(".firstQuestion");
  showQuestion(questionIndex);
  prevQButton.classList.toggle("disabled", questionIndex === 0);
  if (questionIndex === allQuestionContainers.length - 1) {
    nextQButton.textContent = "Submit";
    nextQButton.classList.add("teal");
  } else if (questionIndex === 1) {
    callingcard.classList.add("fade-out");
    setTimeout(() => {
      firstQ.classList.add("fade-in");
      callingcard.classList.remove("fade-out");
    }, 250);
  } else {
    nextQButton.textContent = "Next";
    nextQButton.classList.remove("teal");
  }
  if (answeredQuestions[questionIndex]) {
    nextQButton.classList.remove("disabled");
  } else {
    nextQButton.classList.add("disabled");
  }
}

// Add an event listener to the 'Begin quiz' button
beginQuiz.addEventListener("click", () => {
  splashScreen.style.display = "none";
  nextprev.style.display = "block";
  quizForm.style.display = "grid";
  progressBar.style.display = "block";
  showQuestion(0);
});

quizForm.addEventListener("submit", (event) => {
  quizForm.style.display = "none";
  let activePie = lowScoreResult.querySelector(".pie");

  if (totalPoints >= 67) {
    activePie = highScoreResult.querySelector(".pie");
    highScoreResult.removeAttribute("hidden");
  } else if (totalPoints >= 32) {
    activePie = midScoreResult.querySelector(".pie");
    midScoreResult.removeAttribute("hidden");
  } else {
    lowScoreResult.removeAttribute("hidden");
  }

  const pieValue = Math.trunc(totalPoints * 1.43);
  activePie.style.setProperty("--p", pieValue.toString());
  activePie.textContent = pieValue + "%";

  nextprev.style.display = "none";
  progressBar.style.display = "none";
});

emailInput.forEach((input) => {
  input.addEventListener("input", () => {
    let hasContent = true;
    emailInput.forEach((input) => {
      if (
        window
          .getComputedStyle(input, ":placeholder")
          .getPropertyValue("opacity") !== "0"
      ) {
        hasContent = false;
        return; // Exit the inner loop early if an empty input is found
      }
    });

    emailSubmit.forEach((button) => {
      if (!hasContent) {
        button.classList.remove("disabled");
      } else {
        button.classList.add("disabled");
      }
    });
  });
});

emailSubmit.forEach((button) => {
  button.addEventListener("click", () => {
    thankYou.style.display = "flex";
    button.classList.add("fade-out");
    setTimeout(() => {
      button.style.display = "none";
    }, 500);
  });
});

function updateWantedProducts(checkbox) {
  const value = checkbox.value;

  if (checkbox.checked) {
    wantedProducts.push(value);
  } else {
    wantedProducts = wantedProducts.filter((item) => item !== value);
  }
  console.log(wantedProducts);
}

prodCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    updateWantedProducts(checkbox);
    prodSubmit.forEach((n) => (n.value = wantedProducts));
  });
});
