import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs,
    addDoc,
    Timestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const listaSocios =
document.getElementById(
    "listaSocios"
);

const listaSimpatizantes =
document.getElementById(
    "listaSimpatizantes"
);

async function cargarSocios(){

    const querySnapshot =
    await getDocs(
        collection(
            db,
            "socios"
        )
    );

    querySnapshot.forEach(
        (documento)=>{

            const socio =
            documento.data();

            listaSocios.innerHTML += `
                <label>

                    <input
                        type="checkbox"
                        class="chkSocio"
                        value="${socio["Nombre Completo"]}">

                    ${socio["Nombre Completo"]}

                </label>
                <br>
            `;

        }
    );

}

async function cargarSimpatizantes(){

    const querySnapshot =
    await getDocs(
        collection(
            db,
            "Simpatizante"
        )
    );

    querySnapshot.forEach(
        (documento)=>{

            const simp =
            documento.data();

            listaSimpatizantes.innerHTML += `
                <label>

                    <input
                        type="checkbox"
                        class="chkSimpatizante"
                        value="${simp.NombreSimpatizante}">

                    ${simp.NombreSimpatizante}

                </label>
                <br>
            `;

        }
    );

}

cargarSocios();
cargarSimpatizantes();

const form =
document.getElementById(
    "formReunion"
);

form.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    const sociosSeleccionados =
    [];

    document
    .querySelectorAll(".chkSocio:checked")
    .forEach((chk)=>{

        sociosSeleccionados.push(
            chk.value
        );

    });

    const simpatizantesSeleccionados =
    [];

    document
    .querySelectorAll(".chkSimpatizante:checked")
    .forEach((chk)=>{

        simpatizantesSeleccionados.push(
            chk.value
        );

    });

    await addDoc(
        collection(
            db,
            "Reunion"
        ),
        {
            tipoReunion:
            document.getElementById(
                "tipoReunion"
            ).value,

            fechaHora:
            Timestamp.fromDate(
                new Date(
                    document.getElementById(
                        "fechaHora"
                    ).value
                )
            ),

            asistenciaSocios:
            sociosSeleccionados,

            asistenciaSimpatizantes:
            simpatizantesSeleccionados
        }
    );

    alert(
        "Reunión registrada correctamente"
    );

    form.reset();

});