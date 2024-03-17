const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware para analizar el cuerpo de las solicitudes entrantes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const con = mysql.createConnection({
    host: 'bidiykigptyapxlvbr2w-mysql.services.clever-cloud.com',
    port: '3306',
    user: 'ukj8xszbxw0vprst',
    password: 'shk4kRusD87w9s0wBegK',
    database: 'bidiykigptyapxlvbr2w'
});

con.connect(function(err) {
    if (err) {
        console.error('Error de conexión:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

// Ruta para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Operaciones CRUD para productos
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

app.get('/productos', (req, res) => {
    con.query('SELECT * FROM productos', (err, productos) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).send("Error al obtener productos.");
        }
        return res.json(productos);
    });
});

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

// Escuchar en el puerto 3400
app.listen(3500, () => {
    console.log('Servidor escuchando en el puerto 3500');
});
