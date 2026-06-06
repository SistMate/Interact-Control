import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs,
    addDoc
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
            "Socios"
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

            const simpatizante =
            documento.data();

            listaSimpatizantes.innerHTML += `
                <label>

                    <input
                        type="checkbox"
                        class="chkSimpatizante"
                        value="${simpatizante.NombreSimpatizante}">

                    ${simpatizante.NombreSimpatizante}

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
    "formActividad"
);

form.addEventListener(
"submit",
async(e)=>{

    e.preventDefault();

    const asistenciaSocios =
    [];

    document
    .querySelectorAll(".chkSocio:checked")
    .forEach((chk)=>{

        asistenciaSocios.push(
            chk.value
        );

    });

    const asistenciaSimpatizantes =
    [];

    document
    .querySelectorAll(".chkSimpatizante:checked")
    .forEach((chk)=>{

        asistenciaSimpatizantes.push(
            chk.value
        );

    });

    await addDoc(
        collection(
            db,
            "Actividad"
        ),
        {
            nombreActividad:
            document.getElementById(
                "nombreActividad"
            ).value,

            fecha:
            document.getElementById(
                "fecha"
            ).value,

            asistenciaSocios:
            asistenciaSocios,

            asistenciaSimpatizantes:
            asistenciaSimpatizantes
        }
    );

    alert(
        "Actividad registrada correctamente"
    );

    form.reset();

});