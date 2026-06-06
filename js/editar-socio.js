import { db } from "./firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const params =
new URLSearchParams(
    window.location.search
);

const id =
params.get("id");

const form =
document.getElementById(
    "formEditar"
);

async function cargarSocio(){

    const docRef =
    doc(db,"Socios",id);

    const docSnap =
    await getDoc(docRef);

    if(docSnap.exists()){

        const socio =
        docSnap.data();

        document.getElementById("nombre").value =
        socio["Nombre Completo"] || "";

        document.getElementById("carnet").value =
        socio["NúmeroCarnet"] || "";

        document.getElementById("fechaNacimiento").value =
        socio["FechaNacimiento"] || "";

        document.getElementById("fechaJuramento").value =
        socio["FechaJuramento"] || "";

        document.getElementById("correo").value =
        socio["CorreoElectronico"] || "";

        document.getElementById("celular").value =
        socio["Celular"] || "";

        document.getElementById("ocupacion").value =
        socio["Ocupacion"] || "";

        document.getElementById("estudios").value =
        socio["EstudiosProfesion"] || "";

        document.getElementById("estado").value =
        socio["Estado"] || "Activo";

    }

}

cargarSocio();

form.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    await updateDoc(
        doc(db,"Socios",id),
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
        "Socio actualizado correctamente"
    );

    window.location.href =
    "socios.html";

});