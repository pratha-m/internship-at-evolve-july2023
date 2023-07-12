const apiKey=TOKEN;
const noOfQuestions=10;
let quizBoxContainer=document.getElementById("quizBoxContainer");
let questions;
let start=0;
let clientAnswers=[];
let submitPopupContainer=document.getElementById("submitPopupContainer");
let resultLoader=document.getElementById("resultLoader");
let submitPopup=document.getElementById("submitPopup");
let resultsPopup=document.getElementById("resultsPopup");
let resultTotalQus=document.querySelector("#resultTotalQus>span");
let resultAttemptedQus=document.querySelector("#resultAttemptedQus>span");
let resultNotAttemptedQus=document.querySelector("#resultNotAttemptedQus>span");
let resultCorrectQus=document.querySelector("#resultCorrectQus>span");
let resultIncorrectQus=document.querySelector("#resultIncorrectQus>span");

function showSubmitPopup(){
    submitPopupContainer.style.display="flex";
}
function closeSubmitPopup(){
    submitPopupContainer.style.display="none" 
    submitPopup.style.display="flex";
    resultsPopup.style.display="none";
}
function submitQuiz(){
    submitPopup.style.display="none";
    resultLoader.style.display="flex";
    let attempted=0;
    let notAtempted=0;
    let correctAnswers=0;
    let wrongAnswers=0;
    for(let i=0;i<clientAnswers.length;i++){
        if(clientAnswers[i].isAttempted){
            let qno=clientAnswers[i].qno;
            let findQuestion=questions[qno-1];
            let {correct_answers}=clientAnswers[i];
            let isFirstOptionCorrect=(findQuestion.correct_answers.answer_a_correct==="true") && (correct_answers.isOption1Correct===true);
            let isSecondOptionCorrect=(findQuestion.correct_answers.answer_b_correct==="true") && (correct_answers.isOption2Correct===true);
            let isThirdOptionCorrect=(findQuestion.correct_answers.answer_c_correct==="true") && (correct_answers.isOption3Correct===true);
            let isFourthOptionCorrect=(findQuestion.correct_answers.answer_d_correct==="true") && (correct_answers.isOption4Correct===true);
            if(isFirstOptionCorrect || isSecondOptionCorrect || isThirdOptionCorrect || isFourthOptionCorrect){
                correctAnswers++;
            }
            else{
                wrongAnswers++;
            }
            attempted++;
        }
    }
    notAtempted=questions.length-attempted;
    resultTotalQus.innerText=questions.length;
    resultAttemptedQus.innerText=attempted; 
    resultNotAttemptedQus.innerText=notAtempted;
    resultCorrectQus.innerText=correctAnswers;
    resultIncorrectQus.innerText=wrongAnswers;
    resultLoader.style.display="none";
    resultsPopup.style.display="flex";
}
function checkQuestion(){
    let options=document.getElementsByName("eachOptionInput");
    let clientSelection;
    for(let i=0;i<options.length;i++){
        if(options[i].checked){
            clientSelection={
                qno:start+1,
                isAttempted:true,
                clientAnswer:options[i].value,
                correct_answers:{
                    isOption1Correct:(i==0)?true:false,
                    isOption2Correct:(i==1)?true:false,
                    isOption3Correct:(i==2)?true:false,
                    isOption4Correct:(i==3)?true:false,
                }
            };
            break;
        }
        else if(i==options.length-1 && !options.checked){
            clientSelection={qno:start+1,isAttempted:false};
        }
    }
    if(clientAnswers.length>0){
        for(let i=0;i<clientAnswers.length;i++){
            if(clientAnswers[i].qno===clientSelection.qno){
                clientAnswers[i]=clientSelection;
                break;
            }
            if(i==clientAnswers.length-1){
                clientAnswers.push(clientSelection);
            }
        }
    }
    else{
        clientAnswers.push(clientSelection);
    }
    // console.log(clientAnswers)
}
function nextQuestion(e){
    if(start<noOfQuestions-1){
        start++;
        renderQuestion(questions,start);
    }
}
function backQuestion(e){
    if(start>0){
        start--;
        renderQuestion(questions,start);
    }
}
function renderQuestion(questions,start){    
    let isPreviousAnsw=false,clientAnswerInd;
    for(let i=0;i<clientAnswers.length;i++){
        if(clientAnswers[i].qno===start+1){
            isPreviousAnsw=true;
            clientAnswerInd=i;
            break;
        }
    }
    quizBoxContainer.innerHTML =
        `
        <div class="quizBox">
        <div class="question">
        Q${(start + 1) + ". " + questions[start].question}
        </div>
        <div class="options">
        <div class="eachOption">
            <input type="radio" onchange="checkQuestion()" ${(isPreviousAnsw)?(clientAnswers[clientAnswerInd].correct_answers.isOption1Correct)?"checked":null:null} id="option1" value="${questions[start].answers.answer_a}" name="eachOptionInput">
            <label for="option1" id="label1">${questions[start].answers.answer_a}</label>
        </div>
        <div class="eachOption">
            <input type="radio" id="option2" onchange="checkQuestion()" ${(isPreviousAnsw)?(clientAnswers[clientAnswerInd].correct_answers.isOption2Correct)?"checked":null:null} value="${questions[start].answers.answer_b}" name="eachOptionInput">
            <label for="option2" id="label2">${questions[start].answers.answer_b}</label>
        </div>
        ${(questions[start].answers.answer_c !== null) ? `
            <div class="eachOption">
               <input type="radio" id="option3" onchange="checkQuestion()" ${(isPreviousAnsw)?(clientAnswers[clientAnswerInd].correct_answers.isOption3Correct)?"checked":null:null} value="${questions[start].answers.answer_c}" name="eachOptionInput">
               <label for="option3" id="label3">${questions[start].answers.answer_c}</label>
           </div>`: ""
        }
        ${(questions[start].answers.answer_d !== null) ? `
            <div class="eachOption">
                <input type="radio" id="option4" onchange="checkQuestion()" ${(isPreviousAnsw)?(clientAnswers[clientAnswerInd].correct_answers.isOption4Correct)?"checked":null:null} value="${questions[start].answers.answer_d}" name="eachOptionInput">
                <label for="option4" id="label4">${questions[start].answers.answer_d}</label>
            </div>`: ""
        }
        <div class="eachOption eachOptionBtnContainer">
             <button class="nextBtn" id="backBtn" onclick="backQuestion(event)">Back</button>
             <button class="nextBtn" id="nextBtn" onclick="nextQuestion(event)">Next</button>
        </div>
    </div>
</div>
    `

    isPreviousAnsw=false;
    checkQuestion();
    // console.log(questions);

    let nextBtn=document.getElementById("nextBtn");
    let backBtn=document.getElementById("backBtn");
    if(start<=0){
       backBtn.disabled=true;
       backBtn.style.backgroundColor="gray";
    }
    if(start>=noOfQuestions-1){
        nextBtn.disabled=true;
        nextBtn.style.backgroundColor="gray";
    }
}
async function fetchQuestions(){
    try{
        quizBoxContainer.innerText="Loading....";
        const response=await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=${noOfQuestions}`)
        const data=await response.json();
        questions=data;
        renderQuestion(questions,start);
    }
    catch(error){
        quizBoxContainer.innerText="Network Error Occured....";
    }
}
fetchQuestions();

