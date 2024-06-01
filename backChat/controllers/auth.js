const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/UsuarioModel");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario existe con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    // Encriptar contrase;a
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      Creado: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con su administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El Usuario no existe con ese email",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password incorrecto",
      });
    }

    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.firstName +" "+usuario.lastName,
      token
    });


  } catch {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con su administrador",
    });
  }

  
};

const revalidarToken = async(req, res = response) => {

  const uid = req.uid;
  const name = req.name;

  const token = await generarJWT(uid,name);

  res.json({
    login: true,
    token
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
