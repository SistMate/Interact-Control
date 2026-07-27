import { auth, db } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// ==============================
// ELEMENTOS
// ==============================

const nombreUsuario = document.getElementById("nombreUsuario");
const cargoUsuario = document.getElementById("cargoUsuario");
const mensajeFelipe = document.getElementById("mensajeFelipe");
const btnCerrarSesion = document.getElementById("btnLogout");

// ==============================
// SALUDO
// ==============================

function obtenerSaludo(){

    const hora = new Date().getHours();

    if(hora >= 5 && hora < 12){
        return "☀️ Buenos días";
    }

    if(hora >= 12 && hora < 19){
        return "🌤️ Buenas tardes";
    }

    return "🌙 Buenas noches";
}

// ==============================
// CARGAR USUARIO
// ==============================

onAuthStateChanged(auth, async(user)=>{

    if(!user){

        window.location.href = "index.html";
        return;

    }

    try{

        const docRef = doc(db,"Usuarios",user.uid);

        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){

            const datos = docSnap.data();

            nombreUsuario.innerHTML = `
                ${obtenerSaludo()},
                <strong>${datos.nombre}</strong>
            `;

            cargoUsuario.textContent = `Cargo: ${datos.cargo}`;

        }else{

            nombreUsuario.textContent = obtenerSaludo();

            cargoUsuario.textContent = "Usuario sin información";

        }

    }catch(error){

        console.error(error);

        nombreUsuario.textContent = "Error al cargar usuario";

    }

});

// ==============================
// CERRAR SESIÓN
// ==============================

btnCerrarSesion.addEventListener("click", async()=>{

    await signOut(auth);

    window.location.href = "index.html";

});

// ==============================
// MENSAJES DE FELIPE
// ==============================

const mensajes = [

    "¿Qué deseas hacer hoy?",

    "¡Recuerda registrar la asistencia de la reunión!",

    "No olvides registrar las actividades del club.",

    "¡Cada servicio cuenta!",

    "¿Ya revisaste los pagos pendientes?",

    "¡Interact hace la diferencia!",

    "Gracias por ser parte de Interact Cochabamba.",

    "Hoy es un gran día para servir.",

    "¿Listo para comenzar una nueva actividad?",

    "¡Tu trabajo ayuda a que el club siga creciendo!",

    "Recuerda mantener la información actualizada.",

    "¡Sigamos creando impacto en nuestra comunidad!",

    "Cada socio aporta al éxito del club.",

    "¡Que tengas una excelente jornada!",

    "El liderazgo comienza con el servicio.",

    "El cargo te hace a ti?, o tú haces al cargo?",
    
    "Nunca olvides de dónde vienes, ni a dónde quieres llegar.",

    "¡Felipe te acompaña en cada paso del camino!",
];

// ==============================
// CAMBIAR MENSAJES
// ==============================

let ultimoIndice = -1;

function cambiarMensaje(){

    mensajeFelipe.style.opacity = "0";

    setTimeout(()=>{

        let indice;

        do{

            indice = Math.floor(Math.random()*mensajes.length);

        }while(indice === ultimoIndice);

        ultimoIndice = indice;

        mensajeFelipe.textContent = mensajes[indice];

        mensajeFelipe.style.opacity = "1";

    },500);

}

cambiarMensaje();

setInterval(cambiarMensaje,8000);
