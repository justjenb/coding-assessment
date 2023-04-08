const startQuizButton = document.querySelector(".start-button");
const submitButton = document.querySelector("#submit");

const scoreUsername = document.querySelector(".score-username");
const finalScoreList = document.querySelector(".final-score-list");
const scoreBackButton = document.querySelector(".score-back-btn");
const scoreClearButton = document.querySelector(".score-clr-btn");

const rightWrongMessage = document.querySelector(".right-wrong-msg");
const questionOptionText = document.querySelector(".question-text");
const questionOptionButton = document.querySelector(".question-choices");
const timerElement = document.querySelector(".timer-count");


const topTenScores = 10;
var questionNo = 0;
var timer;
var timerCount;

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
    question: "Which of the following is not one of the three states of promise?",
    choices: ["Pending", "Fulfilled", "Rejected", "Pinky"],
    answer: "Pinky",
  },
];

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

startQuizButton.addEventListener("click", function (event) {
  var element = event.target;
  timerCount = 40;
  startQuizButton.disabled = true;
  showQuestion(questionNo);
  startTimer();
});

function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount >= 0) {
      // Tests if win condition is met
      if (isWin && timerCount > 0) {
        // Clears interval and stops timer
        clearInterval(timer);
        winGame();
      }
    }
    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
      loseGame();
    }
  }, 1000);
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

      setAttributes(questionBtn, {"data-index": i, "type": "radio", "name": "radio", "id": questionChoices[j]})

      questionLbl.textContent = questionChoices[j];
      questionLbl.setAttribute("for", questionChoices[j]);

      questionContainer.appendChild(questionBtn);
      questionContainer.appendChild(questionLbl);

      var lineBreak = document.createElement("br");
      questionLbl.appendChild(lineBreak);
    }
  questionOptionText.appendChild(questionContainer);
}


submitButton.addEventListener("click", function() {
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
    rightWrongMessage.textContent = "You are correct!"
  } else {
    console.log("you are incorrect");
    rightWrongMessage.textContent = "You are wrong!"
  }

  questionNo++
  if (questionNo < questionSheet.length) {
    showQuestion(questionNo);
  } else {    
    console.log("Quiz complete.");
    storeScore();
  }
});

function storeScore() {
  var finalScore
  // Stringify and set key in localStorage to finalScoreList array
  localStorage.setItem("finalScoreList", JSON.stringify(finalScoreList));
}

function renderScores() {
  for (var i = 0; i < finalScoreList.length; i++) {
    var score = finalScoreList[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    finalScoreList.appendChild(li);
  }
}

function displayScore() {
  // Get stored scores from localStorage
  var storedScores = JSON.parse(localStorage.getItem("finalScoreList"));

  // If scores were retrieved from localStorage, update the scores array to it
  if (storedScores !== null) {
    scores = storedScores;
  }

  // This is a helper function that will render scores to the DOM
  renderScores();
}

function clearScores() {
  finalScoreList = "";
}
