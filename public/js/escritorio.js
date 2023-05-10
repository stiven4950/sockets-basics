
const lblEscritorio = document.querySelector("h1");
const lblPendientes = document.querySelector("#lblPendientes");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const divAlerta = document.querySelector(".alert");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
    window.location = "index.html";
    throw new Error("El escritorio es obligatorio");
}

const escritorio = searchParams.get("escritorio");
lblEscritorio.innerText = escritorio;

divAlerta.style.display = "none";

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

btnAtender.addEventListener('click', () => {
    socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
        if (!ok) {
            lblTicket.innerText = "Nadie";
            return divAlerta.style.display = "";
        }

        lblTicket.innerText = "Ticket " + ticket.numero;
    });
    /* socket.emit('siguiente-ticket', null, (ticket) => {
        lblEscritorio.innerText = ticket;
    }); */
});

socket.on('ultimo-ticket', (ticket) => {
    lblEscritorio.innerText = "Ticket " + ticket;
});

socket.on("tickets-pendientes", (pendientes) => {
    if (pendientes === 0) {
        lblPendientes.style.display = "none";
    } else {
        lblPendientes.style.display = "";
    }

    lblPendientes.innerText = pendientes;
});