import { db }
from "./firebase-config.js";

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

async function cargarSimpatizante(){

    const docRef =
    doc(
        db,
        "Simpatizante",
        id
    );

    const docSnap =
    await getDoc(docRef);

    if(docSnap.exists()){

        const datos =
        docSnap.data();

        document.getElementById("nombre").value =
        datos.NombreSimpatizante || "";

        document.getElementById("celular").value =
        datos.Celular || "";

        document.getElementById("fechaIngreso").value =
        datos.FechaIngreso || "";

    }

}

cargarSimpatizante();

form.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    await updateDoc(
        doc(
            db,
            "Simpatizante",
            id
        ),
        {
            NombreSimpatizante:
            document.getElementById("nombre").value,

            Celular:
            Number(
                document.getElementById("celular").value
            ),

            FechaIngreso:
            document.getElementById("fechaIngreso").value
        }
    );

    alert(
        "Simpatizante actualizado correctamente"
    );

    window.location.href =
    "simpatizantes.html";

});