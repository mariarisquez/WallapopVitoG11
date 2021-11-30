/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var objetos = [];
var bd, zonadatos;
function mostrarerror(evento) {
    alert("Error: " + evento.code + " " + evento.message);
}
function comenzar(evento) {
    bd = evento.target.result;
    }
 function crearbd(evento) {
    var basededatos = evento.target.result;
    var usuarios = basededatos.createObjectStore("usuarios", {keyPath: "dni"});
    usuarios.createIndex("BuscarEmail", "email", {unique:true});
    var productos = basededatos.createObjectStore("productos", {keyPath: "id", autoIncrement:true});
    productos.createIndex("nombre", "precio", {unique:true});
}
function iniciar() {

  var solicitud = indexedDB.open("WallapopVitoG11");
  solicitud.addEventListener("error", mostrarerror);
  solicitud.addEventListener("success", comenzar);
  solicitud.addEventListener("upgradeneeded", crearbd);
  } 

function mostrarDatos(evento) {
  var puntero = evento.target.result;
  var id = document.getElementById("id").value;
  var usuario = JSON.parse(sessionStorage.getItem("usuario"));

    if (puntero) {
       if (fechaActual > puntero.value.fechaHora) {       
            obj = {fecha: puntero.value.fechaHora, origen: puntero.value.origen, destino: puntero.value.destino, precio: puntero.value.precio};
            objetos.push(obj);
                }
       puntero.continue();
            }
        if(puntero===null){
        rellenarTabla();
            }
    }
    
function rellenarTabla() {
    
  if(objetos.length >0){
    $("tabla").empty();        
    $("#tabla").append('<thead><tr style="background-color:transparent!important"><th scope="col">Origen</th><th scope="col">Destino</th><th scope="col">Fecha/Hora</th><th scope="col">Precio</th></tr></thead><tbody></tbody>');

    for (var i = 0; i < objetos.length; i++) {
     
        $("#tabla tbody").append("<tr onclick='selectLinea(" + i + ");'><td>" + objetos[i].origen + "</td><td>" + objetos[i].destino 
        + "</td><td>" + objetos[i].fecha.replace("T", " ") + "</td><td>" + objetos[i].precio + "€</td></tr>");
        }
   }
}

window.addEventListener("load", iniciar);


