function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.token) {
            // Save token to localStorage
            localStorage.setItem('token', data.token);
            
            // Redirect to dashboard.html
            window.location.href = 'dashboard.html';
        } else {
            alert(data.message || 'Login failed');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hello')
        alert(error);
    });
}


function logout() {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page or home page
    window.location.href = 'index.html';  // Redirect to the login page
}
