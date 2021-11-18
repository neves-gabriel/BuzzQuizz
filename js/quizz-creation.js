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
        <button onclick ="createResultsRender()">Prosseguir pra criar níveis</button>`
        }
    }
}

function createResultsRender(){
    const inputQuestions = document.querySelectorAll(".question-text")
    const inputColor = document.querySelectorAll(".question-color")

    for(let i = 0; i < inputQuestions.length; i++){
        if(inputQuestions[i].value.length < 20){
            alert("Informaçoes inválidas");
            return;
        }
    }
    
    for(let i = 0; i < inputColor.length; i++){
        let inputColorValue = inputColor[i].value;
        inputColorValue = inputColorValue.toUpperCase();

        if(inputColorValue.length !== 7 || inputColorValue[0] !== "#" || !colorCheck(inputColorValue)){
            alert("Informaçoes inválidas");
            return;
        }
}      
}

function colorCheck(inputColorValue){
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

