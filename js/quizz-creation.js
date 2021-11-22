let quizzTitle = "";
let quizzImg = "";
let nQuestions = 0;
let nResults = 0;
let idUsersQuizzes = [];

let quizz = {title: "",
image: "",
questions:[],
levels:[]
}


function selector(icon){
    const box = icon.parentNode
    const allBox = box.parentNode
    const selected = allBox.querySelector(".selected");
    selected.classList.remove("selected");
    box.classList.add("selected");
}

function confirmInfo(){
  inputs = document.querySelectorAll(".first-step input");
  quizzTitle = document.querySelector(".quizz-title").value
  quizzImg = document.querySelector(".quizz-img").value
  nQuestions = document.querySelector(".number-of-questions").value
  nResults = document.querySelector(".number-of-results").value
//   for(let i = 0; i < inputs.length; i++){
//       inputs[i].classList.remove("invalid");
//       inputs[i].nextSibling.nextSibling.classList.add("hidden");
//   }
    if((quizzTitle.length >= 19 && quizzTitle.length <= 65) && isValidHttpUrl(quizzImg) && nQuestions > 2 && nResults > 1){
        document.querySelector(".first-step").classList.add("hidden");
        document.querySelector(".second-step").classList.remove("hidden");
        quizz.title = quizzTitle;
        quizz.image = quizzImg;
        createQuestionRender();
    }
    else{
        if(quizzTitle.length < 20 || quizzTitle.length > 65){
            document.querySelector(".quizz-title").classList.add("invalid");
            document.querySelector(".quizz-title").nextSibling.nextSibling.classList.remove("hidden");
        }
        if(!isValidHttpUrl(quizzImg)){
            document.querySelector(".quizz-img").classList.add("invalid")
            document.querySelector(".quizz-img").nextSibling.nextSibling.classList.remove("hidden");
        }
        if(nQuestions < 3){
            document.querySelector(".number-of-questions").classList.add("invalid")
            document.querySelector(".number-of-questions").nextSibling.nextSibling.classList.remove("hidden");
        }
        if(nResults < 2){
            document.querySelector(".number-of-results").classList.add("invalid")
            document.querySelector(".number-of-results").nextSibling.nextSibling.classList.remove("hidden");
        }
        alert("Informaçoes inválidas");
    }
}

function isValidHttpUrl(string) {
    let url;
    
    try {
      url = new URL(string);
    } catch (_) {
      return false;  
    }
  
    return url.protocol === "http:" || url.protocol === "https:";
}

function createQuestionRender(){
    const questions = document.querySelector(".second-step")
    for(let i = 0; i < nQuestions; i++){
        if(i===0){
            questions.innerHTML += `<li class="question-box selected">
            <p>Pergunta ${i+1}</p>
            <input type="text" placeholder="Texto da Pergunta" class="question-text">
            <span class="hidden">Texto da pergunta deve ter no mínimo 20 caracteres</span>
            <input type="text" placeholder="Cor de fundo da pergunta" class="question-color">
            <span class="hidden">A cor deve ser em Hexadecimal</span>
            <p class = "answer">Resposta Correta</p>
            <input type="text" placeholder="Resposta Correta" class="correct-answer answers">
            <span class="hidden">Resposta Correta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem" class="correct-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <p class = "answer">Resposta Incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 1" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <input type="text" placeholder="Resposta incorreta 2" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 2" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <input type="text" placeholder="Resposta incorreta 3" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 3" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
        </li>`
        }
        else if(i < nQuestions - 1){
            questions.innerHTML += `<li class="question-box">
            <p>Pergunta ${i+1}</p>
            <input type="text" placeholder="Texto da Pergunta" class="question-text">
            <span class="hidden">Texto da pergunta deve ter no mínimo 20 caracteres</span>
            <input type="text" placeholder="Cor de fundo da pergunta" class="question-color">
            <span class="hidden">A cor deve ser em Hexadecimal</span>
            <p class = "answer">Resposta Correta</p>
            <input type="text" placeholder="Resposta Correta" class="correct-answer answers">
            <span class="hidden">Resposta Correta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem" class="correct-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <p class = "answer">Resposta Incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 1" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <input type="text" placeholder="Resposta incorreta 2" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 2" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <input type="text" placeholder="Resposta incorreta 3" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 3" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
        </li>`
        }
        else{
            questions.innerHTML += `<li class="question-box">
            <p>Pergunta ${i+1}</p>
            <input type="text" placeholder="Texto da Pergunta" class="question-text">
            <span class="hidden">Texto da pergunta deve ter no mínimo 20 caracteres</span>
            <input type="text" placeholder="Cor de fundo da pergunta" class="question-color">
            <span class="hidden">A cor deve ser em Hexadecimal</span>
            <p class = "answer">Resposta Correta</p>
            <input type="text" placeholder="Resposta Correta" class="correct-answer answers">
            <span class="hidden">Resposta Correta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem" class="correct-answer-img answers-img">
            <p class = "answer">Resposta Incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 1" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <input type="text" placeholder="Resposta incorreta 2" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 2" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <input type="text" placeholder="Resposta incorreta 3" class="wrong-answer answers">
            <span class="hidden">Resposta não pode estar vazia</span>
            <input type="text" placeholder="URL da imagem 3" class="wrong-answer-img answers-img">
            <span class="hidden">URL inválida</span>
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
        </li>
        <button onclick = "confirmQuestionsInfo()">Prosseguir pra criar níveis</button>`
        }
    }
}

