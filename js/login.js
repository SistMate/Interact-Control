import { auth } from "./firebase-config.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const btnLogin =
document.getElementById("btnLogin");

btnLogin.addEventListener(
"click",
async () => {

    const correo =
    document.getElementById("correo").value;

    const password =
    document.getElementById("password").value;

    try {

        await signInWithEmailAndPassword(
            auth,
            correo,
            password
        );

        window.location.href =
        "dashboard.html";

    }
    catch(error){

        alert(
        "Correo o contraseña incorrectos"
        );

    }

});