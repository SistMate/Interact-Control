import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const tablaActividades =
document.getElementById("tablaActividades");

const modal =
document.getElementById("modalActividad");

const cerrarModal =
document.getElementById("cerrarModal");

const tituloActividad =
document.getElementById("tituloActividad");

const fechaActividad =
document.getElementById("fechaActividad");

const modalSocios =
document.getElementById("modalSocios");

const modalSimpatizantes =
document.getElementById("modalSimpatizantes");

cerrarModal.onclick = () => {

    modal.style.display = "none";

};

window.onclick = (e) => {

    if (e.target === modal) {

        modal.style.display = "none";

    }

};

async function cargarActividades() {

    tablaActividades.innerHTML = "";

    const querySnapshot =
    await getDocs(
        collection(
            db,
            "Actividad"
        )
    );

    querySnapshot.forEach((documento) => {

        const actividad = documento.data();

        const socios =
        actividad.asistenciaSocios || [];

        const simpatizantes =
        actividad.asistenciaSimpatizantes || [];

        let fechaMostrar = "";

        if (
            actividad.fecha &&
            typeof actividad.fecha === "object" &&
            typeof actividad.fecha.toDate === "function"
        ) {

            fechaMostrar =
            actividad.fecha
            .toDate()
            .toLocaleDateString("es-BO");

        }
        else {

            fechaMostrar = actividad.fecha;

        }

        const fila =
        document.createElement("tr");

        fila.innerHTML = `

            <td>${actividad.nombreActividad}</td>

            <td>${fechaMostrar}</td>

            <td>${socios.length}</td>

            <td>${simpatizantes.length}</td>

            <td>

                <button
                    class="btnVer">

                    👁 Ver

                </button>

            </td>

        `;

        fila
        .querySelector(".btnVer")
        .addEventListener("click", () => {

            tituloActividad.textContent =
            actividad.nombreActividad;

            fechaActividad.textContent =
            "Fecha: " + fechaMostrar;

            modalSocios.innerHTML = "";

            modalSimpatizantes.innerHTML = "";

            if (socios.length === 0) {

                modalSocios.innerHTML =
                "<li>Sin asistentes.</li>";

            }
            else {

                socios.forEach(nombre => {

                    modalSocios.innerHTML +=
                    `<li>✔ ${nombre}</li>`;

                });

            }

            if (simpatizantes.length === 0) {

                modalSimpatizantes.innerHTML =
                "<li>Sin asistentes.</li>";

            }
            else {

                simpatizantes.forEach(nombre => {

                    modalSimpatizantes.innerHTML +=
                    `<li>✔ ${nombre}</li>`;

                });

            }

            modal.style.display = "flex";

        });

        tablaActividades.appendChild(fila);

    });

}

cargarActividades();