function confirmQuestionsInfo(){
    const inputs = document.querySelectorAll(".second-step input")
    for(let i = 0; i< inputs.length; i++){
        inputs[i].classList.remove("invalid");
        inputs[i].nextSibling.nextSibling.classList.add("hidden");
    }
    
    if(!questionLengthCheck() || !inputColorCheck() || !checkCorrectAnswer() || !checkEmptysAnswers() ){
        alert("Informaçoes inválidas");
    }
    else{
        document.querySelector(".second-step").classList.add("hidden");
        document.querySelector(".third-step").classList.remove("hidden");
        createResultsRender();
    }

}

function questionLengthCheck(){
    const inputQuestions = document.querySelectorAll(".question-text");
    for(let i = 0; i < inputQuestions.length; i++){
        if(inputQuestions[i].value.length < 20){
            // inputQuestions[i].classList.add("invalid")
            // inputQuestions[i].nextSibling.nextSibling.classList.remove("hidden")
           return false;
        }
    }
    return true;
}

function inputColorCheck(){
    const inputColor = document.querySelectorAll(".question-color");
    for(let i = 0; i < inputColor.length; i++){
        let inputColorValue = inputColor[i].value;
        inputColorValue = inputColorValue.toUpperCase();

    if(inputColorValue.length !== 7 || inputColorValue[0] !== "#" || !hexCheck(inputColorValue)){
            // inputColor[i].classList.add("invalid")
            // inputColor[i].nextSibling.nextSibling.classList.remove("hidden")
            alert("Informaçoes inválidas");
            return false;
    }
    }
    return true;
}

function checkCorrectAnswer(){
    const inputCorrectAnswer = document.querySelectorAll(".correct-answer");
    const inputCorrectAnswerImg = document.querySelectorAll(".correct-answer-img");
    for(let i = 0; i< inputCorrectAnswer.length; i++){
        let inputCorrectAnswerValue = inputCorrectAnswer[i].value;
        let inputCorrectAnswerImgValue = inputCorrectAnswerImg[i].value
            if(inputCorrectAnswerValue === "" || !isValidHttpUrl(inputCorrectAnswerImgValue)){
            return false;
        }
    }
    return true;
}

function checkEmptysAnswers(){
    const boxes = document.querySelectorAll(".question-box");
    for(let j = 0; j< boxes.length; j++){
        const inputWrongAnswer = boxes[j].querySelectorAll(".wrong-answer");
        const inputWrongAnswerImg = boxes[j].querySelectorAll(".wrong-answer-img");
        let emptysAnswers = 0;
    for(let i = 0; i< inputWrongAnswer.length; i++){
        let inputWrongAnswerValue = inputWrongAnswer[i].value;
        let inputWrongAnswerImgValue = inputWrongAnswerImg[i].value;
        if(inputWrongAnswerValue === ""){
            if(inputWrongAnswerImgValue !== ""){
                // inputWrongAnswerImg[i].classList.add("invalid");
                // inputWrongAnswerImg[i].nextSibling.nextSibling.remove("hidden")
                return false;
            }
            emptysAnswers++;
            if(emptysAnswers === 3){
            return false;
            }
            continue;
        }
        if(!isValidHttpUrl(inputWrongAnswerImgValue)){
            return false;
        }
        
    }
}
return true;
}

function hexCheck(inputColorValue){
    const auxArray = ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7","8", "9"];

    for(w = 1; w < inputColorValue.length; w++){
        let aux = false
        for(j = 0; j<auxArray.length; j++){
            if(inputColorValue[w] === auxArray[j]){
                aux = true
                break;
            }
        }
        if(!aux){
        //alert("Informaçoes inválidas");
        return false;
    }
     return true;    
} 
}

function createResultsRender(){
    const results = document.querySelector(".third-step")
    for(let i = 0 ; i < nResults; i++){
        if(i === 0){
            results.innerHTML += `
            <li class="result-box selected">
            <p>Nível ${i+1}</p>
            <input type="text" placeholder="Título do nível" class="result-title">
            <input type="number" placeholder="% de acerto mínima" class="result-percent">
            <input type="text" placeholder="URL da imagem do nível" class="result-img">
            <textarea type="text" placeholder="Descrição do nível" class="result-info"></textarea>
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
            </li>
            `
        }
        else if(i < nResults - 1){
            results.innerHTML += `
            <li class="result-box">
            <p>Nível ${i+1}</p>
            <input type="text" placeholder="Título do nível" class="result-title">
            <input type="number" placeholder="% de acerto mínima" class="result-percent">
            <input type="text" placeholder="URL da imagem do nível" class="result-img">
            <textarea type="text" placeholder="Descrição do nível" class="result-info"></textarea>
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
            </li>
            `
        }
        else{
            results.innerHTML += `
            <li class="result-box">
            <p>Nivel ${i+1}</p>
            <input type="text" placeholder="Título do nível" class="result-title">
            <input type="number" placeholder="% de acerto mínima" class="result-percent">
            <input type="text" placeholder="URL da imagem do nível" class="result-img">
            <textarea type="text" placeholder="Descrição do nível" class="result-info"></textarea>
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
            </li>
            <button onclick="confirmResultInfo()">Finalizar Quizz</button>`
        }
    }
}

