const express = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/UsuariosScheme.js");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = express.response) => {
   const { name, email, password } = req.body;
   try {
      let usuario = await Usuario.findOne({ email: email });
      if (usuario) {
         return res.status(400).json({
            ok: false,
            msg: "El ususario con el correo ya existe",
         });
      }

      usuario = new Usuario(req.body);
      const salt = bcrypt.genSaltSync();
      usuario.password = bcrypt.hashSync(password, salt);
      await usuario.save();

      res.status(200).json({
         ok: true,
         usuario,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         error,
         error2: "error en controlador crearUsuario",
      });
   }
};

const loginUsuario = async (req, res = express.response) => {
   const { email, password } = req.body;

   try {
      let usuario = await Usuario.findOne({ email: email });
      if (!usuario) {
         return res.status(400).json({
            ok: false,
            msg: "El usuario NO existe",
         });
      }

      const passwordValid = bcrypt.compareSync(password, usuario.password);
      if (!passwordValid) {
         return res.status(400).json({
            ok: false,
            msg: "El password No es valido",
         });
      }

      const token = await generarJWT(usuario.id, usuario.name);

      res.status(200).json({
         ok: true,
         usuario,
         token,
      });
   } catch (error) {
      console.log(error);
      res.status(500).json({
         ok: false,
         error,
         error2: "error en controlador LoginUsuario",
      });
   }
};

const revalidarToken = async(req, res = express.response) => {
   const {uid, name}=req

   const token = await(generarJWT(uid, name))
   res.json({
      ok: true,
      token
   });
};

const listarUsuarios = async (req, res = express.request) => {
   const usuarios = await Usuario.find().populate("tareas", "title");

   try {
      return res.status(200).json({
         ok: true,
         usuarios,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         ok: false,
         task: "internal Error",
      });
   }
};

module.exports = {
   crearUsuario,
   loginUsuario,
   revalidarToken,
   listarUsuarios
};

