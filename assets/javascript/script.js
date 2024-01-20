var highScores = document.querySelector('#hiscore');
var startQuiz = document.querySelector('#start-button');
var quizContainer = document.querySelector('#quiz-container');
var questionsContainer = document.querySelector('#questions-container');
var timerDiv = document.querySelector('#timer');
var scoreContainer = document.querySelector('#high-scores-container');
var currentQuestion = 0;
var currentQuestionObj;
var timeRemaining = 60;
var interval;
var scores;
//Array for questions to be asked with multiple choice options, the correct answer, and an explanation of the correct answer
var questions = [ 
    {
        question: 'What does the "typeof" operator return when used with a variable declared using "let"?',
        options: ['A. "number"', 'B. "undefined"', 'C. "string"', 'D. "object"'], correctIndex: 2, 
        showAlert: function() {
            alert('Incorrect! The "typeof" operator in JavaScript returns a string that represents the data type of the operand. When used with a variable declared using "let", it will return the type of the variable. So, the "typeof" operator returns a string indicating the data type of the variable, whether it is a number, string, boolean, object, etc.');
        }
    },
    
    {
        question: 'What will be logged to the console in the following code? "console.log(0.1 + 0.2 == 0.3);"',
        options: ['A. False', 'B. True', 'C. undefined', 'D. NaN'],
        correctIndex: 0,
        showAlert: function() {
            alert('Incorrect! In JavaScript, the ("==") operator performs loose equality comparisons, and when dealing with floating-point numbers, it can lead to unexpected results due to precision issues. In this case, the result may not be as expected. The result of the expression "0.1 + 0.2" is not exactly equal to "0.3" due to floating-point representation precision. Therefore, the expression will log "false" to the console.')
        }
    },

    {
        question: 'What will be the output of the following code? "console.log(NaN == NaN);"',
        options: ['A. True', 'B. False', 'C. undefined', 'D. NaN'],
        correctIndex: 1,
        showAlert: function() {
            alert('Incorrect! In JavaScript, the equality comparison ("==") between two NaN values always evaluates to false. This behavior is intentional because NaN represents the result of an undefined or unrepresentable value, and it is not considered equal to another NaN.')
        }
    },

    {
        question: 'What does the "parseInt()" function do?',
        options: ['A. Returns a string representation of the parsed integer', 'B. Parses a string and returns a boolean', 'C. Parses a string and returns a float', 'D. Parses a string and returns an integer'],
        correctIndex: 3,
        showAlert: function() {
            alert('Incorrect! The function takes two arguments: the string to be parsed and the radix, which specifies the numeral system to be used. The radix can be any integer between 2 and 36. The result returned is an integer.')
        }
    },

    {
        question: 'What is the result of the expression "1 && 0" in JavaScript?', options: ['A. 1', 'B. 0', 'C. True', 'D. False'],
        correctIndex: 1,
        showAlert: function () {
            alert('Incorrect! In JavaScript, the "&&" operator returns the value of the second operand if the first operand is truthy (a non-empty string, non-zero numbers, objects); otherwise, it returns the value of the first operand.')
        }
    },
]

//Navigate back and forth between the quiz page and the high scores page when clicking on the div with the id of hiscore
highScores.addEventListener('click', function() {
    window.location.href='high-scores.html';

    if (window.location.href.includes('high-scores.html')) {
        window.location.href = 'index.html';
    } else {
        window.location.href = 'high-scores.html';
    }
});

//Adds functionality to the Start Quiz button
startQuiz.addEventListener('click', function() {
    //Hide the quiz container when the Start Quiz button is clicked
    quizContainer.style.display = 'none';
    //Show the questions container in place of the quiz container
    questionsContainer.style.display = 'block';
    //Invoke the showNextQuestion function
    showNextQuestion();
    //Invoke the startTimer function
    startTimer();
});

//Checks the answer of the current question and proceeds to the next question
questionsContainer.addEventListener('change', function (event) {
    if (event.target.type === 'radio' && event.target.checked) {
        var chosenAnswerIndex = parseInt(event.target.value);
        checkAnswer(chosenAnswerIndex, currentQuestionObj.correctIndex);
        showNextQuestion();
    }
});

