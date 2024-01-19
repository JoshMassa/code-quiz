var highScores = document.querySelector('#hiscore');
var startQuiz = document.querySelector('#start-button');
var quizContainer = document.querySelector('#quiz-container');
var questionsContainer = document.querySelector('#questions-container');
//Array for questions to be asked with multiple choice options, the correct answer, and an explanation of the correct answer
var questions = [ 
    {
        question: 'What does the typeof operator return when used with a variable declared using let?',
        options: ['A. "number"', 'B. "undefined"', 'C. "string"', 'D. "object"'], answer: 'C. "string" - The "typeof" operator in JavaScript returns a string that represents the data type of the operand. When used with a variable declared using "let", it will return the type of the variable. So, the "typeof" operator returns a string indicating the data type of the variable, whether it is a number, string, boolean, object, etc.'
    },
    
    {
        question: 'What will be logged to the console in the following code? "console.log(0.1 + 0.2 == 0.3);"',
        options: ['A. False', 'B. True', 'C. undefined', 'D. NaN'],
        answer: 'A. False - In JavaScript, the ("==") operator performs loose equality comparisons, and when dealing with floating-point numbers, it can lead to unexpected results due to precision issues. In this case, the result may not be as expected. The result of the expression "0.1 + 0.2" is not exactly equal to "0.3" due to floating-point representation precision. Therefore, the expression will log "false" to the console.'
    },

    {
        question: 'What will be the output of the following code? "console.log(NaN == NaN);"',
        options: ['A. True', 'B. False', 'C. undefined', 'D. NaN'],
        answer: 'B. False - In JavaScript, the equality comparison ("==") between two NaN values always evaluates to false. This behavior is intentional because NaN represents the result of an undefined or unrepresentable value, and it is not considered equal to another NaN.'
    },

    {
        question: 'What does the "parseInt()" function do?',
        options: ['A. Returns a string representation of the parsed integer', 'B. Parses a string and returns an integer', 'C. Parses a string and returns a float', 'D. Parses a string and returns a boolean'],
        answer: 'B. Parses a string and returns an integer - The function takes two arguments: the string to be parsed and the radix, which specifies the numeral system to be used. The radix can be any integer between 2 and 36.'
    },

    {
        question: 'What is the result of the expression "1 && 0" in JavaScript?', options: ['A. 1', 'B. 0', 'C. True', 'D. False'],
        answer: 'B. 0 - In JavaScript, the "&&" operator returns the value of the second operand if the first operand is truthy (a non-empty string, non-zero numbers, objects); otherwise, it returns the value of the first operand.'
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
    //Invoke the loadQuestions function
    loadQuestions();
});

//Function to load and display the questions in the questions container
function loadQuestions() {
    questions.forEach(function(questionObj, index) {
    var questionEl = document.createElement('div');
    questionEl.classList.add('question');
    //Add the question's text
    questionEl.innerHTML = '<p>' + questionObj.question + '</p>';
    //Add buttons for option selection
    questionObj.options.forEach(function(option, optionIndex) {
        var inputEl = document.createElement('input');
        inputEl.type = 'radio';
        inputEl.name = 'question' + index;
        inputEl.value = option;
        var labelEl = document.createElement('label');
        labelEl.innerHTML = option;
        questionEl.appendChild(inputEl);
        questionEl.appendChild(labelEl);
        });
        //Append the question El to the questions container
        questionsContainer.appendChild(questionEl);
    });
}