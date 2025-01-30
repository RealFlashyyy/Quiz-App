<<<<<<< HEAD
const quizzes = {
  general: [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Frost"], answer: "Shakespeare" }
  ],
  math: [
    { question: "What is 5 + 3?", options: ["5", "8", "12", "7"], answer: "8" },
    { question: "What is 10 x 2?", options: ["10", "20", "15", "25"], answer: "20" }
  ],
  science: [
    { question: "What planet is known as the Red Planet?", options: ["Mars", "Earth", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is H2O commonly known as?", options: ["Water", "Oxygen", "Hydrogen", "Helium"], answer: "Water" }
  ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get("category");

const quizTitleElement = document.getElementById("quiz-title");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const scoreValueElement = document.getElementById("score-value");
const homeButton = document.getElementById("home-btn");

// Load the selected quiz category
if (category && quizzes[category]) {
  currentQuiz = quizzes[category];
  quizTitleElement.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz`;
  loadQuestion();
} else {
  quizTitleElement.textContent = "Quiz Not Found";
}

// Load a question
function loadQuestion() {
  const currentQuestion = currentQuiz[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  const isCorrect = button.textContent === correctAnswer;
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }
  Array.from(optionsElement.children).forEach(option => {
    option.disabled = true;
    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    }
  });
  nextButton.classList.remove("hidden");
}

function showScore() {
  scoreElement.classList.remove("hidden");
  scoreValueElement.textContent = `${score} / ${currentQuiz.length}`;
  homeButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    loadQuestion();
    nextButton.classList.add("hidden");
  } else {
    questionElement.textContent = "Quiz Complete!";
    optionsElement.innerHTML = "";
    nextButton.classList.add("hidden");
    showScore();
  }
});
=======
const quizzes = {
  general: [
    { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
    { question: "Who wrote 'Hamlet'?", options: ["Shakespeare", "Dickens", "Hemingway", "Frost"], answer: "Shakespeare" }
  ],
  math: [
    { question: "What is 5 + 3?", options: ["5", "8", "12", "7"], answer: "8" },
    { question: "What is 10 x 2?", options: ["10", "20", "15", "25"], answer: "20" }
  ],
  science: [
    { question: "What planet is known as the Red Planet?", options: ["Mars", "Earth", "Jupiter", "Venus"], answer: "Mars" },
    { question: "What is H2O commonly known as?", options: ["Water", "Oxygen", "Hydrogen", "Helium"], answer: "Water" }
  ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get("category");

const quizTitleElement = document.getElementById("quiz-title");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const scoreValueElement = document.getElementById("score-value");
const homeButton = document.getElementById("home-btn");

// Load the selected quiz category
if (category && quizzes[category]) {
  currentQuiz = quizzes[category];
  quizTitleElement.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz`;
  loadQuestion();
} else {
  quizTitleElement.textContent = "Quiz Not Found";
}

// Load a question
function loadQuestion() {
  const currentQuestion = currentQuiz[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  const isCorrect = button.textContent === correctAnswer;
  if (isCorrect) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }
  Array.from(optionsElement.children).forEach(option => {
    option.disabled = true;
    if (option.textContent === correctAnswer) {
      option.classList.add("correct");
    }
  });
  nextButton.classList.remove("hidden");
}

function showScore() {
  scoreElement.classList.remove("hidden");
  scoreValueElement.textContent = `${score} / ${currentQuiz.length}`;
  homeButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) {
    loadQuestion();
    nextButton.classList.add("hidden");
  } else {
    questionElement.textContent = "Quiz Complete!";
    optionsElement.innerHTML = "";
    nextButton.classList.add("hidden");
    showScore();
  }
});
>>>>>>> 671fee6 (Initial commit)
