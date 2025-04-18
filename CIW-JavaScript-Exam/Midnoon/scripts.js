// This function shows or hides content when called
function toggleContent(contentId) {
    // Get the content element by its ID
    const content = document.getElementById(contentId);
    // Check if the content is currently hidden or not displayed
    content.style.display = (content.style.display === 'block') ? 'none' : 'block';
}

    // Initialize all content sections to be hidden
    document.addEventListener("DOMContentLoaded", function() {
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            content.style.display = "none";
        });
    });
// This is an immediately invoked function expression (IIFE)
// It runs the code inside it right away
(function() {
    // This line prevents the right-click menu from showing up
    document.addEventListener('contextmenu', event => event.preventDefault()); // Source-No-Snoop, Not foolproof
    
    // These variables keep track of how many times something is clicked and how many answers are correct
    let count = 0;
    let correctCount = 0;

    // This function sets up the quiz
    function initializeQuiz() {
        resetQuiz(); // Start the quiz fresh
        window.scrollTo(0, 0); // Scroll to the top of the page

        // After a little wait, focus on the first answer button
        setTimeout(() => {
            const firstButton = document.querySelector('#quiz .answer-button');
            if (firstButton) {
                firstButton.focus(); // Make the first button ready to be clicked
            }
        }, 100); // Wait 100 milliseconds
    }
    
    // This event runs when the webpage is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
        initializeQuiz(); // Start the quiz when everything is ready
    });
    
    // When the refresh button is clicked, restart the quiz
    document.getElementById('refreshButton').onclick = () => {
        initializeQuiz(); // Reset the quiz
    };
    
    // This function runs when the feather button is clicked
    document.getElementById('featherButton').addEventListener('click', function() {
        const feather = document.getElementById('feather');

        // Make the feather invisible and move it above the cap
        feather.style.opacity = '0';
        feather.style.transform = 'translateX(-50%) translateY(-100%)'; // Start above the cap

        // This line makes the browser re-check the feather's position
        void feather.offsetWidth; // Forces a reflow

        // Now make the feather visible and start the animation
        feather.style.opacity = '1';
        feather.classList.add('animate');

        // When the animation is done, remove the animation class
        feather.addEventListener('transitionend', function() {
            feather.classList.remove('animate');
        }, { once: true }); // Only do this once
    });

    // This function counts how many times something is clicked
    function countClick() {
        count++; // Increase the count by 1
        document.getElementById('clickCount').innerText = count; // Show the count on the page
    }

    // This function shuffles an array (like mixing up a deck of cards)
    function secureShuffle(array) {
        const shuffledArray = array.slice(); // Make a copy of the array
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            // Pick a random index to swap with
            const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1) * (i + 1));
            // Swap the elements
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray; // Return the shuffled array
    }

    // This function gets a random set of questions from the questions array
    function getRandomQuestions(questionsArray, num) {
        return secureShuffle([...questionsArray]).slice(0, num); // Shuffle and take the first 'num' questions
    }

    // This function displays the quiz questions and answers
    function displayQuiz(questionsArray, quizContainerId, resultContainerId) {
        const quizContainer = document.getElementById(quizContainerId); // Get the quiz container
        const selectedQuestions = getRandomQuestions(questionsArray, 5); // Get 5 random questions
        const buttons = []; // This will hold the answer buttons

        // For each selected question, create a question and its answer buttons
        selectedQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div'); // Create a new div for the question
            questionDiv.className = 'question'; // Give the question div a class name
            questionDiv.textContent = `${index + 1}. ${q.question}\n`; // Set the text to show the question number and the question itself

            // Shuffle the answers for this question
            const shuffledAnswers = secureShuffle([...q.answers]);

            // For each answer, create a button
            shuffledAnswers.forEach(answer => {
                const button = document.createElement('button'); // Create a new button
                button.textContent = answer; // Set the button text to the answer
                button.className = 'answer-button'; // Give the button a class name
                button.setAttribute('role', 'button'); // Set the role to button for accessibility

                buttons.push(button); // Add the button to the buttons array

                // When the button is clicked, check if the answer is correct
                button.onclick = () => {
                    checkAnswer(answer, q.correct, resultContainerId); // Check the answer
                    countClick(); // Count this click
                    questionDiv.querySelectorAll('button').forEach(btn => btn.disabled = true); // Disable all buttons for this question
                };

                button.tabIndex = 0; // Make the button focusable
                // Allow the user to press Enter or Space to click the button
                button.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault(); // Prevent the default action
                        button.click(); // Simulate a click on the button
                    }
                });

                questionDiv.appendChild(button); // Add the button to the question div
            });
            quizContainer.appendChild(questionDiv); // Add the question div to the quiz container
        });

        // If there are buttons, focus on the first one
        if (buttons.length > 0) {
            buttons[0].focus(); // Make the first button ready to be clicked
        }

        // Add a keydown event listener for arrow key navigation
        quizContainer.addEventListener('keydown', (event) => {
            const focusedButton = document.activeElement; // Get the currently focused button

            // Check if the focused element is one of the buttons
            if (buttons.includes(focusedButton)) {
                const currentIndex = buttons.indexOf(focusedButton); // Find the index of the focused button

                // If the down arrow key is pressed, move focus to the next button
                if (event.key === 'ArrowDown') {
                    const nextIndex = (currentIndex + 1) % buttons.length; // Wrap around to the first button if at the end
                    buttons[nextIndex].focus(); // Focus the next button
                    event.preventDefault(); // Prevent scrolling
                } 
                // If the up arrow key is pressed, move focus to the previous button
                else if (event.key === 'ArrowUp') {
                    const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length; // Wrap around to the last button if at the start
                    buttons[prevIndex].focus(); // Focus the previous button
                    event.preventDefault(); // Prevent scrolling
                } 
                // If the right arrow key is pressed, move focus to the next button
                else if (event.key === 'ArrowRight') {
                    const nextIndex = (currentIndex + 1) % buttons.length; // Wrap around to the first button if at the end
                    buttons[nextIndex].focus(); // Focus the next button
                    event.preventDefault(); // Prevent scrolling
                } 
                // If the left arrow key is pressed, move focus to the previous button
                else if (event.key === 'ArrowLeft') {
                    const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length; // Wrap around to the last button if at the start
                    buttons[prevIndex].focus(); // Focus the previous button
                    event.preventDefault(); // Prevent scrolling
                }
            }
        });
    }

    // This function checks if the selected answer is correct
    function checkAnswer(selected, correct, resultContainerId) {
        const resultDiv = document.getElementById(resultContainerId); // Get the result display area
        if (selected === correct) { // If the selected answer is correct
            correctCount++; // Increase the correct answer count
            resultDiv.innerText = `Correct! The answer is: ${correct}`; // Show a correct message
        } else { // If the answer is incorrect
            resultDiv.innerText = `Incorrect. The correct answer is: ${correct}`; // Show the correct answer
        }
        document.getElementById('correctCountDisplay').innerText = `${correctCount}`; // Update the correct count display
    }

    // This function starts the quiz with the given questions
    function startQuiz(questionsArray, quizContainerId, resultContainerId) {
        count = 0; // Reset the click count to 0
        correctCount = 0; // Reset the correct answer count to 0
        document.getElementById('clickCount').innerText = count; // Update the click count display
        document.getElementById(resultContainerId).innerText = ''; // Clear the result display
        displayQuiz(questionsArray, quizContainerId, resultContainerId); // Show the quiz questions
    }

    // Quiz questions and answers for Key Characteristics of JavaScript
    const questions = [
        {
            question: "What is a key characteristic of JavaScript?", 
            answers: ["Object-Based Nature", "Compiled Language", "Static Typing", "None of the Above"], 
            correct: "Object-Based Nature" // The correct answer
        },
        {
            question: "JavaScript is considered platform-independent because:", 
            answers: ["It runs on any OS", "It requires a specific compiler", "It is only for web browsers", "It is a compiled language"], 
            correct: "It runs on any OS" // The correct answer
        },
        {
            question: "Which of the following describes JavaScript's execution model?", 
            answers: ["Event-Driven Execution", "Sequential Execution", "Multi-threaded Execution", "None of the Above"], 
            correct: "Event-Driven Execution" // The correct answer
        },
        {
            question: "JavaScript is often referred to as a:", 
            answers: ["Compiled Language", "Scripting Language", "Machine Language", "None of the Above"], 
            correct: "Scripting Language" // The correct answer
        },
        {
            question: "What does the event loop in JavaScript do?", 
            answers: ["Executes code in a multi-threaded environment", "Checks for new events and executes associated code", "Compiles JavaScript code", "None of the Above"], 
            correct: "Checks for new events and executes associated code" // The correct answer
        },
        {
            question: "Which of the following is a common pitfall when learning JavaScript?", 
            answers: ["Understanding the event loop", "Mixing up JavaScript with Java", "Using modern features", "None of the Above"], 
            correct: "Mixing up JavaScript with Java" // The correct answer
        },
        {
            question: "What is the primary reason JavaScript is considered a scripting language?", 
            answers: ["It is compiled", "It is interpreted at runtime", "It is only used for web pages", "None of the Above"], 
            correct: "It is interpreted at runtime" // The correct answer
        }
    ];

    // Quiz questions and answers for Objects, Properties, and Methods
    const questions2 = [
        {
            question: "What is an object in JavaScript?", answers: ["A collection of properties", "A data type", "A function", "None of the Above"], correct: "A collection of properties"
        },
        {
            question: "Which of the following is a property of an object?", answers: ["Function", "Variable", "Method", "All of the Above"], correct: "All of the Above"
        },
        {
            question: "How do you access a property of an object?", answers: ["Using dot notation", "Using bracket notation", "Both dot & bracket notation", "None of the Above"], correct: "Both dot & bracket notation"
        },
        {
            question: "What is a method in JavaScript?", answers: ["A property that is a function", "A variable", "An object", "None of the Above"], correct: "A property that is a function"
        },
        {
            question: "Which keyword is used to create an object?", answers: ["new", "create", "object", "function"], correct: "new"
        },
        {
            question: "What does 'this' refer to in a method?", answers: ["The global object", "The object itself", "The parent object", "None of the Above"], correct: "The object itself"
        },
        {
            question: "How can you add a new property to an existing object?", answers: ["Using dot notation", "Using bracket notation", "Both Dot and Bracket notation", "None of the Above"], correct: "Both Dot and Bracket notation"
        },
        {
            question: "What is an object in JavaScript?", answers: ["A data structure that can contain variables and functions", "A type of array", "A function", "None of the Above"], correct: "A data structure that can contain variables and functions"
        },
        {
            question: "What are properties in the context of an object?", answers: ["Functions that belong to an object", "Data/attributes that belong to an object", "Methods of an object", "None of the Above"], correct: "Data/attributes that belong to an object"
        },
        {
            question: "How do you define a method in an object?", answers: ["By using a function inside the object", "By using a variable", "By using a string", "None of the Above"], correct: "By using a function inside the object"
        },
        {
            question: "What is the prototype chain in JavaScript?", answers: ["A way to create arrays", "A method for object inheritance", "A way to store data", "None of the Above"], correct: "A method for object inheritance"
        },
        {
            question: "What is a common pitfall when using methods in JavaScript?", answers: ["Forgetting the context of 'this'", "Using too many properties", "Creating too many objects", "None of the Above"], correct: "Forgetting the context of 'this'"
        },
        {
            question: "How can you create an object literal in JavaScript?", answers: ["Using the 'new' keyword", "Using curly braces", "Using square brackets", "None of the Above"], correct: "Using curly braces"
        },
        {
            question: "What does the following code log? 'console.log(car.color);'", answers: ["The color of the car", "An error", "The car object", "None of the Above"], correct: "The color of the car"
        }
    ];

    // Quiz questions and answers for JavaScript Versions and Flavors
    const questions3 = [
        {
            question: "What does ECMA stand for?", answers: ["European Computer Manufacturers Association", "Electronic Computer Manufacturers Association", "Eclectic Computer Manufacturers Association", "None of the Above"], correct: "European Computer Manufacturers Association"
        },
        {
            question: "What is ECMAScript?", answers: ["A programming language", "The standardized specification for JavaScript", "A web browser", "None of the Above"], correct: "The standardized specification for JavaScript"
        },
        {
            question: "What is JScript?", answers: ["A newer version of JavaScript", "Microsoft's version of JavaScript for Internet Explorer", "A type of ECMAScript", "None of the Above"], correct: "Microsoft's version of JavaScript for Internet Explorer"
        },
        {
            question: "Why is it important to understand ES versions?", answers: ["To know which features are available", "To decide if you need a transpiler", "Both to Decide and Know", "None of the Above"], correct: "Both to Decide and Know"
        },
        {
            question: "What does ECMA-262 define?", answers: ["The core language features of JavaScript", "The syntax of HTML", "The structure of CSS", "None of the Above"], correct: "The core language features of JavaScript"
        },
        {
            question: "What is a common issue with browser implementations of JavaScript features?", answers: ["They all implement features at the same time", "Some features appear in one browser before another", "All browsers support the same features", "None of the Above"], correct: "Some features appear in one browser before another"
        },
        {
            question: "What is a transpiler like Babel used for?", answers: ["To compile JavaScript to machine code", "To convert modern JavaScript to older versions for compatibility", "To create new JavaScript features", "None of the Above"], correct: "To convert modern JavaScript to older versions for compatibility"
        }
    ];

    // Quiz questions and answers for Server-Side vs. Client-Side JavaScript
    const questions4 = [
        {
            question: "Where does client-side JavaScript run?", answers: ["On the server", "In the user's browser", "On a database", "None of the Above"], correct: "In the user's browser"
        },
        {
            question: "What is a primary use of client-side JavaScript?", answers: ["Database operations", "User interactions and dynamic HTML updates", "File handling", "None of the Above"], correct: "User interactions and dynamic HTML updates"
        },
        {
            question: "What engine does Node.js use for server-side JavaScript?", answers: ["SpiderMonkey", "V8", "JavaScriptCore", "None of the Above"], correct: "V8"
        },
        {
            question: "What is a key advantage of using server-side JavaScript?", answers: ["It can manipulate the DOM", "It can handle incoming requests", "It runs faster than client-side JavaScript", "None of the Above"], correct: "It can handle incoming requests"
        },
        {
            question: "Why is it important to distinguish between client-side and server-side JavaScript?", answers: ["To know what features are available in each environment", "To write full-stack applications", "Both to Know and to Write", "None of the Above"], correct: "Both to Know and to Write"
        },
        {
            question: "Which of the following is a task typically handled by server-side JavaScript?", answers: ["Updating the HTML of a webpage", "Handling API endpoints", "Responding to user clicks", "None of the Above"], correct: "Handling API endpoints"
        },
        {
            question: "What type of applications benefit from server-side JavaScript's event-driven nature?", answers: ["Static websites", "Real-time applications", "Simple scripts", "None of the Above"], correct: "Real-time applications"
        }
    ];

    // Quiz questions and answers for Acceptable Coding Practices and the <noscript> Tag
    const questions5 = [
        {
            question: "What does DRY stand for in coding practices?", answers: ["Don't Repeat Yourself", "Do Repeat Yourself", "Don't Read Yourself", "None of the Above"], correct: "Don't Repeat Yourself"
        },
        {
            question: "Why is it important to use comments in your code?", answers: ["To make the code longer", "To clarify the code for others", "To confuse others", "None of the Above"], correct: "To clarify the code for others"
        },
        {
            question: "What is the purpose of the <noscript> tag?", answers: ["To provide fallback content if JavaScript is disabled", "To enable JavaScript", "To comment out code", "None of the Above"], correct: "To provide fallback content if JavaScript is disabled"
        },
        {
            question: "What is a good practice when naming variables?", answers: ["Using random names", "Using consistent naming conventions", "Using only uppercase letters", "None of the Above"], correct: "Using consistent naming conventions"
        },
        {
            question: "What should you do to keep your code DRY?", answers: ["Repeat code in multiple places", "Modularize repeated logic into functions", "Avoid using functions", "None of the Above"], correct: "Modularize repeated logic into functions"
        },
        {
            question: "What message might you include in a <noscript> tag?", answers: ["JavaScript is enabled", "JavaScript is disabled or not supported", "JavaScript is loading", "None of the Above"], correct: "JavaScript is disabled or not supported"
        },
        {
            question: "Why are good coding practices important?", answers: ["They lead to more readable and maintainable code", "They make the code run faster", "They are not important", "None of the Above"], correct: "They lead to more readable and maintainable code"
        }
    ];

    // Quiz questions and answers for Evolution of JavaScript’s Role
    const questions6 = [
        {
            question: "What is a classic use of JavaScript?", answers: ["Webpage interactivity", "Machine learning", "Database management", "None of the Above"], correct: "Webpage interactivity"
        },
        {
            question: "Which library is commonly used for gaming and virtual reality in JavaScript?", answers: ["jQuery", "Babylon.js", "React", "None of the Above"], correct: "Babylon.js"
        },
        {
            question: "What framework is used for native app development with JavaScript?", answers: ["Angular", "React Native", "Vue.js", "None of the Above"], correct: "React Native"
        },
        {
            question: "What is a use case for JavaScript in mobile development?", answers: ["Progressive web apps", "Desktop applications", "Server-side scripting", "None of the Above"], correct: "Progressive web apps"
        },
        {
            question: "Which technology allows JavaScript to be used for backend development?", answers: ["Node.js", "HTML", "CSS", "None of the Above"], correct: "Node.js"
        },
        {
            question: "Why is it important to understand the evolution of JavaScript?", answers: ["It shows that JavaScript is only for simple scripts", "It highlights JavaScript's versatility in modern development", "It is not important", "None of the Above"], correct: "It highlights JavaScript's versatility in modern development"
        },
        {
            question: "What is one of the modern roles of JavaScript?", answers: ["Only for client-side apps", "Powering complex client-side apps and server-side APIs", "Only for backend development", "None of the Above"], correct: "Powering complex client-side apps and server-side APIs"
        }
    ];

    // Quiz questions and answers for Attributes and Methods to Communicate with Users
    const questions7 = [
        {
            question: "What does the type attribute in a <script> tag specify?", answers: ["The type of script", "The version of JavaScript", "The location of the script", "None of the Above"], correct: "The type of script"
        },
        {
            question: "What does the alert() method do?", answers: ["Displays a message to the user", "Collects user input", "Confirms an action", "None of the Above"], correct: "Displays a message to the user"
        },
        {
            question: "What is the purpose of the prompt() method?", answers: ["To display a message", "To collect user input", "To confirm an action", "None of the Above"], correct: "To collect user input"
        },
        {
            question: "What does the confirm() method return?", answers: ["A string", "A boolean value", "An object", "None of the Above"], correct: "A boolean value"
        },
        {
            question: "Why are alert(), prompt(), and confirm() important?", answers: ["They are quick ways to collect data or display warnings", "They are used for complex data processing", "They are not important", "None of the Above"], correct: "They are quick ways to collect data or display warnings"
        },
        {
            question: "What will the following code display? alert('Hello!');", answers: ["A prompt", "A confirmation dialog", "An alert message saying 'Hello!'", "None of the Above"], correct: "An alert message saying 'Hello!'"
        },
        {
            question: "What is the default type for a <script> tag in modern HTML?", answers: ["text/javascript", "application/javascript", "No type needed", "None of the Above"], correct: "No type needed"
        }
    ];

    // Quiz questions and answers for Defining Variables, Data Types, and Scope
    const questions8 = [
        {
            question: "What is a variable in JavaScript?", answers: ["A fixed value", "A container that holds data", "A type of function", "None of the above"], correct: "A container that holds data"
        },
        {
            question: "Which of the following is NOT a primitive data type in JavaScript?", answers: ["String", "Number", "Object", "Boolean"], correct: "Object"
        },
        {
            question: "What does the `let` keyword do?", answers: ["Declares a variable that is globally scoped", "Declares a variable that is block-scoped", "Declares a constant variable", "None of the above"], correct: "Declares a variable that is block-scoped"
        },
        {
            question: "What is hoisting in JavaScript?", answers: ["Moving variable declarations to the top of the code", "A method to declare variables", "A way to create functions", "None of the above"], correct: "Moving variable declarations to the top of the code"
        },
        {
            question: "What will happen if you try to access a block-scoped variable outside its block?", answers: ["It will return `undefined`", "It will throw a ReferenceError", "It will work fine", "None of the above"], correct: "It will throw a ReferenceError"
        }
    ];

    // Quiz questions and answers for Keywords and Reserved Words
    const questions9 = [
        {
            question: "What are reserved words in JavaScript?", answers: ["Words that can be used as variable names", "Words that are reserved for JavaScript's own use", "Words that have no meaning", "None of the above"], correct: "Words that are reserved for JavaScript's own use"
        },
        {
            question: "Which of the following is a reserved word in JavaScript?", answers: ["variable", "function", "data", "object"], correct: "function"
        },
        {
            question: "Why should you avoid using reserved words as variable names?", answers: ["They can cause syntax errors", "They can lead to unexpected behavior", "Both Syntax errors and Unexpected behavior", "None of the above"], correct: "Both Syntax errors and Unexpected behavior"
        },
        {
            question: "Which of the following is NOT a reserved word in JavaScript?", answers: ["class", "let", "const", "print"], correct: "print"
        },
        {
            question: "What will happen if you try to use a reserved word as a variable name?", answers: ["It will work fine", "It will throw a syntax error", "It will be treated as a string", "None of the above"], correct: "It will throw a syntax error"
        }
    ];

    // Quiz questions and answers for Storing User Input and Using Console/Built-In Methods
    const questions10 = [
        {
            question: "What does the `prompt()` method do in JavaScript?", answers: ["Displays a message to the user", "Collects text input from the user", "Logs information to the console", "None of the above"], correct: "Collects text input from the user"
        },
        {
            question: "What is the purpose of the `alert()` method?", answers: ["To collect user input", "To display a message to the user", "To log information to the console", "None of the above"], correct: "To display a message to the user"
        },
        {
            question: "How do you display information in the browser's DevTools console?", answers: ["alert()", "console.log()", "prompt()", "display()"], correct: "console.log()"
        },
        {
            question: "What will the following code display in the console? `console.log('Hello, World!');`", answers: ["Hello, World!", "Hello, World!", "undefined", "Error"], correct: "Hello, World!"
        },
        {
            question: "Why is using `console.log()` helpful?", answers: ["It helps debug code", "It collects user input", "It displays alerts", "None of the above"], correct: "It helps debug code"
        }
    ];

    // Quiz questions and answers for Concatenation vs. Addition
    const questions11 = [
        {
            question: "What will the following code output? `console.log('2' + '3');`", answers: ["5", "23", "Error", "undefined"], correct: "23"
        },
        {
            question: "What does the `Number()` function do?", answers: ["Converts a string to a number", "Concatenates two strings", "Adds two numbers", "None of the above"], correct: "Converts a string to a number"
        },
        {
            question: "What will the following code output? `console.log(Number('2') + Number('3'));`", answers: ["5", "23", "Error", "undefined"], correct: "5"
        },
        {
            question: "If one operand is a string and the other is a number, what will JavaScript do?", answers: ["Add the two values", "Concatenate the two values", "Throw an error", "None of the above"], correct: "Concatenate the two values"
        },
        {
            question: "What is the result of `let a = '5'; let b = 10; console.log(a + b);`?", answers: ["15", "510", "Error", "undefined"], correct: "510"
        }
    ];

    // Quiz questions and answers for Operators (String Concatenation, Strict Comparison, etc.)
    const questions12 = [
        {
            question: "What does the `+` operator do when used with strings?", answers: ["Adds two numbers", "Concatenates two strings", "Throws an error", "None of the above"], correct: "Concatenates two strings"
        },
        {
            question: "What is the purpose of the strict equality operator `===`?", answers: ["Checks if two values are equal", "Checks if two values are equal and of the same type", "Checks if two values are not equal", "None of the above"], correct: "Checks if two values are equal and of the same type"
        },
        {
            question: "What will the following expression evaluate to? `5 + '5'`", answers: ["10", "55", "Error", "undefined"], correct: "55"
        },
        {
            question: "Which operator has higher precedence in JavaScript?", answers: ["Addition (+)", "Multiplication (*)", "Subtraction (-)", "All have the same precedence"], correct: "Multiplication (*)"
        },
        {
            question: "What do bitwise operators do?", answers: ["Perform operations on strings", "Manipulate data at the binary level", "Add two numbers", "None of the above"], correct: "Manipulate data at the binary level"
        }
    ];

    // Quiz questions and answers for Expressions
    const questions13 = [
        {
            question: "What is an expression in JavaScript?", answers: ["A statement that performs an action", "A valid set of literals, variables, and operators that results in a single value", "A type of function", "None of the above"], correct: "A valid set of literals, variables, and operators that results in a single value"
        },
        {
            question: "What will the following expression evaluate to? `(5 + 2) * 3`", answers: ["21", "15", "7", "Error"], correct: "21"
        },
        {
            question: "Which of the following is an example of an expression?", answers: ["let x = 5;", "if (x > 5) { }", "userName + ' ' + userAge", "function myFunction() { }"], correct: "userName + ' ' + userAge"
        },
        {
            question: "What will the expression `10 - 3 + 2` evaluate to?", answers: ["5", "9", "7", "Error"], correct: "9"
        },
        {
            question: "Is the following a valid expression? `true && false`", answers: ["Yes", "No", "Only in certain contexts", "None of the above"], correct: "Yes"
        }
    ];

    // Quiz questions and answers for Implement Simple Event Handlers (Keyboard, Mouse, Mobile)
    const questions14 = [
        {
            question: "What is an event handler in JavaScript?", answers: ["A function that runs when an event occurs", "A method to create events", "A way to store user input", "None of the above"], correct: "A function that runs when an event occurs"
        },
        {
            question: "Which of the following is a common mouse event?", answers: ["keydown", "click", "touchstart", "All of the above"], correct: "click"
        },
        {
            question: "What does the following code do? `document.getElementById('myBtn').addEventListener('click', function() { alert('Button was clicked!'); });`", answers: ["Adds a button to the page", "Displays an alert when the button is clicked", "Changes the button text", "None of the above"], correct: "Displays an alert when the button is clicked"
        },
        {
            question: "Which event is used to detect finger actions on touchscreens?", answers: ["click", "mouseover", "touchstart", "keydown"], correct: "touchstart"
        },
        {
            question: "What will happen if you use `addEventListener` with an event type that doesn't exist?", answers: ["It will throw an error", "It will do nothing", "It will create a new event", "None of the above"], correct: "It will do nothing"
        }
    ];

    // Quiz questions and answers for Defining and Using Methods as Functions
    const questions15 = [
        {
            question: "What is a method in JavaScript?", answers: ["A function attached to an object property", "A type of variable", "A special kind of loop", "None of the above"], correct: "A function attached to an object property"
        },
        {
            question: "Given the following code, what will `calculator.add(2, 3)` return? \n `let calculator = { add: function(a, b) { return a + b; } };`", answers: ["2", "3", "5", "Error"], correct: "5"
        },
        {
            question: "What does the following code do? \n `let calculator = { add: function(a, b) { return a + b; } };`", answers: ["Defines a function", "Creates an object with a method", "Both Defines and Creates", "None of the above"], correct: "Both Defines and Creates"
        },
        {
            question: "Which of the following is true about methods?", answers: ["They can only be defined in global scope", "They are always anonymous", "They can be called using the object they belong to", "None of the above"], correct: "They can be called using the object they belong to"
        },
        {
            question: "What will `console.log(calculator.add(2, 3));` output?", answers: ["2", "3", "5", "undefined"], correct: "5"
        }
    ];

    // Quiz questions and answers for Various Types of Functions
    const questions16 = [
        {
            question: "What is a named function?", answers: ["A function without a name", "A function defined with the `function` keyword and a name", "A function that is called immediately", "None of the above"], correct: "A function defined with the `function` keyword and a name"
        },
        {
            question: "What is an anonymous function?", answers: ["A function that has no name", "A function that cannot be called", "A function that is always executed immediately", "None of the above"], correct: "A function that has no name"
        },
        {
            question: "What is an arrow function?", answers: ["A function defined using the `=>` syntax", "A function that cannot return a value", "A function that is always named", "None of the above"], correct: "A function defined using the `=>` syntax"
        },
        {
            question: "What is a closure in JavaScript?", answers: ["A function that captures variables from its outer scope", "A type of loop", "A method that cannot be called", "None of the above"], correct: "A function that captures variables from its outer scope"
        },
        {
            question: "Why are closures important?", answers: ["They allow you to maintain state across multiple function calls", "They are faster than regular functions", "They can only be used in global scope", "None of the above"], correct: "They allow you to maintain state across multiple function calls"
        }
    ];

    // Quiz questions and answers for Global vs. Local Variables
    const questions17 = [
        {
            question: "What is a global variable?", answers: ["Declared inside a function", "Declared outside of any function/block", "Only accessible within its block", "None of the above"], correct: "Declared outside of any function/block"
        },
        {
            question: "What is a local variable?", answers: ["Accessible anywhere in the code", "Declared inside a function or block", "Can create naming conflicts", "None of the above"], correct: "Declared inside a function or block"
        },
        {
            question: "What can happen if you overuse global variables?", answers: ["Improved performance", "Naming conflicts or unexpected side effects", "Easier debugging", "None of the above"], correct: "Naming conflicts or unexpected side effects"
        },
        {
            question: "Which of the following is true about local variables?", answers: ["They can be accessed from anywhere", "They are only accessible within the function/block they are declared in", "They are always global", "None of the above"], correct: "They are only accessible within the function/block they are declared in"
        },
        {
            question: "Where are global variables declared?", answers: ["Inside a function", "Inside a block", "Outside of any function/block", "None of the above"], correct: "Outside of any function/block"
        }
    ];

    // Quiz questions and answers for Using the Conditional (Ternary) Operator
    const questions18 = [
        {
            question: "What is the syntax of the ternary operator?", answers: ["condition ? expressionIfTrue : expressionIfFalse", "condition ? expressionIfFalse : expressionIfTrue", "if (condition) { } else { }", "None of the above"], correct: "condition ? expressionIfTrue : expressionIfFalse"
        },
        {
            question: "What will the following code output? \n `let age = 20; let canDrink = (age >= 21) ? 'Yes' : 'No'; console.log(canDrink);`", answers: ["Yes", "No", "Error", "undefined"], correct: "No"
        },
        {
            question: "What does the ternary operator do?", answers: ["It creates a loop", "It evaluates a condition and returns one of two values", "It defines a function", "None of the above"], correct: "It evaluates a condition and returns one of two values"
        },
        {
            question: "Which of the following is NOT a valid use of the ternary operator?", answers: ["let result = (x > y) ? x : y;", "let result = (x < y) ? 'Less' : 'More';", "let result = if (x > y) { x; } else { y; };", "let result = (x === y) ? 'Equal' : 'Not Equal';"], correct: "let result = if (x > y) { x; } else { y; };"
        },
        {
            question: "What is the primary benefit of using the ternary operator?", answers: ["It makes code longer", "It simplifies conditional expressions", "It can only be used in functions", "None of the above"], correct: "It simplifies conditional expressions"
        }
    ];

    // Quiz questions and answers for User Events and Event Handlers
    const questions19 = [
        {
            question: "What is a user event in JavaScript?", answers: ["A function that runs automatically", "An action performed by the user", "A type of variable", "None of the above"], correct: "An action performed by the user"
        },
        {
            question: "Which of the following is an example of a user event?", answers: ["onclick", "onload", "keydown", "All of the above"], correct: "All of the above"
        },
        {
            question: "What is an event handler?", answers: ["A function that runs in response to an event", "A type of variable", "A method to create events", "None of the above"], correct: "A function that runs in response to an event"
        },
        {
            question: "Which of the following is NOT a user event?", answers: ["click", "submit", "load", "define"], correct: "define"
        },
        {
            question: "What does the `onclick` event do?", answers: ["Triggers when the mouse is clicked", "Triggers when the page loads", "Triggers when a key is pressed", "None of the above"], correct: "Triggers when the mouse is clicked"
        }
    ];

    // Quiz questions and answers for Function-Specific Methods: call(), apply(), and bind()
    const questions20 = [
        {
            question: "What does the `call()` method do?", answers: ["Invokes a function with a specified `this` context and arguments", "Creates a new function", "Returns the value of a function", "None of the above"], correct: "Invokes a function with a specified `this` context and arguments"
        },
        {
            question: "What is the difference between `call()` and `apply()`?", answers: ["`call()` takes arguments as a list, while `apply()` takes arguments as an array", "`call()` is used for objects, while `apply()` is for functions", "There is no difference", "None of the above"], correct: "`call()` takes arguments as a list, while `apply()` takes arguments as an array"
        },
        {
            question: "What does the `bind()` method do?", answers: ["Creates a new function with a bound `this` context", "Invokes a function immediately", "Returns the value of a function", "None of the above"], correct: "Creates a new function with a bound `this` context"
        },
        {
            question: "Given the following code, what will `greet.call(null, 'Hello', 'Alice');` output? \n `function greet(greeting, name) { console.log(greeting + ', ' + name); }`", answers: ["Hello, Alice", "undefined", "Error", "None of the above"], correct: "Hello, Alice"
        },
        {
            question: "Why are `call()`, `apply()`, and `bind()` useful?", answers: ["They allow you to control the `this` context explicitly", "They are faster than regular functions", "They can only be used in global scope", "None of the above"], correct: "They allow you to control the `this` context explicitly"
        }
    ];

    // Quiz questions and answers for Built-In Functions and Casting Variables
    const questions21 = [
        {
            question: "What does `parseInt('42')` return?", answers: ["42", "Error", "undefined", "None of the above"], correct: "42"
        },
        {
            question: "What does `parseFloat('3.14')` return?", answers: ["3", "3.14", "Error", "None of the above"], correct: "3.14"
        },
        {
            question: "What does the `Number()` function do?", answers: ["Converts a string to a number", "Converts a number to a string", "Parses integers", "None of the above"], correct: "Converts a string to a number"
        },
        {
            question: "What does the `String()` function do?", answers: ["Converts a value to a string", "Converts a string to a number", "Parses floats", "None of the above"], correct: "Converts a value to a string"
        },
        {
            question: "Which of the following is a built-in function in JavaScript?", answers: ["Math.random()", "Date()", "Both Math.random() and Date()", "None of the above"], correct: "Both Math.random() and Date()"
        }
    ];

    // This function resets the quiz to its initial state
    function resetQuiz() {
        count = 0; // Reset the correct answer count to 0
        correctCount = 0;
        document.getElementById('clickCount').innerText = count; // Update the click count display
        document.getElementById('correctCountDisplay').innerText = correctCount; // Update the correct count display
        document.querySelectorAll('.result').forEach(resultDiv => resultDiv.innerText = ''); // Clear all result displays
        document.querySelectorAll('.topic > div').forEach(quizDiv => quizDiv.textContent = ''); // Clear all quiz divs
        // Start the quiz for multiple topics
        startQuiz(questions, 'quiz', 'result'); // Start the first quiz
        startQuiz(questions2, 'quiz2', 'result2'); // Start the second quiz (assuming questions2 is defined)
        startQuiz(questions3, 'quiz3', 'result3'); // Start the third quiz (assuming questions3 is defined)
        // ... (and so on for other quizzes)
        startQuiz(questions4, 'quiz4', 'result4');
        startQuiz(questions5, 'quiz5', 'result5');
        startQuiz(questions6, 'quiz6', 'result6');
        startQuiz(questions7, 'quiz7', 'result7');
        startQuiz(questions8, 'quiz8', 'result8');
        startQuiz(questions9, 'quiz9', 'result9');
        startQuiz(questions10, 'quiz10', 'result10');
        startQuiz(questions11, 'quiz11', 'result11');
        startQuiz(questions12, 'quiz12', 'result12');
        startQuiz(questions13, 'quiz13', 'result13');
        startQuiz(questions14, 'quiz14', 'result14');
        startQuiz(questions15, 'quiz15', 'result15');
        startQuiz(questions16, 'quiz16', 'result16');
        startQuiz(questions17, 'quiz17', 'result17');
        startQuiz(questions18, 'quiz18', 'result18');
        startQuiz(questions19, 'quiz19', 'result19');
        startQuiz(questions20, 'quiz20', 'result20');
        startQuiz(questions21, 'quiz21', 'result21'); // Start the last quiz (assuming questions21 is defined)
    }
})();