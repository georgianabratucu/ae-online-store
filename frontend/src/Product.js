import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import './css/style.css';

class Product extends Component {
	constructor(props){
		super(props)
		this.state = {
		    isEditing : false,
		    products:[],
		    detailsFor : -1,
        selectedProduct : null,
        isEditing : false,
		}
		this.handleChange = (evt) => {
			this.setState({
				[evt.target.name] : evt.target.value
			})
		}
	}
	
  render() {
  

	     return (
	    <div className="lis"> 	
        <div id="x">
 
          <ListItem alignItems="flex-start">
        
        <ListItemAvatar >
          <Avatar id="b" alt="imagine melodie" src={this.props.item.imagine}  />
        </ListItemAvatar>
        <ListItemText 
          primary={
            <React.Fragment>
              <Typography id="nume" component="span" color="textPrimary">
                {this.props.item.nume}
              </Typography>
            </React.Fragment>
           
          }
          secondary={
            <React.Fragment>
              <Typography component="span" color="textPrimary">
                {this.props.item.descriere}
              </Typography>
              <br/>
              <Typography component="span" color="textPrimary">
                {'Pret: '  + this.props.item.pret + ' RON'}
              </Typography>
              <br/><br/>
              <input type="button" id='button' value="Detalii produs" onClick={() => this.props.onSelect(this.props.item.id)} />
              <input type="button" id='button' value="Adauga in cos" onClick={() => this.props.onAdd(this.props.item.id)} />

            </React.Fragment>
           
          }
      
        />
        
        </ListItem>
       
         
        </div>
        </div>
      )	
  }
  
}

export default Product