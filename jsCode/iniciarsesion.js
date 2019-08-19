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

  function validarInicio(){
    var emailSesion = document.getElementById('emailSesion').value;
    var passwordSesion = document.getElementById('passwordSesion').value;

    try{
        var existeCobrador = 0

        db.collection("Cobradoreee").get().then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.Correo, " => ", doc.data());
            if ((doc.data().Correo)==emailSesion ){
              existeCobrador=existeCobrador+1;
            }else
            {
              existeCobrador=2
            }
    
          });
          if  (existeCobrador>=1){
            alert("Existe Cobrador")
          }else{
            alert("No existe cobrador")
          }
      });
  
    }catch{
      alert("Error al iniciar sesion")
    }

  }