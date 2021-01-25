const descripcion = {
  demand: true,
  alias: 'd',
  desc: 'Descripción de la tarea por hacer',
};

const completado = {
  alias: 'c',
  default: true,
  desc: 'Marca como completado o pendiente la tarea',
  type: 'boolean',
};

const argv = require('yargs')
  .command('crear', 'Crear un elemento por hacer', {
    descripcion,
  })
  .command('actualizar', 'Actualizar el estado completado de una tarea', {
    descripcion,
    completado,
  })
  .command('listar', 'Muestra las tareas por hacer')
  .command('limpiar', 'Elimina todas las tareas por hacer')
  .command('borrar', 'Eliminar una tarea', {
    descripcion,
  }).argv;

module.exports = {
  argv,
};
