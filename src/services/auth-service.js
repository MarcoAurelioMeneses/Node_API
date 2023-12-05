'use strict'
const jwt = require('jasonwebtoken');


//Criação do token junto com a incriptação do SALT_KEY com um dia de expiração
exports.generateToken = async(data) => {
    return jwt.sing(data, global.SALT_KEY, {expiresIn: '1d'});
}
//receber token pelo var data e verificar se o incriptado está corredo
exports.decodeToken = async (token) => {
    var data = await jwt.verify(token, global.SALT_KEY);
    return data;
}
//Busca o token, se não achou retorna o 401. Se não, faz a validação do token,
// caso consiga o acesso é liberado, caso não consigo, retorna o 401.
exports.authorize = function(req, res, next){
    var token = req.body.token || req.qury.token || req.headers['x-acces-token'];

    if(!token){
        res.status(401).json({
            message: 'Acesso restrito'
        });
    }else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token Inválido'
                });
            }else{
                next();
            }
        })
    }
}

exports.isAdmin = function (req, res, next){
    var token = req.body.token || req.qury.token || req.headers['x-acces-token'];

    if(!token){
        res.status(401).json({
            message: 'Token inválido'
        });
    }else {
        jwt.verify(token, global.SALT_KEY, function(error, decoded){
            if(error){
                res.status(401).json({
                    message: 'Token Inválido'
                });
            }else{
                if(decoded.roules.includes('admin')){
                    next();
                }else{
                    res.status(403).json({
                        message: 'Esta funcionalidade é restrita para administradores'
                    })
                }
            }
        })
    }
}