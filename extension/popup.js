document.addEventListener('DOMContentLoaded', function () {

    const userInputField = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    handleInput();
    userInputField.addEventListener('input', function () {
        const userInput = this.value.trim();

        //Enable the button if userInput is not empty, otherwise disable it
        sendButton.disabled = userInput.value ==='';
    });
});

document.getElementById('sendButton').addEventListener('click', function () {
    document.getElementById('userInput').addEventListener('input', function(){
        let text1 = this.value.trim();
        if (text1 === "") {
            return;
        }
    });
    document.getElementById('userInput').addEventListener('input', handleInput);
    sendMessage();
});

function handleInput() {
    // Get the input value
    var userInput = document.getElementById('userInput').value;

    // Get the loading GIF
    var loadingGif = document.getElementById('initialImg');

    if (userInput.trim() === '') {
        // If user input is empty, remove the 'hidden' class to show the GIF
        loadingGif.classList.remove('hidden');
    } else {
        // If user input is not empty, add the 'hidden' class to hide the GIF
        loadingGif.classList.add('hidden');
        
    }
    
}
//pass the input when press the ENTER KEY
document.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        sendMessage();
    }
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
    tempMsg.innerHTML = ("ConVo is typing ...");
    chatContainer.appendChild(typingDiv);
    chatContainer.appendChild(tempMsg);
}



function hideTypingDots() {
    const typingDiv = document.getElementById('typing-dots');
    const tempMsg = document.getElementById('tempMsg');
    if (typingDiv) {
        typingDiv.remove();
    }
    if (tempMsg) {
        tempMsg.remove();
    }
}

document.getElementById('userInput').addEventListener('input', handleInput);
//Clear user input not necessary
function clearInput() {
    document.getElementById('userInput').value = '';
}

// Send user massage to API


function sendMessage() {
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

const chatbox = new Chatbox();
chatbox.display();