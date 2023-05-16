import axios from 'axios'


const Conexion = async = (state) => {
      const peticion =axios.get('https://testapi.wapizima.com/api/products')
      state(peticion.data.results)
} 

export {
   Conexion
}