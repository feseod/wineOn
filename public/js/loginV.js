window.addEventListener("load", function () {
    let form = document.querySelector("form#reservation")
    form.addEventListener("submit", function (e) {
        
        let campoEmail =  document.getElementById("usuario")
        let campoPassword =  document.getElementById("password")
       
        if (campoEmail.value == "")  {
            e.preventDefault()
            document.getElementById("error-email").innerText = "Tenes que ingresar un email"
        } else if (campoEmail.value != ""){
            document.getElementById("error-email").innerText = ""
        }
        if (campoPassword.value == ""){
            e.preventDefault()
            document.getElementById("error-pass").innerText = "Tenes que ingresar una contraseña"
        } else if (campoPassword.value != ""){
            document.getElementById("error-pass").innerText = ""
        }
        
    })
})