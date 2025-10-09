let questions = [
    {
        question: "Which of the following is NOT a JavaScript data type?",
        options: ["String", "Boolean", "Float", "Undefined"],
        correct_option: "Float"
    },
    {
        question: "Which method is used to remove the last element from an array in JavaScript?",
        options: ["shift()", "pop()", "splice()", "slice()"],
        correct_option: "pop()"
    },
    {
        question: "What does the ‘this’ keyword refer to in JavaScript (in a regular function)?",
        options: [
            "The current object that calls the function",
            "The global object",
            "The parent class",
            "None of the above"
        ],
        correct_option: "The current object that calls the function"
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-style", "text-size", "font-size", "text-style"],
        correct_option: "font-size"
    },
    {
        question: "In HTML, which tag is used to define an internal style sheet?",
        options: ["<script>", "<style>", "<css>", "<link>"],
        correct_option: "<style>"
    },
    {
        question: "What will be the output of: typeof NaN?",
        options: ["number", "NaN", "undefined", "object"],
        correct_option: "number"
    },
    {
        question: "Which of the following is true about ‘const’ declarations in JavaScript?",
        options: [
            "You can reassign a new value to a const variable",
            "You can reassign properties of a const object",
            "You cannot change const arrays",
            "Const variables are automatically garbage collected"
        ],
        correct_option: "You can reassign properties of a const object"
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: ["font-style", "font-weight", "text-decoration", "font-bold"],
        correct_option: "font-weight"
    },
    {
        question: "What is the purpose of the <meta> tag in HTML?",
        options: [
            "To display metadata on the webpage",
            "To store metadata such as character set and viewport settings",
            "To link external JavaScript files",
            "To format text"
        ],
        correct_option: "To store metadata such as character set and viewport settings"
    },
    {
        question: "Which of the following JavaScript methods is used to filter elements in an array?",
        options: ["map()", "reduce()", "filter()", "forEach()"],
        correct_option: "filter()"
    },
    {
        question: "Which HTML tag is used to display a scalar measurement within a range?",
        options: ["<progress>", "<meter>", "<input>", "<gauge>"],
        correct_option: "<meter>"
    },
    {
        question: "In CSS, what is the z-index property used for?",
        options: [
            "To specify the zoom level of an element",
            "To control the stack order of elements",
            "To set the background layer",
            "To apply a zoom transition"
        ],
        correct_option: "To control the stack order of elements"
    },
    {
        question: "Which JavaScript function is used to parse a string into an integer?",
        options: ["parseString()", "stringToInt()", "parseInt()", "int()"],
        correct_option: "parseInt()"
    },
    {
        question: "In HTML5, which element is used to play audio files?",
        options: ["<media>", "<audio>", "<sound>", "<music>"],
        correct_option: "<audio>"
    },
    {
        question: "Which CSS function is used to make rounded corners?",
        options: ["border-corner", "border-radius", "corner-shape", "curve-border"],
        correct_option: "border-radius"
    }
];


let instructionContainer = document.getElementById("instruction-container");
let questionContainer = document.getElementById("question-container");
let resultContainer = document.getElementById("result-container");
let startBtn = document.getElementById("startBtn");
let question = document.getElementById("question");
let options = document.getElementsByClassName("option");
let result = document.getElementById("result");
let timerDisplay = document.getElementById("timer");
let correct=document.getElementById("correct");
let wrong=document.getElementById("wrong");
let attempt=document.getElementById("attempt");
let questionCount = 0;
let marks = 0;
let correctAns=0;
let wrongAns=0;
let attemptCount=0;
let timer;
let timeLeft = 300;


instructionContainer.style.display = "block";
questionContainer.style.display = "none";
resultContainer.style.display = "none";
timerDisplay.style.display = "none";
startBtn.onclick = function () {
  if (questionCount === questions.length) {
    showResult();
    return;
  }
  if (startBtn.textContent === "Start") {
    startTimer();
  }
  showQuestion();
};
function showQuestion() {
  instructionContainer.style.display = "none";
  questionContainer.style.display = "block";
  resultContainer.style.display = "none";
  timerDisplay.style.display = "block";
  startBtn.textContent = "Next";
  question.textContent = questions[questionCount].question;
  for (let i = 0; i < 4; i++) {
    options[i].textContent = questions[questionCount].options[i];
    options[i].style.backgroundColor = "white";
    options[i].disabled = false;
  }
  questionCount++;
}
for (let option of options) {
  option.onclick = function () {
    attemptCount++;
    if (option.textContent === questions[questionCount - 1].correct_option) {
      option.style.backgroundColor = "green";
      marks += 2;
      correctAns++;
    } else {
      option.style.backgroundColor = "red";
      for (let opt of options) {
        if (opt.textContent === questions[questionCount - 1].correct_option) {
          opt.style.backgroundColor = "green";
        }
      }
      marks -= 1;
      wrongAns++;
    }
    for (let i of options) {
      i.disabled = true;
    }
  };
}
function startTimer() {
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    if (seconds < 10) seconds = "0" + seconds;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      showResult();
    }
    timeLeft--;
  }, 1000);
}
function showResult() {
  clearInterval(timer);
  instructionContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  timerDisplay.style.display = "none";
  result.textContent = `⏰ Time’s Up! Your Score: ${marks}/${questions.length*2}`;
  startBtn.textContent = "Restart";
  attempt.textContent=`Questions Attempted : ${attemptCount}/${questions.length}`;
  correct.textContent=`Correct Answers : ${correctAns}`;
  wrong.textContent=`Wrong Answers : ${wrongAns}`;
  startBtn.onclick = restartQuiz;
}
function restartQuiz() {
  questionCount = 0;
  marks = 0;
  correctAns=0;
  wrongAns=0;
  attemptCount=0;
  timeLeft = 300;
  timerDisplay.textContent = "Time Left: 5:00";
  instructionContainer.style.display = "block";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  startBtn.textContent = "Start";

  startBtn.onclick = function () {
    if (questionCount === questions.length) {
      showResult();
      return;
    }
    if (startBtn.textContent === "Start") {
      startTimer();
    }
    showQuestion();
  };
}