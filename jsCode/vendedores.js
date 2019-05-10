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

  function guardarVendedores(){
      var nombre = document.getElementById('nombreCompleto').value;
      var apellidoP = document.getElementById('apellidoP').value;
      var apellidoM = document.getElementById('apellidoM').value;
      var curp = document.getElementById('curp').value;
      var usuario = document.getElementById('usuario').value;
      var contrasena = document.getElementById('contrasena').value;
      var contrasenaVerificar = document.getElementById('confiContrasena').value;
      var edad = document.getElementById('edad').value;
      var numeroTelefono = document.getElementById('numeroTelefono').value;
      var correo = document.getElementById('correo').value;
      var genero = document.getElementById('genero').value;

      var mensaje = document.getElementById('mensajeConfi');
      
      if (contrasena==contrasenaVerificar)
      {
          db.collection("Vendedores").add({
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
            mensaje.innerHTML=`Vendedor guardado`;
            mensaje.className="alert alert-success"
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
          mensaje.innerHTML=`No se puede guardar el Usuario`;
          mensaje.className="alert alert-danger"
        });
      }
      else
      {
        mensaje.innerHTML=`Las contraseñas no coinciden, Favor de verificarlas`;
        mensaje.className="alert alert-info"
      }

  }


  
      
//Mostrar datos en la tabla Vendedores
  var tabla = document.getElementById('tablaVendedores');
  
  db.collection("Vendedores").onSnapshot((querySnapshot) => {
    tabla.innerHTML=''; 
    var conteo=0;
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

      <td><button class="btn btn-danger" onclick="eliminarVendedores('${doc.id}')">Eliminar</button></td>
      <td><button class="btn btn-warning">Modificar</button></td>

      </tr>
      `
    });
  });

  //Eliminar Vendedores
  function eliminarVendedores(id){
    var opcion = confirm("Desea eliminar el Vendedor");
      if(opcion==true){
        db.collection("Vendedores").doc(id).delete().then(function(){
          alert("Vendedor Eliminado");
        }).catch(function(error){
          alert("Error al eliminar el Vendedor",error)
        })
      }else{
        nombre.focus();
      }
  }