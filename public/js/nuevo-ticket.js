// Referencias
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

btnCrear.addEventListener('click', () => {

    socket.emit('siguiente-ticket', null, (ticket) => {
        lblNuevoTicket.innerHTML = ticket;
    });
});

socket.on('ultimo-ticket', (ticket) => {
    lblNuevoTicket.innerHTML = "Ticket " + ticket;
});