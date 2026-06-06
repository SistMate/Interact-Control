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
    "tablaSocios"
);
async function cargarSocios() {

    const tabla = document.getElementById("tablaSocios");

    tabla.innerHTML = "";

    const querySnapshot = await getDocs(
        collection(db, "Socios")
    );

    querySnapshot.forEach((documento) => {

        const socio = documento.data();

        tabla.innerHTML += `
            <tr>
                <td>${socio["Nombre Completo"] || ""}</td>
                <td>${socio["Celular"] || ""}</td>
                <td>${socio["FechaNacimiento"] || ""}</td>
                 <td>
                    <button
                    class="btnEditar"
                    onclick="editarSocio('${documento.id}')">
                    Editar
                 </button>

                    <button
                    class="btnEliminar"
                    onclick="eliminarSocio('${documento.id}')">
                    Eliminar
                </button>
            </td>
                </tr>
        `;

    });

}
window.editarSocio = function(id){

    window.location.href =`editar-socio.html?id=${id}`;

}
window.eliminarSocio =
async function(id){

    const confirmar =
    confirm(
        "¿Desea eliminar este socio?"
    );

    if(!confirmar) return;

    try{

        await deleteDoc(
            doc(
                db,
                "Socios",
                id
            )
        );

        alert(
            "Socio eliminado"
        );

        cargarSocios();

    }
    catch(error){

        console.error(error);

        alert(
            "Error al eliminar"
        );

    }

}

cargarSocios();