const fs = require('fs');
const colors = require('colors');
let listadoPorHacer = [];

const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);
  fs.writeFile('db/data.json', data, (error) => {
    if (error) throw new Error('No se pudo grabar', err);
  });
};

const cargarDB = () => {
  try {
    listadoPorHacer = require('../db/data.json');
  } catch (error) {
    listadoPorHacer = [];
  }
};

const limpiarDB = () => {
  listadoPorHacer = [];
  guardarDB();
};

const crear = (descripcion) => {
  // cargarDB();
  let porHacer = {
    descripcion,
    completado: false,
  };
  listadoPorHacer.push(porHacer);
  guardarDB();
  return porHacer;
};

const getListado = () => {
  // cargarDB();
  return listadoPorHacer;
};

const actualizar = (descripcion, completado = true) => {
  // cargarDB();
  let index = listadoPorHacer.findIndex(
    (tarea) => tarea.descripcion === descripcion
  );
  if (index > -1) {
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  } else {
    return false;
  }
};

const borrar = (descripcion) => {
  // cargarDB();
  let nuevoListado = listadoPorHacer.filter(
    (tarea) => tarea.descripcion !== descripcion
  );
  if (listadoPorHacer.length === nuevoListado.length){
    return false;
  } else {
    listadoPorHacer = nuevoListado;
    guardarDB();
    return true;
  }
};

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar,
  cargarDB,
  limpiarDB,
};
