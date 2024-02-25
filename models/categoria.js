const { Schema, model } = require('mongoose');

const categoriaSchema = new Schema({
  nombre: {
    type: String,
    uppercase: true,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

categoriaSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model('Categoria', categoriaSchema);
