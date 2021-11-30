/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var bd;

function mostrarerror(evento) {
    alert("Error: " + evento.code + " " + evento.message);
}
function comenzar(evento) {
    bd = evento.target.result;
}

function crearbd(evento) {
    var basededatos = evento.target.result;
    var usuarios = basededatos.createObjectStore("usuarios", {keyPath: "dni"});
    usuarios.createIndex("BuscarEmail", "email", {unique: true});
    var viajes = basededatos.createObjectStore("viajes", {keyPath: "id", autoIncrement: true});
    viajes.createIndex("fechaHora", "fechaHora", {unique: true});
    viajes.createIndex("fechaHora,origen,destino,precio", ["fechaHora", "origen", "destino", "precio"], {unique: true});
}

function iniciar() {
    var solicitud = indexedDB.open("arabaCar05");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);

    $("#crearCuenta").click(function () {
        location.href = "registro.html";
    });
}

function login() {
    const request = window.indexedDB.open('arabaCar05', 1);
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['usuarios'], 'readonly');
        const invoiceStore = transaction.objectStore('usuarios');
        var indice = invoiceStore.index("BuscarEmail");
        var rango = IDBKeyRange.only($("#email").val());
        const getCursorRequest = indice.openCursor(rango);

        getCursorRequest.onsuccess = e => {
            const puntero = e.target.result;

            if (puntero) {
                if (puntero.value.contrasenia === $("#contrasenia").val()) {
                    const myObj = {
                        dni: puntero.value.dni,
                        nombre: puntero.value.nombre,
                        foto: puntero.value.foto,
                        marca: puntero.value.marca,
                        contrasenia: puntero.value.contrasenia
                    };
                    var usuario = JSON.stringify(myObj);
                    sessionStorage.setItem("usuario", usuario);
                    location.href = "index.html";
                } else {
                    alert("usuario o contraseña incorrectos");
                }
                puntero.continue();
            } else {
                alert("usuario correcto");
            }
        };
    };
}

window.addEventListener("load", iniciar);

