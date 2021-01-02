import React, { Component } from 'react';
import Store from './Store'
import Product from './Product'
import ProductDetails from './ProductDetails'

class ProductList extends Component {
  constructor(props){
    super(props)
    this.state = {
      products : [],
      detailsFor : -1,
      selectedProduct : null
    }
    
    this.select = (id) => {
      let selected = this.state.products.find((e) => e.id === id)
      this.setState({
        detailsFor : id,
        selectedProduct : selected
      })
    }
    
    this.reset = () => {
      this.setState({
        detailsFor : -1,
        selectedProduct : null
      })
    }
    
	this.store=new Store();

  }
  componentDidMount(){
        this.store.getAllProducts()
        this.store.emitter.addListener('GET_ALL_SUCCESS',()=>{
            this.setState({
                products:this.store.content
            })
        })
	}
  render() {
            
      if (this.state.detailsFor === -1){
      return (
        <div>
          {this.state.products.map((e, i) => <Product item={e} key={i} onSelect={this.select} />)}  
        </div>
      )
    }
    else{
      return (
        <div class="container">
        <div class="colum">
        <ProductDetails item={this.state.selectedProduct} onExit={this.reset} />
        </div>
        </div>
      )
    }
  }
}

export default ProductList