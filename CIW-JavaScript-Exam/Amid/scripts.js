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

(function() {
    document.addEventListener('contextmenu', event => event.preventDefault()); // Not a foolproof Source-No-Snoop
    let count = 0;
    let correctCount = 0;

    function initializeQuiz() {
        resetQuiz(); // Start the quiz
        window.scrollTo(0, 0); // Scroll to the top of the page
    
        // Set focus on the first answer button of the first quiz after a slight delay
        setTimeout(() => {
            const firstButton = document.querySelector('#quiz .answer-button');
            if (firstButton) {
                firstButton.focus();
            }
        }, 100); // Adjust the delay as needed
    }
    
    document.addEventListener('DOMContentLoaded', () => {
        initializeQuiz(); // Start the quiz when the document is loaded
    });
    
    document.getElementById('refreshButton').onclick = () => {
        initializeQuiz(); // Reset the quiz when the refresh button is clicked
    };

    function countClick() {
        count++;
        document.getElementById('clickCount').innerText = count;
    }

    function secureShuffle(array) {
        const shuffledArray = array.slice();
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const randomIndex = Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1) * (i + 1));
            [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
        }
        return shuffledArray;
    }

    function getRandomQuestions(questionsArray, num) {
        return secureShuffle([...questionsArray]).slice(0, num);
    }

    function displayQuiz(questionsArray, quizContainerId, resultContainerId) {
        const quizContainer = document.getElementById(quizContainerId);
        const selectedQuestions = getRandomQuestions(questionsArray, 5);
        const buttons = [];

        selectedQuestions.forEach((q, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            questionDiv.textContent = `${index + 1}. ${q.question}\n`;

            const shuffledAnswers = secureShuffle([...q.answers]);

            shuffledAnswers.forEach(answer => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.className = 'answer-button';
                button.setAttribute('role', 'button');

                buttons.push(button);

                button.onclick = () => {
                    checkAnswer(answer, q.correct, resultContainerId);
                    countClick();
                    questionDiv.querySelectorAll('button').forEach(btn => btn.disabled = true);
                };

                button.tabIndex = 0;
                button.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        button.click();
                    }
                });

                questionDiv.appendChild(button);
            });
            quizContainer.appendChild(questionDiv);
        });

        if (buttons.length > 0) {
            buttons[0].focus(); // Focus the first button
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

    function checkAnswer(selected, correct, resultContainerId) {
        const resultDiv = document.getElementById(resultContainerId);
        if (selected === correct) {
            correctCount++;
            resultDiv.innerText = `Correct! The answer is: ${correct}`;
        } else {
            resultDiv.innerText = `Incorrect. The correct answer is: ${correct}`;
        }
        document.getElementById('correctCountDisplay').innerText = `${correctCount}`;
    }

    function startQuiz(questionsArray, quizContainerId, resultContainerId) {
        count = 0;
        correctCount = 0;
        document.getElementById('clickCount').innerText = count;
        document.getElementById(resultContainerId).innerText = '';
        displayQuiz(questionsArray, quizContainerId, resultContainerId);
    }

    // Quiz questions and answers for Changing HTML "On The Fly" with JavaScript
    const questions = [
        {
            question: "What does the method document.getElementById('id') do?", 
            answers: [
                "Selects multiple elements by their class", 
                "Selects a single element by its unique id", 
                "Selects elements by their tag name", 
                "None of the Above"
            ], 
            correct: "Selects a single element by its unique id"
        },
        {
            question: "Which method is used to select elements by their name attribute?", 
            answers: [
                "document.getElementsByClassName('class')", 
                "document.getElementsByTagName('tag')", 
                "document.getElementsByName('name')", 
                "None of the Above"
            ], 
            correct: "document.getElementsByName('name')"
        },
        {
            question: "What does document.getElementsByTagName('tag') return?", 
            answers: [
                "A single element that matches the tag", 
                "A live collection of elements that match the specified tag", 
                "A static NodeList of elements", 
                "None of the Above"
            ], 
            correct: "A live collection of elements that match the specified tag"
        },
        {
            question: "What is the purpose of document.querySelector('cssSelector')?", 
            answers: [
                "Returns all matches as a live collection", 
                "Returns the first match of the specified CSS selector", 
                "Selects elements by their name attribute", 
                "None of the Above"
            ], 
            correct: "Returns the first match of the specified CSS selector"
        },
        {
            question: "How can you change the text content of an element selected with querySelector?", 
            answers: [
                "Using innerHTML property", 
                "Using textContent property", 
                "Using both innerHTML and textContent", 
                "None of the Above"
            ], 
            correct: "Using textContent property"
        },
        {
            question: "What does the style property allow you to modify?", 
            answers: [
                "Only the text content of an element", 
                "The CSS styles of an element", 
                "The HTML structure of an element", 
                "None of the Above"
            ], 
            correct: "The CSS styles of an element"
        },
        {
            question: "Why is it important to manipulate the DOM in real-time?", 
            answers: [
                "To create static web pages", 
                "To allow for dynamic and interactive user experiences", 
                "To reduce the size of the HTML file", 
                "None of the Above"
            ], 
            correct: "To allow for dynamic and interactive user experiences"
        }
    ];

    // Quiz questions and answers for Modifying Attributes in HTML Using DOM Elements
    const questions2 = [
        {
            question: "What does the method element.setAttribute('attributeName', 'value') do?", 
            answers: [
                "Removes an existing attribute", 
                "Dynamically changes or adds attributes", 
                "Accesses an attribute directly", 
                "None of the Above"
            ], 
            correct: "Dynamically changes or adds attributes"
        },
        {
            question: "How do you remove an existing attribute from an element?", 
            answers: [
                "element.removeAttribute('attributeName')", 
                "element.setAttribute('attributeName', null)", 
                "element.deleteAttribute('attributeName')", 
                "None of the Above"
            ], 
            correct: "element.removeAttribute('attributeName')"
        },
        {
            question: "Which of the following is an example of direct property access?", 
            answers: [
                "myImg.setAttribute('src', 'newImage.png')", 
                "myImg.removeAttribute('alt')", 
                "myImg.src = 'newImage.png'", 
                "None of the Above"
            ], 
            correct: "myImg.src = 'newImage.png'"
        },
        {
            question: "What is a potential pitfall when using element.attribute vs. element.setAttribute()?", 
            answers: [
                "They always behave the same", 
                "They can behave differently for certain properties", 
                "element.setAttribute() is faster", 
                "None of the Above"
            ], 
            correct: "They can behave differently for certain properties"
        },
        {
            question: "What happens if you use element.setAttribute() to set an attribute that already exists?", 
            answers: [
                "It will throw an error", 
                "It will overwrite the existing attribute value", 
                "It will do nothing", 
                "None of the Above"
            ], 
            correct: "It will overwrite the existing attribute value"
        },
        {
            question: "In the example provided, what is the new value of the 'alt' attribute after the script runs?", 
            answers: [
                "Old Image", 
                "New Image", 
                "newImage.png", 
                "None of the Above"
            ], 
            correct: "New Image"
        },
        {
            question: "Why is it important to understand the difference between property access and setAttribute?", 
            answers: [
                "To avoid syntax errors", 
                "To ensure consistent behavior across all attributes", 
                "To improve performance", 
                "None of the Above"
            ], 
            correct: "To ensure consistent behavior across all attributes"
        }
    ];


    // Quiz questions and answers for Modifying Form Object Values
    const questions3 = [
        {
            question: "What can you do with input fields using JavaScript?", 
            answers: [
                "Only read their values", 
                "Only change their values", 
                "Read and change their values in real time", 
                "None of the Above"
            ], 
            correct: "Read and change their values in real time"
        },
        {
            question: "In the example provided, what does the function changeUser() do?", 
            answers: [
                "It retrieves the username from the input field", 
                "It changes the value of the input field to 'Bob'", 
                "It submits the form", 
                "None of the Above"
            ], 
            correct: "It changes the value of the input field to 'Bob'"
        },
        {
            question: "What is the initial value of the input field with id 'username' in the example?", 
            answers: [
                "Bob", 
                "Alice", 
                "Empty", 
                "None of the Above"
            ], 
            correct: "Alice"
        },
        {
            question: "Why is it important to dynamically update form values?", 
            answers: [
                "To create static forms", 
                "To improve user experience with interactivity", 
                "To reduce the size of the HTML file", 
                "None of the Above"
            ], 
            correct: "To improve user experience with interactivity"
        },
        {
            question: "What type of input field is used in the example?", 
            answers: [
                "Checkbox", 
                "Radio button", 
                "Text field", 
                "None of the Above"
            ], 
            correct: "Text field"
        },
        {
            question: "What happens when the button is clicked in the example?", 
            answers: [
                "The input field is cleared", 
                "The input field value is changed to 'Bob'", 
                "The form is submitted", 
                "None of the Above"
            ], 
            correct: "The input field value is changed to 'Bob'"
        },
        {
            question: "What is a potential use case for dynamically updating form values?", 
            answers: [
                "Autofill suggestions", 
                "Clearing forms", 
                "Both autofill suggestions and clearing forms", 
                "None of the Above"
            ], 
            correct: "Both autofill suggestions and clearing forms"
        }
    ];


    // Quiz questions and answers for Identifying and Using Form Controls (Including HTML5)
    const questions4 = [
        {
            question: "Which of the following is a common form element?", 
            answers: [
                "Text Fields", 
                "Radio Buttons", 
                "Checkboxes", 
                "All of the Above"
            ], 
            correct: "All of the Above"
        },
        {
            question: "What HTML tag is used for a text input field?", 
            answers: [
                "<input type='text'>", 
                "<textinput>", 
                "<textfield>", 
                "None of the Above"
            ], 
            correct: "<input type='text'>"
        },
        {
            question: "What is the purpose of the <input type='email'> element in HTML5?", 
            answers: [
                "To create a text field", 
                "To ensure the input is a valid email format", 
                "To create a dropdown menu", 
                "None of the Above"
            ], 
            correct: "To ensure the input is a valid email format"
        },
        {
            question: "Which HTML element is used to create a dropdown menu?", 
            answers: [
                "<input type='dropdown'>", 
                "<select><option>...</option></select>", 
                "<dropdown>", 
                "None of the Above"
            ], 
            correct: "<select><option>...</option></select>"
        },
        {
            question: "What type of input does <input type='date'> provide?", 
            answers: [
                "A text field for entering dates", 
                "A calendar picker for selecting dates", 
                "A range slider for selecting dates", 
                "None of the Above"
            ], 
            correct: "A calendar picker for selecting dates"
        },
        {
            question: "What is a benefit of using HTML5 form controls?", 
            answers: [
                "They are visually appealing", 
                "They provide built-in validation", 
                "They require more JavaScript", 
                "None of the Above"
            ], 
            correct: "They provide built-in validation"
        },
        {
            question: "Which of the following is NOT a valid HTML5 input type?", 
            answers: [
                "email", 
                "date", 
                "color", 
                "textinput"
            ], 
            correct: "textinput"
        }
    ];

    // Quiz questions and answers for Defining the Form Object
    const questions5 = [
        {
            question: "What does the <form> element represent in HTML?", 
            answers: [
                "A section of a webpage", 
                "A collection of input elements for user data", 
                "A type of button", 
                "None of the Above"
            ], 
            correct: "A collection of input elements for user data"
        },
        {
            question: "How can you access all forms on a webpage using the DOM?", 
            answers: [
                "document.getElementById('formId')", 
                "document.forms", 
                "document.querySelectorAll('form')", 
                "None of the Above"
            ], 
            correct: "document.forms"
        },
        {
            question: "What method would you use to access a specific form by its ID?", 
            answers: [
                "document.forms['formId']", 
                "document.getElementById('formId')", 
                "document.querySelector('#formId')", 
                "None of the Above"
            ], 
            correct: "document.getElementById('formId')"
        },
        {
            question: "What type of collection is document.forms?", 
            answers: [
                "An array", 
                "An array-like collection", 
                "A static collection", 
                "None of the Above"
            ], 
            correct: "An array-like collection"
        },
        {
            question: "Which of the following is a valid way to reference a form in JavaScript?", 
            answers: [
                "document.forms[0]", 
                "document.getElementById('formId')", 
                "Both document.forms[0] and document.getElementById('formId')", 
                "None of the Above"
            ], 
            correct: "Both document.forms[0] and document.getElementById('formId')"
        },
        {
            question: "What will document.forms.length return?", 
            answers: [
                "The number of forms on the page", 
                "The first form in the collection", 
                "The ID of the first form", 
                "None of the Above"
            ], 
            correct: "The number of forms on the page"
        },
        {
            question: "If you want to access a form with the ID 'myForm', which of the following is correct?", 
            answers: [
                "document.forms['myForm']", 
                "document.getElementById('myForm')", 
                "Both document.forms['myForm'] and document.getElementById('myForm')", 
                "None of the Above"
            ], 
            correct: "document.getElementById('myForm')"
        }
    ];


    // Quiz questions and answers for Referring to Form Objects
    const questions6 = [
        {
            question: "How can you access a form control in JavaScript?", 
            answers: [
                "By its ID only", 
                "By its name attribute", 
                "By its class name", 
                "None of the Above"
            ], 
            correct: "By its name attribute"
        },
        {
            question: "In the example provided, how is the username input accessed?", 
            answers: [
                "Using the form ID", 
                "Using the name attribute", 
                "Using the input's index", 
                "None of the Above"
            ], 
            correct: "Using the name attribute"
        },
        {
            question: "What does the line console.log(theForm.username.value) do?", 
            answers: [
                "Logs the form ID", 
                "Logs the value of the username input", 
                "Logs the entire form object", 
                "None of the Above"
            ], 
            correct: "Logs the value of the username input"
        },
        {
            question: "What is a potential pitfall when using form.elements[0]?", 
            answers: [
                "It always returns the first input", 
                "The order can change if the HTML structure changes", 
                "It only works with text inputs", 
                "None of the Above"
            ], 
            correct: "The order can change if the HTML structure changes"
        },
        {
            question: "Why is using the name attribute often more robust than using index?", 
            answers: [
                "It is easier to read", 
                "It is less prone to errors if the form structure changes", 
                "It is faster", 
                "None of the Above"
            ], 
            correct: "It is less prone to errors if the form structure changes"
        },
        {
            question: "What will happen if you try to access a form control that does not exist?", 
            answers: [
                "It will return null", 
                "It will throw an error", 
                "It will return undefined", 
                "None of the Above"
            ], 
            correct: "It will return undefined"
        },
        {
            question: "In the example, what is the name of the input field?", 
            answers: [
                "myForm", 
                "username", 
                "input", 
                "None of the Above"
            ], 
            correct: "username"
        }
    ];

    // Quiz questions and answers for Using Form Objects
    const questions7 = [
        {
            question: "How do you read the value of an input field named 'username' in a form?", 
            answers: [
                "myForm.username.getValue()", 
                "myForm.username.value", 
                "myForm.username()", 
                "None of the Above"
            ], 
            correct: "myForm.username.value"
        },
        {
            question: "What is the correct way to set the value of the 'username' input field to 'Alice'?", 
            answers: [
                "myForm.username.setValue('Alice')", 
                "myForm.username.value = 'Alice'", 
                "myForm.username('Alice')", 
                "None of the Above"
            ], 
            correct: "myForm.username.value = 'Alice'"
        },
        {
            question: "How can you check if a checkbox named 'termsCheckbox' is checked?", 
            answers: [
                "myForm.termsCheckbox.isChecked", 
                "myForm.termsCheckbox.checked", 
                "myForm.termsCheckbox.value", 
                "None of the Above"
            ], 
            correct: "myForm.termsCheckbox.checked"
        },
        {
            question: "What will myForm.username.value return if the input field is empty?", 
            answers: [
                "null", 
                "undefined", 
                "an empty string", 
                "None of the Above"
            ], 
            correct: "an empty string"
        },
        {
            question: "If you want to set a checkbox named 'termsCheckbox' to checked, which of the following is correct?", 
            answers: [
                "myForm.termsCheckbox.checked = true", 
                "myForm.termsCheckbox.setChecked(true)", 
                "myForm.termsCheckbox.value = 'true'", 
                "None of the Above"
            ], 
            correct: "myForm.termsCheckbox.checked = true"
        },
        {
            question: "What does myForm.termsCheckbox.checked return?", 
            answers: [
                "true or false depending on whether the checkbox is checked", 
                "the value of the checkbox", 
                "the name of the checkbox", 
                "None of the Above"
            ], 
            correct: "true or false depending on whether the checkbox is checked"
        },
        {
            question: "Which of the following statements is true about form objects?", 
            answers: [
                "You can only read values from them", 
                "You can only set values to them", 
                "You can both read and set values", 
                "None of the Above"
            ], 
            correct: "You can both read and set values"
        }
    ];

    // Quiz questions and answers for Conducting Form Validation
    const questions8 = [
        {
            question: "What is the purpose of client-side validation?", 
            answers: [
                "To check if required fields are filled", 
                "To ensure email format is correct", 
                "To provide quick feedback to users", 
                "All of the Above"
            ], 
            correct: "All of the Above"
        },
        {
            question: "Which of the following is NOT an HTML5 validation attribute?", 
            answers: [
                "required", 
                "pattern", 
                "minlength", 
                "maxvalue"
            ], 
            correct: "maxvalue"
        },
        {
            question: "What happens if validation fails using HTML5 attributes?", 
            answers: [
                "The form is submitted anyway", 
                "The browser shows built-in error messages", 
                "The page reloads", 
                "None of the Above"
            ], 
            correct: "The browser shows built-in error messages"
        },
        {
            question: "In the custom validation function, what does the line alert('Please enter a valid email.') do?", 
            answers: [
                "Submits the form", 
                "Displays an error message to the user", 
                "Validates the email format", 
                "None of the Above"
            ], 
            correct: "Displays an error message to the user"
        },
        {
            question: "Why is it important to combine client-side validation with server-side validation?", 
            answers: [
                "To reduce server load", 
                "Client-side code can be bypassed", 
                "To improve user experience", 
                "None of the Above"
            ], 
            correct: "Client-side code can be bypassed"
        },
        {
            question: "What does the validateForm function return if the email field is valid?", 
            answers: [
                "false", 
                "true", 
                "an error message", 
                "None of the Above"
            ], 
            correct: "true"
        },
        {
            question: "What is a benefit of client-side validation?", 
            answers: [
                "It provides instant feedback to users", 
                "It eliminates the need for server-side validation", 
                "It is more secure than server-side validation", 
                "None of the Above"
            ], 
            correct: "It provides instant feedback to users"
        }
    ];

        // Quiz questions and answers for Identifying Common Form Security Issues
    const questions9 = [
        {
            question: "What is input injection?", 
            answers: [
                "A method of validating user input", 
                "A type of attack where malicious input is submitted", 
                "A way to enhance form security", 
                "None of the Above"
            ], 
            correct: "A type of attack where malicious input is submitted"
        },
        {
            question: "Which of the following is a common type of input injection?", 
            answers: [
                "XSS (Cross-Site Scripting)", 
                "CSRF (Cross-Site Request Forgery)", 
                "SQL injection", 
                "Both XSS and SQL injection"
            ], 
            correct: "Both XSS and SQL injection"
        },
        {
            question: "What does CSRF stand for?", 
            answers: [
                "Cross-Site Resource Framework", 
                "Cross-Site Request Forgery", 
                "Cross-Site Response Function", 
                "None of the Above"
            ], 
            correct: "Cross-Site Request Forgery"
        },
        {
            question: "Why is over-reliance on client-side validation a security risk?", 
            answers: [
                "It is always secure", 
                "Malicious users can disable JavaScript or intercept requests", 
                "It is faster than server-side validation", 
                "None of the Above"
            ], 
            correct: "Malicious users can disable JavaScript or intercept requests"
        },
        {
            question: "What is a potential consequence of not handling input properly on the server-side?", 
            answers: [
                "Improved user experience", 
                "Increased security", 
                "Vulnerability to attacks like SQL injection", 
                "None of the Above"
            ], 
            correct: "Vulnerability to attacks like SQL injection"
        },
        {
            question: "Which of the following is a method to mitigate CSRF attacks?", 
            answers: [
                "Using a unique token for each form submission", 
                "Relying solely on client-side validation", 
                "Disabling JavaScript", 
                "None of the Above"
            ], 
            correct: "Using a unique token for each form submission"
        },
        {
            question: "What should be done to ensure form security?", 
            answers: [
                "Only use client-side validation", 
                "Implement server-side validation and sanitization", 
                "Ignore security issues", 
                "None of the Above"
            ], 
            correct: "Implement server-side validation and sanitization"
        }
    ];

    // Quiz questions and answers for Distinguishing Between Browser and OS Security
    const questions10 = [
        {
            question: "What is the primary function of browser security?", 
            answers: [
                "To manage system-level operations", 
                "To sandbox JavaScript from accessing OS resources directly", 
                "To enhance the performance of web applications", 
                "None of the Above"
            ], 
            correct: "To sandbox JavaScript from accessing OS resources directly"
        },
        {
            question: "How does browser security protect user data?", 
            answers: [
                "By allowing JavaScript to read arbitrary files", 
                "By preventing JavaScript from accessing OS resources without permission", 
                "By encrypting all data sent over the internet", 
                "None of the Above"
            ], 
            correct: "By preventing JavaScript from accessing OS resources without permission"
        },
        {
            question: "What does operating system security manage?", 
            answers: [
                "Web page rendering", 
                "System-level operations and resources", 
                "JavaScript execution", 
                "None of the Above"
            ], 
            correct: "System-level operations and resources"
        },
        {
            question: "In typical web scenarios, how does JavaScript interact with the operating system?", 
            answers: [
                "It has direct access to OS resources", 
                "It has no direct route to OS resources", 
                "It can execute OS commands", 
                "None of the Above"
            ], 
            correct: "It has no direct route to OS resources"
        },
        {
            question: "What is a key difference between browser security and operating system security?", 
            answers: [
                "Browser security is more complex", 
                "Operating system security is focused on user interface", 
                "Browser security restricts access to OS resources", 
                "None of the Above"
            ], 
            correct: "Browser security restricts access to OS resources"
        },
        {
            question: "Why is it important for browsers to sandbox JavaScript?", 
            answers: [
                "To improve performance", 
                "To prevent malicious scripts from accessing sensitive OS data", 
                "To allow JavaScript to read files freely", 
                "None of the Above"
            ], 
            correct: "To prevent malicious scripts from accessing sensitive OS data"
        },
        {
            question: "Which of the following statements is true regarding JavaScript and OS security?", 
            answers: [
                "JavaScript can directly manipulate OS files", 
                "JavaScript operates within a secure environment provided by the browser", 
                "JavaScript has full access to the operating system", 
                "None of the Above"
            ], 
            correct: "JavaScript operates within a secure environment provided by the browser"
        }
    ];

    // Quiz questions and answers for Browser Security Issues Relevant to JavaScript
    const questions11 = [
        {
            question: "What is script blocking?", 
            answers: [
                "A method to enhance script performance", 
                "A feature that allows users or extensions to prevent scripts from running", 
                "A way to improve browser security", 
                "None of the Above"
            ], 
            correct: "A feature that allows users or extensions to prevent scripts from running"
        },
        {
            question: "What is a potential risk of frame-to-frame URL changing?", 
            answers: [
                "It can improve user experience", 
                "It can lead to malicious behavior if scripts manipulate iframes outside their domain", 
                "It is a common practice in web development", 
                "None of the Above"
            ], 
            correct: "It can lead to malicious behavior if scripts manipulate iframes outside their domain"
        },
        {
            question: "What does document.write() do?", 
            answers: [
                "Writes content to the console", 
                "Writes content to the document stream", 
                "Creates a new script element", 
                "None of the Above"
            ], 
            correct: "Writes content to the document stream"
        },
        {
            question: "Why is document.write() rarely recommended in modern applications?", 
            answers: [
                "It is too slow", 
                "It can overwrite the entire page if used after the initial load", 
                "It is not supported in all browsers", 
                "None of the Above"
            ], 
            correct: "It can overwrite the entire page if used after the initial load"
        },
        {
            question: "What is a pitfall of overusing document.write()?", 
            answers: [
                "It can enhance performance", 
                "It can lead to unexpected results like clearing the DOM", 
                "It is always safe to use", 
                "None of the Above"
            ], 
            correct: "It can lead to unexpected results like clearing the DOM"
        },
        {
            question: "What should developers consider when using document.write()?", 
            answers: [
                "It should be used for all types of content", 
                "It can mess up asynchronous loads", 
                "It is the best way to manipulate the DOM", 
                "None of the Above"
            ], 
            correct: "It can mess up asynchronous loads"
        },
        {
            question: "Which of the following is a common reason for script blocking?", 
            answers: [
                "To improve page load speed", 
                "To prevent malicious scripts from executing", 
                "To enhance the functionality of the website", 
                "None of the Above"
            ], 
            correct: "To prevent malicious scripts from executing"
        }
    ];

    // Quiz questions and answers for Signed Scripts
    const questions12 = [
        {
            question: "What does it mean for a JavaScript script to be digitally signed?", 
            answers: [
                "It indicates the script is free of errors", 
                "It indicates authenticity and trust", 
                "It improves the performance of the script", 
                "None of the Above"
            ], 
            correct: "It indicates authenticity and trust"
        },
        {
            question: "In which scenarios are signed scripts most relevant?", 
            answers: [
                "Typical client-side web applications", 
                "Secure intranet or enterprise environments", 
                "Public websites", 
                "None of the Above"
            ], 
            correct: "Secure intranet or enterprise environments"
        },
        {
            question: "Why are signed scripts not common for typical client-side code?", 
            answers: [
                "They are too complex to implement", 
                "Most client-side code does not require authentication", 
                "They slow down the loading of scripts", 
                "None of the Above"
            ], 
            correct: "Most client-side code does not require authentication"
        },
        {
            question: "What is the primary purpose of signing a script?", 
            answers: [
                "To enhance the script's functionality", 
                "To verify the source and integrity of the script", 
                "To make the script run faster", 
                "None of the Above"
            ], 
            correct: "To verify the source and integrity of the script"
        },
        {
            question: "Which of the following is a benefit of using signed scripts in secure environments?", 
            answers: [
                "Increased performance", 
                "Enhanced security through trust verification", 
                "Reduced file size", 
                "None of the Above"
            ], 
            correct: "Enhanced security through trust verification"
        },
        {
            question: "What might happen if a signed script is altered after being signed?", 
            answers: [
                "It will still run without issues", 
                "The signature will become invalid", 
                "It will run faster", 
                "None of the Above"
            ], 
            correct: "The signature will become invalid"
        },
        {
            question: "How does a digital signature help in a corporate environment?", 
            answers: [
                "It allows scripts to run without any restrictions", 
                "It ensures that only trusted scripts are executed", 
                "It eliminates the need for any security measures", 
                "None of the Above"
            ], 
            correct: "It ensures that only trusted scripts are executed"
        }
    ];

    // Quiz questions and answers for Client-Side Browser Detection & Compatibility
    const questions13 = [
        {
            question: "What was the traditional method for detecting the browser in JavaScript?", 
            answers: [
                "navigator.browserType", 
                "navigator.userAgent", 
                "document.getBrowser()", 
                "None of the Above"
            ], 
            correct: "navigator.userAgent"
        },
        {
            question: "What is a major drawback of using navigator.userAgent for browser detection?", 
            answers: [
                "It is always accurate", 
                "User agent strings can be spoofed", 
                "It is not supported in all browsers", 
                "None of the Above"
            ], 
            correct: "User agent strings can be spoofed"
        },
        {
            question: "What is the recommended approach for detecting browser features?", 
            answers: [
                "Using navigator.userAgent", 
                "Using feature detection", 
                "Using document.getBrowser()", 
                "None of the Above"
            ], 
            correct: "Using feature detection"
        },
        {
            question: "Which of the following is an example of feature detection?", 
            answers: [
                "if (navigator.userAgent.includes('Chrome'))", 
                "if ('geolocation' in navigator)", 
                "if (navigator.appVersion)", 
                "None of the Above"
            ], 
            correct: "if ('geolocation' in navigator)"
        },
        {
            question: "Why is feature detection preferred over user agent detection?", 
            answers: [
                "It is more reliable and less prone to errors", 
                "It is faster", 
                "It requires less code", 
                "None of the Above"
            ], 
            correct: "It is more reliable and less prone to errors"
        },
        {
            question: "What can developers do to ensure compatibility across different browsers?", 
            answers: [
                "Only use user agent detection", 
                "Use polyfills for unsupported features", 
                "Ignore browser compatibility", 
                "None of the Above"
            ], 
            correct: "Use polyfills for unsupported features"
        },
        {
            question: "What is a polyfill?", 
            answers: [
                "A type of browser", 
                "A script that provides functionality in older browsers", 
                "A method for detecting user agents", 
                "None of the Above"
            ], 
            correct: "A script that provides functionality in older browsers"
        }
    ];

    // Quiz questions and answers for Common Issues for Creating Secure JavaScript Code
    const questions14 = [
        {
            question: "What should you never do with sensitive information like passwords?", 
            answers: [
                "Store it in plain text", 
                "Encrypt it", 
                "Hash it", 
                "Use a secure vault"
            ], 
            correct: "Store it in plain text"
        },
        {
            question: "Why is it important to sanitize user input?", 
            answers: [
                "To improve performance", 
                "To prevent injection attacks", 
                "To make the application look better", 
                "To reduce server load"
            ], 
            correct: "To prevent injection attacks"
        },
        {
            question: "What protocol should be used to protect data in transit?", 
            answers: [
                "HTTP", 
                "FTP", 
                "HTTPS", 
                "SMTP"
            ], 
            correct: "HTTPS"
        },
        {
            question: "What is a potential risk of using third-party scripts?", 
            answers: [
                "They can enhance functionality", 
                "They might be malicious or compromised", 
                "They are always safe", 
                "They improve performance"
            ], 
            correct: "They might be malicious or compromised"
        },
        {
            question: "Which of the following is a best practice for handling sensitive information?", 
            answers: [
                "Store it in cookies", 
                "Use environment variables", 
                "Keep it in local storage", 
                "Display it in the console"
            ], 
            correct: "Use environment variables"
        },
        {
            question: "What is the purpose of input sanitization?", 
            answers: [
                "To format the input for display", 
                "To ensure the input is valid", 
                "To remove potentially harmful characters", 
                "To enhance user experience"
            ], 
            correct: "To remove potentially harmful characters"
        },
        {
            question: "How can developers ensure the security of third-party scripts?", 
            answers: [
                "By reviewing their source code", 
                "By using only trusted sources", 
                "By keeping them updated", 
                "All of the above"
            ], 
            correct: "All of the above"
        }
    ];

    // Quiz questions and answers for Defining Cross-Site Scripting (XSS)
    const questions15 = [
        {
            question: "What does XSS stand for?", 
            answers: [
                "Cross-Site Scripting", 
                "Cross-Site Security", 
                "Cross-Site Session", 
                "Cross-Site Storage"
            ], 
            correct: "Cross-Site Scripting"
        },
        {
            question: "What is a primary characteristic of XSS vulnerabilities?", 
            answers: [
                "They allow users to log in", 
                "They involve injecting malicious scripts into trusted content", 
                "They improve website performance", 
                "They are harmless"
            ], 
            correct: "They involve injecting malicious scripts into trusted content"
        },
        {
            question: "When does XSS often occur?", 
            answers: [
                "When user-submitted content is sanitized", 
                "When user-submitted content is displayed without proper sanitization", 
                "When scripts are executed on the server", 
                "When using HTTPS"
            ], 
            correct: "When user-submitted content is displayed without proper sanitization"
        },
        {
            question: "What is a common method to prevent XSS attacks?", 
            answers: [
                "Allow all user input", 
                "Sanitize and validate user input", 
                "Use only client-side scripts", 
                "Ignore user input"
            ], 
            correct: "Sanitize and validate user input"
        },
        {
            question: "What can attackers achieve through XSS?", 
            answers: [
                "Access to user cookies", 
                "Modification of website content", 
                "Redirection to malicious sites", 
                "All of the above"
            ], 
            correct: "All of the above"
        },
        {
            question: "Which of the following is NOT a type of XSS?", 
            answers: [
                "Stored XSS", 
                "Reflected XSS", 
                "DOM-based XSS", 
                "Network XSS"
            ], 
            correct: "Network XSS"
        },
        {
            question: "Why is it important to address XSS vulnerabilities?", 
            answers: [
                "To improve website aesthetics", 
                "To protect user data and maintain trust", 
                "To increase website traffic", 
                "To enhance loading speed"
            ], 
            correct: "To protect user data and maintain trust"
        }
    ];

    // Quiz questions and answers for Functions and Common Uses of Cookies
    const questions16 = [
        {
            question: "What is a cookie?", 
            answers: [
                "A type of web server", 
                "A small piece of data stored in the user's browser", 
                "A programming language", 
                "A method for encrypting data"
            ], 
            correct: "A small piece of data stored in the user's browser"
        },
        {
            question: "What is the typical size limit for a cookie?", 
            answers: [
                "1KB", 
                "2KB", 
                "4KB", 
                "8KB"
            ], 
            correct: "4KB"
        },
        {
            question: "Which of the following is a common use of cookies?", 
            answers: [
                "Session tracking", 
                "Storing large files", 
                "Executing scripts", 
                "None of the Above"
            ], 
            correct: "Session tracking"
        },
        {
            question: "How do cookies help with 'stay logged in' functionality?", 
            answers: [
                "By storing user passwords", 
                "By keeping track of user sessions", 
                "By increasing page load speed", 
                "By preventing data loss"
            ], 
            correct: "By keeping track of user sessions"
        },
        {
            question: "What is another common use of cookies besides session tracking?", 
            answers: [
                "Remembering user preferences", 
                "Storing images", 
                "Running background processes", 
                "None of the Above"
            ], 
            correct: "Remembering user preferences"
        },
        {
            question: "How can cookies be used for analytics?", 
            answers: [
                "By tracking user behavior on a website", 
                "By storing user passwords", 
                "By improving website design", 
                "By increasing server speed"
            ], 
            correct: "By tracking user behavior on a website"
        },
        {
            question: "What happens to cookies when a user clears their browser data?", 
            answers: [
                "They are permanently deleted", 
                "They remain stored", 
                "They are transferred to another browser", 
                "They are encrypted"
            ], 
            correct: "They are permanently deleted"
        }
    ];

    // Quiz questions and answers for Manipulating Cookies Effectively
    const questions17 = [
        {
            question: "How do you create or update a cookie in JavaScript?", 
            answers: [
                "document.createCookie()", 
                "document.cookie = 'username=Alice; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';", 
                "setCookie('username', 'Alice')", 
                "cookie.set('username', 'Alice')"
            ], 
            correct: "document.cookie = 'username=Alice; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';"
        },
        {
            question: "What does document.cookie return?", 
            answers: [
                "An array of cookies", 
                "A string of all cookies in key=value pairs", 
                "A JSON object of cookies", 
                "The number of cookies stored"
            ], 
            correct: "A string of all cookies in key=value pairs"
        },
        {
            question: "How can you clear a cookie?", 
            answers: [
                "Set the cookie’s value to an empty string", 
                "Set the cookie’s expires date to a past date", 
                "Delete the cookie from the browser settings", 
                "Cookies cannot be cleared"
            ], 
            correct: "Set the cookie’s expires date to a past date"
        },
        {
            question: "Where is the setting to enable or disable cookies located?", 
            answers: [
                "In the website's settings", 
                "At the browser level", 
                "In the operating system settings", 
                "In the cookie itself"
            ], 
            correct: "At the browser level"
        },
        {
            question: "Why might some users disable cookies?", 
            answers: [
                "To improve website performance", 
                "For privacy or security reasons", 
                "To enhance user experience", 
                "To store more data"
            ], 
            correct: "For privacy or security reasons"
        },
        {
            question: "What is the purpose of the 'expires' attribute when creating a cookie?", 
            answers: [
                "To specify the cookie's name", 
                "To define how long the cookie should last", 
                "To set the cookie's path", 
                "To encrypt the cookie"
            ], 
            correct: "To define how long the cookie should last"
        }
    ];

    // Quiz questions and answers for Ethics in Collecting, Storing, Using, and Protecting User Data
    const questions18 = [
        {
            question: "What is the primary principle regarding user consent in data collection?", 
            answers: [
                "Users should be informed about what data is collected and why", 
                "Users should not be informed about data collection", 
                "Data can be collected without user consent", 
                "Users must provide consent for every single data point"
            ], 
            correct: "Users should be informed about what data is collected and why"
        },
        {
            question: "What does the principle of 'minimize data' refer to?", 
            answers: [
                "Storing as much data as possible", 
                "Only storing data that is absolutely necessary", 
                "Collecting data from all users", 
                "Using data for multiple purposes"
            ], 
            correct: "Only storing data that is absolutely necessary"
        },
        {
            question: "Which of the following is a recommended security measure for protecting user data?", 
            answers: [
                "Using plain HTTP for data transmission", 
                "Implementing encryption and secure transport (HTTPS)", 
                "Storing data in plain text", 
                "None of the above"
            ], 
            correct: "Implementing encryption and secure transport (HTTPS)"
        },
        {
            question: "What do GDPR and CCPA have in common?", 
            answers: [
                "They both require transparency about user data usage", 
                "They both allow unlimited data collection", 
                "They are only applicable in the United States", 
                "They do not require user consent"
            ], 
            correct: "They both require transparency about user data usage"
        },
        {
            question: "Why is it important to inform users about data collection?", 
            answers: [
                "To comply with legal requirements", 
                "To build trust with users", 
                "To avoid legal penalties", 
                "All of the above"
            ], 
            correct: "All of the above"
        },
        {
            question: "What is a key aspect of strong server-side protections?", 
            answers: [
                "Using outdated software", 
                "Regularly updating security measures", 
                "Storing data without encryption", 
                "Allowing open access to all data"
            ], 
            correct: "Regularly updating security measures"
        }
    ];


    function resetQuiz() {
        count = 0;
        correctCount = 0;
        document.getElementById('clickCount').innerText = count;
        document.getElementById('correctCountDisplay').innerText = correctCount;
        document.querySelectorAll('.result').forEach(resultDiv => resultDiv.innerText = '');
        document.querySelectorAll('.topic > div').forEach(quizDiv => quizDiv.textContent = '');
        startQuiz(questions, 'quiz', 'result1');
        startQuiz(questions2, 'quiz2', 'result2');
        startQuiz(questions3, 'quiz3', 'result3');
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
    }
})();