let quizzTitle = "";
let quizzImg = "";
let nQuestions = 0;
let nResults = 0;

function selector(icon){
    const box = icon.parentNode
    const allBox = box.parentNode
    const selected = allBox.querySelector(".selected");
    selected.classList.remove("selected");
    box.classList.add("selected");
}

function confirmInfo(){
  quizzTitle = document.querySelector(".quizz-title").value
  quizzImg = document.querySelector(".quizz-img").value
  nQuestions = document.querySelector(".number-of-questions").value
  nResults = document.querySelector(".number-of-results").value
    if((quizzTitle.length >= 19 && quizzTitle.length <= 65) && isValidHttpUrl(quizzImg) && nQuestions > 2 && nResults > 1){
        document.querySelector(".first-step").classList.add("hidden");
        document.querySelector(".second-step").classList.remove("hidden");
        createQuestionRender();
    }
    else{
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
            questions.innerHTML += `<div class="question-box selected">
            <p>Pergunta ${i+1}</p>
            <input type="text" placeholder="Texto da Pergunta" class="question-text">
            <input type="text" placeholder="Cor de fundo da pergunta" class="question-color">
            <p class = "answer">Resposta Correta</p>
            <input type="text" placeholder="Resposta Correta" class="correct-answer">
            <input type="text" placeholder="URL da imagem" class="correct-answer-img">
            <p class = "answer">Resposta Incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 1" class="wrong-answer-img">
            <input type="text" placeholder="Resposta incorreta 2" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 2" class="wrong-answer-img">
            <input type="text" placeholder="Resposta incorreta 3" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 3" class="wrong-answer-img">
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
        </div>`
        }
        else if(i < nQuestions - 1){
            questions.innerHTML += `<div class="question-box">
            <p>Pergunta ${i+1}</p>
            <input type="text" placeholder="Texto da Pergunta" class="question-text">
            <input type="text" placeholder="Cor de fundo da pergunta" class="question-color">
            <p class = "answer">Resposta Correta</p>
            <input type="text" placeholder="Resposta Correta" class="correct-answer">
            <input type="text" placeholder="URL da imagem" class="correct-answer-img">
            <p class = "answer">Resposta Incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 1" class="wrong-answer-img">
            <input type="text" placeholder="Resposta incorreta 2" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 2" class="wrong-answer-img">
            <input type="text" placeholder="Resposta incorreta 3" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 3" class="wrong-answer-img">
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
        </div>`
        }
        else{
            questions.innerHTML += `<div class="question-box">
            <p>Pergunta ${i+1}</p>
            <input type="text" placeholder="Texto da Pergunta" class="question-text">
            <input type="text" placeholder="Cor de fundo da pergunta" class="question-color">
            <p class = "answer">Resposta Correta</p>
            <input type="text" placeholder="Resposta Correta" class="correct-answer">
            <input type="text" placeholder="URL da imagem" class="correct-answer-img">
            <p class = "answer">Resposta Incorretas</p>
            <input type="text" placeholder="Resposta incorreta 1" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 1" class="wrong-answer-img">
            <input type="text" placeholder="Resposta incorreta 2" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 2" class="wrong-answer-img">
            <input type="text" placeholder="Resposta incorreta 3" class="wrong-answer">
            <input type="text" placeholder="URL da imagem 3" class="wrong-answer-img">
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
        </div>
        <button onclick ="confirmQuestionsInfo()">Prosseguir pra criar níveis</button>`
        }
    }
}

function confirmQuestionsInfo(){
    
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
        let inputCorrectWrongValue = inputWrongAnswer[i].value;
        let inputWrongAnswerImgValue = inputWrongAnswerImg[i].value;
        if(inputCorrectWrongValue === ""){
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
        alert("Informaçoes inválidas");
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
            <div class="result-box selected">
            <p>Nível ${i+1}</p>
            <input type="text" placeholder="Título do nível" class="result-title">
            <input type="number" placeholder="% de acerto mínima" class="result-%">
            <input type="text" placeholder="URL da imagem do nível" class="result-img">
            <input type="text" placeholder="Descrição do nível" class="result-info">
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
            </div>
            `
        }
        else if(i < nResults - 1){
            results.innerHTML += `
            <div class="result-box">
            <p>Nível ${i+1}</p>
            <input type="text" placeholder="Título do nível" class="result-title">
            <input type="number" placeholder="% de acerto mínima" class="result-%">
            <input type="text" placeholder="URL da imagem do nível" class="result-img">
            <input type="text" placeholder="Descrição do nível" class="result-info">
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
            </div>
            `
        }
        else{
            results.innerHTML += `
            <div class="result-box">
            <p>Nivel ${i+1}</p>
            <input type="text" placeholder="Título do nível" class="result-title">
            <input type="number" placeholder="% de acerto mínima" class="result-%">
            <input type="text" placeholder="URL da imagem do nível" class="result-img">
            <input type="text" placeholder="Descrição do nível" class="result-info">
            <ion-icon onclick="selector(this)" name="create-outline"></ion-icon>
            </div>
            <button onclick="confirmResultInfo()">Finalizar Quizz</button>`
        }
    }
}

function confirmResultInfo(){
    if(!resultTitleLengthCheck() || !percentCheck()){
        alert("Informações Inválidas")
    }
}

function resultTitleLengthCheck(){
    const resultTitle = document.querySelectorAll(".result-title");
    for(let i = 0; i < resultTitle.length; i++){
        let resultTitleInput = resultTitle[i].value
        if(resultTitleInput.length < 10){
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
