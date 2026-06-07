import { db }
from "./firebase-config.js";

import {
    doc,
    getDoc,
    updateDoc,
    Timestamp
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

async function cargarSocio(){

    try{

        const docRef =
        doc(
            db,
            "socios",
            id
        );

        const docSnap =
        await getDoc(
            docRef
        );

        if(docSnap.exists()){

            const socio =
            docSnap.data();

            document.getElementById(
                "nombre"
            ).value =
            socio["Nombre Completo"] || "";

            document.getElementById(
                "celular"
            ).value =
            socio.celular || "";

            document.getElementById(
                "correo"
            ).value =
            socio.correoElectronico || "";

            if(
                socio.fechaNacimiento &&
                typeof socio.fechaNacimiento.toDate === "function"
            ){

                document.getElementById(
                    "fechaNacimiento"
                ).value =
                socio.fechaNacimiento
                .toDate()
                .toISOString()
                .split("T")[0];

            }

        }

    }
    catch(error){

        console.error(error);

        alert(
            "Error al cargar socio"
        );

    }

}

cargarSocio();

form.addEventListener(
    "submit",
    async(e)=>{

        e.preventDefault();

        try{

            await updateDoc(

                doc(
                    db,
                    "Socios",
                    id
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
                "Socio actualizado correctamente"
            );

            window.location.href =
            "socios.html";

        }
        catch(error){

            console.error(error);

            alert(
                "Error al actualizar socio"
            );

        }

    }
);
