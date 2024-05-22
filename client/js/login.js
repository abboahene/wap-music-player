window.onload = function() {
    
    // show main page if token exits
    const userToken =  sessionStorage.getItem("user-token");
    if(userToken) showPage("main");
    // on login 
    document.getElementById('login').addEventListener('click', async function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const response = await fetch('http://localhost:3000/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-type': 'application/json',
            }
        });
        const result = await response.json();
        console.log(result);
        if(result.status === 'success'){
            document.getElementById('incorrect').style.display = 'none';
            sessionStorage.setItem("user-token", result.data.token);
            showPage("main");
        }
        else{
            document.getElementById('incorrect').style.display = 'block';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    });

    // on logout
    document.getElementById('logout-btn').addEventListener('click', function(event) {
        event.preventDefault();
        showPage("login");
        sessionStorage.removeItem("user-token");
        window.location.reload();
    });
}