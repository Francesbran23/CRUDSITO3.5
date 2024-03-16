// productos.js

const express = require('express');
const router = express.Router();

const con = require('./conexion'); // Importa la conexión a la base de datos desde otro archivo

// Operaciones CRUD para productos

// 1. Crear un producto
router.post('/', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    const query = 'INSERT INTO productos (nombre, descripcion, precio) VALUES (?, ?, ?)';
    con.query(query, [nombre, descripcion, precio], (err, result) => {
        if (err) {
            console.error('Error al crear producto:', err);
            return res.status(500).send("Error al crear producto.");
        }
        return res.redirect('/productos');
    });
});

// 2. Leer todos los productos
router.get('/', (req, res) => {
    con.query('SELECT * FROM productos', (err, productos) => {
        if (err) {
            console.error('Error al obtener productos:', err);
            return res.status(500).send("Error al obtener productos.");
        }
        return res.json(productos);
    });
});

// 3. Leer un producto por su ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM productos WHERE id = ?', [id], (err, producto) => {
        if (err) {
            console.error('Error al obtener producto:', err);
            return res.status(500).send("Error al obtener producto.");
        }
        if (producto.length === 0) {
            return res.status(404).send("Producto no encontrado.");
        }
        return res.json(producto[0]);
    });
});

// 4. Actualizar un producto por su ID
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, descripcion, precio } = req.body;
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?';
    con.query(query, [nombre, descripcion, precio, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar producto:', err);
            return res.status(500).send("Error al actualizar producto.");
        }
        return res.redirect('/productos');
    });
});

// 5. Eliminar un producto por su ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM productos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('Error al eliminar producto:', err);
            return res.status(500).send("Error al eliminar producto.");
        }
        return res.redirect('/productos');
    });
});

module.exports = router;
