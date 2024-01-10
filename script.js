const questions = [
    {
        question:"Mendeleyiv kimyo davriy jadvalini kim yaratgan",
        answers : [
            {text:"E.Vohidov",correct:false},
            {text:"Sharl simon",correct:false},
            {text:"Klapeyron",correct:false},
            {text:"M.Dmitriy Ivanovich",correct:true},
        ]
    },
    {
        question:"Futbolist Ulug'bek Qodirovqaysi komandada uynaydi",
        answers : [
            {text:"Pakhtakor",correct:false},
            {text:"Dinama",correct:false},
            {text:"Qizilqum",correct:false},
            {text:"Axir u aktyorku",correct:true},
        ]   
    },
    {
        question:"Uzbekiston poytaxti Toshkentda nechta viloyat bor",
        answers : [
            {text:"11",correct:false},
            {text:"14",correct:false},
            {text:"daxa bor",correct:true},
            {text:"7",correct:false},
        ]    
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btns");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    resetState();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next qustion";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click".selectAnswer);
    });
} 


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstElementChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'you scored ${score} out of ${questions.length}! ';
    nextButton.innerHTML = "play again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}



nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();