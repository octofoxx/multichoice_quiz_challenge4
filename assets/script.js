//grabs the elements out of the html for us to use in javascript

var startGame = document.getElementById("startGame");
var questionsArea = document.getElementById("questionsArea");
var questionHeader = document.getElementById("questionHeader");
var questionOption1 = document.getElementById("option1");
var questionOption2 = document.getElementById("option2");
var questionOption3 = document.getElementById("option3");
var questionOption4 = document.getElementById("option4");
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

//needed to make cycling new questions into questionArea possible
var currentQuestion=0;

var logCheck = function(){
    console.log ("Hello, World")
}

/*when start button is clicked, this function runs to bring up questions,
hide the start button, start the timer*/

startGame.addEventListener("click", function() {
    questionsArea.style.display = "block";
    startGame.style.display = "none";
    timer.style.display = "flex", "justify-content: center";
    gameStarted =true;

    showCountdownToPage();
    showQuestionsToPage();

 //this function makes sure timer stops when it hits zero as well as run the timer to decrement    
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
           if(currentQuestion<questions.length) {
            currentQuestion++;
            showQuestionsToPage();
           }
           else {
            // stop timer and show scorepage
            logCheck();
           }
        
        }

        else {
        countdown -=10;
        }


        
    }
);

// After last question is answered, end timer. 
//save time in local storage, 
//give prompt for user to save name with time and display into high scores screen. 

// make high score button display high score screen.