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
      <td><button class="btn btn-warning" onclick="EditarCobradores('${doc.id}','${doc.data().Nombre}','${doc.data().Apellido_Paterno}','${doc.data().Apellido_Materno}','${doc.data().Curp}','${doc.data().Usuario}','${doc.data().Edad}','${doc.data().Numero_De_Telefono}','${doc.data().Correo}','${doc.data().Genero}')">Modificar</button></td>
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

  //Editar Cobradores

function EditarCobradores(Id,nombre,apellidoP,apellidoM,curp,usuario,edad,numeroTelefono,correo,genero){

  document.getElementById('nombreCompleto').value = nombre;
  document.getElementById('apellidoP').value = apellidoP;
  document.getElementById('apellidoM').value = apellidoM;
  document.getElementById('curp').value = curp;
  document.getElementById('usuario').value = usuario;
  var contrasena = document.getElementById('contrasena');
  var contrasenaVerificar = document.getElementById('confiContrasena');
  document.getElementById('edad').value = edad;
  document.getElementById('numeroTelefono').value = numeroTelefono;
  document.getElementById('correo').value = correo;
  document.getElementById('genero').value = genero;
  
  contrasena.innerHTML=`************`;
  contrasenaVerificar.innerHTML=`************`;
  contrasena.disabled=true;
  contrasenaVerificar.disabled=true;

  var boton = document.getElementById('btnGuardarCobradores');
  boton.innerHTML='Editar';
  boton.classList.add('btn-warning');

  boton.onclick=function(){

      var washingtonRef = db.collection("Cobradores").doc(Id);
      // Se manda los datos ya actualizados
      var nombre = document.getElementById('nombreCompleto').value;
      var apellidoP = document.getElementById('apellidoP').value;
      var apellidoM = document.getElementById('apellidoM').value;
      var curp = document.getElementById('curp').value;
      var usuario = document.getElementById('usuario').value;
      var edad = document.getElementById('edad').value;
      var numeroTelefono = document.getElementById('numeroTelefono').value;
      var correo = document.getElementById('correo').value;
      var genero = document.getElementById('genero').value;

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
          document.getElementById('mensajeConfi').innerHTML=`Cobrador Modificado`;
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
      .catch(function(error) {
        document.getElementById('mensajeConfi').innerHTML=`Error al Modificar`;
        document.getElementById('mensajeConfi').className="alert alert-warning";        
      });
  }


}