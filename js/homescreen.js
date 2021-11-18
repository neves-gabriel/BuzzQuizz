let urlAPI = "https://mock-api.driven.com.br/api/v4/buzzquizz";

function getQuizzes () {
    let promise = axios.get(`${urlAPI}/quizzes`);
    promise.then(renderQuizzPreview)
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

getQuizzes();