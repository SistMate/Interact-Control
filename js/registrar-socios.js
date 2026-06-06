import { db }
from "./firebase-config.js";

import {
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const formSocio =
document.getElementById("formSocio");

formSocio.addEventListener(
"submit",
async (e) => {

    e.preventDefault();

    try {

        await addDoc(
            collection(
                db,
                "Socios"
            ),
            {
                "Nombre Completo":
                document.getElementById("nombre").value,

                "NúmeroCarnet":
                document.getElementById("carnet").value,

                "FechaNacimiento":
                document.getElementById("fechaNacimiento").value,

                "FechaJuramento":
                document.getElementById("fechaJuramento").value,

                "CorreoElectronico":
                document.getElementById("correo").value,

                "Celular":
                Number(
                    document.getElementById("celular").value
                ),

                "Ocupacion":
                document.getElementById("ocupacion").value,

                "EstudiosProfesion":
                document.getElementById("estudios").value,

                "Estado":
                document.getElementById("estado").value
            }
        );

        alert(
            "Socio registrado correctamente"
        );

        formSocio.reset();

    }
    catch(error){

        console.error(error);

        alert(
            "Error al registrar socio"
        );

    }

});