import express from 'express';
import db from './app/config/db.config.js'; // Configuración de la base de datos
import { 
    createUser, 
    findUserById, 
    findAll, 
    updateUserById, 
    deleteUserById 
} from './app/controllers/user.controller.js'; // Controlador del usuario

const app = express();
app.use(express.json()); // Middleware para parsear JSON

const PORT = process.env.PORT || 3000;

// Probar la conexión a la base de datos
db.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa.'))
    .catch((error) => console.error('Error al conectar a la base de datos:', error));

// Rutas del servidor

// Crear un nuevo usuario
app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const nuevoUsuario = await createUser(firstName, lastName, email);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todos los usuarios con sus bootcamps
app.get('/users', async (req, res) => {
    try {
        const usuarios = await findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener un usuario por ID con sus bootcamps
app.get('/users/:id', async (req, res) => {
    try {
        const usuario = await findUserById(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

// Actualizar un usuario por ID
app.put('/users/:id', async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        const usuarioActualizado = await updateUserById(req.params.id, firstName, lastName, email);
        res.status(200).json(usuarioActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un usuario por ID
app.delete('/users/:id', async (req, res) => {
    try {
        const usuarioEliminado = await deleteUserById(req.params.id);
        res.status(200).json(usuarioEliminado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
