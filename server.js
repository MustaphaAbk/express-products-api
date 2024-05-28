const express=require('express')
const mysql=require('mysql2')
const app=express()
const bodyparser=require('body-parser')

const db= new mysql.createConnection({
    host: 'sql7.freesqldatabase.com',
    user: 'sql7710046',
    password: 'ThECsHUt2A',
    database: 'sql7710046'
})

db.connect((err)=>{
    if(err) return console.error(err.message)
    console.log('db connected')
})

function showProducts(callback){
    db.query('SELECT * FROM products',(err,rows)=>{
        if(err){
            callback(err,null)
        }else{
            callback(null,rows)
        }
    })
}
function showCommandes(callback){
    db.query('select  * from commandes',(err,rows)=>{
        if(err) {
            callback(err,null);
        }else{
            callback(null,rows)
        }
    })
}

//products
app.get('/products',(req,res)=>{
    showProducts((err,data)=>{
        if(err){
            console.error(err.message)
        }else{
            res.send({users :data})
        }
    })
})
app.post('/products/insert',(req,res)=>{
    const {nom,description,prix}=req.body;
    db.query('insert into products (nom,description,prix)values(?,?,?,?,?,?,?)',[nom,description,prix],(err)=>{
        if(err)return console.error(err.message)
        console.log('client saved');
        //send jason
    })
})
app.put('/products/update',(req,res)=>{
    const {id,nom,description,prix}=req.body;
    db.query('UPDATE products SET nom=?,description=?,prix=? WHERE id=?;',[nom,description,prix,id],(err)=>{
        if (err) return console.error(err.message)
        console.log("product updated")
        res.redirect('/products')//send jason
    })
})
app.delete('/products/delete',(req,res)=>{
    const {id}=req.body;
    db.query('delete from products where id=?',[id],(err)=>{
        if (err) return console.error(err.message)

        console.log('product deleted')
        res.redirect('/products')//send jason
    })
})

app.listen(2000,()=>{
    console.log("server started")
})