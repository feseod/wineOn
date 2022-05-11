window.addEventListener("load",function() {
    let menu = document.querySelector("nav.menu")
    let burger = document.querySelector(".burger i");

    burger.addEventListener("click", function(e){
        menu.classList.toggle("menu-active")
    });

    this.document.addEventListener("click", (e)=>{
        if(!e.target.matches("nav a"))return false;

            menu.classList.remove("menu-active")
    } )
});