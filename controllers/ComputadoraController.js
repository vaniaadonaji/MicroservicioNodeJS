// controllers/computadoraController.js
const ComputadoraModel = require('../models/Computadora'); // Importamos el modelo

class ComputadoraController {
  constructor(db) {
    this.model = new ComputadoraModel(db);
  }

  // Obtener todas las computadoras
  async obtenerComputadoras(req, res) {
    try {
      const computadoras = await this.model.obtenerComputadoras();
      res.json(computadoras);
    } catch (error) {
      res.status(500).send({ error: 'Error al obtener computadoras' });
    }
  }

  // Obtener una computadora por ID
  async obtenerComputadoraPorId(req, res) {
    const { id } = req.params;
    try {
      const computadora = await this.model.obtenerComputadoraPorId(id);
      if (!computadora) {
        return res.status(404).send({ error: 'Computadora no encontrada' });
      }
      res.json(computadora);
    } catch (error) {
      res.status(500).send({ error: 'Error al obtener computadora por ID' });
    }
  }

 // Agregar una nueva computadora
async agregarComputadora(req, res) {
    const data = req.body;
    try {
      const computadora = await this.model.agregarComputadora(data);
  
      // Verificamos si el objeto devuelto tiene el _id insertado
      if (computadora._id) {
        res.status(201).json(computadora); // Devolvemos el objeto insertado con el _id
      } else {
        res.status(500).send({ error: 'No se pudo agregar la computadora' });
      }
    } catch (error) {
      console.error(error); // Asegúrate de que cualquier error se loguee
      res.status(500).send({ error: 'Error al agregar computadora', message: error.message });
    }
  }
  
  
  // Actualizar una computadora por ID
  async actualizarComputadora(req, res) {
    const { id } = req.params;
    const data = req.body;
    try {
      const result = await this.model.actualizarComputadora(id, data);
      if (result.matchedCount === 0) {
        return res.status(404).send({ error: 'Computadora no encontrada' });
      }
      res.json({ message: 'Computadora actualizada' });
    } catch (error) {
      res.status(500).send({ error: 'Error al actualizar computadora' });
    }
  }

  // Eliminar una computadora por ID
  async eliminarComputadora(req, res) {
    const { id } = req.params;
    try {
      const result = await this.model.eliminarComputadora(id);
      if (result.deletedCount === 0) {
        return res.status(404).send({ error: 'Computadora no encontrada' });
      }
      res.json({ message: 'Computadora eliminada' });
    } catch (error) {
      res.status(500).send({ error: 'Error al eliminar computadora' });
    }
  }
}

module.exports = ComputadoraController;
