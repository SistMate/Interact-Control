import { db }
from "./firebase-config.js";

import {
    collection,
    addDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form =
document.getElementById(
    "formSimpatizante"
);

form.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    await addDoc(
        collection(
            db,
            "Simpatizante"
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
        "Simpatizante registrado correctamente"
    );

    window.location.href =
    "simpatizantes.html";

});