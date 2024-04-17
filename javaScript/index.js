"use strict";

import getPrecios from "./getPrecios.js";
import {
  getPrecioActual,
  getPrecioMasBarato,
  getPrecioMasCaro,
} from "./tarifas.js";

const init = async () => {
  const precios = await getPrecios();

  const precioActual = getPrecioActual(precios);
  const precioMasBarato = getPrecioMasBarato(precios);
  const precioMasCaro = getPrecioMasCaro(precios);

  const hour = precioActual.hora;
  const horaPrecioMasBarato = precioMasBarato.hora.split("-")[0];
  const horaPrecioMasCaro = precioMasCaro.hora.split("-")[0];

  const tarifaluz = [
    {
      nombre: "Precio máximo",
      valor: precioMasCaro.precio,
      hora: horaPrecioMasCaro,
      icono: "images/fotomax.png",
    },
    {
      nombre: "Precio actual",
      valor: precioActual.precio,
      hora: hour,
      icono: "images/fotomid.png",
    },
    {
      nombre: "Precio mínimo",
      valor: precioMasBarato.precio,
      hora: horaPrecioMasBarato,
      icono: "images/fotomin.png",
    },
  ];


  const main = document.querySelector("main");

  const ulTarifaLuz = document.createElement("ul");

  for (let i = 0; i < tarifaluz.length; i++) {
    const tarifa = tarifaluz[i];


    const liTarifaLuz = document.createElement("li");


    const nombreP = document.createElement("p");
    nombreP.textContent = tarifa.nombre;
    liTarifaLuz.append(nombreP);
    const icono = document.createElement("img");
    icono.src = tarifa.icono;
    liTarifaLuz.append(icono);
    const valorP = document.createElement("p");
    valorP.textContent = tarifa.valor + " €/MWh";
    liTarifaLuz.append(valorP);
    const horaP = document.createElement("p");
    horaP.textContent = tarifa.hora + "h";
    liTarifaLuz.append(horaP);

    

    ulTarifaLuz.append(liTarifaLuz);
  }


  const section = document.createElement("section");
  section.classList.add("tarifaLuz");


  const titleTarifaLuz = document.createElement("h2");
  titleTarifaLuz.textContent = "TARIFA DE LA LUZ";
  section.append(titleTarifaLuz, ulTarifaLuz);


  main.append(section);


  const electrodomesticos = [
    { nombre: "microondas", potenciakw: 1.5, img: "images/microondas.png" },
    { nombre: "Televisor", potenciakw: 0.4, img: "images/tv.png" },
    { nombre: "nevera", potenciakw: 0.35, img: "images/nevera.png" },
  ];


  const ulElectro = document.createElement("ul");
  ulElectro.id = "lista-electrodomesticos";


  for (let i = 0; i < electrodomesticos.length; i++) {
    const electrodomestico = electrodomesticos[i];
    const costo = (electrodomestico.potenciakw / 1000) * precioActual.precio;



    const liElectro = document.createElement("li");


    const imagen = document.createElement("img");
    imagen.src = electrodomestico.img;
    liElectro.append(imagen);



    const textoP = document.createElement("p");
    textoP.textContent = `${costo.toFixed(2)} euros por hora`;
    liElectro.append(textoP);

  
    ulElectro.append(liElectro);
  }
 
  const article = document.createElement("article");
  article.classList.add("electrodomesticos");

  
  const titleElectro = document.createElement("h2");
  titleElectro.textContent = "Electrodomésticos";


  article.append(titleElectro, ulElectro);

  
  main.append(article);
};
init();
