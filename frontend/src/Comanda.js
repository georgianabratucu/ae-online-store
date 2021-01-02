import React, { Component } from 'react';
import Store from './Store'

class Comanda extends Component {
  constructor(props){
    super(props)
    this.state = {
      nume : '',
      prenume : '',
      telefon : '',
      email : '',
      adresa:'',
      total:this.props.item,
      storage:this.props.item1,
      qs:this.props.item2
    }
    this.handleChange = (evt) => {
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
    
    this.store=new Store();
    
    this.adauga = (comanda) => {
        this.store.adaugaComanda(comanda);
        for(let i=0;i<this.state.storage.length;i++) {
            this.store.updateProduct(this.state.storage[i].split('-')[0], this.state.qs[i]);
        }
    }
    
    this.close = () => {
        localStorage.clear();
        window.location.reload(false);
    }
  }
  
  render() {
    
      return (
          <div className="lis"> 	
        <div id="x">
        <p class = 'firstPage'>Formular comanda</p>
        <div>
          <label class='inputText'>Introduceti numele: </label>
          <input type="text" class='inputField' id="nume" name="nume" onChange={this.handleChange} value={this.state.nume} /> 
          <br/>
          <br/>
          <label class='inputText'>Introduceti prenumele: </label>
          <input type="text" class='inputField'  id="prenume" name="prenume" onChange={this.handleChange} value={this.state.prenume} />
          <br/>
          <br/>
          <label class='inputText'>Introduceti numarul de telefon: </label>
          <input type="text" class='inputField'  id="telefon" name="telefon" onChange={this.handleChange} value={this.state.telefon} />
          <br/>
          <br/>
          <label class='inputText'>Introduceti adresa de email: </label>
          <input type="text" class='inputField' id="email" name="email" onChange={this.handleChange} value={this.state.email} />
          <br/>
          <br/>
          <label class='inputText'>Introduceti adresa de livrare: </label>
          <input type="text" class='inputField'  id="adresa" name="adresa" onChange={this.handleChange} value={this.state.adresa} />
          <br/>
          <br/>
          <label class='inputText'>Total: {this.state.total}</label>
          <br/>
          <br/>
          <input  type="button" id='button' class='inputText' value="Renunta la comanda" onClick={() => this.close()} />
          <input type="button" id='button' class='inputText' value="Finalizeaza comanda" onClick={() => {
              this.adauga({
                nume : this.state.nume,
                prenume : this.state.prenume,
                email : this.state.email,
                telefon : this.state.telefon,
                adresa: this.state.adresa,
                total: this.state.total
              });
              localStorage.clear();
              alert('comanda finalizata cu succes');
              window.location.reload(false);
            }
          } />
        </div>
        </div>
        </div>
      )
    
   
  }
}

export default Comanda