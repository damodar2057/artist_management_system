import appConfig from "../config/app.config";


window.onload = ()=> {
    let accessToken = localStorage.getItem("accessToken")

    if(accessToken){
        window.location.href = "/src/pages/dashboard.html"
    }

}
document.getElementById('submitButton')?.addEventListener('click', (ev) => {
    ev.preventDefault()

    const usernameInput = document.getElementById('username') as HTMLInputElement | null;
    const passwordInput = document.getElementById('password') as HTMLInputElement | null;
    
    if (!usernameInput || !passwordInput) {
        console.error('Username or password fields not found');
        return;
    }

    const payload = {
        username: usernameInput.value,
        password: passwordInput.value
    };

    console.log('Login payload:', payload); // Log the payload before sending

    fetch(`${appConfig.serverUrl}auth/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
    })
    .then((response) => {
        console.log('Server response:', response); // Log full response object
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('Login successful:', data); // Log success response
        if (data.accessToken) {
            localStorage.setItem('accessToken', data.accessToken);
            console.log('Token saved to localStorage:', data.accessToken);

            window.location.href = "/src/pages/dashboard.html"
        }

    })
    .catch((error) => {
        console.error('Login error:', error.message);
    });
});
