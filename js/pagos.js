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
    "tablaPagos"
);

const buscar =
document.getElementById(
    "buscar"
);

let pagos = [];

async function cargarPagos(){

    try{

        const querySnapshot =
        await getDocs(
            collection(
                db,
                "Pagos"
            )
        );

        pagos = [];

        querySnapshot.forEach(
            (documento)=>{

                pagos.push({

                    id:
                    documento.id,

                    ...documento.data()

                });

            }
        );

        mostrarPagos(
            pagos
        );

    }
    catch(error){

        console.error(
            error
        );

        alert(
            "Error al cargar pagos"
        );

    }

}

function mostrarPagos(lista){

    tabla.innerHTML = "";

    lista.forEach(
        (pago)=>{

            let fechaFormateada = "";

            if(pago.fecha){

                if(
                    typeof pago.fecha.toDate ===
                    "function"
                ){

                    fechaFormateada =
                    pago.fecha
                    .toDate()
                    .toLocaleDateString(
                        "es-BO"
                    );

                }
                else{

                    fechaFormateada =
                    pago.fecha;

                }

            }

            tabla.innerHTML += `
            <tr>

                <td>
                    ${pago.nombreSocio || ""}
                </td>

                <td>
                    ${fechaFormateada}
                </td>

                <td>
                    ${pago.conceptoPago ||
                      pago.motivoPago ||
                      ""}
                </td>

                <td>
                    Bs ${pago.montoPagado || 0}
                </td>

                <td>

                    <button
                        class="btnEliminar"
                        onclick="eliminarPago('${pago.id}')">

                        Eliminar

                    </button>

                </td>

            </tr>
            `;

        }
    );

}

buscar.addEventListener(
    "keyup",
    (e)=>{

        const texto =
        e.target.value
        .toLowerCase()
        .trim();

        const filtrados =
        pagos.filter(
            (pago)=>{

                const nombre =
                (
                    pago.nombreSocio ||
                    ""
                )
                .toLowerCase();

                const motivo =
                (
                    pago.conceptoPago ||
                    pago.motivoPago ||
                    ""
                )
                .toLowerCase();

                return (
                    nombre.includes(
                        texto
                    )
                    ||
                    motivo.includes(
                        texto
                    )
                );

            }
        );

        mostrarPagos(
            filtrados
        );

    }
);

window.eliminarPago =
async function(id){

    const confirmar =
    confirm(
        "¿Desea eliminar este pago?"
    );

    if(!confirmar){

        return;

    }

    try{

        await deleteDoc(
            doc(
                db,
                "Pagos",
                id
            )
        );

        alert(
            "Pago eliminado correctamente"
        );

        cargarPagos();

    }
    catch(error){

        console.error(
            error
        );

        alert(
            "Error al eliminar el pago"
        );

    }

}

cargarPagos();