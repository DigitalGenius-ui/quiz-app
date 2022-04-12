const questions = [
    {
        question : "What is the capital of Afghanistan?",
        correct : "Kabul",
        answers : [
            "Kabul",
            "Ghazni",
            "Herat",
            "Mazar"
        ]
    },
    {
        question : "What is the capital of Iran?",
        correct : "Tehran",
        answers : [
                "Yazd",
                "Tehran",
                "Mashhad",
                "Qom"
        ]
    },
    {
        question : "What is the capital of India?",
        correct : "New Delhi",
        answers : [
            "Pune",
            "Mumbai",
            "Gowa",
            "New Delhi"
        ]
    },
    {
        question : "What is the capital of Australia?",
        correct : "Canberra",
        answers : [
            "Perth",
            "Sydney",
            "Canberra",
            "Darwin"
        ]
    },
]
const popUp = document.querySelector(".popUp");
const popUpTexts = document.querySelector(".popUp-texts");
const start = document.querySelector(".start-btn");
const next = document.querySelector(".continue");
const texts = document.querySelector(".body");
const second = document.querySelector(".second")
const question = document.querySelector(".question");
const resultBtn = document.querySelector(".result");
const result = document.querySelector(".result");

let index = 0;
let counter;
let timerNumber = 15;
let counterLine;
let lineCount = 0;
let queCount = 0;

start.addEventListener("click", () => {
    popUp.classList.add("active");
    addQuestions(index);
    seconds(timerNumber);
    countLine(lineCount);
});

next.addEventListener("click", () => {
    if(index < questions.length - 1){
        index++; 
        addQuestions(index);
        clearInterval(counter);
        seconds(timerNumber);
        clearInterval(counterLine);
        countLine(lineCount);
    }else{
        result.classList.add("active");
        popUp.remove();
        showResult()
    }
});

function addQuestions(){
    for (let i = 0; i < questions.length; i++) {
        question.innerHTML = `<span>.${index +1 }</span> ${questions[index].question}`
        const bodyText = `
            <p class="answer">${questions[index].answers[0]}</p>
            <p class="answer">${questions[index].answers[1]}</p>
            <p class="answer">${questions[index].answers[2]}</p>
            <p class="answer">${questions[index].answers[3]}</p>
        `
        texts.innerHTML = bodyText;
        document.querySelector(".pageNo").innerText = `No.${index + 1}/${questions.length}`
        const options = texts.querySelectorAll(".answer");
        for (let i = 0; i < options.length; i++) {
            options[i].setAttribute("onClick", "selectAnswer(this)");
        }
    }
}

function selectAnswer(choose){
    let allOptions = texts.children.length;
    let correctAns =  questions[index].correct;
    if(choose.textContent === correctAns){
        queCount += 1
        console.log(queCount);
        choose.classList.add("correct");
        clearInterval(counter);
        clearInterval(counterLine);
    }else{
        choose.classList.add("wrong")
        clearInterval(counter);
        clearInterval(counterLine);
        for (let i = 0; i < allOptions; i++) {
            if(texts.children[i].textContent === correctAns){
                texts.children[i].setAttribute("class", "answer correct");
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        texts.children[i].classList.add("disable")
    }
}

function seconds(time) {
    let allOptions = texts.children.length;
    counter = setInterval(timer, 1000);
    function timer() {
        second.textContent = getZero(time) + "s";
        if(time <= 0){
            time = "0";
            for (let i = 0; i < allOptions; i++) {
                texts.children[i].classList.add("disable")
            }
        }else{
            time--
        }
    }
}

const line = document.querySelector(".line");
function countLine(time) {
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        line.style.width = time + "px";
        if(time > 511){
            clearInterval(counterLine);
        }
    }
}

function getZero(time){
    return time < 10 ? "0" + time : time;
}

function showResult(){
    if(queCount > 0){
        let rightAnswer = `
        <span><span class="green">Congratulation</span> you could answer :</span>
        <p> ${queCount} out of 4 questions</p>
        `
        document.querySelector(".right").innerHTML = rightAnswer;
    }else{
        let wrongAnswer = `
        <span>I am <span class="red">sorry</span> you couldn't answer : </span>
        <p>${queCount} out of 4 questions</p>
        `
        document.querySelector(".wrong").innerHTML = wrongAnswer;
    }
}
