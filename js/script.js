// Select the form and input fields
const form = document.getElementById('contactForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const formResult = document.getElementById('formResult');

emailjs.init("gYE8b6VzJ2zWVeOak"); // Replace YOUR_USER_ID with your actual User ID from EmailJS

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values entered in the form fields
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const subjectValue = subject.value.trim();
    const messageValue = message.value.trim();

    // Simple form validation
    if (!firstNameValue || !lastNameValue || !emailValue || !subjectValue || !messageValue) {
        formResult.textContent = "Please fill out all fields!";
        formResult.style.color = 'red';
    } else if (!validateEmail(emailValue)) {
        formResult.textContent = "Please enter a valid email address!";
        formResult.style.color = 'red';
    } else {
        // If form is valid, show success message
        formResult.textContent = `Thank you ${firstNameValue} ${lastNameValue}, we received your message!`;
        formResult.style.color = 'green';
        // Send form data using EmailJS
        console.log('Form values:', {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    subject: subject.value,
    message: message.value
});

        emailjs.send('service_x2tng3z', 'template_jajqu4g', {
            firstName: firstNameValue,
            lastName: lastNameValue,
            email: emailValue,
            subject: subjectValue,
            message: messageValue
        })
        .then(function(response) {
            formResult.textContent = "Email successfully sent!";
            formResult.style.color = 'green';
            form.reset(); // Reset form after success
        }, function(error) {
            formResult.textContent = "Failed to send email.";
            formResult.style.color = 'red';
            console.error('EmailJS error:', error); // Log the error for debugging

        });

        // Optionally, reset the form after submission
        form.reset();
    }
});

// Function to validate email format using a regex
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
