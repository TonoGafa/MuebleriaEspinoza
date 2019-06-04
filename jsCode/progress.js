function subirProgress(){
var progressPrueba = document.getElementById('progressPrueba');
var pro =50;
progressPrueba.innerHTML=`50%`;
progressPrueba.style.width="50%";


}

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var autoId = '';
for (var i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
}


//opcion 2
var archivo = document.getElementById("pic");
archivo.addEventListener("change", function(event) {
  leer();
});
	
function enviar(form) {
    var persona = new FormData(form);
    var req = ajaxRequest("upload.php");
    req.send(persona);
}
 
function ajaxRequest(url) {
  if (window.XMLHttpRequest) {
     var request = new XMLHttpRequest();
  } else if(window.ActiveXObject) {
     var request = new ActiveXObject("Microsoft.XMLHTTP");
  }
 
  request.onload = function(Event) {
     if (request.status == 200) {
       var response = JSON.parse(request.responseText);
       if(response.success){
          alert("Persona procesada exitosamente");
       } else {
          alert("Hubo un problema al procesar, codigo: " + response.status);
       }
     } 
   };
 
}

function leer(input, form) {
    for(var i =0; i< input.files.length; i++){
    if (input.files[i]) {
        var reader = new FileReader();

        reader.onload = function (e) {
           var img = $('<img id="dynamic">');
           img.attr('src', e.target.result);
           img.appendTo(form);
        }
        reader.readAsDataURL(input.files[i]);
       }
    }
}