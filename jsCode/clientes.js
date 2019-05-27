firebase.initializeApp({
    apiKey: "AIzaSyDqfihS3c6xRg8GPG3LwedqxVbaWv80MVM",
    authDomain: "prestacasa-ad0ec.firebaseapp.com",
    databaseURL: "https://prestacasa-ad0ec.firebaseio.com",
    projectId: "prestacasa-ad0ec",
    storageBucket: "prestacasa-ad0ec.appspot.com",
    messagingSenderId: "846656829348"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();


  var mensaje = document.getElementById('mensajeConfi');
  //Permitir Geolozalizacion
  function localizacionCliente(){
    function localizacion(posicion){
      var latitud = document.getElementById('latitud');
      var longitud = document.getElementById('longitud');
  
      var latitude = posicion.coords.latitude;
      var longitude = posicion.coords.longitude;
  
      latitud.value=latitude;
      longitud.value=longitude;
    }
      navigator.geolocation.getCurrentPosition(localizacion, function(error){
        // El segundo parámetro es la función de error
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    // El usuario denegó el permiso para la Geolocalización.
                    mensaje.innerHTML=`El usuario denegó el permiso para la Geolocalización.`;
                    break;
                case error.POSITION_UNAVAILABLE:
                    // La ubicación no está disponible.
                    mensaje.innerHTML=`La ubicación no está disponible.`;
                    break;
                case error.TIMEOUT:
                    // Se ha excedido el tiempo para obtener la ubicación.
                    mensaje.innerHTML=`Se ha excedido el tiempo para obtener la ubicación.`;
                    break;
                case error.UNKNOWN_ERROR:
                    // Un error desconocido.
                    mensaje.innerHTML=`Un error desconocido.`;
                    break;
            } 
        });
  }


  //Comienza metodo para subir imagenes en FireBase Domicilio
var nombreImagenDomicilio="";
var urlImagenDomicilio="";
var nombreImagenesCredencial="";
var urlImagenCredencial="";

var storageRef;

  function subirImagenen_Domicilio_FireBase(){
    var comprobanteDomicilio = document.getElementById('comprobanteDomicilio');
    var imagencomprobanteDomicilio = comprobanteDomicilio.files[0];
    storageRef = firebase.storage().ref();

    //var uploadDomicilio = storageRef.child('imagenesDomicilio/'+imagencomprobanteDomicilio.name);
    //var uploadCredencial = storageRef.child('imagenesCredencial/'+imagencredencial.name);

    var uploadTask  = storageRef.child('imagenesDomicilio/'+imagencomprobanteDomicilio.name).put(imagencomprobanteDomicilio);
    /*var uploadCredencial = storageRef.child('imagenesCredencial/'+imagencredencial.name).put(imagencredencial);*/

    uploadTask.on('state_changed',
    function (snapshot){
      alert('subiendo Domicilio'+snapshot)
    },
    function(error){
      alert('Domicilio '+error)
      /*nombreImagenDomicilio=imagencomprobanteDomicilio.name;
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        urlImagenDomicilio=downloadURL;
        console.log('File available at', downloadURL);
        });*/
    },function(){
      alert('Domicilio subido');
      nombreImagenDomicilio=imagencomprobanteDomicilio.name;//Nombre de la imagen
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      urlImagenDomicilio=downloadURL;//Url donde esta guardada la imagen
      alert(downloadURL)
      console.log('File available at', downloadURL);
      });
    });

    /*uploadCredencial.on('state_changed',
    function(error){
      alert('Credencial '+error)
    },function(){
      alert('Credencial subida');
      nombreImagenesCredencial=imagencredencial.name;
      urlImagenCredencial=uploadCredencial.snapshot.downloadURL;
    });*/
//alert('url '+urlImagenDomicilio)
  }
  //Termina metodo para subir imagenes en Firebase Domicilio

  //Metodo para eliminar imagen Domicilio de FireBase
function eliminarImagen_Domicilio_FireBase(){
  // Se crea la referencia para eliminar la imagen
  var comprobanteDomicilio = document.getElementById('comprobanteDomicilio');
  var imagencomprobanteDomicilio = comprobanteDomicilio.files[0];
  storageRef = firebase.storage().ref();
var desertRef = storageRef.child('imagenesDomicilio/'+imagencomprobanteDomicilio.name);

// Se elimina la imagen
desertRef.delete().then(function() {
  alert('Imagen Eliminada')
}).catch(function(error) {
  alert('Ah ocurrido un error <br>'+
  'Verifique que la imagen haya sido borrada '+'<br>'+error)
});
}
  //Termina metodo para eliminar imagen en Firebase

 
