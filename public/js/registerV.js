window.addEventListener("load", function () {
    let form = document.querySelector("form.reservation")
    form.addEventListener("submit", function(e){
        let campoNombre = document.getElementById("name")
        let campoApellido = document.getElementById("lastName")
        let campoEmail = document.getElementById("email")
        let campoNacimiento = document.getElementById("nacimiento")
        let campoDomicilio = document.getElementById("domicilio")
        let campoDNI = document.getElementById("dni")
        let campoPassword = document.getElementById("password")
        let campoRePassword = document.getElementById("repassword")
       
        if (campoNombre.value == "") {
           e.preventDefault()
           document.getElementById("error-name").innerText = "Tenes que ingresar un nombre"
        }
       
        if (campoApellido.value == "") {
        e.preventDefault()
        document.getElementById("error-lastname").innerText = "Tenes que ingresar un apellido"
        }
        
        if (campoEmail.value == "")  {
            e.preventDefault()
            document.getElementById("error-email").innerText = "Tenes que ingresar un email"
        } else if (campoEmail.value != ""){
            document.getElementById("error-email").innerText = ""
        } 
        
        let d = campoNacimiento.value;
        let inDate = new Date(d);
        let anio = inDate.getFullYear();
        let fec_actual = new Date() ; 
        let fec_anio = fec_actual.getFullYear() ;
        let edad   =  fec_anio - anio ;
        console.log(edad);
        if (edad < 18) {
            e.preventDefault()
            document.getElementById("error-date").innerHTML = "debés ser mayor de 18 años para registrarte";
        } else if(campoNacimiento.value == "")  {
            e.preventDefault()
            document.getElementById("error-date").innerText = "Tenes que ingresar tu fecha de nacimiento"
        }else{
            document.getElementById("error-date").innerHTML = "";
        } 
           
        
        if (campoDomicilio.value == "")  {
            e.preventDefault()
            document.getElementById("error-dom").innerText = "Tenes que ingresar un domicilio"
        } else if (campoDomicilio.value != ""){
            document.getElementById("error-dom").innerText = ""
        } 
        
        if (campoDNI.value == "")  {
            e.preventDefault()
            document.getElementById("error-dni").innerText = "Tenes que ingresar un DNI"
        } else if (campoDNI.value != ""){
            document.getElementById("error-dni").innerText = ""
        }
        
        if (campoPassword.value == ""){
            e.preventDefault()
            document.getElementById("error-pass").innerText = "Tenes que ingresar una contraseña"
        } else if (campoPassword.value != ""){
            document.getElementById("error-pass").innerText = ""
        }
        
        if (campoRePassword.value == ""){
        e.preventDefault()
            document.getElementById("error-repass").innerText = "Tenes que repetir la contraseña"
        } else if (campoPassword.value !== campoRePassword.value){
            document.getElementById("error-repass").innerText = "Las contraseñas deben coincidir"
        } else if (campoPassword.value != ""){
            document.getElementById("error-repass").innerText = ""
        }
    })
})
