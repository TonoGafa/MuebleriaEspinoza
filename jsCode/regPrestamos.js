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





  
//Leer clientes
    db.collection("Usuarios").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            
            
            document.getElementById('clientes').innerHTML += `
            <option value="${doc.data().Nombre + ' ' + doc.data().Apellido }">
            ${doc.data().Nombre + ' ' + doc.data().Apellido}</option>
            `
        });
    });


function interes(){
    var interes = 0;
    var cantidad = document.getElementById('cantidad').value;
    
    interes = (cantidad*0.05)/4;

    document.getElementById('interes').value = interes;

}

function pago(){
   
    var cantidad = document.getElementById('cantidad').value;
    var semanas = document.getElementById('semanas').value;
    var interes = document.getElementById('interes').value;

    var pago = cantidad/semanas;

    var total = parseInt(pago) + parseInt(interes);

    document.getElementById('pSemanal').value = total;

    var pTotal = (parseInt(semanas)* parseInt(interes)) + parseInt(cantidad);

    document.getElementById('pTotal').value = pTotal;
}
    


//Crear Documentos
  function guardarP(){
      var cliente = document.getElementById('clientes').value;
      var cantidad = document.getElementById('cantidad').value;
      var fecha = document.getElementById('fecha').value;
      var fpPago = document.getElementById('fpPago').value;
      var semanas = document.getElementById('semanas').value;
      var interes = document.getElementById('interes').value;
      var pSemanal = document.getElementById('pSemanal').value;
      var pTotal = document.getElementById('pTotal').value;

    db.collection("Prestamos").add({
        Cliente: cliente,
        Cantidad: cantidad,
        Fecha: fecha,
        FechaPrimerPago: fpPago,
        Semanas:semanas,
        Interes:interes,
        PagoSemanal:pSemanal,
        PagoTotal:pTotal,

    })
    .then(function(docRef) {
        alert("El Prestamo ha sido registrado");
        document.getElementById('clientes').value = '';
        document.getElementById('cantidad').value = '';
        document.getElementById('fecha').value = '';
        document.getElementById('fpPago').value = '';
        document.getElementById('semanas').value = '';
        document.getElementById('interes').value = '';
        document.getElementById('pSemanal').value = '';
        document.getElementById('pTotal').value = '';
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
  }

