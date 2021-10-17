"use strict";
console.log("conectado")
// *********************************************************************************************
const opcion_date = document.getElementById('opcion_date')
const api_date = document.getElementById('api_date')

const agregarCero = (n)=>{
    return (n.toString().length < 2)? "0".concat(n):n;
}
const metodosDate = (metodo)=>{
    let fecha = new Date()
    let resultado;
    switch (metodo) {
        case "1":resultado = agregarCero(fecha.getDate());break;
        case "2":resultado = fecha.getYear()+1900;break;
        case "3":resultado = agregarCero(fecha.getMonth()+1);break;
        case "4":resultado = agregarCero(fecha.getDay());break;
        case "5":resultado = agregarCero(fecha.getHours());break;
        case "6":resultado = agregarCero(fecha.getMinutes());break;
        case "7":resultado = agregarCero(fecha.getSeconds());break;
        default:resultado = fecha;break;
    }
    return resultado;
}

api_date.textContent = metodosDate()

opcion_date.addEventListener('change',((e)=>{
    api_date.textContent = metodosDate(e.target.value)
}))

const hora = document.getElementById('hora')
const minuto = document.getElementById('minuto')
const segundo = document.getElementById('segundo')

const actualizarReloj = ()=>{
    hora.textContent = metodosDate("5")
    minuto.textContent = metodosDate("6")
    segundo.textContent = metodosDate("7")
}
setInterval(actualizarReloj, 0);
// *********************************************************************************************
const opcion_storage = document.getElementById('opcion_storage')
const api_storage = document.getElementById('api_storage')
const key_storage = document.getElementById('key_storage')
const texto_storage = document.getElementById('texto_storage')
const ejecutar_storage = document.getElementById('ejecutar_storage')

const metodosStorage = (metodo,llave,cadena)=>{
    switch (metodo) {
        case "1":localStorage.setItem(llave,cadena);break;
        case "2":return localStorage.getItem(llave);break;
        case "3":localStorage.removeItem(llave);break;
        case "4":localStorage.clear();break;
        case "5":sessionStorage.setItem(llave,cadena);break;
        case "6":return sessionStorage.getItem(llave);break;
        case "7":sessionStorage.removeItem(llave);break;
        case "8":sessionStorage.clear();break;
        default:;break;
    }  
    return
}

ejecutar_storage.addEventListener('click',(()=>{
    let opcion =opcion_storage.value
    let key =key_storage.value
    let texto =texto_storage.value
    if ((opcion == "1" || opcion == "5") && (key != "" && texto != "")) {
        metodosStorage(opcion,key,texto)
    }else if ((opcion == "2" || opcion == "6") && (key != "")) {
        api_storage.innerHTML+=metodosStorage(opcion,key)+`<br>`
    }else if ((opcion == "3" || opcion == "7") && (key != "")) {
        metodosStorage(opcion,key)
    }else if ((opcion == "4" || opcion == "8")) {
        metodosStorage(opcion)
        api_storage.innerHTML=""
    }else{
        alert("Asegurece de llenar los parametros necesarios")
    }
}))

const btn_es = document.getElementById("es")
const btn_en = document.getElementById("en")
const idioma = document.getElementById("idioma")

const cambiarIdioma = (e)=>{
    if (e.target.id =="es") metodosStorage("1","idioma","Español")
    else if (e.target.id =="en") metodosStorage("1","idioma","Ingles")
    if (metodosStorage("2","idioma") !== null) idioma.textContent = metodosStorage("2","idioma");
}

btn_es.addEventListener("click",cambiarIdioma)
btn_en.addEventListener("click",cambiarIdioma)

if (metodosStorage("2","idioma") !== null) idioma.textContent = metodosStorage("2","idioma");

// *********************************************************************************************
const circulo = document.getElementById("circulo")
const rectangulo = document.getElementById("rectangulo")

circulo.addEventListener("dragstart",(e)=>{e.dataTransfer.setData("id",e.target.id)})
circulo.addEventListener("drag",()=>{console.log("proceso")})
circulo.addEventListener("dragend",()=>{console.log("final")})

rectangulo.addEventListener("dragenter",()=>{console.log("entrando")})
rectangulo.addEventListener("dragover",(e)=>{
    e.preventDefault();
    console.log("arrastrar sobre");
})
rectangulo.addEventListener("drop",(e)=>{
    let id = e.dataTransfer.getData("id")
    let draggableElement = document.getElementById(id);
    let dropzone = e.target;
    dropzone.appendChild(draggableElement);
    e.dataTransfer.clearData()
})
rectangulo.addEventListener("dragleave",()=>{console.log("saliendo")})


const zona_textura = document.getElementById('zona_textura')

const cambiarTextura=(e)=>e.dataTransfer.setData("id",e.target.id)
document.querySelectorAll('.textura').forEach(element => {
    document.getElementById(element.id).addEventListener("dragstart",(e)=>{cambiarTextura(e)})
});
zona_textura.addEventListener("dragover",(e)=>e.preventDefault())
zona_textura.addEventListener("drop",(e)=>{
    let url_textura = e.dataTransfer.getData("id")
    zona_textura.style.background = `url(img/${url_textura}.jpg)`
})
// *********************************************************************************************
const longitud = document.getElementById("longitud");
const latitud = document.getElementById("latitud");
const velocidad = document.getElementById("velocidad");

const geolocalizacion = navigator.geolocation;
const position = (pos)=>{ 
    let coordenadas = pos.coords
    console.log(
        pos,
        coordenadas.longitude,
        coordenadas.latitude,
        coordenadas.speed,
        )
        longitud.textContent = coordenadas.longitude;
        latitud.textContent = coordenadas.latitude;
        velocidad.textContent = coordenadas.speed;


}
geolocalizacion.getCurrentPosition(position);
