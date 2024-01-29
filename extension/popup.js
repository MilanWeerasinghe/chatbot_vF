document.addEventListener('DOMContentLoaded', function () {

    const userInputField = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');

    userInputField.addEventListener('input', function () {
        const userInput = this.value.trim();
        const initialMsgDiv = document.getElementById('initialMsg');
        initialMsgDiv.classList.add('hidden');

        if (userInput) {
            moveImage();
        }
        //Enable the button if userInput is not empty, otherwise disable it
        sendButton.disabled = userInput.value ==='';
    });
});

document.getElementById('sendButton').addEventListener('click', function () {
    moveImage();
    sendMessage();
});

//pass the input when press the ENTER KEY
document.addEventListener("keyup", ({ key }) => {
    if (key === "Enter") {
        sendMessage();
    }
});

function moveImage() {
    const image = document.getElementById('initialImg');
    const container2 = document.getElementById('chatbox__image--header');
    container2.appendChild(image);
    
}
// function backToOriginalPosition() {
//     const image = document.getElementById('initialImg');
//     const container1 = document.getElementById('centerImg');
//     container1.appendChild(image);

// }



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
    if (tempMsg) {
        tempMsg.remove();
    }
}

//Clear user input not necessary
function clearInput() {
    document.getElementById('userInput').value = '';
}
function hideIntialMsg() {
    document.getElementById('initialMsg').style.display = 'none';
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