//Comieza metodo para subir imagenes en Firebase Credencial
function subirImagenen_Credencial_FireBase(){
  var credencial = document.getElementById('credencial');
  var imagencredencial = credencial.files[0];
  storageRef = firebase.storage().ref();
  var uploadTask  = storageRef.child('imagenesCredencial/'+imagencredencial.name).put(imagencredencial);

  uploadTask.on('state_changed',
  function (snapshot){
    alert('subiendo Credencial')
  },
  function(error){
    alert('Credencial:  '+error)
  },function(){
    alert('Credencial subida');
    nombreImagenesCredencial=imagencredencial.name;//Nombre de la imagen
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    urlImagenCredencial=downloadURL;//Url donde esta guardada la imagen
    alert(downloadURL)
    console.log('File available at', downloadURL);
    });
  });
}
//Termina metodo para subir imagenes en firebase Credencial

//Metodo para borrar imagenes en firebase Credencial
function borrarImagen_Credencial_FireBase(){
    // Se crea la referencia para borrarla
    var credencial = document.getElementById('credencial');
    var imagencredencial = credencial.files[0];
    storageRef = firebase.storage().ref();
  var desertRef = storageRef.child('imagenesCredencial/'+imagencredencial.name);
  // Se elimina la imagen
  desertRef.delete().then(function() {
    alert('Credencial Eliminada')
  }).catch(function(error) {
    alert('Ah ocurrido un error <br>'+
    'Verifique que la imagen haya sido borrada '+'<br>'+error)
  });
}
//Termina metodo para borrar imagenes en firebase Credencial
  
  //Guardar clientes
  function guardarCliente(){
try {
  var nombre = document.getElementById('nombreCompleto').value;
  var apellidoP = document.getElementById('apellidoP').value;
  var apellidoM = document.getElementById('apellidoM').value;
  var curp = document.getElementById('curp').value;
  var edad = document.getElementById('edad').value;
  var genero = document.getElementById('genero').value;
  var correo = document.getElementById('correo').value;
  var comunidad = document.getElementById('comudidad').value;
  var direccion = document.getElementById('direccion').value;
  var descripcionLugar = document.getElementById('descripcionLugar').value;
  var numeroTelefono = document.getElementById('numeroTelefono').value;

  var latitud = document.getElementById('latitud').value;
  var longitud = document.getElementById('longitud').value;

  if(nombre!=""){
    db.collection("Clientes").add({
      Nombre: nombre,
      Apellido_Paterno: apellidoP,
      Apellido_Materno: apellidoM,
      Curp: curp,
      Edad: edad,
      Genero: genero,
      Correo: correo,
      Comunidad: comunidad,
      Direccion: direccion,
      Descripcion_Del_Lugar: descripcionLugar,
      Numero_Telefono: numeroTelefono,

      Credencial: nombreImagenesCredencial,
      UrlDocumentoCredencial: urlImagenCredencial,

      Comprobante_De_Domicilio: nombreImagenDomicilio,
      UrlDocumentoDomicilio: urlImagenDomicilio,

      Longitud: longitud,
      Latitud: latitud
    })
    .then(function(docRef){
      console.log("Document written with ID: ", docRef.id);
      mensaje.innerHTML=`Cliente Guardado`;
      mensaje.className="alert alert-success"
      document.getElementById('nombreCompleto').value="";
      document.getElementById('apellidoP').value="";
      document.getElementById('apellidoM').value="";
      document.getElementById('curp').value="";
      document.getElementById('edad').value="";
      document.getElementById('genero').value="";
      document.getElementById('correo').value="";
      document.getElementById('comudidad').value="";
      document.getElementById('direccion').value="";
      document.getElementById('descripcionLugar').value="";
      document.getElementById('numeroTelefono').value="";
      document.getElementById('latitud').value="";
      document.getElementById('longitud').value="";
    })
    .catch(function(error){
      console.error("Error adding document: ", error);
      mensaje.innerHTML=`Ocurrio un error durante el proceso.
      <br>
      Favor de verificar si el Cliente se guardo.`;
      mensaje.className="aler alert-danger"
    });
  }else{
    mensaje.innerHTML=`Los campos estan vacios`;
    mensaje.className="aler alert-danger"
  }

} catch (error) {
  mensaje.innerHTML=error
  alert('Campos vacios '+error)
}



  }

  //Mostrar datos en la tabla Clientes
  var tabla = document.getElementById('tablaClientes');

  db.collection("Clientes").onSnapshot((querySnapshot)=>{
    tabla.innerHTML=``;
    var conteo=0;
    querySnapshot.forEach((doc)=>{

      conteo=conteo+1

      tabla.innerHTML+=`
      <tr>
        <th scope="row">`+conteo+`</th>
        <th scope="row">`+doc.data().Nombre+`</th>
        <th scope="row">`+doc.data().Apellido_Paterno+`</th>
        <th scope="row">`+doc.data().Apellido_Materno+`</th>
        <th scope="row">`+doc.data().Curp+`</th>
        <th scope="row">`+doc.data().Edad+`</th>
        <th scope="row">`+doc.data().Genero+`</th>
        <th scope="row">`+doc.data().Correo+`</th>
        <th scope="row">`+doc.data().Comunidad+`</th>
        <th scope="row">`+doc.data().Direccion+`</th>
        <th scope="row">`+doc.data().Descripcion_Del_Lugar+`</th>
        <th scope="row">`+doc.data().Numero_Telefono+`</th>
        <th><button class="">Ver</button></th>
        <th><button>Ver</button></th>

        <td>
        <button class="btn btn-danger" onclick="eliminarClientes('${doc.id}')">Eliminar</button>
        </td>
        <td>
        <button class="btn btn-warning" onclick="EditarClientes('${doc.id}','${doc.data().Nombre}','${doc.data().Apellido_Paterno}','${doc.data().Apellido_Materno}','${doc.data().Curp}','${doc.data().Edad}','${doc.data().Genero}','${doc.data().Correo}','${doc.data().Comunidad}','${doc.data().Direccion}','${doc.data().Descripcion_Del_Lugar}','${doc.data().Numero_Telefono}')">Modificar</button>
        </td>
        <td>
        <button class="btn btn-info">Mostrar ubicación</button>
        </td>
      </tr>
      `
    });
  });//Termina para mostrar en la tabla

  //Eliminar clientes
  function eliminarClientes(id){
    var opcion = confirm("Desea eliminar al Cliente");
    if(opcion==true){
      db.collection("Clientes").doc(id).delete().then(function(){
        mensaje.innerHTML=`Cliente Eliminado`;
        mensaje.className="alert alert-success";
      }).catch(function(error){
        mensaje.innerHTML=`Error al eliminar el Cliente`;
        mensaje.className="alert alert-danger"
      })
    }else{
      nombre.focus();
    }
  }
