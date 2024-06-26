import express from 'express';

const listProducts = [
    {
        id:1,
        name:'Suitcase 250',
        price:50,
        stock:4
    },
    {
        id:2,
        name:'Suitcase 450',
        price:100,
        stock:10
    },
    {
        id:3,
        name:'Suitcase 650',
        price:350,
        stock:2
    },
    {
        id:4,
        name:'Suitcase 1050',
        price:550,
        stock:0
    }
]

function getItemById(id) {
    return listProducts.find(product => product.id === id);
}

const app = express();

app.get('/list_products', (req, res) => {
    res.json(listProducts);
})

app.get('/list_products/:id', (req, res) => {
    const item = getItemById(req.params.id);
    if(item) {
        res.json(item);
    } else {
        res.status(404).send('Not found');
    }
})


app.listen(1245, ()=> {
    console.log('Listening on port 1245');
})