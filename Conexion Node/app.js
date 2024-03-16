const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();

const con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'n0m3l0',
    database: 'mybase'
});

con.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Operaciones CRUD para productos

// 1. Crear producto
app.post('/productos', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
    con.query(query, [nombre, descripcion, precio], (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            return res.status(500).send("Error al crear producto.");
        }
        return res.sendStatus(200);
    });
});

// 2. Leer todos los productos
app.get('/productos', (req, res) => {
    con.query('SELECT * FROM productos', (err, productos) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).send("Error al obtener productos.");
        }
        return res.json(productos);
    });
});

// 3. Actualizar un producto por su ID
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio } = req.body;
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?';
    con.query(query, [nombre, descripcion, precio, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            return res.status(500).send("Error al actualizar producto.");
        }
        return res.sendStatus(200);
    });
});

// 4. Eliminar un producto por su ID
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            return res.status(500).send("Error al eliminar producto.");
        }
        return res.sendStatus(200);
    });
});

// Escuchar en el puerto 4000
app.listen(5000, () => {
    console.log('Servidor escuchando en el puerto 5000');
});
