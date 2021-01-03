const express=require("express");
const Sequelize=require("sequelize");
const cors=require("cors");
const bodyParser = require('body-parser')

const app=express();
app.use('/',express.static('frontend/build'))
app.use(cors());

app.use(bodyParser.json())

//use static files from the statics folder
app.use("/",express.static('static'));

//establishing the connection to the database
const sequelize = new Sequelize('Produse', 'georgiana', 'georgiana', {
    dialect:'mysql',
    host:'127.0.0.1',
    define:{timestamps:false}
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
    imagine:Sequelize.STRING,
    locatie: Sequelize.STRING,
    beneficii: Sequelize.STRING,
    ingrediente:Sequelize.STRING
});

const Comanda = sequelize.define('comanda', {
	nume : {
		type : Sequelize.STRING(100),
		allowNull : false,
		validate : {
			len : [3, 100]
		}
	},	
	prenume : {
		type : Sequelize.STRING(100),
		allowNull : false,
		validate : {
			len : [3, 100]
		}
	},
	email : {
		type : Sequelize.STRING,
		allowNull : false,
		
	},
	telefon : {
		type : Sequelize.STRING(100),
		allowNull : false,
		validate : {
			len : [3, 100]
		}
	},	
	adresa : {
		type : Sequelize.STRING(100),
		allowNull : false,
		validate : {
			len : [3, 100]
		}
	},	
	total : {
		type : Sequelize.INTEGER,
		allowNull : false,
		validate : {
			min : 0,
			max : 125
		}
	}
});


 app.post('/add', async (req, res) => {
	try{
	    let comanda = req.body
		await Comanda.create(comanda)
		res.status(201).json({message : 'created'})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})


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

app.get('/comenzi', async function(request,response){
    try{
        let comenzi = await Comanda.findAll();

        if(comenzi){
        
            response.status(200).json(comenzi);

        } else {
            
            response.status(404).send("Nu au fost gasite comenzi");
        }
    } catch(error){
        
        response.status(500).send(error.message);
    }
    
});

app.put('/produse/:nume', async (req, res) => {
	try{
		let produse= await Medicamente.findOne(
            {
                where:{
                    nume:req.params.nume
                }
                
            });
		if (produse){
			var cant = 0;
			if(produse.cantitate <= req.body.cantitate) {
				cant=0;
			}else{
				cant=produse.cantitate-req.body.cantitate
			}
		    let p = {nume:produse.nume,
		             descriere:produse.descriere,
		             pret:produse.pret,
		             cantitate:cant,
		             imagine:produse.imagine,
		             locatie:produse.locatie,
		             beneficii:produse.beneficii,
		             ingrediente:produse.ingrediente
		    }
			await produse.update(p)
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})


app.listen(8081);