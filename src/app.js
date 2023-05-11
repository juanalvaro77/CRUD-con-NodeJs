const express =require("express");
const db = require("./utils/database");
const Todos = require("./models/todos.models");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8000;

db.authenticate()
    .then(()=>console.log("BD conectada"))
    .catch((err)=>console.log("Fallo al conectar BD"));

db.sync()
    .then(()=>console.log("BD sincronizada"))
    .catch((err)=>console.log("Fallo al sincronizar BD"));


const app =express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Servidor conectado, bien hecho Juan Alvaro")
});
//Obtener todas las tareas
app.get("/todos", async (req, res, next)=>{
    try{
        const todos = await Todos.findAll();
        res.json(todos);
    } catch(error){
        res.status(400).json(error);
    }

})

//Obtener una tarea por ID
app.get("/todos/:id", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const task = await Todos.findByPk(id);
        res.json(task);
    } catch(error){
        res.status(400).json(error);
    }

})

//Crear una nueva tarea

app.post("/todos", async (req, res, next)=>{
    try{
        const newTask = req.body;
        await Todos.create(newTask);
        res.status(201).send();
            
    } catch(error){
        res.status(400).json(error);
    }

})

//Eliminar una tarea

app.delete("/todos/:id", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const task = await Todos.destroy({where:{id: id,}});
        res.send(204).send();
        //console.log(todos);    
    } catch(error){
        res.status(400).json(error);
    }

})

//Actualizar una tarea

app.put("/todos/:id", async (req, res, next)=>{
    try{
        const {id} = req.params;
        const {description, completed} = req.body
        await Todos.update(
            {     
                "description": description,
                "completed": completed
            }, 
            {
                where: {id: id}
            });
        res.status(204).send();
        
    } catch(error){
        res.status(400).json(error);
    }

})

/*app.listen(8000, ()=>{
    console.log("Servidor escuchando a través del puerto 8000")
});*/

app.listen(PORT, ()=>{
    console.log(`Servidor escuchando a través del puerto ${PORT}`)
});