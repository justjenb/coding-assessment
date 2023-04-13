// Start Quiz, View High Scores, Submit buttons on the index page
const startQuizButton = document.querySelector("#start-button");
const viewHighScoreButton = document.querySelector("#highscore-button");
const submitButton = document.querySelector("#submit-btn");

// Back and Clear buttons on the High Score page
const scoreBackButton = document.querySelector("#score-back-btn");
const scoreClearButton = document.querySelector("#score-clr-btn");

// The question text with options, warning message about correct/incorrect questions, the timer and scorekeeper
const questionOptionArea = document.querySelector("#question-area");
const questionOptionText = document.querySelector(".question-text");
const rightWrongMessage = document.querySelector(".right-wrong-msg");
const timerElement = document.querySelector(".timer-count");
const displayGameScore = document.querySelector(".display-score");

// Field to record username, the final score table, the stored high scores, max score table size
const saveScoreButton = document.querySelector("#save-score-button");
const gameOverSection = document.querySelector("#game-over-section");
const finalScoreElement = document.querySelector("#final-score");
const finalScoreTable = document.querySelector(".final-score-table");
const finalScoreList = JSON.parse(localStorage.getItem("finalScoreList")) || []; // from local storage or empty array
const maxScoreTableSize = 10;

// Setting working items that will be increasing or decreasing during the game
let timer;
let timerCount = 120;
let questionNo = 0;
let gameScore = 0;
let questionContainer;

// The questions, choices, and answers
const questionSheet = [
  {
    question: "What is the correct syntax to declare a variable in JavaScript?",
    choices: ["var myVar = 10;", "variable myVar = 10;", "int myVar = 10;", "declare myVar = 10;"],
    answer: "var myVar = 10;",
  },
  {
    question: "Which of the following is not a valid JavaScript comparison operator?",
    choices: ["===", "==", "=!=", "!=="],
    answer: "=!=",
  },
  {
    question: "What does the 'typeof' operator return?",
    choices: ["The type of a variable", "The length of a variable", "The value of a variable", "The index of a variable"],
    answer: "The type of a variable",
  },
  {
    question: "How do you create a function in JavaScript?",
    choices: ["function myFunction(){}", "func myFunction(){}", "function: myFunction(){}", "createFunction myFunction(){}"],
    answer: "function myFunction(){}",
  },
  {
    question: "Which method can be used to add a new element to the end of an array?",
    choices: ["append()", "add()", "push()", "attach()"],
    answer: "push()"
  },
  {
    question: "What is the correct way to create an object in JavaScript?",
    choices: ["let obj = (key: 'value');", "let obj = [key: 'value'];", "let obj = {key: 'value'};", "let obj = /key: 'value';/"],
    answer: "let obj = {key: 'value'};"
  },
  {
    question: "How do you create a comment in JavaScript that spans multiple lines?",
    choices: ["/* Comment /", "// Comment", "# Comment", "<!-- Comment -->"],
    answer: "/ Comment */"
  },
  {
    question: "How do you access the first element of an array named 'myArray'?",
    choices: ["myArray.0", "myArray(0)", "myArray[1]", "myArray[0]"],
    answer: "myArray[0]"
  },
  {
    question: "Which of these is not a valid way to create a new date object in JavaScript?",
    choices: ["new Date()", "new Date(2023, 3, 10)", "Date(2023, 3, 10)", "new Date('April 10, 2023')"],
    answer: "Date(2023, 3, 10)"
  },
  {
    question: "How do you convert a string to a number in JavaScript?",
    choices: ["Number(string)", "parseInt(string)", "parseFloat(string)", "All of the above"],
    answer: "All of the above"
  }  
];

// Assign multiple attributes to an element
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// start quiz button listener
if (startQuizButton) {
  startQuizButton.addEventListener("click", function (event) {
    event.preventDefault();
    startQuizButton.disabled = true; // disables the start button during the game
    showQuestion(questionNo); // starts the questions
    startTimer(); // starts the timer
  });
}

// builds out questions by creating elements, probably not the most efficient way to do it seemed a pretty flexible way to go about it
function showQuestion(i) {
  questionOptionText.innerHTML = "";

  var currentQuestion = questionSheet[i];
  questionContainer = document.createElement("form");

  questionContainer.addEventListener("submit", function (event) {
    event.preventDefault();
    submitAnswer();
  });
 
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
  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    submitAnswer();
  });
}

function submitAnswer() {
  currentQuestion = questionSheet[questionNo];
  questionChoices = currentQuestion.choices;

  if (timerCount <= 0) {
    rightWrongMessage.textContent = "Try again by hitting Start Quiz!";
    questionContainer.textContent = "The timer is at 0. Game over!";
    displayGameScore.textContent = gameScore;
    startQuizButton.disabled = false;
    return;
  }

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
    rightWrongMessage.textContent = "Error! No answer is selected. Please select an answer!";
    return;
  }

  if (selectedAnswer === questionAnswer) {
    rightWrongMessage.textContent = "You are correct!";
    gameScore++;
    displayGameScore.textContent = gameScore;
  } else {
    rightWrongMessage.textContent = "Incorrect! You've lost time! Next question.";
    timerCount -= 10;
  }

  questionNo++;

  if (questionNo < questionSheet.length) {
    showQuestion(questionNo);
  } else {
    rightWrongMessage.textContent = "Game over!";
    displayGameScore.textContent = gameScore;
    startQuizButton.disabled = false;
    checkScore();
  }
}

function checkScore() {
  questionOptionArea.style.display = "none";
  gameOverSection.style.display = "block";
  finalScoreElement.textContent = gameScore;
}

if (saveScoreButton) {
  saveScoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username-input");
    const username = usernameInput.value;

    if (username) {
      finalScoreList.push({ gameScore, namePrompt: username });
      finalScoreList.sort((a, b) => (a.gameScore > b.gameScore ? -1 : 1));

      if (finalScoreList.length > maxScoreTableSize) {
        finalScoreList.pop();
      }

      localStorage.setItem("finalScoreList", JSON.stringify(finalScoreList));
      window.location.href = "highscore.html";
    } else {
      alert("Please enter your name.");
    }
  });
}

if (viewHighScoreButton) {
  viewHighScoreButton.addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "highscore.html";
  });
}

if (scoreBackButton) {
  scoreBackButton.addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clicking score back button");
    window.location.href = "index.html";
  });
}

if (scoreClearButton) {
  scoreClearButton.addEventListener("click", function (event) {
    event.preventDefault();
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

  headerUser.textContent = "Name";
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
