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

  function validarInicio(){
    var emailSesion = document.getElementById('emailSesion').value;
    var passwordSesion = document.getElementById('passwordSesion').value;

    db.collection("Cobradores").onSnapshot((querySnapshot) =>{
      querySnapshot.forEach((doc)=>{

        if ((doc.data().Correo)==emailSesion){
          alert("Email encontrado")
        }

      });
  });

  }