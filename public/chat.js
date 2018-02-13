const socket = io()

let message  = document.getElementById('message');
let username  = document.getElementById('username');
let btn  = document.getElementById('send');
let output  = document.getElementById('output');
let actions  = document.getElementById('actions');


btn.addEventListener('click', function(){
    let datos = {username: username.value,
        message: message.value
        }
   
    // emitir los datos al servidor 
   socket.emit('chat:message', datos);
   console.log(datos);
});

message.addEventListener('keypress', function(){
    socket.emit('chat:typing', username.value)
});

socket.on('chat:message', function(data){
    //actions.innerHTML = '';
    output.innerHTML += `
        <p> <strong>${data.username}</strong> ${data.message} </p>` 
});

socket.on('chat:typing', function(data){
    actions.innerHTML = `
        <p> <em>${data}</em>: esta escribiendo </p>` 
});