const questions = [
  {
    q: "What is a Prompt?",
    options: ["Query", "Instruction", "Dataset", "Model"],
    answer: 1
  },
  {
    q: "What does a lower temperature give you?",
    options: ["More creative output", "More factual output", "Longer output", "More tokens"],
    answer: 1
  },
  {
    q: "What is a hallucination in an LLM?",
    options: ["A slow response", "A confident but wrong answer", "A token limit error", "A blank reply"],
    answer: 1
  },
  {
    q: "What does RAG stand for?",
    options: [
      "Rapid Answer Generation",
      "Random Access Graph",
      "Retrieval Augmented Generation",
      "Recursive Agent Guide"
    ],
    answer: 2
  },
  {
    q: "Which library counts tokens for OpenAI models?",
    options: ["tiktoken", "numpy", "requests", "pandas"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let selected = null;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit");
const quizBox = document.getElementById("quiz-box");
const resultBox = document.getElementById("result");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

function loadQuestion() {
  const item = questions[current];
  selected = null;
  answered = false;
  progressEl.textContent = `Question ${current + 1} of ${questions.length}`;
  questionEl.textContent = `Q${current + 1}. ${item.q}`;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";
  submitBtn.textContent = "Submit";
  submitBtn.disabled = true;
  optionsEl.innerHTML = "";

  item.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = `${String.fromCharCode(65 + i)}. ${text}`;
    btn.addEventListener("click", () => selectOption(i));
    optionsEl.appendChild(btn);
  });
}

function selectOption(i) {
  if (answered) return;
  selected = i;
  [...optionsEl.children].forEach((b, idx) => b.classList.toggle("selected", idx === i));
  submitBtn.disabled = false;
}

function checkAnswer() {
  const correct = questions[current].answer;
  answered = true;
  [...optionsEl.children].forEach((b, idx) => {
    b.disabled = true;
    b.classList.remove("selected");
    if (idx === correct) b.classList.add("correct");
    else if (idx === selected) b.classList.add("wrong");
  });

  if (selected === correct) {
    score++;
    feedbackEl.textContent = "Correct!";
    feedbackEl.classList.add("good");
  } else {
    feedbackEl.textContent = `Wrong. Correct answer: ${questions[current].options[correct]}`;
    feedbackEl.classList.add("bad");
  }
  submitBtn.textContent = current === questions.length - 1 ? "See result" : "Next";
}

function showResult() {
  quizBox.classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreEl.textContent = `You scored ${score} / ${questions.length}`;
}

submitBtn.addEventListener("click", () => {
  if (!answered) {
    checkAnswer();
  } else if (current < questions.length - 1) {
    current++;
    loadQuestion();
  } else {
    showResult();
  }
});

restartBtn.addEventListener("click", () => {
  current = 0;
  score = 0;
  resultBox.classList.add("hidden");
  quizBox.classList.remove("hidden");
  loadQuestion();
});

loadQuestion();
