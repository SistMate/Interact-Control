import { db } from "./firebase-config.js";

import {
    collection,
    getDocs,
    addDoc,
    Timestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const comboSocios =
document.getElementById("socio");

const tipoPago =
document.getElementById("tipoPago");

const contenedorQR =
document.getElementById("contenedorQR");

const formPago =
document.getElementById("formPago");



/* ==========================
   CARGAR SOCIOS
========================== */

async function cargarSocios(){

    try{

        const querySnapshot =
        await getDocs(
            collection(
                db,
                "socios"
            )
        );

        querySnapshot.forEach((documento)=>{

            const socio =
            documento.data();

            comboSocios.innerHTML +=
            `
            <option value="${socio["Nombre Completo"]}">
                ${socio["Nombre Completo"]}
            </option>
            `;

        });

    }
    catch(error){

        console.error(error);

        alert(
            "No se pudieron cargar los socios."
        );

    }

}

cargarSocios();



/* ==========================
   MOSTRAR QR
========================== */

tipoPago.addEventListener(
    "change",
    ()=>{

        if(tipoPago.value==="QR"){

            contenedorQR.style.display="block";

        }
        else{

            contenedorQR.style.display="none";

        }

    }
);



/* ==========================
   REGISTRAR PAGO
========================== */

formPago.addEventListener(
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

                    socio:
                    comboSocios.value,

                    monto:
                    Number(
                        document.getElementById(
                            "monto"
                        ).value
                    ),

                    mesPago:
                    document.getElementById(
                        "mesPago"
                    ).value,

                    fechaPago:
                    Timestamp.fromDate(

                        new Date(

                            document.getElementById(
                                "fechaPago"
                            ).value

                        )

                    ),

                    tipoPago:
                    tipoPago.value

                }

            );

            alert(
                "Pago registrado correctamente."
            );

            formPago.reset();

            contenedorQR.style.display="none";

        }
        catch(error){

            console.error(error);

            alert(
                "Ocurrió un error al registrar el pago."
            );

        }

    }
);