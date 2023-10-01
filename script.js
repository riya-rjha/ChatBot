const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector(".chatbox");
const chatBotImage = document.querySelector("#chatbot-image");

let userMessage;
const API_KEY = "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";

const createChatLi = (message, className) => {


    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "chat-outgoing" ? `<p>${message}</p>` : `<p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    role: "user",
                    content: userMessage
                }
            ]
        })
    }
    fetch(API_URL,requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again!";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) {
        return;
    }
    // createChatLi(userMessage, "chat-outgoing");
    chatbox.appendChild(createChatLi(userMessage, "chat-outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "chat-incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);

}

sendChatBtn.addEventListener("click", handleChat);

function toggleHide() {
    let image = document.getElementById('chatbot-image');
    let chatbotcomplete = document.querySelector('.chatBot');
    let popUpMsg = document.querySelector('.pop-Up');
    if (chatbotcomplete.style.display == 'none') {
        chatbotcomplete.style.display = 'block';
        popUpMsg.style.display = 'none';
    }
    else{
        chatbotcomplete.style.display='none';
        popUpMsg.style.display = 'block';
    }

}

function cancel(){
    let crossNow = document.getElementById('cross');
    let chatbotcomplete = document.querySelector(".chatBot");
    let popUpMsg = document.querySelector('.pop-Up');
    if (chatbotcomplete.style.display != 'none'){
        chatbotcomplete.style.display="none";
        popUpMsg.style.display = 'block';
    }
}



