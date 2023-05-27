const express = require("express");
const router = express.Router();
const { validarJWT } = require("../middlewares/validar-token.js");
const { listarTask, crearTask, actualizarTask, borrarTask } = require("../Controllers/Task");

router.use(validarJWT);

router.get("/", listarTask);
router.post("/", crearTask);


router.post("/update", actualizarTask)
router.post("/delete", borrarTask)


module.exports = router;
