window.onload = function() {
    document.getElementById('login').addEventListener('submit', async function(event) {
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
                'Content-type': 'application/json'
            }
        });
        const result = await response.json();
        if(result.status === 'success'){
            document.getElementById('incorrect').style.display = 'none';
            document.getElementById('container').style.display = 'none';
            document.getElementById('another-page').style.display = 'block';
        }
        else{
            document.getElementById('incorrect').style.display = 'block';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        }
    });
    document.getElementById('logout').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('container').style.display = 'block';
        document.getElementById('another-page').style.display = 'none';
        window.location.reload();
    });
}