//Termina eliminar clientes


  //Editar Clientes
function EditarClientes(Id,Nombre,Apellido_Paterno,Apellido_Materno,Curp,Edad,Genero,
                        Correo,Comunidad,Direccion,Descripcion_Del_Lugar,Numero_Telefono){

  document.getElementById('nombreCompleto').value=Nombre;
  document.getElementById('apellidoP').value=Apellido_Paterno;
  document.getElementById('apellidoM').value=Apellido_Materno;
  document.getElementById('curp').value=Curp;
  document.getElementById('edad').value=Edad;
  document.getElementById('genero').value=Genero;
  document.getElementById('correo').value=Correo;
  document.getElementById('comudidad').value=Comunidad;
  document.getElementById('direccion').value=Direccion;
  document.getElementById('descripcionLugar').value=Descripcion_Del_Lugar;
  document.getElementById('numeroTelefono').value=Numero_Telefono;

  var boton = document.getElementById('btnGuardarClientes');
  boton.innerHTML=`Editar`;
  boton.classList.add("alert-warning")

  boton.onclick=function(){
    var washingtonRef = db.collection("Clientes").doc(Id);
    //Capturamos los datos ya ctualizados

    var nombre = document.getElementById('nombreCompleto').value;
    var apellidoP = document.getElementById('apellidoP').value;
    var apellidoM = document.getElementById('apellidoM').value;
    var curp = document.getElementById('curp').value;
    var edad = document.getElementById('edad').value;
    var genero = document.getElementById('genero').value;
    var correo = document.getElementById('correo').value;
    var comunidad = document.getElementById('comudidad').value;
    var direccion = document.getElementById('direccion').value;
    var descripcionLugar = document.getElementById('descripcionLugar').value;
    var numeroTelefono = document.getElementById('numeroTelefono').value;

    
    var latitud = document.getElementById('latitud').value;
    var longitud = document.getElementById('longitud').value;

    return washingtonRef.update({
      Nombre: nombre,
      Apellido_Paterno: apellidoP,
      Apellido_Materno: apellidoM,
      Curp: curp,
      Edad: edad,
      Genero: genero,
      Correo: correo,
      Comunidad: comunidad,
      Direccion: direccion,
      Descripcion_Del_Lugar: descripcionLugar,
      Numero_Telefono: numeroTelefono,
      Longitud: longitud,
      Latitud: latitud
    })
    .then(function(){
      boton.classList.remove('btn-warning');
      boton.innerHTML=`REGISTRAR`;

      mensaje.innerHTML=`Cliente Modificado`;
      mensaje.className="alert alert-success";

      document.getElementById('nombreCompleto').value="";
      document.getElementById('apellidoP').value="";
      document.getElementById('apellidoM').value="";
      document.getElementById('curp').value="";
      document.getElementById('edad').value="";
      document.getElementById('genero').value="";
      document.getElementById('correo').value="";
      document.getElementById('comudidad').value="";
      document.getElementById('direccion').value="";
      document.getElementById('descripcionLugar').value="";
      document.getElementById('numeroTelefono').value="";
      document.getElementById('latitud').value="";
      document.getElementById('longitud').value="";
    })
    .catch(function(error){
      mensaje.innerHTML=`Algo salio mal.
      <br>
      Favor de verificar si el cliente ha sido modificado.`
      console.log(error)
    })

  }

}
  //Terminia para Editar Clientes

