// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var timeEl = document.querySelector("#time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var questionsEl = document.getElementById("questions");


// sound effects
var sfxRight = new Audio("Assets/SFX/correct.wav");
var sfxWrong = new Audio("Assets/SFX/incorrect.wav");

function startQuiz() {
  // hide start screen
 var startScreenEl = document.querySelector("#start-screen")
  // un-hide questions section
  startScreenEl.style.display = "none"
questionsEl.style.display = "block"
  // start timer
timerId = setInterval(ClockTick, 1000);
  // show starting time
timeEl.textContent = time;

  getQuestion();
}

function ClockTick() {
    // update time
    time--;
    timeEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }

function getQuestion() {
  
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  // clear out any old question choices
choicesEl.innerHTML = "";
  // loop over choices
currentQuestion.choices.forEach(function(choice, i) {

    // create new button for each choice
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;
    // attach click event listener to each choice
    choiceNode.onclick = questionClick;
    // display on the page
    choicesEl.appendChild(choiceNode);
    });
}


function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
 // penalize time
 time -= 15;

 if (time < 0){
     time = 0;
 }
 // display new time on page
 timeEl.textContent = time;

 feedbackEl.textContent = "Wrong!";

} else {
    feedbackEl.textContent = "Correct!";
}

  // play "wrong" sound effect
if (this.value !== questions[currentQuestionIndex].answer) {
    sfxWrong.play();
    // else 
} else {
    // play "right" sound effect

    sfxRight.play();
}
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);
  // move to next question
  currentQuestionIndex++;
  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}
  
function quizEnd() {
  // stop timer
clearInterval(timerId)
  // show end screen
  var highscoreSectionEl = document.querySelector("#highscore-section");
  highscoreSectionEl.setAttribute("class", "show");
  // show final score
var finalscoreEl = document.querySelector("#final-score");
finalscoreEl.textContent = time;
  // hide questions section
  questionsEl.style.display = "none"
}

function saveHighscore() {
  // get value of input box
var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
// get saved scores from localstorage, or if not any, set to empty array
var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // format new score object for current user
var NewScore = {
    score: time,
    initials: initials
};
    // save to localstorage
highscores.push(NewScore);
window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // check if event key is enter
  if (event.key === "Enter") {
      saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
