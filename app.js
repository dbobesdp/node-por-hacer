const colors = require('colors/safe');
const { boolean } = require('yargs');
const { argv } = require('./config/yargs');
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

porHacer.cargarDB();

switch (comando) {
  case 'crear':
    console.log('Crear tarea por hacer');
    let tarea = porHacer.crear(argv.descripcion);
    console.log(tarea);
    break;
  case 'listar':
    console.log('Mostrar todas las tareas por hacer');
    let listado = porHacer.getListado();
    if (listado.length === 0) {
      console.log('No hay tareas por hacer guardadas'.yellow);
    } else {
      for (let tarea of listado) {
        let estadoTarea =
          tarea.completado === true
            ? colors.green('Completada')
            : colors.red('No completada');
        console.log('===== Por hacer ====='.green);
        console.log('Descripción:', tarea.descripcion);
        console.log(`Estado: ${estadoTarea}`);
        console.log('====================='.green);
      }
    }
    break;
  case 'actualizar':
    console.log('Actualizar una tarea por hacer');
    let actualizado =
      porHacer.actualizar(argv.descripcion, argv.completado) == true
        ? colors.green('Actualizado')
        : colors.red('No actualizado');
    console.log('Resultado:', actualizado);

    break;
  case 'borrar':
    let borrado = porHacer.borrar(argv.descripcion);
    let resultado =
      borrado === true
        ? colors.green('Tarea borrada')
        : colors.red('No se pudo borrar la tarea');
    console.log(resultado);
    break;
  case 'limpiar':
    porHacer.limpiarDB();
    console.log('Se han eliminado todas las tareas por hacer'.yellow);
    break;
  default:
    console.log('Comando no reconocido'.red);
}
