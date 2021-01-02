const express=require("express");
const Sequelize=require("sequelize");
const cors=require("cors");

const app=express();
app.use('/',express.static('frontend/build'))
app.use(cors());


//use static files from the statics folder
app.use("/",express.static('static'));

//establishing the connection to the database
const sequelize = new Sequelize('Produse', 'georgiana', 'georgiana', {
    dialect:'mysql',
    host:'127.0.0.1'
});

//performing authentication to the database
sequelize.authenticate().then(authenticate=>{
    console.log('You have successfully connected to the database.\n' + 'Good luck.');
}).catch(function(){
    console.log('Unfortunately, there was an error connecting to the database.\n'+'Keep trying.');
});

//create tables
app.get('/creatingTables',(request,response)=>{
    sequelize.sync({force:true}).then(success=>{
        response.status(201).send('The tables has been successfully created.');
    }).catch(error=>{
        response.status(500).send('There was a problem creating the tables.');
    });
});

//define the Accounts table structure
const Medicamente = sequelize.define('medicamente', {
    
    nume: Sequelize.STRING,
    descriere: {
                type:Sequelize.STRING
        },
    pret: {
                type:Sequelize.INTEGER
    },
    cantitate: { 
              type:Sequelize.INTEGER
            },
    imagine:Sequelize.STRING
});

//display a list of preferences for an account 
app.get('/produse', async function(request,response){
    try{
        let produse = await Medicamente.findAll();

        if(produse){
        
            response.status(200).json(produse);

        } else {
            
            response.status(404).send("Nu au fost gasite produse");
        }
    } catch(error){
        
        response.status(500).send(error.message);
    }
    
});


app.listen(8081);