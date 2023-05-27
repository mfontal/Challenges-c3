const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { loginUsuario, crearUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos }= require("../middlewares/validarCampos")

router.post('/', 
[
    check("email", "El correo es obligatorio").not().isEmpty(),
    check("password").isLength({min: 6}),
    validarCampos
],
loginUsuario);

// Challenge 17
router.post('/new', 
[
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password").isLength({min: 6}),
    validarCampos
], 
crearUsuario);

router.get('/renew', revalidarToken);

module.exports = router;