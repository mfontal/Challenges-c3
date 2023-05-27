express = require('express');
const { validationResult } = require('express-validator');

const crearUsuario = (req, res = express.response) => {
    const {name, email, password}= req.body

    res.status(200).json({
        ok: true,
        name: name, 
        email: email, 
        password: password
    });
};

// Challenge 17
const loginUsuario = (req, res = express.response) => {
    const {email, password}= req.body
    
    res.status(200).json({
        ok: true,
        email,
        password,
    })
}

const revalidarToken = (req, res = express.response) => {
    res.json({
        ok: true
    })
}

module.exports = {
    loginUsuario,
    crearUsuario,
    revalidarToken
}