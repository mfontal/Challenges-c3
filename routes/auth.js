const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { loginUsuario, crearUsuario, revalidarToken } = require('../controllers/Users');
const { validarCampos }= require("../middlewares/validarCampos")
const { validarJWT }= require("../middlewares/validar-token")


router.post('/', 
[
    check("email", "El correo es obligatorio").not().isEmpty(),
    check("password").isLength({min: 6}),
    validarCampos
],
loginUsuario);

router.post(
   '/new', 
[
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "la clave minima es de almenos 6 digitos").isLength({min: 6}),
    validarCampos
], 
crearUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;