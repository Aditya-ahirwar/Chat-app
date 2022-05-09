const socket = io('http://localhost:8000');

const you = document.getElementById('you');
const form = document.getElementById('form');
const messageInput = document.getElementById('typeMsg');
const messageContainer = document.querySelector('.container')
var audio = new Audio('ting.mp3');

const append = (message, position)=>{
    let html = `<div class = "${position} message">
                        ${message}
                    </div>`
    messageContainer.innerHTML += html;
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ' ';
})

const name = prompt("Enter your name to join LetsChat")
socket.emit('onNewUser', name)
if(name){
    you.value = `You joined as ${name}`;
}else{
    you.value = "Name not provided";
}


socket.on('joined', name=>{
    append(`${name} joined the chat`, 'right');
})

socket.on('receive', data=>{
    append(`${data.name }: ${data.message}`, 'left')
})

socket.on('left', name=>{
    append(`${name } left the chat`, 'left');
})