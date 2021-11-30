/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var usuario = JSON.parse(sessionStorage.getItem("usuario"));
if (usuario === null) {
    location.href = "login.html";
}

if (usuario.marca === "") {
    location.href = "index.html";
}

var bd;
var map;

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
    var productos = basededatos.createObjectStore("productos", {keyPath: "id", autoIncrement: true});
    productos.createIndex("fechaHora", "fechaHora", {unique: true});
    productos.createIndex("fechaHora,origen,destino,precio", ["fechaHora", "origen", "destino", "precio"], {unique: true});
}

function iniciar() {
    var d = new Date();
    $("#fechaHora").attr("min", d.getFullYear() + "-" + ((d.getMonth()) + 1) + "-" + d.getDate() + "T00:00:00");

    var solicitud = indexedDB.open("WallapopVitoG11");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);

}

function guardarProducto() {
    var id = $("#id").val();
    var nombre = $("#nombre").val();
    var descripcion = $("#descripcion").val();
    var categoria = $("#categoria").val();
    var precio = $("#precio").val();
    var emailVendedor = usuario.email;
    var emailComprador = $("#emailComprador").val();
    var fechaCompra = $("#fechaCompra").val();
    var usuario = JSON.parse(sessionStorage.getItem("usuario"));

    var transaccion = bd.transaction(["productos"], "readwrite");
    var productos = transaccion.objectStore("productos");
    transaccion.addEventListener("complete", completado);
    transaccion.addEventListener("error", error);

    var solicitud = productos.add({id: id, nombre: nombre, descripcion: descripcion, categoria: categoria, precio: precio, emailVendedor: emailVendedor, emailComprador: emailComprador, fechaCompra: fechaCompra});
}

function completado() {
    alert("completado");
    location.href = "subirProducto.html";
}

function error() {
    alert("No se ha podido guardar el producto");
}

window.addEventListener("load", iniciar);

