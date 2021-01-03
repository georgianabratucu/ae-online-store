import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER='http://3.137.204.251:8081'

class Store{
    constructor(){
        this.content=[]
        this.emitter=new EventEmitter()
    }
    async getAllProducts(){
        try{
            let response=await axios(`${SERVER}/produse`)
            this.content=response.data
            this.emitter.emit('GET_ALL_SUCCESS')
            console.log(response.data)
        }catch(ex){
            console.log(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    
    async getAllOrders(){
        try{
            let response=await axios(`${SERVER}/comenzi`)
            this.content=response.data
            this.emitter.emit('GET_ALL_SUCCESS')
            console.log(response.data)
        }catch(ex){
            console.log(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
    
      async adaugaComanda(comanda){
        try {
            await axios.post(`${SERVER}/add`, comanda)
            this.emitter.emit('ADD_SUCCESS')
            this.getAllOrders()
        } catch (e) {
            console.warn(e)
            this.emitter.emit('ADD_ERROR')
        }
    }
    
     async updateProduct(nume, cantitate){
        try {
            await axios.put(`${SERVER}/produse/` + nume, cantitate)
            this.emitter.emit('SAVE_SUCCESS')
            this.getAllProducts()
        } catch (e) {
            console.warn(e)
            this.emitter.emit('SAVE_ERROR')
        }
    }

    
}
export default Store