function confirmResultInfo(){
    if(!resultTitleLengthCheck() || !percentCheck() || !checkResultURL() || !checkResultInfoLength()){
        alert("Informações Inválidas")
    }
    else{
        createQuizz();
    }

}


function resultTitleLengthCheck(){
    const resultTitle = document.querySelectorAll(".result-title");
    for(let i = 0; i < resultTitle.length; i++){
        let resultTitleValue = resultTitle[i].value
        if(resultTitleValue.length < 10){
            return false;
        }
    }
    return true;
}

function percentCheck(){
    const resultPercent = document.querySelectorAll(".result-percent");
    let aux = false
    let auxArray = []
    for(let i = 0; i < resultPercent.length; i++){
        let resultPercentValue = resultPercent[i].value;
        auxArray.push(resultPercentValue)
        if(resultPercentValue > 100){
            return false;
        }

        if(resultPercentValue == 0){
            aux = true;
        }
    }

    for(let j = 0; j < auxArray.length; j++){
        let comparator = auxArray[j];
        for(let w = j + 1; w<auxArray.length; w++){
            if(comparator === auxArray[w]){
                return false;
            }
        }
    }
    if(!aux){
        return false;
    }
    else{
        return true;
    }
}

function checkResultURL(){
    const inputResultImg = document.querySelectorAll(".result-img");
    for(let i = 0; i <inputResultImg.length; i++){
        let inputResultImgValue = inputResultImg[i].value
        if(!isValidHttpUrl(inputResultImgValue)){
            return false;
        }
    }
    return true;
}

function checkResultInfoLength(){
    const inputResultInfo = document.querySelectorAll(".result-info");
    for(let i = 0; i < inputResultInfo.length; i++){
        let inputResultInfoValue = inputResultInfo[i].value;
        if(inputResultInfoValue.length < 30){
            return false;
        }
    }
    return true;
}


function createQuizz(){
const allBoxes = document.querySelectorAll(".question-box")
const allResults = document.querySelectorAll(".result-box")
for(let i = 0; i < allBoxes.length; i++){
    quizz.questions.push({
        title: allBoxes[i].querySelector(".question-text").value,
		color: allBoxes[i].querySelector(".question-color").value,
        answers:[]
    })
}
for(let i = 0; i < allBoxes.length; i++){
    const inputArray = allBoxes[i].querySelectorAll(".answers");
    const imgArray = allBoxes[i].querySelectorAll(".answers-img");
    for(j = 0; j<inputArray.length; j++){
        let input = inputArray[j].value;
        let imgAnswer = imgArray[j].value;
        if(input === ""){
        continue;
        }
        if(j === 0){
        quizz.questions[i].answers.push({
        text: input,
        image: imgAnswer,
        isCorrectAnswer: true})
        }
        else{
        quizz.questions[i].answers.push({
        text: input,
        image: imgAnswer,
        isCorrectAnswer: false
        })   
        }
    }
}
for(let i = 0; i< allResults.length; i++ ){
    let resultTitle = allResults[i].querySelector(".result-title").value
    let resultImg = allResults[i].querySelector(".result-img").value
    let restultText = allResults[i].querySelector(".result-info").value
    let resultPercent = parseInt(allResults[i].querySelector(".result-percent").value)
    quizz.levels.push({
        title: resultTitle,
        image: resultImg,
        text: restultText,
        minValue: resultPercent
    })
}
  sendQuizz()
}

function sendQuizz(){
const promessa = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizz)
promessa.then(lastPage);
promessa.catch(seeError);
}

function lastPage(response){
    console.log(response.data.id)
    const id = response.data.id;
    idUsersQuizzes.push(localStorage.getItem("id"));
    console.log(idUsersQuizzes);
    idUsersQuizzes.push(id);
    localStorage.setItem("id", idUsersQuizzes);
    document.querySelector(".third-step").classList.add("hidden")
    document.querySelector(".final").classList.remove("hidden")
    const quizzPage = document.querySelector(".final")
    quizzPage.innerHTML = `
    <h2>Seu quizz está pronto!</h2>
    <div class="quizz" style="background-image: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizz.image});">
    <h4>${quizz.title}</h4>
    </div>
    <button onclick= "openQuiz(${id})">Acessar o Quizz</button>
    <span onclick= "reloadPage()" >Voltar pra home</span>
    `
}

function seeError(error){
    console.log(error.responde.data);

}