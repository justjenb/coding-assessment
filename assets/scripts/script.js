var startQuizButton = document.querySelector(".start-button");
var submitButton = document.querySelector(".submit-button");

var scoreUsername = document.querySelector(".score-username");
var finalHScore = document.querySelector(".final-h-score");
var finalLScore = document.querySelector(".final-l-score"); // or sort list / h-score?
var finalScoreList = document.querySelector(".final-score-list");
var scoreBackButton = document.querySelector(".score-back-btn");
var scoreClearButton = document.querySelector(".score-clr-btn");

var rightWrongMessage = document.querySelector(".right-wrong-msg");
var questionOptionText = document.querySelector(".question-text");
var questionOptionButton = document.querySelector(".question-choices");

var topTenScores = 10;

const questionSheet = [
  {
    question: "This is question 1",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    answer: "choice 3",
  },
  {
    question: "This is question 2",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    answer: "choice 1",
  },
  {
    question: "This is question 3",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    answer: "choice 2",
  },
  {
    question: "This is question 4",
    choices: ["choice 1", "choice 2", "choice 3", "choice 4"],
    answer: "choice 4",
  },
];

startQuizButton.addEventListener("click", function (event) {
  var element = event.target;
  showQuestion();
});

function showQuestion() {
  questionOptionText.innerHTML = "";

  for (i = 0; i < questionSheet.length; i++) {
    var questionContainer = document.createElement("div");
    questionContainer.textContent = questionSheet[i].question;
    var questionChoices = questionSheet[i].choices;

    console.log(JSON.stringify(questionSheet[i]));
    console.log(questionContainer);
    console.log(questionChoices);

    for (i = 0; i < questionChoices.length; i++) {
      var questionLi = document.createElement("li");
      questionLi.textContent = questionChoices[i];
      questionContainer.appendChild(questionLi);
    }
    questionOptionText.appendChild(questionContainer);
  }
  // // Randomly picks question from questionSheet array
  //
  //   var question = questionSheet[i];

  //   var questionContainer = document.createElement('div');
  //   var questionText = document.createElement('li');

  //   questionContainer.textContent = question;

  //   var options = question[i].choices;
  //   for (var opt in options) {
  //     questionText.textContent = opt[i].opt;
  //     questionContainer.appendChild(questionText);
  //     questionText.setAttribute("data-index", i);

  //   }
  //   questionOptionButton.appendChild(questionContainer);

  // }
}

function storeScore() {
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
