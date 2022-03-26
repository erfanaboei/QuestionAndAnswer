fetch("/data.json").then(response => response.json()).then(json => {
    const questionBox = document.getElementById('questionBox');
    const answerBox = document.getElementById('answerBox');
    const button = document.querySelector('button');
    const time = document.getElementById('timeBox');
    const questionNumber = document.getElementById('questionNumber');
    const scoreBox = document.getElementById('scoreBox');
    const scoreBoxNot = document.getElementById('notAnswered');
    const scoreBoxTrue = document.getElementById('answerTrue');
    const scoreBoxFlase = document.getElementById('answerFalse');
    const dscore = document.getElementById('score');
    const icon = document.getElementById("icon");
    const exitButton = document.getElementById('exitGame');
    const result = document.getElementById('result');
    var intervall;
    var small;
    var answerFalse = 0;
    var answerTrue = 0;
    var notAnswered = 0;
    var score = 0;
    var x = 1;
    var clickCount = 0;
    var randomQuestion;
    var answerRadio;
    var timeout;
    var check;
    var questionAndAnswer;

    button.addEventListener('click', playGame);
    exitButton.addEventListener('click', endGame);
    function createQuestion() {
        randomQuestion = Math.floor(Math.random() * json.length);
        questionBox.innerHTML = json[randomQuestion].question;
        json[randomQuestion].Answers.forEach((element, index) => {
            var output = "<div class='col-6 radioAnswer'>";
            output += '<input type="radio" name="Answer" value="';
            output += index;
            output += '"/>'
            output += "<small>" + element + "</small>";
            output += "</div>";
            answerBox.innerHTML += output;
        });
        // for (var i = 0; i < 4; i++) {
        //     var output = "<div class='col-6 radioAnswer'>";
        //     output += '<input type="radio" name="Answer" value="';
        //     output += i;
        //     output += '"/>'
        //     output += "<small>" + json[randomQuestion].Answers[i] + "</small>";
        //     output += "</div>";
        //     // output += "</br>";
        //     answerBox.innerHTML += output;
        // }
    }
    // function notAnsweredUser() {
    //     timeout = setTimeout(function () {
    //         answerRadio = document.querySelector('[name=Answer]:checked');
    //         if (answerRadio === null) {
    //             questionBox.style.color = "blue";
    //             notAnswered++;
    //             small = document.querySelectorAll('small');
    //             for (p = 0; p < small.length; p++) {
    //                 if (small[p].innerHTML == json[randomQuestion].trueAnswer) {
    //                     small[p].style.color = "green"
    //                 } else {
    //                     small[p].style.color = "red"
    //                 }
    //             }
    //             setTimeout(playGame, 1000);
    //         }
    //         json.splice(randomQuestion, 1);
    //     }, 2000);
    // }
    function checkAnswer() {
        answerRadio = document.querySelector('[name=Answer]:checked');
        var allAnswerRadio = document.querySelectorAll('[name=Answer]');
        var radioAnswer = document.querySelectorAll('.radioAnswer')
        if (answerRadio === null) {
            questionBox.style.color = "blue";
            notAnswered++;
            small = document.querySelectorAll('small');
            for (p = 0; p < small.length; p++) {
                if (allAnswerRadio[p].value == json[randomQuestion].trueAnswer) {
                    // small[p].style.color = "green"
                    radioAnswer[p].style.backgroundColor = "green";
                    radioAnswer[p].style.color = "white";

                } else {
                    radioAnswer[p].style.backgroundColor = "red";
                    radioAnswer[p].style.color = "white";
                }
            }
            setTimeout(playGame, 2000);
            clearTimeout(check);

        }
        else if (answerRadio.value == json[randomQuestion].trueAnswer) {
            questionBox.style.color = "green";
            answerTrue++;
            score++;
            small = document.querySelectorAll('small');
            for (p = 0; p < small.length; p++) {
                if (allAnswerRadio[p].value == json[randomQuestion].trueAnswer) {
                    radioAnswer[p].style.backgroundColor = "green";
                    radioAnswer[p].style.color = "white";
                }
            }
            setTimeout(playGame, 2000);
            clearTimeout(check);

        } else {
            questionBox.style.color = "red";
            answerFalse++;
            small = document.querySelectorAll('small');
            for (p = 0; p < small.length; p++) {
                if (allAnswerRadio[p].value == json[randomQuestion].trueAnswer) {
                    radioAnswer[p].style.backgroundColor = "green";
                    radioAnswer[p].style.color = "white";
                } else {
                    radioAnswer[p].style.backgroundColor = "red";
                    radioAnswer[p].style.color = "white";
                }
            }
            setTimeout(playGame, 2000);
            clearTimeout(check);

        }
        json.splice(randomQuestion, 1);
    }

    function reportCard() {

        dscore.innerHTML = "امتیاز شما در این بازی :" + score;
        if (score <= 10) {
            dscore.style.color = "red";
        } else if (score <= 15) {
            dscore.style.color = "blue"
        } else {
            dscore.style.color = "green";
        }
        scoreBox.style.display = "block";
        scoreBoxNot.innerHTML = " سوالاتی که پاسخ نداده اید :" + notAnswered + "<br>";
        scoreBoxTrue.innerHTML += " سوالاتی که صحیح پاسخ داده اید : " + answerTrue + "<br>";
        scoreBoxFlase.innerHTML += " سوالاتی که اشتباه پاسخ داده اید : " + answerFalse;

    }

    function playGame() {
        icon.style.display = "none";
        button.removeEventListener('click', playGame);
        exitButton.style.display = "block"
        questionBox.style.color = "";
        button.innerHTML = "ثبت پاسخ";
        answerBox.innerHTML = "";
        check = setTimeout(checkAnswer, 5000);
        if (x <= 20) {
            questionBox.style.display = "block";
            questionNumber.innerHTML = x + "/20";
            x++;
            createQuestion();
            button.addEventListener('click', checkAnswer);
        } else {
            clearTimeout(timeout);
            clearInterval(intervall);
            clearTimeout(check);
            questionBox.innerHTML = "پایان سوالات . موفق باشید";
            answerBox.style.display = "none";
            button.style.display = "none";
            exitButton.style.display = "none";
            questionNumber.innerHTML = "";
            reportCard();
        }
        if (clickCount < 1) {
            intervall = setInterval(timer, 1000);
        }
        clickCount++;
    }

    function endGame() {
        clearTimeout(timeout);
        clearInterval(intervall);
        clearTimeout(check);
        button.style.display = "none";
        answerBox.style.display = "none";
        exitButton.style.display = "none";
        questionBox.innerHTML = "شما از بازی خارج شدید....";
        questionNumber.innerHTML = "";
        reportCard();
    }

    function timer() {
        var minute = document.getElementById('minute').innerText;
        var second = document.getElementById('second').innerText;
        var timeBox = document.getElementById('timeBox');
        if (parseInt(minute) >= 5) {
            timeBox.style.color = "red";
            clearInterval(intervall);
        }
        if (parseInt(second) === 59) {
            var newMin = (parseInt(minute) + 1).toString();
            if (newMin < 10) {
                newMin = "0" + newMin;
            }
            document.getElementById('minute').innerHTML = newMin
            document.getElementById('second').innerHTML = "00";
        } else {
            var newSec = (parseInt(second) + 1).toString();
            if (newSec < 10) {
                newSec = "0" + newSec;
            }
            document.getElementById('second').innerHTML = newSec;
        }
    }

});