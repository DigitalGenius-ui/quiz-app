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

let index = 0;
let counter;
let timerNumber = 15;

start.addEventListener("click", () => {
    popUp.classList.add("active");
    addQuestions(index);
    seconds(timerNumber)
});

next.addEventListener("click", () => {
    if(index < questions.length - 1){
        index++; 
        addQuestions(index);
        clearInterval(counter);
        seconds(timerNumber)
    }else{
        console.log("finished")
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
        choose.classList.add("correct");
        clearInterval(counter)
    }else{
        choose.classList.add("wrong")
        clearInterval(counter)
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
    counter = setInterval(timer, 1000);
    function timer() {
        second.textContent = getZero(time) + "s";
        if(time <= 0){
            time = "0"
        }else{
            time--
        }
    }
}

function getZero(time){
    return time < 10 ? "0" + time : time;
}