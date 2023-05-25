//grabs the elements out of the html for us to use in javascript

var startGame = document.getElementById("startGame");
var questionsArea = document.getElementById("questionsArea");
var questionHeader = document.getElementById("questionHeader");
var questionOption1 = document.getElementById("option1");
var questionOption2 = document.getElementById("option2");
var questionOption3 = document.getElementById("option3");
var questionOption4 = document.getElementById("option4");
var scoresButton = document.getElementById("scoresButton");
var playerName = document.getElementById("name");
var timer = document.getElementById("timer");
var scorePage = document.getElementById("scorePage");
var submit = document.getElementById("submit");
var goBack = document.getElementById("return");
var highScores =document.getElementById("highScores");
var highScoreList=document.getElementById("highScoreList");

var questions= [
   {
    title: "A true/false value is known as a____ ",
    answers: ["string","boolean","null","number"],
    correct: "boolean"
   },
   
   {
    title: "What is a function?",
    answers: ["A reuseable block of code","A way to store data while working in the page","A way to get user feedback when they take an action","A way to compare equality and type of values"],
    correct: "A reuseable block of code"
   },

   {
    title: "What is 'API' an acronym for?",
    answers: ["Average Processing Interval","Annual Programmer's Invitational","Application Programming Interface","Accounted Per Index"],
    correct: "Application Programming Interface"
   }
];

var gameStarted = false;
var countdown = 100;

//needed to make cycling new questions into questionArea possible
var currentQuestion=0;

var logCheck = function(){
    console.log ("Hello, World")
}

//sets the interval as undefined so its available to all scopes
var interval

/*when start button is clicked, this function runs to bring up questions,
hide the start button, show the timer*/

startGame.addEventListener("click", function() {
    questionsArea.style.display = "block";
    startGame.style.display = "none";
    scoresButton.style.display = "none";
    timer.style.display = "flex", "justify-content: center";
    gameStarted =true;

    showCountdownToPage();
    showQuestionsToPage();

 //this function starts the timer's countdown and stops when it hits zero. If it hits zero,hides questions and displays the ScorePage.    
     interval = setInterval(function() {
        if (!gameStarted) {
            return;
        }
        countdown --;

        if (countdown <= 0) {
            clearInterval(interval);
            questionsArea.style.display ="none";
            scorePage.style.display = "block";
        }
    
        showCountdownToPage();
    }, 1000);

});

function showCountdownToPage() {
    timer.textContent = "Time Remaining " + countdown;
}

function showQuestionsToPage() {
    questionHeader.textContent = questions[currentQuestion].title;
    questionOption1.textContent= questions[currentQuestion].answers[0];
    questionOption2.textContent= questions[currentQuestion].answers[1];
    questionOption3.textContent= questions[currentQuestion].answers[2];
    questionOption4.textContent= questions[currentQuestion].answers[3];
}

questionsArea.addEventListener("click",function(event) {
    var clicked = event.target.textContent
    var correctAnswer = questions[currentQuestion].correct

        if(clicked ==correctAnswer) {
           if(currentQuestion<questions.length-1) {
            currentQuestion++;
            showQuestionsToPage();
           }

           else {
            // stop timer and show scorePage
            clearInterval(interval);
            questionsArea.style.display ="none";
            scorePage.style.display = "block";
           }
        }

        else {
        countdown -=10;
        }
        
});

function saveScore(){
    var scoreInfo = {
    name: playerName.value.trim(),
    points: countdown,}
localStorage.setItem("scoreInfo",JSON.stringify(scoreInfo))
    }
//saved the users name and score into local storage upon submit button being pressed.
submit.addEventListener("click",function(){
    saveScore();
    scorePage.style.display ="none",
    startGame.style.display="block",
    scoresButton.style.display ="block",
    timer.style.display = "none",
    countdown= 100,
    currentQuestion=0
});

//event listener for when the Go back button is clicked. Resets the timer and page back to start.
goBack.addEventListener("click",function(){
    scorePage.style.display ="none",
    startGame.style.display="block",
    highScores.style.display = "none",
    scoresButton.style.display ="block",
    timer.style.display = "none",
    countdown= 100,
    currentQuestion=0
});
var displayedScore =localStorage.getItem("scoreInfo");

scoresButton.addEventListener("click",function(){
    highScores.style.display ="block",
    startGame.style.display="none",
    scoresButton.style.display ="none",
    highScoreList.innerHTML =displayedScore;
    
});
