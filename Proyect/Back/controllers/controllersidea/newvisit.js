require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function visitNew(req, res, next) {
  let connection;
  try {
    connection = await getConnection();
    const {id} = req.params;
    const {userid} = req.auth.id;

    const [
      result
    ] = await connection.query(
      `SELECT id_usuario FROM usuario WHERE activo=1 AND id_usuario=?`,
      [userid]
    );

    if (result.length) {
      throw generateError(
        'Un usuario oculto no puede ver idea',
        401
      );
    }

    const [vista] = await connection.query(
      `SELECT id_idea FROM idea WHERE id_idea=?`,
      [id]
    );

    if (!vista.length) {
      throw (
        (generateError(`La idea no existe`), 404)
      );
    }

    await connection.query('UPDATE idea SET visita=? WHERE id_idea=?', [
      vista[0].visita + 1,
      [id]
    ]);

    res.send({ status: 'ok', data: vista[0] });
  } catch (error) {
    next(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
module.exports = { visitNew };