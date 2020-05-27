const joi = require('@hapi/joi');
const { generateError } = require('../../helpers');

const ideaSchema = joi.object().keys({
    titulo: joi.string()
      .max(50)
      .required()
      .error(
        generateError(
          'El campo título es obligatorio y no puede tener más de 50 caracteres',
          400
        )
      ),
    descripcion: joi.string()
      .max(500)
      .required()
      .error(
        generateError(
          'El campo descripción es obligatorio y no puede tener más de 500 caracteres',
          400
        )
      ),
      categoria: joi.string()
      .max(20)
      .required()
      .error(
        generateError(
          'El campo categoria es obligatorio y no puede tener más de 20 caracteres',
          400
        )
      )
  });
  
  const searchSchema = joi.string()
  .min(2)
  .required()
  .error(
    generateError(
      'El campo de búsqueda debe de contener más de 2 caracteres',
      400
    )
  );

  const voteSchema = joi.object().keys({
    puntaje: joi.number()
      .min(1)
      .max(5)
      .integer()
      .required()
      .error(
        generateError(
          'El campo voto debe existir y ser un número entre 1 y 5',
          400
        )
      )
  });


  const mensajeSchema = joi.object().keys({
    mensaje: joi.number()
      .min(1)
      .max(5)
      .integer()
      .required()
      .error(
        generateError(
          'El campo voto debe existir y ser un número entre 1 y 5',
          400
        )
      )
  });


  module.exports = {
    ideaSchema,
    searchSchema,
    voteSchema,
    mensajeSchema
  };
