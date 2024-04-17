"use strict";
const now = new Date();
const getPrecios = async () => {
  const ultimaPeticion = localStorage.getItem("ultimaPeticion");

  if (ultimaPeticion && now - new Date(ultimaPeticion) < 5 * 60 * 1000) {
    const precios = JSON.parse(localStorage.getItem("precios"));

  
    return precios;
  }

  try {
    const response = await fetch(
      "https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/all%3Fzone%3DPCB"
    );
    const data = await response.json();
    const precios = JSON.parse(data.contents);
    localStorage.setItem("precios", JSON.stringify(precios));
    localStorage.setItem("ultimaPeticion", now.toString());
    return precios;
  } catch (error) {
    console.log(error.message);
  }
};
export default getPrecios;
