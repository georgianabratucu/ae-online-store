import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';

class ProductDetails extends Component {
  render() {
    return (
      <div>
      <div id="divPrinc">
  <h1>Detalii produs</h1>
</div>

<br/><br/><br/><br/>
<div >
  <div class="menu">
    <div class="menuitem">Pret: {this.props.item.pret}</div>
    <div class="menuitem">Cantitate: {this.props.item.cantitate} bucati</div>
    <div class="menuitem"><input type="button" value="Inapoi la lista de produse" id="button" onClick={() => this.props.onExit()}/></div>

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