import React,{useEffect, useState, } from 'react'
import { Conexion } from './Api/ApiPrueba'

const Inicio = () => {
  const (productos, setProductos) = useState(null) 
  useEffect(() => {
    Conexion(setProductos)
  },[] )
   
  return{
    
  



  }
}
 export default Inicio; 
