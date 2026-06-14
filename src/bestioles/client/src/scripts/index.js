import {io} from "socket.io-client";
const socket = io();


window.addEventListener('keydown', (event) => {
    if (event.code == 'Space') {
        event.preventDefault(); 
        socket.emit('avancement'); 
    }
});

const status = document.getElementById('status'); 
const trackContainer = document.getElementById('track-container');

socket.on("connect", () => { 
    console.log("connect: ", socket.id);})

socket.on("disconnect", () => { 
    console.log("disconnect: ", socket.id);});


const status = document.getElementById('status'); 
const replay= document.getElementById('replay'); 

socket.on('update', (players) => {
    status.innerText = "HOPHOPHOP";
    renderPlayers(players);
});

socket.on('over', (data) => {
    status.innerText = `🏁 Course terminée ! Le vainqueur est : ${data.winner.id === socket.id ? 'TOI ! 🎉' : data.winner.id}`;
    setReplay(true); 
});

replay.addEventListener('click', () => {
    socket.emit('replay');
    setReplay(true); 
})

function setReady(val){
    ready.disabled= val;
}

function setReplay(val){
    replay.disabled= val; 
}

socket.on('wait', (msg)=> {
    status.innerText= msg; 
    setReady(true);
});

socket.on('gameStart', (msg) =>{
    status.innerText= msg; 
    setReady(false);
});

socket.on('result', (msg) => {
    status.innerText= msg; 
    setButton(true);
    setReplay(false); 
});


function renderPlayers(players) {
    trackContainer.innerHTML = '';

    players.forEach(player => {
        const playerLine = document.createElement('div');
        playerLine.className = 'player-line';
        const insect = document.createElement('div');
        insect.className = 'insect';
        insect.innerText = '🪲'; 
        if (player.id === socket.id) {
            insect.classList.add('local-player');
        }insect.style.transform = `translateX(${player.position}%)`;
        insect.style.left = '0%';
        playerLine.appendChild(insect);
        trackContainer.appendChild(playerLine);
    });
}