document.addEventListener("DOMContentLoaded", ()=>{

   const questions = [
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Zinc"],
    answer: "Oxygen"
  },
  {
    question: "What is the capital city of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    answer: "Tokyo"
  },
//   {
//     question: "Which planet is known as the 'Red Planet'?",
//     options: ["Venus", "Mars", "Jupiter", "Saturn"],
//     answer: "Mars"
//   },
//   {
//     question: "Who painted the 'Mona Lisa'?",
//     options: ["Vincent van Gogh", "Pablo Picasso", "Claude Monet", "Leonardo da Vinci"],
//     answer: "Leonardo da Vinci"
//   },
//   {
//     question: "What is the largest ocean on Earth?",
//     options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
//     answer: "Pacific Ocean"
//   },
//   {
//     question: "In which year did the Titanic sink?",
//     options: ["1912", "1905", "1923", "1898"],
//     answer: "1912"
//   },
//   {
//     question: "Which mammal is capable of true flight?",
//     options: ["Flying Squirrel", "Bat", "Ostrich", "Penguin"],
//     answer: "Bat"
//   },
//   {
//     question: "What is the hardest natural substance on Earth?",
//     options: ["Gold", "Iron", "Diamond", "Quartz"],
//     answer: "Diamond"
//   },
//   {
//     question: "Which country gifted the Statue of Liberty to the United States?",
//     options: ["United Kingdom", "France", "Germany", "Italy"],
//     answer: "France"
//   },
//   {
//     question: "How many continents are there on Earth?",
//     options: ["5", "6", "7", "8"],
//     answer: "7"
//   }
]


const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const questContainer = document.getElementById("question-container");
const questText = document.getElementById("question-text");
const choiceList = document.getElementById("choices-list");
const resultContainer = document.getElementById("result-container");
const scoreDisplay = document.getElementById("score");

let currentQuestionIndex = 0;
let score = 0;
let totalScore = questions.length*5;

startBtn.addEventListener("click", startQuiz);

nextBtn.addEventListener("click", ()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showResult();
    }
});

restartBtn.addEventListener("click", ()=>{
    currentQuestionIndex = 0;
    score = 0;
    startQuiz();

});

function startQuiz(){
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questContainer.classList.remove("hidden");
    showQuestion();
}

function showQuestion(){
    nextBtn.classList.add("hidden");
    questText.textContent = questions[currentQuestionIndex].question;
    choiceList.innerHTML = "" //clearing the previous choices

    questions[currentQuestionIndex].options.forEach(choice => {
        const li = document.createElement('li');
        li.textContent = choice;
        li.addEventListener('click',() => selectAnswer(li) );
        choiceList.appendChild(li);

    });
}

function selectAnswer(li){
    console.log(li);
    const correctAnswer = questions[currentQuestionIndex].answer;
    if(correctAnswer === li.textContent){
        nextBtn.classList.remove("hidden");
        score+=5;
    }else{
        nextBtn.classList.remove("hidden");
        score-=2;
    }
    li.classList.add("selected");
};

function showResult(){
    questContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${totalScorew}`;
}

});