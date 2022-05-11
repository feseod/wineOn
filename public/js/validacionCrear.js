window.addEventListener("load", function () {
    let form = document.querySelector("form")
    form.addEventListener("click", function (e) {
        let campoNombre = document.querySelector("#name")
        let campoDescripcion = document.querySelector("#description")
        console.log(campoDescripcion);
        if (campoNombre.value == "") {
            e.preventDefault()
            document.getElementById("error-name").innerText = "Tenes que ingresar un nombre"
        } else if (campoNombre.value.length < 5) {
            e.preventDefault()
            document.getElementById("error-name").innerText = "Deberá tener al menos 5 caracteres."
        }
        if (campoDescripcion.value < 20) {
            e.preventDefault()
            document.getElementById("error-description").innerText = "Debe de tener al menos 20 caracteres"
        }
    })
})