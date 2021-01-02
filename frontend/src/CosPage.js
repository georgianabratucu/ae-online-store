import React, { Component } from 'react';
import Product from './Product'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader'
import Comanda from './Comanda'
import './css/style.css';


class CosPage extends Component {
  constructor(props){
		super(props)
		this.state = {
		    nume:'default',
		    storage:[],
		    qs:[],
		    obiecte:[], 
		    total:0,
		    refreshing:false,
		    comanda:false,
		}
		
		this.comanda = () => {
		  this.setState({
            comanda: true
            });
      if(this.state.total==0) {
        alert('Nu ati adaugat niciun produs in cos')
      }      
		}

    this.delete = (nume) => {
        
      var v1='';
      var v2='';
      
      for(let i=0;i<this.state.storage.length;i++) {
          if(this.state.storage[i].includes(nume) || this.state.storage[i].includes(undefined)||this.state.storage[i].includes(NaN) ) {
              
          }else{
              if(this.state.storage.length==1){
                  v1=this.state.storage[i];
                  v2=this.state.qs[i];
              }else{
              v1+=this.state.storage[i]+';';
              v2+=this.state.qs[i]+';';
              }
          }
      }
  
      localStorage.setItem('savedList',v1);
	    localStorage.setItem('cantList',v2);
      
          
          this.setState({
                refreshing: true
            })
	  
    } 

	}
	
	 componentDidMount(){
	     var ids = localStorage.getItem('savedList');
	   if(ids!=null)  {
	   var ids = localStorage.getItem('savedList').split(";");
	   var cant = localStorage.getItem('cantList').split(";");
	   cant = cant.filter(function (el) {
          return el !='';
          });
          
        for(let i=0;i<ids.length;i++){
            var singleObj = {};
            if(ids[i].split('-')[0]!=''){
            singleObj['nume'] = ids[i].split('-')[0];
            singleObj['pret'] = ids[i].split('-')[1];
            singleObj['cantitate'] = cant[i];
            
         this.state.obiecte.push(singleObj);
         this.state.total+=ids[i].split('-')[1]*cant[i];
            }
        }  
	   this.setState({
                storage: ids,
                qs: cant
            })
	}
}

  render() {
    
    if(this.state.comanda==true && this.state.total>0) {
      return(
        <div>
        <Comanda item={this.state.total} item1={this.state.storage} item2={this.state.qs} />
        </div>)
    }else if(this.state.refreshing==true){
          return<CosPage/>
      }else{
    return (
      <div>
      
     
 <div className="lis">
         <div id="x">  
    <List>
    
      {
          this.state.obiecte.map((e,i) => <ListItem alignItems="flex-start" key={i}>
        
        <ListItemText 
          primary={
            <React.Fragment>
              <Typography id="nume" component="span" color="textPrimary">
                {e.nume}
                
              </Typography>
             
            </React.Fragment>
           
          }
          secondary={
            <React.Fragment>
              <Typography  component="span" color="textPrimary">
                {"Pret: "+e.pret + " RON"}
                 <br/>
              {"Cantitate: "+e.cantitate}
              <br/>
              <input type="button" value="Sterge din cos" id="button" onClick={() => this.delete(e.nume)}/>
              </Typography>
            </React.Fragment>
          }
        />

       
     </ListItem>
      )}
      
    </List>
     <div id= "nume">Total: {this.state.total} RON</div>
     <br/>
     <br/>
     <input type="button" value="Finalizare comanda" id="button" onClick={() => this.comanda()}/>
    </div>
    </div>
        
      </div>
    )
  }
}}

export default CosPage