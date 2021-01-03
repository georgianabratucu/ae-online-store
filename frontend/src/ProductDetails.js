import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import ProductList from './ProductList'

class ProductDetails extends Component {
  render() {
    return (
      <div>
      <div class="topnav">
  <a id="textId" onClick={() => this.props.onExit()}>Lista produse</a>
  <a id='cos' onClick={() => this.props.onEnable()}>Cos</a>
</div>

      <div id="divPrinc">
  <h1 class="firstPage">Detalii produs</h1>
</div>

<br/><br/><br/><br/>
<div >
  <div id="textId3" class="menu">
    <div class="menuitem">Pret:  {this.props.item.pret} RON</div>
    <div class="menuitem">Cantitate: {this.props.item.cantitate} bucati</div>
    <div class="menuitem">Locatie: {this.props.item.locatie} </div>
    <div class="menuitem">Beneficii: {this.props.item.beneficii} </div>
    <div class="menuitem">Ingrediente: {this.props.item.ingrediente} </div>
    <br/>

    <div class="menuitem"><input type="button" class="inputText" value="Inapoi la lista de produse" id="button" onClick={() => this.props.onExit()}/></div>
    <br/>
    {this.props.item.cantitate>0?<div class="menuitem"><input type="button" class="inputText" value="Adauga in cos" id="button" onClick={() => this.props.onAdd(this.props.item.id)}/></div>:
  <div class="menuitem"><input type="button" class="inputText" disabled value="Adauga in cos" id="button" onClick={() => this.props.onAdd(this.props.item.id)}/></div>}
<br/>
  </div>

  <div class="main">
    <h2 class="firstPage">{this.props.item.nume}</h2>
    <br/>
  <img id="imagine" src={this.props.item.imagine}/>
  <br/>
    <p id="textId3">{this.props.item.descriere}</p>

  </div>

  
</div>



      </div>
    )
  }
}

export default ProductDetails