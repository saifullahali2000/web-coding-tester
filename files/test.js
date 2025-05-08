
import { JSDOM } from 'jsdom';
import { assert } from 'chai';
import $j from 'jquery'; 


const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Data</title>
</head>

<body>
    <div class="container">
            <h1>User Data Form</h1>
            <div id="user-form">
                <div class="input-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Full Name">
                </div>
                <div class="input-group">
                    <label for="mobile">Mobile Number</label>
                    <input type="text" id="mobile" name="mobile" placeholder="10-digit Mobile Number">
                </div>
                <div class="input-group">
                    <label for="email">Email</label>
                    <input type="text" id="email" name="email" placeholder="Email Address">
                </div>
                <div class="input-group">
                    <label for="state">State</label>
                    <input type="text" id="state" name="state" placeholder="Your State">
                </div>
                <div class="input-group">
                    <label for="age">Age</label>
                    <input type="text" id="age" name="age" placeholder="Your Age">
                </div>
                <p id="error-message"></p>
                <div class="form-actions">
                    <button type="button" class="reset-btn" id="reset">RESET</button>
                    <button type="button" class="submit-btn" id="submit">SUBMIT</button>
                </div>
            </div>
            <p id="processing-message"></p>
        </div>

<script>document.getElementById('submit').addEventListener('click', function() {

    const name = document.getElementById('name').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const email = document.getElementById('email').value.trim();
    const state = document.getElementById('state').value.trim();
    const age = document.getElementById('age').value.trim();

    const errorMessage = document.getElementById('error-message');
    const processingMessageElement = document.getElementById('processing-message');

    // Clear previous messages
    errorMessage.innerHTML = '';
    processingMessageElement.innerHTML = '';

    // Check if any field is empty
    if (!name || !mobile || !email || !state || !age) {
        errorMessage.textContent = 'Please enter all the fields before submitting.';
        return; // Prevent further validation if fields are missing
    }

    // Mobile validation: Ensure it's a 10-digit number
    if (mobile.length !== 10) {
        errorMessage.textContent = 'Mobile number should be exactly 10 digits.';
        return; // Prevent further validation if mobile is invalid
    }

    // Email validation: Ensure it contains "@" and ".com"
    if (!email.includes('@') || !email.includes('.com')) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return; // Prevent further validation if email is invalid
    }

    // Display "Processing..." message temporarily
    processingMessageElement.innerHTML = 'Processing...';

    // Simulate saving process with setTimeout and then show success message
    setTimeout(function() {
        processingMessageElement.innerHTML = 'Your data is saved. Thank you!';
    }, 3000); // Show "Your data is saved. Thank you!" after 3 seconds
});

// Add a reset listener for the RESET button to clear error/success message
document.getElementById('reset').addEventListener('click', function() {
    const errorMessageElement = document.getElementById('error-message');
    const processingMessageElement = document.getElementById('processing-message');
    document.getElementById('name').value = '';
    document.getElementById('mobile').value = '';
    document.getElementById('email').value = '';
    document.getElementById('state').value = '';
    document.getElementById('age').value = '';
    errorMessageElement.innerHTML = ''; // Clear the error or success message
    processingMessageElement.innerHTML = ''; // Clear the processing message
});
</script></body>

</html>`, {
    runScripts: "dangerously", resources: "usable"
});

const $ = $j(dom.window);
function testResetButton() { const resetBtn = $('.reset-btn'); const errorMessageElement = $('#error-message'); errorMessageElement.html('Processing...'); errorMessageElement.css('color', 'orange'); resetBtn.click(); const formInputs = $('#user-form input, #user-form textarea'); const allFieldsEmpty = formInputs.toArray().every(input => $(input).val() === ''); const messageCleared = errorMessageElement.html() === ''; assert(allFieldsEmpty && messageCleared); } testResetButton();
    