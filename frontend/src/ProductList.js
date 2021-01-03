import React, { Component } from 'react';
import Store from './Store'
import Product from './Product'
import ProductDetails from './ProductDetails'
import CosPage from './CosPage'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      detailsFor: -1,
      selectedProduct: null,
      cosEnable: false,
    }

    this.select = (id) => {
      let selected = this.state.products.find((e) => e.id === id)
      this.setState({
        detailsFor: id,
        selectedProduct: selected
      })
    }

    this.reset = () => {
      this.setState({
        detailsFor: -1,
        selectedProduct: null,
        cosEnable: false
      })
    }

    this.enableCos = () => {
      this.setState({
        cosEnable: true
      });
    }

    this.addProdus = (id) => {
      let selected = this.state.products.find((e) => e.id === id)
      var productList = [];
      var cantitateList = [];

      let ids = localStorage.getItem("savedList")
      let qs = localStorage.getItem("cantList")


      let item = selected.nume + "-" + selected.pret;
      if (ids == null) {
        localStorage.setItem('savedList', item)
        localStorage.setItem('cantList', 1)

      }
      else {

        productList = ids.split(';');
        cantitateList = qs.split(';');
        cantitateList = cantitateList.filter(function(el) {
          return el != '';
        });

        productList = productList.filter(function(el) {
          return el != '';
        });

        if (productList.indexOf(item) >= 0) {
          cantitateList[productList.indexOf(item)]++;

        }
        else {
          let x = '';
          for (let i = 0; i < productList.length - 1; i++) {
            if (productList[i] == '' || item == '') {}
            else {
              x = x + productList[i] + ';';
            }
          }
          x = x + productList[productList.length - 1];
          cantitateList.push(1);
          localStorage.setItem('savedList', x + ';' + item);
        }

        qs = '';
        for (let i = 0; i < cantitateList.length; i++) {
          if (cantitateList[i] == '' || ids[i] == '') {}
          else {
            qs = qs + cantitateList[i] + ';';
          }
        }
        qs = qs.replace('NaN', '');
        localStorage.removeItem('cantList');
        localStorage.setItem("cantList", qs);

        //localStorage.removeItem("savedList");
      }

    }

    this.store = new Store();

  }
  componentDidMount() {
    this.store.getAllProducts()
    this.store.emitter.addListener('GET_ALL_SUCCESS', () => {
      this.setState({
        products: this.store.content
      })
    })
  }
  render() {

    if (this.state.cosEnable) {
      return (
        <div>
        <div class="topnav">
  <a id="textId" onClick={() => this.reset()}>Lista produse</a>
  <a id='cos'  class="active" onClick={() => this.enableCos()}>Cos</a>
</div>
<CosPage/>
</div>)
    }
    else {

      if (this.state.detailsFor === -1) {
        return (
          <div>
        <div class="topnav">
  <a id="textId" class="active">Lista produse</a>
  <a id='cos' onClick={() => this.enableCos()}>Cos</a>
</div>

<div >
  <h2 class="firstPage">Produsele disponibile</h2>
</div>
          {this.state.products.map((e, i) => <Product item={e} key={i} onSelect={this.select} onAdd={this.addProdus} />)}  
        </div>
        )
      }
      else {
        return (
          <div class="container">
        <div class="colum">
        
        <ProductDetails item={this.state.selectedProduct} onExit={this.reset} onAdd={this.addProdus} onEnable={this.enableCos}/>
        </div>
        </div>
        )
      }
    }
  }
}

export default ProductList