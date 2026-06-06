import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs,
    addDoc,
    Timestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form =
document.getElementById(
    "formPago"
);

const selectSocio =
document.getElementById(
    "nombreSocio"
);

async function cargarSocios(){

    try{

        const querySnapshot =
        await getDocs(
            collection(
                db,
                "Socios"
            )
        );

        selectSocio.innerHTML =
        `
        <option value="">
            Seleccione un socio
        </option>
        `;

        querySnapshot.forEach(
            (documento)=>{

                const socio =
                documento.data();

                selectSocio.innerHTML += `
                <option value="${socio["Nombre Completo"]}">
                    ${socio["Nombre Completo"]}
                </option>
                `;

            }
        );

    }
    catch(error){

        console.error(error);

        alert(
            "Error al cargar socios"
        );

    }

}

cargarSocios();

form.addEventListener(
    "submit",
    async(e)=>{

        e.preventDefault();

        try{

            await addDoc(
                collection(
                    db,
                    "Pagos"
                ),
                {

                    nombreSocio:
                    document.getElementById(
                        "nombreSocio"
                    ).value,

                    fecha:
                    document.getElementById(
                        "fecha"
                    ).value,

                    montoPagado:
                    document.getElementById(
                        "montoPagado"
                    ).value,

                    tipoPago:
                    document.getElementById(
                        "tipoPago"
                    ).value,

                    conceptoPago:
                    document.getElementById(
                        "conceptoPago"
                    ).value,

                    fechaRegistro:
                    Timestamp.now()

                }
            );

            alert(
                "Pago registrado correctamente"
            );

            form.reset();

        }
        catch(error){

            console.error(error);

            alert(
                "Error al registrar pago"
            );

        }

    }
);