/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var objetos = [];
var obj;
var dniC;
var coordenada1;
var coordenada2;
function crearbd(evento) {
    var basededatos = evento.target.result;
    var usuarios = basededatos.createObjectStore("usuarios", {keyPath: "dni"});
    usuarios.createIndex("BuscarEmail", "email", {unique: true});
    var productos = basededatos.createObjectStore("producto", {keyPath: "id", autoIncrement: true});
    productos.createIndex("fechaHora", "fechaHora", {unique: true});
    productos.createIndex("fechaHora,origen,destino,precio", ["fechaHora", "origen", "destino", "precio"], {unique: true});

}

function iniciar() {
    var d = new Date();
    $("#fechaHora").attr("min", d.getFullYear() + "-" + ((d.getMonth()) + 1) + "-" + d.getDate() + "T00:00:00");

    $("#cerrarSesion").click(function () {

        sessionStorage.removeItem("usuario");
        location.href = "index.html";
    });
    $("#login").click(function () {
        location.href = "login.html";
    });
    $("#subirProducto").click(function () {
        location.href = "subirProducto.html";
    });
     $("#verMisProductos").click(function(){
        location.href = "verMisProductos.html";
    });
    

    var usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (usuario === null) {
        $("#subirProducto").remove();
        $("#cerrarSesion").remove();
        $("#verMisProductos").remove();
    }else{
        $("#login").remove();

        if (usuario.marca === "") {
            $("#subirProducto").remove();
            $("#verMisProductos").remove();
            
        }

        $(".navbar .row").prepend("<div class='col-lg-4 datosusuario'><h2>Hola " + usuario.nombre + "</h2><img src='" + usuario.foto + "'></div>");
    }

   
}


function  mostrarProductos() {
    objetos = [];
    
    const request = window.indexedDB.open('WallapopVitoG11', 1);
    request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction(['productos'], 'readonly');
        const invoiceStore = transaction.objectStore('productos');

        var indice = invoiceStore.index("id,nombre,descripcion,categoria,precio,emailPropietario,emailComprador,fechaCompra");
        var rango = IDBKeyRange.lowerBound($("#fechaCompra").val(), false);
    }


        

};
        setTimeout(() => {
            rellenarTabla();
        }, 100);
    




function rellenarTabla() {
    
    $("tabla").empty();        
    $("#tabla").append('<thead><tr style="background-color:transparent!important"><th scope="col">Origen</th><th scope="col">Destino</th><th scope="col">Fecha</th><th scope="col">Precio</th></tr></thead><tbody></tbody>');


    for (var i = 0; i < objetos.length; i++) {
        $("#tabla tbody").append("<tr onclick='selectLinea(" + i + ");'><td>" + objetos[i].origen + "</td><td>" + objetos[i].destino + "</td><td>" + objetos[i].fecha.replace("T", " ") + "</td><td>" + objetos[i].precio + "€</td></tr>");
    }

}

function selectLinea(linea) {
    var usuario = JSON.parse(sessionStorage.getItem("usuario"));
    if (usuario === null) {
        location.href = "login.html";
    } else {

        alert("Dni del Conductor:" + dniC + "\nLatitud del origen:" + coordenada1 + "\nLongitud del origen:" + coordenada2);

    }

}

window.addEventListener("load", iniciar);

