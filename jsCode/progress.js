function subirProgress(){
var progressPrueba = document.getElementById('progressPrueba');
var pro =50;
progressPrueba.innerHTML=`50%`;
progressPrueba.style.width="50%";


}

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var autoId = '';
for (var i = 0; i < 20; i++) {
    autoId += chars.charAt(Math.floor(Math.random() * chars.length));
}