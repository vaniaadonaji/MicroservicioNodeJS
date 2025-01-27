const express = require('express');
const router = express.Router();
const ComputadoraModel = require('../models/Computadora');  // Asegúrate de importar el modelo correctamente

module.exports = (db) => {
  const model = new ComputadoraModel(db);  // Asegúrate de instanciar correctamente el modelo

  // Obtener todas las computadoras
  router.get('/', async (req, res) => {
    try {
      const computadoras = await model.obtenerComputadoras();
      res.json(computadoras);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al obtener computadoras', message: error.message });
    }
  });

  // Obtener una computadora por su ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const computadora = await model.obtenerComputadoraPorId(id);
      if (computadora) {
        res.json(computadora);
      } else {
        res.status(404).send({ error: 'Computadora no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al obtener computadora por id', message: error.message });
    }
  });

  // Agregar una nueva computadora
router.post('/', async (req, res) => {
    const data = req.body;
    try {
      const result = await model.agregarComputadora(data);
  
      // Enviar el resultado de la base de datos
      if (result && result._id) {
        res.status(201).json(result);  // Aquí devolvemos el objeto insertado
      } else {
        res.status(500).send({ error: 'No se pudo agregar la computadora' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al agregar computadora', message: error.message });
    }
  });
  

  // Actualizar una computadora por su ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    
    try {
      const result = await model.actualizarComputadora(id, data);
      
      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Computadora no encontrada o no hubo cambios' });
      }
  
      res.status(200).json({ message: 'Computadora actualizada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar computadora', message: error.message });
    }
  });  

  // Eliminar una computadora por su ID
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await model.eliminarComputadora(id);
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: 'Computadora no encontrada' });
      }
      res.status(200).send({ message: 'Computadora eliminada exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Error al eliminar computadora', message: error.message });
    }
  });

  return router;
};
