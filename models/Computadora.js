// models/computadoraModel.js
const { ObjectId } = require('mongodb');

class ComputadoraModel {
  constructor(db) {
    this.db = db;
    this.collection = db.collection('computadoras');
}
  

  // Obtener todas las computadoras
  async obtenerComputadoras() {
    try {
      const computadoras = await this.collection.find().toArray();
      return computadoras;
    } catch (error) {
      throw new Error('Error al obtener computadoras: ' + error);
    }
  }

  // Obtener una computadora por ID
  async obtenerComputadoraPorId(id) {
    try {
      const computadora = await this.collection.findOne({ _id: new ObjectId(id) });
      return computadora;
    } catch (error) {
      throw new Error('Error al obtener computadora por ID: ' + error);
    }
  }

  // Agregar una nueva computadora
  async agregarComputadora(data) {
    try {
      const result = await this.collection.insertOne(data);
  
      // Revisar qué devuelve insertOne
      if (result.insertedId) {
        // Si todo está bien, devolvemos el objeto con el _id
        return { _id: result.insertedId, ...data };
      }
  
      throw new Error('No se pudo insertar la computadora');
    } catch (error) {
      console.error(error); // Asegúrate de loguear cualquier error en la consola
      throw new Error('Error al agregar computadora: ' + error.message);
    }
  }
  

  // Actualizar una computadora por ID
  async actualizarComputadora(id, data) {
    try {
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
      );
      return result;
    } catch (error) {
      throw new Error('Error al actualizar computadora: ' + error);
    }
  }

  // Eliminar una computadora por ID
  async eliminarComputadora(id) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      throw new Error('Error al eliminar computadora: ' + error);
    }
  }
}

module.exports = ComputadoraModel;
