import { auth, db }
from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    getDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const nombreUsuario =
document.getElementById(
    "nombreUsuario"
);

onAuthStateChanged(
    auth,
    async(user)=>{

        if(!user){

            window.location.href =
            "index.html";

            return;
        }

        try{

            const docRef =
            doc(
                db,
                "Usuarios",
                user.uid
            );

            const docSnap =
            await getDoc(
                docRef
            );

            if(docSnap.exists()){

                const datos =
                docSnap.data();

                nombreUsuario.innerHTML = `
                    Hola,
                    <strong>${datos.nombre}</strong>
                    <br>
                    <small>
                        Cargo: ${datos.cargo}
                    </small>
                `;

            }
            else{

                nombreUsuario.innerHTML = `
                    Hola
                    <br>
                    <small>
                        Usuario sin información
                    </small>
                `;

            }

        }
        catch(error){

            console.error(error);

            nombreUsuario.innerHTML =
            "Error al cargar usuario";

        }

    }
);


const btnCerrarSesion =
document.getElementById(
    "btnLogout"
);

if(btnCerrarSesion){

    btnCerrarSesion.addEventListener(
        "click",
        async()=>{

            await signOut(auth);

            window.location.href =
            "index.html";

        }
    );

}