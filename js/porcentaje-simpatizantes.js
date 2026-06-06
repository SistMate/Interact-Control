import { db }
from "./firebase-config.js";

import {
    collection,
    getDocs
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const tabla =
document.getElementById(
    "tablaSimpatizantes"
);

async function cargarDatos(){

    const simpatizantesSnap =
    await getDocs(
        collection(db,"Simpatizante")
    );

    const reunionesSnap =
    await getDocs(
        collection(db,"Reunion")
    );

    const actividadesSnap =
    await getDocs(
        collection(db,"Actividad")
    );

    const totalReuniones =
    reunionesSnap.size;

    const totalActividades =
    actividadesSnap.size;

    simpatizantesSnap.forEach(
        (docSimpatizante)=>{

            const simpatizante =
            docSimpatizante.data();

            const nombre =
            simpatizante.NombreSimpatizante;

            let reunionesAsistidas = 0;
            let actividadesAsistidas = 0;

            reunionesSnap.forEach(
                (reunion)=>{

                    const datos =
                    reunion.data();

                    if(
                        datos.asistenciaSimpatizantes &&
                        datos.asistenciaSimpatizantes.includes(nombre)
                    ){
                        reunionesAsistidas++;
                    }

                }
            );

            actividadesSnap.forEach(
                (actividad)=>{

                    const datos =
                    actividad.data();

                    if(
                        datos.asistenciaSimpatizantes &&
                        datos.asistenciaSimpatizantes.includes(nombre)
                    ){
                        actividadesAsistidas++;
                    }

                }
            );

            const totalEventos =
            totalReuniones +
            totalActividades;

            const asistencias =
            reunionesAsistidas +
            actividadesAsistidas;

            const porcentaje =
            totalEventos > 0
            ?
            (
                asistencias
                /
                totalEventos
            ) * 100
            :
            0;

            tabla.innerHTML += `
            <tr>

                <td>${nombre}</td>

                <td>
                    ${reunionesAsistidas}
                    /
                    ${totalReuniones}
                </td>

                <td>
                    ${actividadesAsistidas}
                    /
                    ${totalActividades}
                </td>

                <td>
                    ${porcentaje.toFixed(1)}%
                </td>

            </tr>
            `;

        }
    );

}

cargarDatos();