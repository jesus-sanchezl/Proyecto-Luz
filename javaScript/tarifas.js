"use strict";
const now = new Date();

const getPrecioActual = (precios) => {
  const hour = now.getHours();
  const precioActual = precios[`${hour}-${hour + 1}`].price;


  return { precio: precioActual, hora: `${hour}` };
};

const getPrecioMasBarato = (precios) => {

  const preciosArray = Object.entries(precios).map(([key, value]) => ({
    hora: key,
    precio: value.price,
  }));


  preciosArray.sort((a, b) => a.precio - b.precio);


  const precioMasBarato = preciosArray[0];


  const horaMasBarata = precioMasBarato.hora.split("-")[0];



  return precioMasBarato;
};

const getPrecioMasCaro = (precios) => {

  const preciosArray = Object.entries(precios).map(([key, value]) => ({
    hora: key,
    precio: value.price,
  }));


  preciosArray.sort((a, b) => b.precio - a.precio);


  const precioMasCaro = preciosArray[0];

  const horaMasCara = precioMasCaro.hora.split("-")[0];



  return precioMasCaro;
};

export { getPrecioActual, getPrecioMasBarato, getPrecioMasCaro };
