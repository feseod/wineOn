window.addEventListener("load",function (){
  if (typeof localStorage.carrito == "undefined" || typeof localStorage.carrito == "[]") {
      let div = document.getElementById("vacio");
      div.innerHTML += "<h2> No hay productos agregados </h2>";
  } else {
      let carrito = JSON.parse(localStorage.carrito);
      for (let i = 0; i < carrito.length; i++) {
          let vacio = document.querySelector("#vacio")
          let producto = carrito[i];
          let htmlcarrito =`  <article class="article-main"> 
                  <div id="main">
                      <img src=${producto.imagen} alt="" width="50" height="50" class="imagen"/>
                      <div>${producto.tituloProducto}</div>
                  </div>
                  <div class="sub-main">
                      <div>PRECIO</div>
                      <div>CANTIDAD</div>
                      <div>DESCUENTO</div>
                  </div>
                  <div class="detalles">
                      <div>$${producto.precioTotal}</div>
                      <div class="cantidades">
                          <div>${producto.cantidad}</div>
                      </div>
                      <div class="subtotal-price">%${producto.descuento}</div>
                  </div>
                  
                  <div class="linea">
                  </div>
              </article>`;
          vacio.innerHTML += htmlcarrito
  }}

  console.log(localStorage.subTotalCarrito, localStorage.totalCarrito);

  let total = document.querySelector("#total")
  let subTotalCarrito = localStorage.subTotalCarrito
  if(typeof localStorage.subTotalCarrito == 'undefined'){
    let contenido2 = `0`
    total.innerHTML += contenido2
  } else {
    let contenido2 = `$${subTotalCarrito}`
    total.innerHTML += contenido2
  }

  let cantidad = document.querySelector("#precio-subtotal")
  let totalCarrito = localStorage.totalCarrito
  if(typeof localStorage.totalCarrito == 'undefined'){
    let contenido2 = `0`
    cantidad.innerHTML += contenido2
  } else {
    let contenido2 = `$${totalCarrito}`
    cantidad.innerHTML += contenido2
  }

});

  /*function borrarItem(id) {
      let carrito = JSON.parse(localStorage.carrito);
      carrito = carrito.filter((producto, i) => {
      return i !== id;
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  location.reload();
}*/

  let botonBorrar = document.querySelector("#borrarTodo");
  botonBorrar.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.clear();
      alert('has vaciado el carrito');
      location.reload();
})

