import axios from 'axios'
import {EventEmitter} from 'fbemitter'

const SERVER='http://18.216.110.125:8081'

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
            console.log('aici ' + response.data)
        }catch(ex){
            console.log(ex)
            this.emitter.emit('GET_ALL_ERROR')
        }
    }
}
export default Store