// Method2 Work Perfectly 
const apiKey="ufbXz9FpLHeSm2oepdH8UinOByxv7lgzCRWRTYI8";
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
let quizBox=document.getElementById("quizBox")
let quizBoxLoader=document.getElementById("quizBoxLoader");
let question=document.getElementById("question");
let option1=document.getElementById("option1");
let option2=document.getElementById("option2");
let option3=document.getElementById("option3");
let option4=document.getElementById("option4");
let label1=document.getElementById("label1");
let label2=document.getElementById("label2");
let label3=document.getElementById("label3");
let label4=document.getElementById("label4");
let nextBtn=document.getElementById("nextBtn");
let backBtn=document.getElementById("backBtn");
let option3Container=document.getElementById("option3Container");
let option4Container=document.getElementById("option4Container");

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
            let {client_answers}=clientAnswers[i];
            let isFirstOptionCorrect=(findQuestion.correct_answers.answer_a_correct==="true") && (client_answers.isOption1Correct===true);
            let isSecondOptionCorrect=(findQuestion.correct_answers.answer_b_correct==="true") && (client_answers.isOption2Correct===true);
            let isThirdOptionCorrect=(findQuestion.correct_answers.answer_c_correct==="true") && (client_answers.isOption3Correct===true);
            let isFourthOptionCorrect=(findQuestion.correct_answers.answer_d_correct==="true") && (client_answers.isOption4Correct===true);
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
    start=0;
    clientAnswers=[];
    fetchQuestions();
}
function checkQuestion(){
    let options=document.getElementsByName("eachOptionInput");
    let clientSelection;
    for(let i=0;i<options.length;i++){
        if(options[i].checked){
            clientSelection={
                qno:start+1,
                isAttempted:true,
                client_answers:{
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
    if(questions[start].answers.answer_c !== null){
        option3Container.style.display="flex";
    }
    else{
        option3Container.style.display="none";
    }
    if(questions[start].answers.answer_d !== null){
        option4Container.style.display="flex";
    }
    else{
        option4Container.style.display="none";
    }
    question.innerText="Q"+(start + 1)+". "+questions[start].question;
    label1.innerText=questions[start].answers.answer_a;
    label2.innerText=questions[start].answers.answer_b;
    label3.innerText=questions[start].answers.answer_c;
    label4.innerText=questions[start].answers.answer_d;
    if(isPreviousAnsw && clientAnswers[clientAnswerInd].isAttempted && clientAnswers[clientAnswerInd].client_answers.isOption1Correct){        
        option1.checked=true;
    }
    else{
        option1.checked=false;
    }
    if(isPreviousAnsw && clientAnswers[clientAnswerInd].isAttempted && clientAnswers[clientAnswerInd].client_answers.isOption2Correct){
        option2.checked=true;
    }
    else{
        option2.checked=false;
    }
    if(isPreviousAnsw && clientAnswers[clientAnswerInd].isAttempted && clientAnswers[clientAnswerInd].client_answers.isOption3Correct){
        option3.checked=true;
    }
    else{
        option3.checked=false;
    }
    if(isPreviousAnsw && clientAnswers[clientAnswerInd].isAttempted && clientAnswers[clientAnswerInd].client_answers.isOption4Correct){
        option4.checked=true;
    }
    else{
        option4.checked=false;
    }
    checkQuestion();
    quizBox.style.display="block";
    
    if(start==0){
       backBtn.disabled=true;
       backBtn.style.backgroundColor="gray";
    }
    else{
       backBtn.disabled=false;
       backBtn.style.backgroundColor="green";
    }
    if(start>=noOfQuestions-1){
        nextBtn.disabled=true;
        nextBtn.style.backgroundColor="gray";
    }
    else{
        nextBtn.disabled=false;
        nextBtn.style.backgroundColor="green";
    }
    isPreviousAnsw=false;
}
async function fetchQuestions(){
    try{
        quizBoxLoader.style.display="flex";
        const response=await fetch(`https://quizapi.io/api/v1/questions?apiKey=${apiKey}&limit=${noOfQuestions}`)
        const data=await response.json();
        questions=data;
        quizBoxLoader.style.display="none";        
        renderQuestion(questions,start);
    }
    catch(error){
        quizBoxContainer.innerText=error;
    }
}
fetchQuestions();

