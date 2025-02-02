// Load quiz history from localStorage (tracks past performance)
let quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];

const quizzes = {
  general: [
    { question: "Which city is known as the 'City of Light'?", options: ["Paris", "London", "New York", "Tokyo"], answer: "Paris" },
    { question: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"], answer: "Da Vinci" },
    { question: "Which continent is the largest?", options: ["Africa", "Asia", "Europe", "North America"], answer: "Asia" },
    { question: "How many planets are in the solar system?", options: ["7", "8", "9", "10"], answer: "8" },
    { question: "Who discovered gravity?", options: ["Newton", "Einstein", "Tesla", "Galileo"], answer: "Newton" },
    { question: "Which ocean is the largest?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { question: "What is the capital of Canada?", options: ["Toronto", "Ottawa", "Vancouver", "Montreal"], answer: "Ottawa" },
    { question: "What year did World War II end?", options: ["1942", "1945", "1950", "1939"], answer: "1945" },
    { question: "What is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
    { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Eagle", "Horse"], answer: "Cheetah" }
  ],
  math: [
    { question: "What is 9 x 7?", options: ["56", "63", "72", "81"], answer: "63" },
    { question: "What is the square root of 225?", options: ["10", "15", "20", "25"], answer: "15" },
    { question: "If x + 3 = 10, what is x?", options: ["5", "6", "7", "8"], answer: "7" },
    { question: "What is 25% of 200?", options: ["40", "50", "60", "70"], answer: "50" },
    { question: "What is 3³ (3 cubed)?", options: ["9", "18", "27", "81"], answer: "27" }
  ],
  science: [
    { question: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "HO"], answer: "H2O" },
    { question: "What planet is known as the Red Planet?", options: ["Earth", "Mars", "Venus", "Jupiter"], answer: "Mars" },
    { question: "What is the hardest natural substance on Earth?", options: ["Gold", "Diamond", "Iron", "Quartz"], answer: "Diamond" },
    { question: "Which gas do humans breathe in the most?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Nitrogen" },
    { question: "What organ controls the human body?", options: ["Heart", "Brain", "Liver", "Lungs"], answer: "Brain" }
  ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false; // Track if the user has answered the question

// Get quiz category from URL
const queryParams = new URLSearchParams(window.location.search);
const category = queryParams.get("category");

// Ensure elements exist before running script
const quizTitle = document.getElementById("quiz-title");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const scoreValueElement = document.getElementById("score-value");
const homeButton = document.getElementById("home-btn");
const progressElement = document.createElement("p"); // New progress tracker element

// Insert progress tracker below the question
questionElement.insertAdjacentElement("beforebegin", progressElement);

if (category && quizzes[category]) {
  currentQuiz = quizzes[category];
  quizTitle.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)} Quiz`;
  loadQuestion();
} else if (quizTitle) {
  quizTitle.textContent = "Quiz Not Found";
}

// Load a question
function loadQuestion() {
  answered = false;
  nextButton.disabled = true;

  const currentQuestion = currentQuiz[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";
  
  // Update question progress (e.g., "Question 3 of 15")
  progressElement.textContent = `Question ${currentQuestionIndex + 1} of ${currentQuiz.length}`;

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsElement.appendChild(button);
  });
}

function selectAnswer(button, correctAnswer) {
  if (answered) return;
  answered = true;
  nextButton.disabled = false;
  button.classList.add(button.textContent === correctAnswer ? "correct" : "incorrect");
  document.querySelectorAll(".option").forEach(option => option.disabled = true);
}

function showScore() {
  scoreElement.classList.remove("hidden");
  scoreValueElement.textContent = `${score} / ${currentQuiz.length}`;
  homeButton.classList.remove("hidden");

  // Save Score to History
  quizHistory.push({ category, score, total: currentQuiz.length, date: new Date().toLocaleString() });
  localStorage.setItem("quizHistory", JSON.stringify(quizHistory));
}

nextButton.addEventListener("click", () => {
  if (!answered) return;
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuiz.length) loadQuestion();
  else {
    questionElement.textContent = "Quiz Complete!";
    optionsElement.innerHTML = "";
    nextButton.classList.add("hidden");
    progressElement.textContent = ""; // Remove progress tracker
    showScore();
  }
});
