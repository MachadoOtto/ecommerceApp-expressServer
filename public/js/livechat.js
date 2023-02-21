const socket = io();

socket.on('messages', (messages) => {
    let container = document.getElementById('chat-div');
    let containerHTML = '';
    messages.forEach((message) => {
        containerHTML += `
            <ul class="m-1 bg-dark-subtle">
                <span><strong>${message.user}:</strong><br>${message.message}</span>
            </ul>`;
    });
    container.innerHTML = containerHTML;
});

socket.on('newMessage', (message) => {
    let container = document.getElementById('chat-div');
    let newProduct = `
        <ul class="m-1 bg-dark-subtle">
            <span><strong>${message.user}:</strong><br>${message.message}</span>
        </ul>`;
    container.innerHTML += newProduct;
});

document.getElementById('btn-send-message').addEventListener('click', (event) => {
    event.preventDefault();
    let user = document.getElementById('usernameInput').value;
    let message = document.getElementById('messageInput').value;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/messages', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ user, message }));
    document.getElementById('messageInput').value = '';
});

document.getElementById('changeUsername-btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('usernameInput').value = document.getElementById('newUsername').value;
    let span = document.getElementById('currentUsername');
    span.innerHTML = '<strong>' + document.getElementById('newUsername').value + '</strong>';
    document.getElementById('newUsername').value = '';
});