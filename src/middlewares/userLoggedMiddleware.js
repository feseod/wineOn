const fs = require('fs');
const path = require('path'); 

const usersFilePath = path.join(__dirname, '../data/users.json'); 
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8', null, " "));

function userLoggedMiddleware(req, res, next){
    res.locals.estaLogueado = false;
    
    let emailInCookie = req.cookies.emailUsuario;
    let usuarioDeCookie = users.find(usuario => usuario["email"] === emailInCookie);
    
   
    
    if(usuarioDeCookie){
        req.session.usuarioLogueado = usuarioDeCookie
    }
    
    if(req.session.usuarioLogueado){
        res.locals.estaLogueado = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado;
    }

    
     
    next();
}

module.exports = userLoggedMiddleware;