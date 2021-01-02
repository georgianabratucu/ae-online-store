import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ProductList from './ProductList'

class ProductDetails extends Component {
  render() {
    return (
      <div>
      <div class="topnav">
  <a onClick={() => this.props.onExit()}>Lista produse</a>
  <a>Termeni si conditii</a>
  <a>Despre</a>
  <a id='cos' onClick={() => this.props.onEnable()}>Cos</a>
</div>

      <div id="divPrinc">
  <h1>Detalii produs</h1>
</div>

<br/><br/><br/><br/>
<div >
  <div class="menu">
    <div class="menuitem">Pret: {this.props.item.pret}</div>
    <div class="menuitem">Cantitate: {this.props.item.cantitate} bucati</div>
    <div class="menuitem">Locatie: {this.props.item.locatie} </div>
    <div class="menuitem">Beneficii: {this.props.item.beneficii} </div>
    <div class="menuitem">Ingrediente: {this.props.item.ingrediente} </div>

    <div class="menuitem"><input type="button" value="Inapoi la lista de produse" id="button" onClick={() => this.props.onExit()}/></div>
    <div class="menuitem"><input type="button" value="Adauga in cos" id="button" onClick={() => this.props.onAdd(this.props.item.id)}/></div>

  </div>

  <div class="main">
    <h2>{this.props.item.nume}</h2>
    <br/>
  <img id="imagine" src={this.props.item.imagine}/>
  <br/>
    <p>{this.props.item.descriere}</p>

  </div>

  
</div>



      </div>
    )
  }
}

export default ProductDetails