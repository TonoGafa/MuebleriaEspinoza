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

  //Guardar clientes
  function guardarCliente(){
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
  }