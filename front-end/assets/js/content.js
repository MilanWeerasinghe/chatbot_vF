document.addEventListener('DOMContentLoaded', function () {

    const userInputField = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    userInputField.addEventListener('input', function() {
    const userInput = this.value.trim();
      
    // Enable the button if userInput is not empty, otherwise disable it
    sendButton.disabled = userInput.value ==='';
    });
});


// Combine massages 
function appendMessage(sender, message, cssClass) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `${message}`;

    // Add different CSS style for request msg anf response msg
    // messageDiv.classList.add(sender === 'User' ? 'messages__item--operator' : 'messages__item--visitor');

    if (cssClass) {
        messageDiv.classList.add(cssClass);
    }
    chatContainer.appendChild(messageDiv);
}

// Show typing Dots
async function showTypingDots() {
    const chatContainer = document.getElementById('chat-container');
    const typingDiv = document.createElement('div');
    const tempMsg = document.createElement('div');
    typingDiv.className = 'messages__item messages__item--typing';
    typingDiv.id = 'typing-dots';
    tempMsg.className = 'tempMsg';
    tempMsg.id = "tempMsg";

    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('span');
        dot.className = 'messages__dot';
        typingDiv.appendChild(dot);
    }
    tempMsg.innerHTML = ("Doggy is typing ...");
    chatContainer.appendChild(typingDiv);
    chatContainer.appendChild(tempMsg);
}



function hideTypingDots() {
    const typingDiv = document.getElementById('typing-dots');
    const tempMsg = document.getElementById('tempMsg');
    if (typingDiv) {
        typingDiv.remove();
    }
    if(tempMsg){
        tempMsg.remove();
    }
}

//Clear user input not necessary
function clearInput() {
    document.getElementById('userInput').value = '';
}
function hideIntialMsg(){
    document.getElementById('initialMsg').style.display = 'none';
}
// Handle functions when press ENTERKEY
function handleKeyPress(event) {
    if (event.keyCode === 13) {
    sendMessage();
    }
}

// Send user massage to API
function sendMessage() {
    const initialMsgDiv = document.getElementById('initialMsg');
    initialMsgDiv.classList.add('hidden');

    const userInput = document.getElementById('userInput').value
    console.log(userInput) //NOT NECESSARY
    appendMessage('User', userInput, 'messages__item--operator');
    showTypingDots();

    fetch('http://127.0.0.1:5000/get_chatgpt_response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'user_input': userInput }),
    })
    .then(response => 
        response.json()
    )
    .then(data => {
        hideTypingDots();
    
        const chatGPTResponse = data && data.chatgpt_response;
        appendMessage('ChatGPT', chatGPTResponse, 'messages__item--visitor');    
    })
    .catch(error => {
        console.error('Error:', error);
        hideTypingDots();
        appendMessage('System', 'Error fetching response.');
    });

    clearInput();
}
