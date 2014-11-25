$(document).ready(function() {
   
   //var questionList = getQuestions();
   // init vars
var currentQuestion = 0,
  score = 0,
  askingQuestion = true;
  var linebreak = document.createElement("br");
  
  	var content = document.getElementById('space'),
  questionContainer = document.getElementById('questionText'),
  choicesContainer = document.getElementById('answerList'),
  scoreContainer = document.getElementById('score'),
  submitBtn = document.getElementById('submit');
   
  
	var question = [
	{text:'Which U.S. President is the only one from Pennsylvania?', 
	answers: ['James Buchanan', 'Abraham Lincoln', 'Franklin Roosevelt'], 
	right: 'James Buchanan'},
	{text:'How many states did the U.S. have during World War II?', 
	answers: ['48', '47', '50'],
	right: '48'},
	{text:'During which year were the Articles of Confederation ratified?', 
	answers: ['1781', '1789', '1776'], 
	right: '1781'},
	{text:'During which Civil War battle included a duel between two ironclad warships?', 
	answers: ['Battle of Hampton Roads', 'The Battle of Port Royal', 'The Seige of Charleston Harbor'], 
	right: 'Battle of Hampton Roads'}];

askQuestion();

//function $(id) { // shortcut for document.getElementById
//return document.getElementById(id);
//}

function askQuestion() {
  var choices = question[currentQuestion].answers,
    choicesHtml = "";
  var length = choices.length;
  // loop through choices, and create radio buttons
  for (var i = 0; i < length; i++) {
  
  var rand = Math.floor(Math.random() * choices.length);
  console.log(rand);
    choicesHtml += "<input type='radio' name='question" + currentQuestion +
      "' id='choice" + (i + 1) +
      "' value='" + choices[rand] + "'>" +
      " <label for='choice" + (i + 1) + "'>" + choices[rand] + "</label><br><br>";
	  choices.splice(rand,1);
  }

  // load the question
  questionContainer.textContent = "Q" + (currentQuestion + 1) + ". " +
    question[currentQuestion].text;

  // load the choices
  choicesContainer.innerHTML = choicesHtml;

  // setup for the first time
  if (currentQuestion === 0) {
  
    scoreContainer.textContent = "0 \/ " +
      question.length;
    submitBtn.textContent = "Submit Answer";
  }

  }

function checkAnswer() {

  // are we asking a question, or proceeding to next question?
  if (askingQuestion) {
 
    submitBtn.textContent = "Next Question";
    askingQuestion = false;

    // determine which radio button they clicked
    var userpick,
      correctIndex,
      radios = document.getElementsByName("question" + currentQuestion);
	  
    for (var i = 0; i < radios.length; i++) {
	
     if (radios[i].checked) { // if this radio button is checked
        userpick = radios[i].value;
		console.log('user pick is ' + userpick);
      }

      // get index of correct answer
      if (radios[i].value == question[currentQuestion].right) {
        correctIndex = i;
		console.log('correct index is ' + correctIndex);
      }
    }

    // setup if they got it right, or wrong
   var labelStyle = document.getElementsByTagName("label")[correctIndex].style;
    
	
    if (userpick == question[currentQuestion].right) {
      score++;
      labelStyle.color = "green";
	  labelStyle.fontWeight = "bold";
	  
    } 
	
	else {
      labelStyle.color = "red";
	  console.log(userpick);
	  labelStyle.fontWeight = "bold";
    }

    scoreContainer.textContent = score + " \/ " +
      question.length;
  }else { // move to next question
    // setting up so user can ask a question
    askingQuestion = true;
    // change button text back to "Submit Answer"
    submitBtn.textContent = "Submit Answer";
    // if we're not on last question, increase question number
    if (currentQuestion < question.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      showFinalResults();
    }
  }
  

  
}

function showFinalResults() {
  questionContainer.innerHTML = '<h1>Game Over!</h1>';
  submitBtn.disabled = true;
  scoreContainer.innerHTML = "<h2>You've completed the quiz!</h2>" +
    "<h2>Below are your results:</h2>" +
    "<h2>" + score + " out of " + question.length + " questions, " +
    Math.round(score / question.length * 100) + "%<h2>";
}


	
submitBtn.addEventListener("click", checkAnswer, false);

		
});