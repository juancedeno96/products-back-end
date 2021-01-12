require('dotenv').config();
const express = require('express')
const massive = require('massive')
const product_ctrl = require('./server/products_controller')

const app = express();

const {SERVER_PORT, CONNECTION_STRING} = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db=>{
    app.set('db', db);
})
.catch(err=>console.log(err))

app.use(express.json());

app.post('/api.products', product_ctrl.create);
app.get('/api/products', product_ctrl.getAll);
app.get('/api/products/:id', product_ctrl.getOne);
app.put('/api/products/:id', product_ctrl.update);
app.delete('api/products/:id', product_ctrl.delete);


app.listen(SERVER_PORT, ()=>{
    console.log(`Server is listening on port ${SERVER_PORT}`)
});