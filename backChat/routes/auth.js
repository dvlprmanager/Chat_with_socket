const express = require("express");

const router = express.Router();
const { check } = require("express-validator");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  saveMessage,
  allMessages,
} = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require('../middlewares/validar-jwt')

router.post(
  "/new",
  [
    // middlewares
    check("firstName", "El Nombre es Obligatorio").not().isEmpty(),
    check("email", "El Email es Obligatorio").isEmail(),
    check("password", "El Password debe de ser 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/login",
  [
    // middlewares
    check("email", "El Email es Obligatorio").isEmail(),
    check("password", "El Password debe de ser 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.post(
  "/saveMessage",
  [
    check("uid", "el uid es requerido").not().isEmpty(),
    check("message", "el mensaje es requerido").not().isEmpty(),
    check("nameUser", "el nombre es requerido ").not().isEmpty(),
    validarCampos,
  ],
  saveMessage

)

router.get("/renew", validarJWT,  revalidarToken);
router.get("/allMessages", allMessages );

module.exports = router;
