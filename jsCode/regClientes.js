firebase.initializeApp({
    apiKey: "AIzaSyDZQPI_DkvJYAZP6ySwU4x0v34RoUXUyu0",
    authDomain: "prestacasa-1758e.firebaseapp.com",
    databaseURL: "https://prestacasa-1758e.firebaseio.com",
    projectId: "prestacasa-1758e",
    storageBucket: "prestacasa-1758e.appspot.com",
    messagingSenderId: "315948810598"
  });
  
  // Initialize Cloud Firestore through Firebase
  var db = firebase.firestore();

  //Crear Documentos
  function guardarC(){
      var nombre = document.getElementById('nombre').value;
      var apellidoP = document.getElementById('apellidoP').value;
      var apellidoM = document.getElementById('apellidoM').value;
      var edad = document.getElementById('edad').value;
      var telefono = document.getElementById('telefono').value;
      var direccion = document.getElementById('direccion').value;
      var sexo = document.getElementById('sexo').value;

    if(
        document.getElementById('nombre').value == '' ||
        document.getElementById('apellidoP').value == '' ||
        document.getElementById('apellidoM').value == '' ||
        document.getElementById('edad').value == '' ||
        document.getElementById('telefono').value == '' ||
        document.getElementById('direccion').value == ''
    ){
        alert("Porfavor llene los campos faltantes para continuar");
    }else{
        db.collection("Clientes").add({
            Nombre: nombre,
            ApellidoP: apellidoP,
            ApellidoM: apellidoM,
            Edad:edad,
            Telefono:telefono,
            Direccion:direccion,
            Sexo:sexo,
        })
        .then(function(docRef) {
            alert("El Cliente ha sido registrado");
            document.getElementById('nombre').value = '';
            document.getElementById('apellidoP').value = '';
            document.getElementById('apellidoM').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('telefono').value = '';
            document.getElementById('direccion').value = '';
            
    
    
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

    }

    

  }