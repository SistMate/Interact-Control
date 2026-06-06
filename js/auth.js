import { auth }
from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const usuario =
document.getElementById("usuario");

onAuthStateChanged(
auth,
(user)=>{

    if(user){

        usuario.textContent =
        user.email;

    }
    else{

        window.location.href =
        "index.html";

    }

});

document
.getElementById("logout")
.addEventListener(
"click",
async ()=>{

    await signOut(auth);

});