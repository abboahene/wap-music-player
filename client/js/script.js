window.onload = function() {
    document.getElementById('login').addEventListener('submit', function(event) {
        event.preventDefault();
        document.getElementById('container').style.display = 'none';
        document.getElementById('another-page').style.display = 'block';
    });
    document.getElementById('logout').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('container').style.display = 'block';
        document.getElementById('another-page').style.display = 'none';
        window.location.reload();
    });
}