//Function to load and display the questions in the questions container
function showNextQuestion() {
    if (currentQuestion < questions.length && timeRemaining > 0) {
        // Get the current question object
        currentQuestionObj = questions[currentQuestion];
        // Create a div for the question text
        var questionDiv = document.createElement('div');
        // Create a paragraph for the question text
        var questionText = document.createElement('p');
        questionText.textContent = currentQuestionObj.question;
        questionDiv.appendChild(questionText);
        // Create radio inputs for each option
        currentQuestionObj.options.forEach(function (option, index) {
            var optionContainer = document.createElement('div');
            var optionLabel = document.createElement('label');
            var radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'option';
            radioInput.value = index;
            optionLabel.appendChild(radioInput);
            optionLabel.innerHTML += option;
            // Append the label to the container
            optionContainer.appendChild(optionLabel);
            // Append the container to the questionDiv
            questionDiv.appendChild(optionContainer);
        });
        // Append the questionDiv to the questionsContainer
        questionsContainer.innerHTML = '';
        questionsContainer.appendChild(questionDiv);
    } else {
        clearInterval(interval);
        endGame();
    }
}

// Function to check the selected answer
function checkAnswer(chosenAnswerIndex, correctAnswerIndex) {
    console.log('Chosen Index:', chosenAnswerIndex);
    console.log('Correct Answer:', correctAnswerIndex);

    if (chosenAnswerIndex === correctAnswerIndex) {
        //Alert for a correct answer
        alert('Correct!');
        console.log('Correct!');
    } else {
        // Alert for incorrect answer
        console.log('Wrong!');
        if (currentQuestionObj.showAlert) {
            currentQuestionObj.showAlert();
        }
        //Decrement timer by 10 seconds for an incorrect answer
        timeRemaining -= 10;
    }
    // Increment to the next question
    currentQuestion++;
}

//Function to create a timer
function startTimer() {
        interval = setInterval(function () {
        //Display Remaining Time
        timerDiv.textContent = 'Time Remaining: ' + timeRemaining + ' Seconds';
        //Check Remaining Time
        if (timeRemaining <= 0) {
            clearInterval(interval);
            alert("Time's Up!");
            console.log("Time's Up!");
        //Decrement time if time still remaining
        } else {
            timeRemaining--;
        }
    }, 1000);
}

//Function to end the game and allow users to submit their score
function endGame() {
    //Check if all questions are answered or if time as run out
    if (currentQuestion >= questions.length || timeRemaining <= 0) {
        //Hide the quiz container
        questionsContainer.style.display = "none";
        //Show the high scores container
        scoreContainer.style.display = 'block';
        //Calculate score based on time remaining
        var quizScore = timeRemaining;
        //Create and display a submit form for the user to enter their initials and submit their score
        var submitForm = document.createElement('form');
        submitForm.innerHTML = `
            <label for="initials">Enter Your Initials:</label>
            <input type="text" id="initials" name="initials" required>
            <button type="submit">Submit Score</button>
            `;
        //Display the submit form
        scoreContainer.appendChild(submitForm);
        //Event listener for the form submission
        submitForm.addEventListener('submit', function (event) {
            event.preventDefault();
            var initialsInput = document.getElementById('initials');
            var userInitials = initialsInput.value;
        //Retrieve existing scores from local storage
        scores = JSON.parse(localStorage.getItem('scores')) || [];
        //Add current user's score to the leaderboard
        scores.push({ initials: userInitials, score: quizScore });
        //Display scores in descending order
        scores.sort((a, b) => b.score - a.score);
        //Store scores in local storage
        localStorage.setItem('scores', JSON.stringify(scores));
        //Show Leaderboard
        window.location.href = 'high-scores.html';
        });
    }
}

//Function to display high scores to the Leaderboard
document.addEventListener('DOMContentLoaded', function() {
    var highScoresList = document.getElementById('high-scores-list');
    console.log('High Scores List:', highScoresList);
    //Retrieve the scores from local storage
    scores = JSON.parse(localStorage.getItem('scores')) || [];
    //Create an li for each score and append it to the leaderboard
    if (highScoresList) {
    scores.forEach(function (score) {
        var listItem = document.createElement('li');
        listItem.textContent = score.initials + ': ' + score.score;
        highScoresList.appendChild(listItem);
    });
    } else {
        console.error('high-scores-list not found');
    }
});