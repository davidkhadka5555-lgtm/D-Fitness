// Wait for DOM to be fully loaded before running scripts
// This ensures all HTML elements are available before we try to access them
document.addEventListener('DOMContentLoaded', function() {
    // Get references to the buttons we'll add event listeners to
    const signInBtn = document.getElementById('signInBtn');
    const contactBtn = document.getElementById('contactBtn');
    const newsletterBtn = document.getElementById('newsletterBtn');
    
    // Sign In Button Handler
    if (signInBtn) {
        signInBtn.addEventListener('click', function() {
            // Get username and password from user prompts
            const username = prompt('Enter your username:');
            const password = prompt('Enter your password:');
            
            // Only proceed if both fields have values
            if (username && password) {
                // Send POST request to backend /signin endpoint
                fetch('/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // Convert data to JSON format
                    body: JSON.stringify({ username, password })
                })
                .then(response => response.json())  // Parse JSON response
                .then(data => {
                    // Check if there's an error in the response
                    if (data.error) {
                        alert('Error: ' + data.error);
                    } else {
                        // Show success message if no errors
                        alert(data.message);
                    }
                })
                .catch(error => {
                    // Handle any network or request errors
                    console.error('Error:', error);
                    alert('Connection error: ' + error.message);
                });
            }
        });
    }
    
    // Contact Form Handler
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // Get form input values by their ID attributes
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Validate that all fields are filled before submitting
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;  // Exit function if validation fails
            }

            // Send POST request to backend /contact endpoint
            fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Convert form data to JSON
                body: JSON.stringify({ name, email, message })
            })
            .then(response => response.json())  // Parse response
            .then(data => {
                if (data.error) {
                    // Display error if something went wrong
                    alert('Error: ' + data.error);
                } else {
                    // Show success message
                    alert(data.message);
                    
                    // Clear all form fields after successful submission
                    document.getElementById('name').value = '';
                    document.getElementById('email').value = '';
                    document.getElementById('message').value = '';
                }
            })
            .catch(error => {
                // Handle network or request failures
                console.error('Error:', error);
                alert('Connection error: ' + error.message);
            });
        });
    }
    
    // Newsletter Subscription Handler
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function() {
            // Get email from newsletter input
            const email = document.getElementById('newsletter-email').value;

            // Validate email format
            if (!email || !email.includes('@')) {
                alert('Please enter a valid email address');
                return;
            }

            // Send POST request to backend /newsletter endpoint
            fetch('/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    alert('Error: ' + data.error);
                } else {
                    alert('Successfully subscribed! Check your email for confirmation.');
                    document.getElementById('newsletter-email').value = '';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Connection error: ' + error.message);
            });
        });
    }
});


