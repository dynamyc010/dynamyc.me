const button = document.getElementById('close-button');

button.addEventListener('click', () => {
    // I hate how you can't close windows....
    location.href = "about:blank"
});