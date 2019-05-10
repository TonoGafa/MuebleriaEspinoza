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

  function guardarCobradores(){
      var nombre = document.getElementById('nombreCompleto').value;
      var apellidoP = document.getElementById('apellidoP').value;
      var apellidoM = document.getElementById('apellidoM').value;
      var curp = document.getElementById('curp').value;
      var usuario = document.getElementById('usuario').value;
      var contrasena = document.getElementById('contrasena').value;
      var contrasenaVerificar=document.getElementById('confiContrasena').value;
      var edad = document.getElementById('edad').value;
      var numeroTelefono = document.getElementById('numeroTelefono').value;
      var correo = document.getElementById('correo').value;
      var genero = document.getElementById('genero').value;
      
      if (contrasena == contrasenaVerificar) {
        db.collection("Cobradores").add({
          Curp:curp,
          Nombre: nombre,
          Apellido_Paterno: apellidoP,
          Apellido_Materno: apellidoM,
          Usuario: usuario,
          Contrasena: contrasena,
          Edad: edad,
          Numero_De_Telefono: numeroTelefono,
          Correo:correo,
          Genero: genero
      })
      .then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('mensajeConfi').innerHTML=`Cobrador guardado`;
        document.getElementById('mensajeConfi').className="alert alert-success";        
          document.getElementById('nombreCompleto').value='';
          document.getElementById('apellidoP').value='';
          document.getElementById('apellidoM').value='';
          document.getElementById('curp').value='';
          document.getElementById('usuario').value='';
          document.getElementById('contrasena').value='';
          document.getElementById('confiContrasena').value='';
          document.getElementById('edad').value='';
          document.getElementById('numeroTelefono').value='';
          document.getElementById('correo').value='';
      })
      .catch(function(error){
        console.error("Error adding document: ", error);
      });
      }
      
      else{
      document.getElementById('mensajeConfi').innerHTML=`Las contraseñas del usuario no son iguales`;
      document.getElementById('mensajeConfi').className="alert alert-danger" 
      }


  }


  
      
//Mostrar datos a la tabla
  var tabla = document.getElementById('tablaCobradores');
  var conteo=0;
  db.collection("Cobradores").onSnapshot((querySnapshot) => {
    tabla.innerHTML=''; 

    querySnapshot.forEach((doc) => {
      conteo=conteo+1;
      console.log(`${doc.id} => ${doc.data()}`);

      tabla.innerHTML+= `
      <tr>
      <th scope="row">`+conteo+`</th>
      <th scope="row">`+doc.data().Curp+`</th>
      <th scope="row">`+doc.data().Nombre+`</th>
      <th scope="row">`+doc.data().Apellido_Paterno+`</th>
      <th scope="row">`+doc.data().Apellido_Materno+`</th>
      <th scope="row">`+doc.data().Usuario+`</th>
      <th scope="row">`+doc.data().Edad+`</th>
      <th scope="row">`+doc.data().Numero_De_Telefono+`</th>
      <th scope="row">`+doc.data().Correo+`</th>
      <th scope="row">`+doc.data().Genero+`</th>
      
      <td><button class="btn btn-danger" onclick="eliminarCobrador('${doc.id}')">Eliminar</button></td>
      <td><button class="btn btn-warning">Modificar</button></td>
      </tr>
      `
    });

  });

  //Eliminar Cobrador
  function eliminarCobrador(id){
    var opcion = confirm("Desea eliminar el Cobrador");
      if(opcion==true){
        db.collection("Cobradores").doc(id).delete().then(function(){
          alert("Cobrador Eliminado");
        }).catch(function(error){
          alert("Error al eliminar el Cobrador",error)
        })
      }else{
        nombre.focus();
      }
  }

  //Editar documentos

function Editar(Id,nombre,apellido,fecha){

  document.getElementById('nombre').value=nombre;
  document.getElementById('apellido').value=apellido;
  document.getElementById('fecha').value=fecha;

  var boton = document.getElementById('botonGM');
  boton.innerHTML='Editar';
  boton.classList.add('btn-warning');

  boton.onclick=function(){

      var washingtonRef = db.collection("users").doc(Id);

      // Set the "capital" field of the city 'DC'

      var nombre = document.getElementById('nombre').value;
      var apellido = document.getElementById('apellido').value;
      var fechar = document.getElementById('fecha').value;

      return washingtonRef.update({
        Curp:curp,
        Nombre: nombre,
        Apellido_Paterno: apellidoP,
        Apellido_Materno: apellidoM,
        Usuario: usuario,
        Edad: edad,
        Numero_De_Telefono: numeroTelefono,
        Correo:correo,
        Genero: genero
      })
      .then(function() {
          boton.classList.add('btn-info');
          boton.classList.remove('btn-warning');
          boton.innerHTML='Guardar';
          document.getElementById('nombre').value='';
          document.getElementById('apellido').value='';
          document.getElementById('fecha').value='';

          console.log("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
  }


}