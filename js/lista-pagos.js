import { db } from "./firebase-config.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const tablaPagos =
document.getElementById("tablaPagos");

const buscarSocio =
document.getElementById("buscarSocio");

const filtroMes =
document.getElementById("filtroMes");

const filtroTipo =
document.getElementById("filtroTipo");

const modal =
document.getElementById("modalPago");

const cerrarModal =
document.getElementById("cerrarModal");

const mSocio =
document.getElementById("mSocio");

const mMes =
document.getElementById("mMes");

const mMonto =
document.getElementById("mMonto");

const mFecha =
document.getElementById("mFecha");

const mTipo =
document.getElementById("mTipo");

let pagos = [];


/* ===============================
        CARGAR PAGOS
================================ */

async function cargarPagos(){

    try{

        pagos = [];

        const querySnapshot =
        await getDocs(
            collection(
                db,
                "Pagos"
            )
        );

        querySnapshot.forEach((documento)=>{

            pagos.push({
                id: documento.id,
                ...documento.data()
            });

        });

        mostrarPagos(pagos);

    }
    catch(error){

        console.error(error);

        alert("Error al cargar los pagos.");

    }

}


/* ===============================
        MOSTRAR PAGOS
================================ */

function mostrarPagos(lista){

    tablaPagos.innerHTML = "";

    lista.forEach((pago)=>{

        let fecha = "";

        if(
            pago.fechaPago &&
            typeof pago.fechaPago.toDate === "function"
        ){

            fecha =
            pago.fechaPago
            .toDate()
            .toLocaleDateString("es-BO");

        }
        else{

            fecha = pago.fechaPago;

        }

        const fila =
        document.createElement("tr");

        fila.innerHTML = `

            <td>${pago.socio}</td>

            <td>${pago.mesPago}</td>

            <td>Bs ${pago.monto}</td>

            <td>${fecha}</td>

            <td>${pago.tipoPago}</td>

            <td>

                <button class="btnVer">

                    👁 Ver

                </button>

            </td>

        `;

        fila
        .querySelector(".btnVer")
        .addEventListener("click",()=>{

            mSocio.textContent =
            pago.socio;

            mMes.textContent =
            pago.mesPago;

            mMonto.textContent =
            pago.monto;

            mFecha.textContent =
            fecha;

            mTipo.textContent =
            pago.tipoPago;

            modal.style.display = "flex";

        });

        tablaPagos.appendChild(fila);

    });

}


/* ===============================
            FILTROS
================================ */

function aplicarFiltros(){

    let resultado = [...pagos];

    const nombre =
    buscarSocio.value
    .toLowerCase()
    .trim();

    const mes =
    filtroMes.value;

    const tipo =
    filtroTipo.value;

    if(nombre){

        resultado =
        resultado.filter(p=>

            p.socio
            .toLowerCase()
            .includes(nombre)

        );

    }

    if(mes){

        resultado =
        resultado.filter(p=>

            p.mesPago === mes

        );

    }

    if(tipo){

        resultado =
        resultado.filter(p=>

            p.tipoPago === tipo

        );

    }

    mostrarPagos(resultado);

}


/* ===============================
        EVENTOS
================================ */

buscarSocio.addEventListener(
    "input",
    aplicarFiltros
);

filtroMes.addEventListener(
    "change",
    aplicarFiltros
);

filtroTipo.addEventListener(
    "change",
    aplicarFiltros
);

cerrarModal.onclick = ()=>{

    modal.style.display="none";

};

window.onclick = (e)=>{

    if(e.target===modal){

        modal.style.display="none";

    }

};


/* ===============================
        INICIO
================================ */

cargarPagos();