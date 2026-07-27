import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs,
    deleteDoc,
    doc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const tabla =
document.getElementById(
    "tablaSimpatizantes"
);

async function cargarSimpatizantes(){

    tabla.innerHTML = "";

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

            tabla.innerHTML += `
            <tr>

                <td>
                    ${simpatizante.NombreSimpatizante || ""}
                </td>

                <td>
                    ${simpatizante.Celular || ""}
                </td>

                <td>
                    ${simpatizante.FechaIngreso || ""}
                </td>

                <td>

                    <button
                        class="btnEditar"
                        onclick="editarSimpatizante('${documento.id}')">

                        Editar

                    </button>

                    <button
                        class="btnEliminar"
                        onclick="eliminarSimpatizante('${documento.id}')">
                        Eliminar
                    </button>

                </td>

            </tr>
            `;

        }
    );

}

window.editarSimpatizante =
function(id){

    window.location.href =
    `editar-simpatizante.html?id=${id}`;

}

window.eliminarSimpatizante =
async function(id){

    const confirmar =
    confirm(
        "¿Desea eliminar este simpatizante?"
    );

    if(!confirmar) return;

    await deleteDoc(
        doc(
            db,
            "Simpatizante",
            id
        )
    );

    cargarSimpatizantes();

}

cargarSimpatizantes();
