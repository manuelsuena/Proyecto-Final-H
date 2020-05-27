require('dotenv').config();

const { getConnection } = require('../../db');
const { generateError } = require('../../helpers');
const { mensajeSchema } = require('../../validations/ideasvalidations');



// POST - /mensaje/:id/mensaje
async function comentarIdea(req, res, next) {
    try {
      const { id } = req.params;
  
      // Validate payload
      await mensajeSchema.validateAsync(req.body);
  
      const { mensaje } = req.body.text;
  
      const connection = await getConnection();
  
      // Comprobamos si existe la idea
      const [idea] = await connection.query('SELECT id_idea from idea where id_idea=?', [
        id
      ]);
  
      if (!idea.length) {
        const error = new Error('La entrada con la id específicada no existe');
        error.httpCode = 404;
        throw error;
      }
    
      //comentario
      await connection.query(
        `
        INSERT INTO comentario(id_idea, mensaje, date, id_usuario) 
        VALUES(?, ?, now(), ?)`,
        [id, mensaje, req.auth.id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
        data: 'mensaje enviado exitosamente'
      });
    } catch(error) {
      next(error);
    }
  }
  
  async function getIdeaMensaje(req, res, next) {
    try {
      const { id } = req.params;
      const connection = await getConnection();
  
      const [
        data
      ] = await connection.query('SELECT * from comentario WHERE id_idea=?', [
        id
      ]);
  
      connection.release();
  
      res.send({
        status: 'ok',
        message: data
      });
    } catch (error) {
      next(error);
    }
  }

  async function DeleteIdeaMensaje(req, res, next) {
    try {
      const { id } = req.params;
      const connection = await getConnection();
  
      const [
        data
      ] = await connection.query('SELECT * from comentario WHERE id_comentario=?', [
        id
      ]);

      if (!data.length) {
        throw generateError(`No existe ese comentario`, 400);
      }
      if (data[0].usuario_id !== req.auth.id && req.auth.role !== 'admin') {
        throw generateError('No puedes eliminar el mensaje', 400);
      }
      await connection.query(
        'DELETE from comentario WHERE id_comentario=?',
        [id]
      );
  
      connection.release();
  
      res.send({
        status: 'ok',
        message: 'Mensaje borrado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
  
  module.exports = {
    comentarIdea,
    getIdeaMensaje,
    DeleteIdeaMensaje
  }; 