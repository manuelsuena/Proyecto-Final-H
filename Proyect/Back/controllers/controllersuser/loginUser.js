require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { loginSchema } = require('../../validations/uservalidations');

async function loginUser(req, res, next) {
  let connection;
  try {
    const { email, contrasena } = req.body;
    await loginSchema.validateAsync(req.body);

    connection = await getConnection();

    const [
      dbUser
    ] = await connection.query(
      'select id_usuario, email, contrasena, role from usuario where email=? and activo=1',
      [email]
    );

    if (!dbUser.length) {
      throw generateError(
        'No hay ningún usuario activo con ese email. Valida usuario o registrate.',
        404
      );
    }

    const [usuario] = dbUser;

    const passwordMatch = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!passwordMatch) {
      throw generateError('La contraseña es incorrecta', 401);
    }

    const tokenPayload = { id: usuario.id_usuario, role: usuario.role };
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
      expiresIn: '30d'
    });

    res.send({
      status: 'ok',
      message: 'Login Correcto. Bienvenido!',
      data: token
    });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { loginUser };