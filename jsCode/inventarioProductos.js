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

  var mensajeResultados = document.getElementById('mensajeResultados');

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
            console.log("Document written with ID: ", docRef.id);
            mensajeResultados.innerHTML='Producto Guardado';
            mensajeResultados.className='alert alert-success';

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
            console.log("Error ", error);
            mensajeResultados.innerHTML='Eror al guardar el Producto';
            mensajeResultados.className='btn btn-danger';
        });
}///////****/////////// Termina Guardar Producto ///////****///////////


///////**__**/////////// Mostrar Productos Existentes ///////**__**///////////
var tabla = document.getElementById('tablaInventario');
  
db.collection("Productos").onSnapshot((querySnapshot) => {
  tabla.innerHTML=''; 
  var conteo=0;
  querySnapshot.forEach((doc) => {
    conteo=conteo+1;
    console.log(`${doc.id} => ${doc.data()}`);

    tabla.innerHTML+= `
    <tr>
    <th scope="row">`+conteo+`</th>
    <th scope="row">`+doc.data().Nombre_Del_Producto+`</th>
    <th scope="row">`+doc.data().Descripcion_Del_Producto+`</th>
    <th scope="row">`+doc.data().Cantidad_Del_Producto+`</th>
    <th scope="row">`+doc.data().Tipo_Producto+`</th>
    <th scope="row">`+doc.data().Precio_Venta_Producto+`</th>
    <th scope="row">`+doc.data().Precio_Compra_Producto+`</th>

    <td><button class="btn btn-danger" onclick="eliminarProducto('${doc.id}')">Eliminar</button></td>
    <td><button class="btn btn-warning" onclick="EditarCobradores('${doc.id}','${doc.data().Nombre}','${doc.data().Apellido_Paterno}','${doc.data().Apellido_Materno}','${doc.data().Curp}','${doc.data().Usuario}','${doc.data().Edad}','${doc.data().Numero_De_Telefono}','${doc.data().Correo}','${doc.data().Genero}')">Modificar</button></td>
    </tr>
    `
  });
}); ///////**__**/////////// Termina mostrar Productos Existentes ///////**__**///////////


///////****/////////// Editar Producto ///////****///////////
function EditarCobradores(Id,NombreDelProducto,DescripcionDelProducto,color,fechaRegistro,
                        CantidadDelProducto,TipoProducto,PrecioVentaProducto,PrecioCompraProducto){

    document.getElementById('nombre_Producto').value=NombreDelProducto;
    document.getElementById('descripcion_Producto').value=DescripcionDelProducto;
    document.getElementById('color').value=color;
    document.getElementById('fecha_Registro').value=fechaRegistro;
    document.getElementById('cantidad_Producto').value=CantidadDelProducto;
    document.getElementById('tipo_Producto').value=TipoProducto;
    document.getElementById('precio_Venta').value=PrecioVentaProducto;
    document.getElementById('precio_Compra').value=PrecioCompraProducto;
  
    var boton = document.getElementById('btnInventario');
    boton.innerHTML='Editar';
    boton.classList.add('btn-warning');
  
    boton.onclick=function(){
  
        var washingtonRef = db.collection("Productos").doc(Id);
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
            document.getElementById('mensajeConfi').innerHTML=`Producto Modificado`;
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
  
  
  }///////**__**/////////// Termina Editar Producto ///////**__**///////////


///__////**__**/////////// Eliminar Producto ///__////**__**///////////
function eliminarProducto(id){
    var opcion = confirm("Desea eliminar el Producto");
    if(opcion==true){
        db.collection("Productos").doc(id).delete().then(function(){
        alert("Producto Eliminado");
        }).catch(function(error){
        alert("Error al eliminar el Producto: ",error)
        })
    }else{
        
    }
}///__////**__**/////////// Termina Eliminar Producto ///__////**__**///////////