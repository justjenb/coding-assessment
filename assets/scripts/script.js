// Start Quiz, View High Scores, Submit buttons on the index page
const startQuizButton = document.querySelector("#start-button");
const viewHighScoreButton = document.querySelector("#highscore-button");
const submitButton = document.querySelector("#submit-btn");

// Back and Clear buttons on the High Score page
const scoreBackButton = document.querySelector("#score-back-btn");
const scoreClearButton = document.querySelector("#score-clr-btn");

// The question text with options, warning message about correct/incorrect questions, the timer and scorekeeper
const questionOptionText = document.querySelector(".question-text");
const questionOptionButton = document.querySelector(".question-choices");
const rightWrongMessage = document.querySelector(".right-wrong-msg");
const timerElement = document.querySelector(".timer-count");
const displayGameScore = document.querySelector(".display-score");
const qnForm = document.querySelector(".qn-form");

// Field to record username, the final score table, the stored high scores, max score table size
const scoreUsername = document.querySelector(".score-username");
const finalScoreTable = document.querySelector(".final-score-table");
const finalScoreList = JSON.parse(localStorage.getItem("finalScoreList")) || []; // from local storage or empty array
const maxScoreTableSize = 3;

// Setting working items that will be increasing or decreasing during the game
let timer;
let timerCount = 60;
let questionNo = 0;
let gameScore = 0;
let worstScore = 0;

// The questions, choices, and answers
const questionSheet = [
  {
    question: "Which of the following is not a data type in JavaScript?",
    choices: ["Selector", "Object", "Symbol", "Undefined"],
    answer: "Selector",
  },
  {
    question: "Which of the following values is truthy?",
    choices: ["x = 0", "NaN", "y = 'Bootcamp'", "null === undefined"],
    answer: "y = 'Bootcamp'",
  },
  {
    question: "Which of the following values is not truthy?",
    choices: ["0 == false", "1 == '1'", "0 === false", "null == undefined"],
    answer: "0 === false",
  },
  {
    question:
      "Which of the following is not one of the three states of promise?",
    choices: ["Pending", "Fulfilled", "Rejected", "Pinky"],
    answer: "Pinky",
  },
];

// Assign multiple attributes to an element
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

if (startQuizButton) {
  startQuizButton.addEventListener("click", function (event) {
    var element = event.target;
    startQuizButton.disabled = true;
    showQuestion(questionNo);
    startTimer();
  });
}

function showQuestion(i) {
  questionOptionText.innerHTML = "";

  var currentQuestion = questionSheet[i];
  var questionContainer = document.createElement("form");

  questionContainer.textContent = currentQuestion.question;
  questionContainer.setAttribute("class", "qn-form");

  var lineBreak = document.createElement("br");
  questionContainer.appendChild(lineBreak);

  var questionChoices = currentQuestion.choices;

  for (j = 0; j < questionChoices.length; j++) {
    var questionBtn = document.createElement("input");
    var questionLbl = document.createElement("label");

    setAttributes(questionBtn, {
      type: "radio",
      name: "radio",
      id: questionChoices[j],
    });

    questionLbl.textContent = questionChoices[j];
    questionLbl.setAttribute("for", questionChoices[j]);

    questionContainer.appendChild(questionBtn);
    questionContainer.appendChild(questionLbl);

    var lineBreak = document.createElement("br");
    questionLbl.appendChild(lineBreak);
  }
  questionOptionText.appendChild(questionContainer);
}

function startTimer() {
  // Sets timer
  timer = setInterval(function () {
    timerCount--;
    timerElement.textContent = timerCount;
    // Tests if win condition is met
    if (questionNo === questionSheet.length && timerCount > 0) {
      // Clears interval and stops timer
      clearInterval(timer);
    }
    // Tests if time has run out
    if (timerCount <= 0) {
      // Clears interval
      clearInterval(timer);
    }
  }, 1000);
}

if (submitButton) {
  submitButton.addEventListener("click", function () {

    if (timerCount <= 0) {
      rightWrongMessage.textContent = "Game over!";
      return;
    }

    currentQuestion = questionSheet[questionNo];
    questionChoices = currentQuestion.choices;

    var questionAnswer = currentQuestion.answer;
    var selectedAnswer = null;

    for (var i = 0; i < questionChoices.length; i++) {
      var optionsButton = document.getElementById(questionChoices[i]);
      if (optionsButton.checked) {
        selectedAnswer = optionsButton.id;
        break;
      }
    }

    if (selectedAnswer === null) {
      console.log("No answer is selected.");
      return;
    }

    if (selectedAnswer === questionAnswer) {
      console.log("you are correct");
      rightWrongMessage.textContent = "You are correct!";
      gameScore++;
      displayGameScore.textContent = gameScore;
    } else {
      console.log("you are incorrect");
      rightWrongMessage.textContent = "You are wrong!";
      timerCount -= 10;
    }

    questionNo++;

    if (questionNo < questionSheet.length) {
      showQuestion(questionNo);
    } else {
      console.log("Quiz complete.");
      rightWrongMessage.textContent = "Game over!";
      displayGameScore.textContent = gameScore;
      startQuizButton.disabled = false;
      checkScore();
    }
  });
}

function checkScore() {
  if (finalScoreList.length > maxScoreTableSize) {
    worstScore = finalScoreList[finalScoreList.length - 1].gameScore;
  }

  if (gameScore > worstScore) {
    const namePrompt = window.prompt(
      `${gameScore}! Top score! What's your name?`
    );
    finalScoreList.push({ gameScore, namePrompt });
  } else {
    alert("Game over!\nSorry, you didn't get a high score.\nTry again!");
  }

  finalScoreList.sort((a, b) => (a.gameScore > b.gameScore ? -1 : 1));

  if (finalScoreList.length > maxScoreTableSize) {
    finalScoreList.pop();
  }
  localStorage.setItem("finalScoreList", JSON.stringify(finalScoreList));
}

if (viewHighScoreButton) {
  viewHighScoreButton.addEventListener("click", function (event) {
    var element = event.target;
    window.location.href = "highscore.html";
  });
}

if (scoreBackButton) {
  scoreBackButton.addEventListener("click", function (event) {
    var element = event.target;
    console.log("clicking score back button");
    window.location.href = "index.html";
  });
}

if (scoreClearButton) {
  scoreClearButton.addEventListener("click", function (event) {
    finalScoreList.splice(0, finalScoreList.length);
    localStorage.setItem("finalScoreList", JSON.stringify(finalScoreList));
    displayScore(finalScoreList, finalScoreTable);
  });
}

function displayScore() {
  finalScoreTable.innerHTML = "";

  const headerRow = document.createElement("tr");
  const headerUser = document.createElement("th");
  const headerScore = document.createElement("th");

  headerUser.textContent = "User";
  headerScore.textContent = "Score";

  headerRow.appendChild(headerUser);
  headerRow.appendChild(headerScore);
  finalScoreTable.appendChild(headerRow);

  finalScoreList.forEach((entry) => {
    const scoreRow = document.createElement("tr");
    const userCell = document.createElement("td");
    const scoreCell = document.createElement("td");

    userCell.textContent = entry.namePrompt;
    scoreCell.textContent = entry.gameScore;

    scoreRow.appendChild(userCell);
    scoreRow.appendChild(scoreCell);

    finalScoreTable.appendChild(scoreRow);
  });
}

if (document.body.contains(finalScoreTable)) {
  displayScore();
}
