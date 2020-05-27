require('dotenv').config();
const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');

async function getIdea (req, res, next) {
    try {
      const { id } = req.params;
  
      const connection = await getConnection();

      const [result] = await connection.query(
        `select i.titulo, i.description, i.categoria, i.visita, avg(r.puntaje) as rating, c.mensaje AS comentario
        from idea i
        INNER JOIN rating r on i.id_idea = r.id_idea_puntaje
        INNER JOIN comentario c on i.id_idea = c.id_idea_mensaje
        WHERE id_idea= ?`,
        [id]
      );
  
      if (!result[0].id) {
        const error = new Error(`The entry with id ${id} does not exist`);
        error.httpCode = 404;
        throw error;
      }
  
      connection.release();
  
      res.send({
        status: 'ok',
        data: result[0]
      });
    } catch (error) {
      next(error);
    }
  }

  module.exports = { getIdea };
  
  