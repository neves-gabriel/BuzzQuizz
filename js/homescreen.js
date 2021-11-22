const urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz";
let correctAnswerCounter;
let questionsLeft;
let quizData;
let scrollTimeOut;

function getQuizzes () {
    const promise = axios.get(`${urlAPI}/quizzes`);
    promise.then(renderQuizzPreview);
}

function renderQuizzPreview (response) {

    const allQuizzes = response.data
    const quizContainer = document.querySelector(".quiz-list.all");
    quizContainer.innerHTML = "";

    for(let i=0; i< allQuizzes.length; i++){
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
        answersHtml +=`<li class="answer" onclick="selectAnswer(this,${currentAnswer.isCorrectAnswer})">
                        <img class="answer-img" src="${currentAnswer.image}"/>
                        <div class="answer-title">${currentAnswer.text}</div>
                      </li>`;
    }

    answersHtml +=`</ul></div>`;
    return answersHtml;
}

function buildButtons(){
    return `<button class="restart-quiz-button hidden" onclick="restartQuiz()">Reiniciar Quizz</button>
            <button class="return-homescreen-button hidden" onclick="returnToHomeScreen()">Voltar para Home</button>`;
}

function selectAnswer(selectedAnswerElem, isCorrect){
    let allAnswers = selectedAnswerElem.parentElement.children;

    for(let currentAnswer of allAnswers){
        if(currentAnswer !== selectedAnswerElem){
            blurAnswer(currentAnswer);
        }
    }

    if(isCorrect){
        selectedAnswerElem.classList.add("correct");
        correctAnswerCounter++;
    } else{
        selectedAnswerElem.classList.add("wrong");
    }

    if(--questionsLeft === 0){
        finishQuiz();
    } else{

    }

}

function openQuizCreation () {
    toggleHidden(`homescreen`);
    document.querySelector(".quizz-create").classList.remove("hidden");
}

getQuizzes();