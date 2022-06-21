function descargarJuego(){
    var OSName = "Desconocido"
    if(navigator.appVersion.indexOf("Win") != -1) OSName="Windows";
    if(navigator.appVersion.indexOf("Mac") != -1) OSName="MacOS";
    location.href =  "descargarJuego?plataforma="+OSName;
}