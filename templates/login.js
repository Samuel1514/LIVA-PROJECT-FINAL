document.getElementById('loginForm').onsubmit = async function(event) {
    event.preventDefault();  // Prevents the default form submission

    // Get values from input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message); // Should show "Login successful!"
            // Optionally, redirect to another page:
            // window.location.href = '/dashboard';
        } else {
            alert(result.message); // Should show "Invalid credentials!"
        }
    } catch (error) {
        console.error('Error:', error);
    }
};