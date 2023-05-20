var startGame = document.getElementById("startGame");
var questionsArea = document.getElementById("questionsArea");
var scores = document.getElementById("scores");
var timer =document.getElementById("timer");

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

var logCheck = function(){
    console.log ("Hello, World")
}

startGame.addEventListener("click", function() {
    questionsArea.style.display = "block";
    startGame.style.display = "none";
    timer.style.display = "flex", "justify-content: center";
    gameStarted =true;

    var interval = setInterval(function() {
        if (!gameStarted) {
            return;
        }
        countdown --;

        if (countdown <= 0) {
            clearInterval(interval);

        }
    
        showCountdownToPage();
    }, 1000);

});

function showCountdownToPage() {
    timer.textContent = "Time Remaining " + countdown;
}