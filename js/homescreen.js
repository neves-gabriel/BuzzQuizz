const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz";
let correctAnswerCounter;
let questionsLeft;
let quizData;
let scrollTimeOut;
let quizzId;
let userQuizzes = [];

function getQuizzes () {
    const promise = axios.get(`${urlAPI}/quizzes`);
    promise.then(renderQuizzPreview);
}

function renderQuizzPreview (response) {

    const allQuizzes = response.data
    const quizContainer = document.querySelector(".quiz-list.all");
    const userQuizContainer = document.querySelector(".quiz-list.user");
    quizContainer.innerHTML = "";

    /*userQuizzes = JSON.parse(localStorage.getItem("id"));*/

    for(let i=0; i< allQuizzes.length; i++){
        for(let j=0; j< userQuizzes.length; j++){
            userQuizContainer.innerHTML = "";
            if (allQuizzes[i].id === userQuizzes[j]) {
                userQuizContainer.innerHTML += `<li class="quiz-preview" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${allQuizzes[i].image});"
                                    onclick="openQuiz(${allQuizzes[i].id})">
                                        <p>${allQuizzes[i].title}</p>
                                    </li>`;
            }
        }
        quizContainer.innerHTML += `<li class="quiz-preview" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${allQuizzes[i].image});"
                                    onclick="openQuiz(${allQuizzes[i].id})">
                                        <p>${allQuizzes[i].title}</p>
                                    </li>`;
    } 

}

function toggleHidden (element) {
    document.querySelector(`.${element}`).classList.toggle("hidden");
}

function randomizer(){
    return Math.random() - 0.5;
}

function openQuiz (quizId) {  
    quizzId = quizId;
    toggleHidden(`homescreen`);
    const promise = axios.get(`${urlAPI}/quizzes/${quizId}`);
    promise.then(loadQuiz);
    toggleHidden(`quizscreen`);
}

function loadQuiz (response) {
    quizData = response.data;
    correctAnswerCounter = 0;
    questionsLeft = quizData.questions.length;
    let quizScreen = document.querySelector(".quizscreen");
    quizScreen.innerHTML = "";    

    quizScreen.innerHTML += renderBanner();
    quizScreen.innerHTML += `<div class="questions-container">`

    for(let i=0; i< quizData.questions.length;i++){
        quizScreen.innerHTML += renderQuestion(quizData.questions[i]);
    }

    quizScreen.innerHTML += `   <div class="result hidden"></div>
                                    ${buildButtons()}
                                </div>`;
    
    
    window.scroll({top: 0,left: 0,behavior: 'smooth'});
}

function renderBanner(){
    return ` <div class="quiz-banner-container" style="background-image: linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${quizData.image});">
                <span class="quiz-title">${quizData.title}</span>
             </div>`;
}

function renderQuestion(questionData){
    let answersList = [];
    let returnHtml = ``;

    returnHtml += ` <div class="question">
                        <div class="question-title" style="background-color: ${questionData.color}">
                            ${questionData.title}
                        </div>
                    <ul class="answers-container">`;

    for(let quizAnswer of questionData.answers){
        answersList.push(quizAnswer);
    }

    answersList.sort(randomizer);
    returnHtml += renderAnswers(answersList);

    return returnHtml;
}

function renderAnswers(answersList){
    let answersHtml = ``;

    for(let currentAnswer of answersList){
        answersHtml +=`<li class="answer ${currentAnswer.isCorrectAnswer}" onclick="selectAnswer(this)">
                        <img class="answer-img" src="${currentAnswer.image}"/>
                        <div class="answer-title">${currentAnswer.text}</div>
                      </li>`;
    }

    answersHtml +=`</ul></div>`;
    return answersHtml;
}

function buildButtons(){
    return `<button class="restart-quiz-button hidden" onclick="restartQuiz()">Reiniciar Quizz</button>
            <button class="return-homescreen-button hidden" onclick="reloadPage()">Voltar para Home</button>`;
}

function selectAnswer(selectedAnswerElem){
    let allAnswers = selectedAnswerElem.parentElement.children;

    if (selectedAnswerElem.classList.contains("true")) {
        correctAnswerCounter++;
    }

    for(let currentAnswer of allAnswers){
        currentAnswer.classList.add("disabled");
        if(currentAnswer.classList.contains("true")){
                currentAnswer.classList.add("correct");
            } else{
                currentAnswer.classList.add("wrong");
            } 
        if(currentAnswer !== selectedAnswerElem){
            blurAnswer(currentAnswer);
        }
    }

    let nextQuestion = selectedAnswerElem.parentElement.parentElement.nextSibling.nextSibling;
    
    if (nextQuestion.classList.contains("result")) {
        finishQuiz();
    }

    setTimeout( () => { nextQuestion.scrollIntoView({block:"center",behavior:"smooth"}) } ,2000);
}

function blurAnswer(answer){
    answer.classList.add("blurred");
}

function openQuizCreation () {
    toggleHidden(`homescreen`);
    document.querySelector(".quizz-create").classList.remove("hidden");
}

function finishQuiz(){
    let result = document.querySelector(".result");
    result.innerHTML = "";
    result.innerHTML += buildResult();

    toggleHidden(`result`);
    toggleHidden(`restart-quiz-button`);
    toggleHidden(`return-homescreen-button`);
}

function buildResult(){
    let level = calculateLevel();

    return `<div class="result-text">${level.title}</div>
            <div class="result-details">
                <img class="result-img" src="${level.image}"/>
                <div class="result-comment">${level.text}</div>
            </div>`;
}

function calculateLevel(){
    let levelsList = quizData.levels;
    let userScore = (correctAnswerCounter/quizData.questions.length)*100;
    let userLvl = levelsList[0];

    for(let level of levelsList){
        if(userScore >= level.minValue){
            userLvl = level;
        }
    }

    return userLvl;
}

function restartQuiz(){
    const promise = axios.get(`${urlAPI}/quizzes/${quizzId}`);
    promise.then(loadQuiz);
    document.querySelector(`.quizscreen`).innerHTML = "";
}

getQuizzes();