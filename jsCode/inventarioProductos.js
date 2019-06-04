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

///////****/////////// Guardar Producto ///////****///////////
function guardar_Productos(){
    var nombre_Producto = document.getElementById('nombre_Producto').value;
    var descripcion_Producto = document.getElementById('descripcion_Producto').value;
    var color = document.getElementById('color').value;
    var fecha_Registro = document.getElementById('fecha_Registro').value;
    var cantidad_Producto = document.getElementById('cantidad_Producto').value;
    var tipo_Producto = document.getElementById('tipo_Producto').value;
    var precio_Venta = document.getElementById('precio_Venta').value;
    var precio_Compra = document.getElementById('precio_Compra').value;

        db.collection("Productos").add({
            Nombre_Del_Producto: nombre_Producto,
            Descripcion_Del_Producto: descripcion_Producto,
            Color_Producto: color,
            Fecha_Registro: fecha_Registro,
            Cantidad_Del_Producto: cantidad_Producto,
            Tipo_Producto: tipo_Producto,
            Precio_Venta_Producto: precio_Venta,
            Precio_Compra_Producto: precio_Compra
        })
        .then(function(docRef){
            document.getElementById('nombre_Producto').value="";
            document.getElementById('descripcion_Producto').value="";
            document.getElementById('color').value="";
            document.getElementById('fecha_Registro').value="";
            document.getElementById('cantidad_Producto').value="";
            document.getElementById('tipo_Producto').selected=1;
            document.getElementById('precio_Venta').value="";
            document.getElementById('precio_Compra').value="";
        })
        .catch(function(error){

        });
}
///////****/////////// Termina Guardar Producto ///////****///////////

///////****/////////// Editar Producto ///////****///////////

///////**__**/////////// Termina Editar Producto ///////**__**///////////

