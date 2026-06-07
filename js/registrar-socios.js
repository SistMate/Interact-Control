import { db }
from "./firebase-config.js";

import {
    collection,
    addDoc,
    Timestamp
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const formSocio =
document.getElementById(
    "formSocio"
);

formSocio.addEventListener(
    "submit",
    async(e)=>{

        e.preventDefault();

        try{

            await addDoc(

                collection(
                    db,
                    "socios"
                ),

                {

                    "Nombre Completo":
                    document.getElementById(
                        "nombre"
                    ).value,

                    celular:
                    document.getElementById(
                        "celular"
                    ).value,

                    correoElectronico:
                    document.getElementById(
                        "correo"
                    ).value,

                    fechaNacimiento:
                    Timestamp.fromDate(

                        new Date(

                            document.getElementById(
                                "fechaNacimiento"
                            ).value

                        )

                    )

                }

            );

            alert(
                "Socio registrado correctamente"
            );

            formSocio.reset();

            window.location.href =
            "socios.html";

        }
        catch(error){

            console.error(
                error
            );

            alert(
                "Error al registrar socio"
            );

        }

    }
);