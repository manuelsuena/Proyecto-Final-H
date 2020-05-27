require('dotenv').config();
const { getConnection } = require('../../db');
const {searchSchema } = require('../../validations/ideasvalidations');

async function listIdea(req, res, next) {
    try {
      const connection = await getConnection();
      const { search, visita, categoria  } = req.query;
  
      let result;
  
      if (search) {
        await searchSchema.validateAsync(search);
  
        result = await connection.query(
          `SELECT idea.*, 
          (SELECT AVG(puntaje) FROM rating WHERE id_idea=idea.id_idea) AS puntajeAverage,
          FROM idea
          WHERE idea.titulo LIKE ? OR idea.descripcion LIKE ?
          ORDER BY idea.fecha_creacion  DESC`,
          [`%${search}%`, `%${search}%`]
        );
      } else if (categoria) {
  
        result = await connection.query(
          `SELECT idea.*, 
          (SELECT AVG(puntaje) FROM rating WHERE id_idea=idea.id_idea) AS puntajeAverage,
          FROM idea
          WHERE idea.categoria LIKE ? 
          ORDER BY idea.fecha_creacion  DESC`,
          [`%${categoria}%`]
        );
      } else if (visita) {
          result = await connection.query(
            `SELECT idea.*, 
            (SELECT AVG(puntaje) FROM rating WHERE id_idea=idea.id_idea) AS puntajeAverage,
            FROM idea
            ORDER BY idea.visita  DESC`,
        );
      } else {
        result = await connection.query(
          `SELECT diary.*, 
          (SELECT AVG(vote) FROM diary_votes WHERE entry_id=diary.id) AS voteAverage
          FROM diary
          ORDER BY diary.date DESC`
        );
      }
  
      const [ideas] = result;
  
      connection.release();
  
      res.send({
        status: 'ok',
        data: ideas
      });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = { listIdea };